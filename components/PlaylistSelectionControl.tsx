"use client"

import PlaylistConverted from "./PlaylistConverted";
import ProgressBar from "./ProgressBar";
import LoadingSpinner from "./LoadingSpinner";
import PlaylistList from "./PlaylistList";
import PlaylistLabel from "./PlaylistLabel";
import PlaylistConvertButton from "./PlaylistConvertButton";
import StatusMessage from "./StatusMessage";

import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { PlaylistReturn } from "@/types/types";
import * as ServerEvent from '@/types/ServerEventTypes';

import { PlaylistProvider } from "@/contexts/PlaylistContext";

import { useState, useEffect, useRef } from "react";

interface PlaylistSelectionControlProps {
    username: string | undefined | null,
    data: SpotifyApi.PlaylistObjectSimplified[];
    onConversionComplete?: (playlist: PlaylistReturn) => void;
}

export default function PlaylistSelectionControl({username, data}: PlaylistSelectionControlProps) {
    return (
        <PlaylistProvider>
            <PlaylistSelectionControlInternal username={username} data={data} />
        </PlaylistProvider>
    )
}

function PlaylistSelectionControlInternal({ username, data }: PlaylistSelectionControlProps) {

    const [convertedPlaylist, setConvertedPlaylist] = useState<PlaylistReturn | null>(null);

    function handleConversionComplete(playlist: PlaylistReturn) {
        setConvertedPlaylist(playlist);
    }

    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                key={convertedPlaylist ? 'PlaylistConverted' : 'PlaylistSelection'}
                timeout={250}
                classNames="slide"
            >
                {convertedPlaylist ? (
                    <PlaylistConverted playlist={convertedPlaylist} />
                ) : (
                    <PlaylistSelection username={username} data={data} onConversionComplete={handleConversionComplete} />
                )}
            </CSSTransition>
        </SwitchTransition>
    )

}

function PlaylistSelection({username, data, onConversionComplete}:PlaylistSelectionControlProps) {

    const checkboxRef = useRef<HTMLInputElement | null>(null);

    const [isConverting, setIsConverting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [progress, setProgress] = useState(0);

    function handleConversionClick(selectedPlaylist: SpotifyApi.PlaylistObjectSimplified) {
        if (selectedPlaylist) {

            setIsConverting(true);
            setStatusMessage("Starting conversion");
            
            const removeExplicit = checkboxRef.current?.checked;
            const eventSource = new EventSource(`/api/convertPlaylist?playlistId=${selectedPlaylist.id}&removeExplicit=${removeExplicit}`, {
                withCredentials: true,
            });

            function closeEvent(convertedPlaylist?: PlaylistReturn) {
                eventSource.close();
                setTimeout(() => {
                    setIsConverting(false);
                    setProgress(0);
                    if (convertedPlaylist && onConversionComplete) {
                        onConversionComplete(convertedPlaylist);
                    }
                }, 1500);
            }

            eventSource.onmessage = (event) => {
                const data: ServerEvent.Message = JSON.parse(event.data);
                console.log(data);
                setStatusMessage(data.message);
                setProgress(data.progress);
                if (data.status === ServerEvent.Status.Complete) { // close event when complete
                    closeEvent(data.playlist);
                } else if (data.status === ServerEvent.Status.Error) {
                    closeEvent();
                }
            };

            eventSource.onerror = () => {
                setStatusMessage("An error occured converting your playlist");
                closeEvent();
            }
        }
    }

    // outer div is used to apply transition
    return (
        <div className="w-11/12 md:w-3/5 lg:w-1/4">
            <div className="flex flex-col items-center mb-5 text-center">
                <h2 className="text-xl">Welcome, {username}!</h2>
                <h3 className="text-lg">Select a playlist to convert</h3>
            </div>

            <PlaylistList data={data} disabled={isConverting} />

            <div className="flex flex-col items-center">
                <PlaylistLabel />
                <div className="flex flex-row mb-5">
                    <input
                        ref={checkboxRef}
                        id="clean-percent"
                        className="mr-1"
                        type="checkbox"
                        disabled={isConverting}
                    />
                    <label htmlFor="clean-percent">100% clean</label>
                </div>
                {!isConverting && <PlaylistConvertButton isConverting={isConverting} onClick={handleConversionClick} />}

                {isConverting &&
                    <>
                        <div className="flex items-center mb-2 w-full h-5">
                            <LoadingSpinner size={4} color="rgb(34 197 94)" />
                            <StatusMessage statusMessage={statusMessage} />
                        </div>
                        <ProgressBar percent={progress} color="rgb(34 197 94)" />
                    </>}
            </div>
        </div>
    )
}