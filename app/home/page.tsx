import PlaylistSelectionControl from "../../components/PlaylistSelectionControl";
import LogoutButton from "../../components/LogoutButton";
import SpotifyCredit from "../../components/SpotifyCredit";

import { authConfig } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import { getPlaylists } from "@/utils/helpers";

export default async function Home() {

    const session = await getServerSession(authConfig);
    const data = await getPlaylists(session?.accessToken, 0, null);

    return (
        <div className="grid grid-rows-layout min-h-screen">
            <header className="flex justify-between h-16 border-b border-white items-center bg-white/10">
                <span className="ml-5 font-bold text-xl">90% Clean Converter</span>
                <LogoutButton />
            </header>
            <main className="flex flex-1 flex-col items-center p-12">
                
                <PlaylistSelectionControl username={session?.user?.name} data={data}/>

            </main>
            <footer className="w-full h-20">
                <SpotifyCredit />
            </footer>
        </div>
    );
}