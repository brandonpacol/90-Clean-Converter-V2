"use client"

import { PlaylistReturn } from "@/types/types"
import { useEffect, useState } from "react"

interface PlaylistConvertedProps {
    playlist: PlaylistReturn
}

export default function PlaylistConverted({ playlist }: PlaylistConvertedProps) {

    const [appear, setAppear] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAppear(true), 10); // Delay just enough to ensure transition
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col justify-center w-full items-center bg-white/10 rounded-3xl py-10 px-5 mb-5">
                <img
                    src={playlist.image}
                    alt={playlist.name}
                    height={300}
                    width={300}
                    className={"playlist-cover mb-3 fade-appear" + (appear ? "fade-appear-active" : "")}
                />
                <h2 className={"playlist-name text-xl mb-1 font-bold fade-appear " + (appear ? "fade-appear-active" : "")}>{playlist.name}</h2>
                <p className={"playlist-caption mb-5 text-xs italic fade-appear " + (appear ? "fade-appear-active" : "")}>Your clean playlist has been created!</p>
                <a
                    href={playlist.url}
                    target="_blank"
                    className={"playlist-btn bg-green-500 py-2 px-3 rounded-lg text-black fade-appear transition hover:bg-green-300 " + (appear ? "fade-appear-active" : "")}
                >
                    Open in Spotify
                </a>
            </div>
            <a
                href="/home"
                className={"playlist-btn rounded-lg text-sm underline fade-appear " + (appear ? "fade-appear-active" : "")}
            >
                <span className="hover:opacity-70 transition-opacity">Convert Again</span>
            </a>
        </div>
    )
}