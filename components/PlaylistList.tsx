"use client";

import { memo, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import LoadingSpinner from "./LoadingSpinner";
import InfiniteScroll from 'react-infinite-scroll-component';

interface PlaylistListProps {
    data: SpotifyApi.PlaylistObjectSimplified[];
    disabled: boolean;
}

const PlaylistList = memo(({ data, disabled }: PlaylistListProps) => {

    const [playlists, setPlaylists] = useState(data);
    const [hasMore, setHasMore] = useState(data.length >= 10);

    async function handleFetchData() {
        const result = await fetch(`/api/getPlaylists?offset=${playlists.length}`, {
            credentials: "include"
        });

        const data = await result.json();

        const addedPlaylists : SpotifyApi.PlaylistObjectSimplified[] = data.playlists;

        if (addedPlaylists.length > 0) {
            setPlaylists(currPlaylists => {
                return currPlaylists.concat(addedPlaylists);
            });
        } else {
            setHasMore(false);
        }
    }

    return (
        <div
            id="scrollableDiv"
            className="w-full border-2 border-white rounded-xl mb-5 bg-white/5"
            style={{
                overflow: disabled ? "hidden" : "scroll",
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? "none" : "auto",
                height: "35vh"
            }}
        >
            <InfiniteScroll
                scrollableTarget="scrollableDiv"
                dataLength={playlists.length}
                next={handleFetchData}
                loader={<Loader />}
                hasMore={hasMore}
            >
                {playlists.map((playlistItem: SpotifyApi.PlaylistObjectSimplified) => {
                    return (
                        <PlaylistItem
                            key={playlistItem.id}
                            name={playlistItem.name}
                            playlistObject={playlistItem}
                        />
                    )
                })}
            </InfiniteScroll>
        </div>
    )
});

PlaylistList.displayName = 'PlaylistList';

export default PlaylistList;

function Loader() {
    return (
        <div className="h-16 border-b border-white flex items-center justify-center">
            <LoadingSpinner size={4} color="rgb(34 197 94)" />
        </div>
    )
}

Loader.displayName = 'Loader';