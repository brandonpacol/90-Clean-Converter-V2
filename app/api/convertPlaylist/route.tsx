import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from '../auth/[...nextauth]/options';
import SpotifyWebApi from 'spotify-web-api-node';
import { getServerSession } from 'next-auth';
import { PlaylistReturn } from '@/types/types';
import * as ServerEvent from '@/types/ServerEventTypes';

interface SongObject {
    artist: string | undefined;
    track: string | undefined;
    explicit: boolean | undefined;
    uri: string | undefined;
    id: string | undefined;
}

export const runtime = 'nodejs';
// This is required to enable streaming
export const dynamic = 'force-dynamic';

export function GET(request: NextRequest, response: NextResponse) {

    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    // Function to send data to the client
    function sendData(data: ServerEvent.Message) {
        const formattedData = `data: ${JSON.stringify(data)}\n\n`
        writer.write(encoder.encode(formattedData));
    }

    (async function () {
        try {

            const session = await getServerSession(authConfig);
            if (session?.accessToken) {

                const spotifyApi = new SpotifyWebApi({
                    accessToken: session.accessToken,
                });

                const { searchParams } = new URL(request.url)
                const playlistId = searchParams.get('playlistId');
                const removeExplicit = searchParams.get('removeExplicit');

                if (playlistId) {

                    const playlist = await spotifyApi.getPlaylist(playlistId);
                    let percentageString = " (90% Clean)";
                    if (removeExplicit && removeExplicit.toLowerCase() === "true") {
                        percentageString = " (100% Clean)";
                    }
                    const playlistName = playlist.body.name + percentageString;

                    // get songs from selected playlist
                    sendData({ status: ServerEvent.Status.Running, message: "Getting songs", progress: 0 })
                    const songsResult = await spotifyApi.getPlaylistTracks(playlistId);
                    if (songsResult.body.items) {

                        let search_keywords: SongObject[] = [];
                        const songs = songsResult.body.items;

                        songs.forEach((element: SpotifyApi.PlaylistTrackObject) => search_keywords.push({
                            artist: element.track?.artists[0].name,
                            track: element.track?.name,
                            explicit: element.track?.explicit,
                            uri: element.track?.uri,
                            id: element.track?.id
                        }));

                        // if songs are explicit, search for clean song
                        let uris_to_add: string[] = [];
                        for (let i = 0; i < search_keywords.length; i++) {

                            if (search_keywords[i]) {

                                //console.log('Searching for song ' + (i + 1));
                                if (search_keywords[i].explicit) {
                                    let found = false;
                                    const query = ('artist:' + search_keywords[i].artist + ' track:' + search_keywords[i].track).slice(0, 100);
                                    sendData({ status: ServerEvent.Status.Running, message: `${i}/${search_keywords.length} songs converted`, progress: Math.ceil(i / search_keywords.length * 0.95 * 100) });
                                    const searchResults = await spotifyApi.searchTracks(query, { limit: 5 });

                                    const search_results = searchResults.body.tracks?.items;
                                    if (search_results) {
                                        for (let j = 0; j < search_results.length; j++) {
                                            //console.log('Searching for a clean version of ' + search_keywords[i].track + '...');
                                            if (!search_results[j].explicit && search_keywords[i].artist == search_results[j].artists[0].name) {
                                                //console.log('Clean version of ' + search_keywords[i].track + ' added!');
                                                uris_to_add.push(search_results[j].uri);
                                                found = true;
                                                break;
                                            }
                                        }
                                        if (!found && !removeExplicit) {
                                            //console.log('No clean version found, added explicit version of ' + search_keywords[i].track + '.');
                                            uris_to_add.push(search_keywords[i].uri as string);
                                        }
                                    }

                                } else {
                                    uris_to_add.push(search_keywords[i].uri as string);
                                }

                            }

                        }

                        // create new playlist bassed on selected playlist name
                        sendData({ status: ServerEvent.Status.Running, message: "Finalizing playlist", progress: 95 });
                        const createdPlaylistResult = await spotifyApi.createPlaylist(playlistName, {
                            description: "Created with 90% Clean Converter",
                            public: false
                        });

                        if (createdPlaylistResult.body.id) {

                            const createdPlaylist = createdPlaylistResult.body;
                            // add songs to created playlist
                            let total_songs = uris_to_add.length;
                            for (let i = 0; i < uris_to_add.length; i += 100) {
                                if (total_songs > 100) {
                                    await spotifyApi.addTracksToPlaylist(createdPlaylist.id, uris_to_add.slice(i, i + 99));
                                    total_songs = total_songs - 100;
                                } else {
                                    await spotifyApi.addTracksToPlaylist(createdPlaylist.id, uris_to_add.slice(i, i + total_songs));
                                }
                            }

                            // need to make api call again to get playlist artwork
                            const newPlaylistResult = await spotifyApi.getPlaylist(createdPlaylist.id);
                            const newPlaylist = newPlaylistResult.body;

                            const returnPlaylist: PlaylistReturn = {
                                name: newPlaylist.name,
                                image: newPlaylist.images[0].url,
                                url: newPlaylist.external_urls.spotify
                            }

                            sendData({ status: ServerEvent.Status.Complete, message: "Playlist created", progress: 100, playlist: returnPlaylist });

                        }

                    }

                }

            }

        } catch (err) {
            console.error('An error occured in converPlaylist, GET: ', err);
            sendData({ status: ServerEvent.Status.Error, message: "An error occured converting your playlist", progress: 100 });
        }

        writer.close();
    })();

    // Return response connected to readable
    return new Response(responseStream.readable, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/event-stream; charset=utf-8",
            Connection: "keep-alive",
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
            "Content-Encoding": "none",
        },
    });
}