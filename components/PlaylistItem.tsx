"use client";

import { usePlaylist } from "@/contexts/PlaylistContext";

interface PlaylistItemProps {
    name: string;
    playlistObject: SpotifyApi.PlaylistObjectSimplified;
}

export default function PlaylistItem({name, playlistObject }: PlaylistItemProps) {

    const { setSelectedPlaylist, selectedPlaylist } = usePlaylist();

    return (
        <div
            style={{backgroundColor: selectedPlaylist?.id === playlistObject.id ? "white" : undefined}}
            className="h-16 border-b border-white flex items-center hover:bg-white/10 transition"
            onClick={() => {
                setSelectedPlaylist(playlistObject)
            }}
        >
            <span className={`${selectedPlaylist?.id === playlistObject.id ? "text-black" : ""} ml-5`}>{name}</span>
        </div>
    )
}