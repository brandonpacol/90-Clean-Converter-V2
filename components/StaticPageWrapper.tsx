import { ReactNode } from "react"
import SpotifyCredit from "./SpotifyCredit";
import FooterLinks from "./FooterLinks";

interface StaticPageWrapperProps {
    children: ReactNode;
}

export default function StaticPageWrapper({ children } : StaticPageWrapperProps) {
    return (
        <div className="grid grid-rows-layout min-h-screen">
            <header className="flex justify-between h-16 border-b border-white items-center bg-white/10">
                <a href="/" className="ml-5 font-bold text-xl">90% Clean Converter</a>
            </header>
            <main className="flex flex-1 flex-col items-center p-12">
                {children}
            </main>
            <footer className="w-full h-32">
                <SpotifyCredit />
                <FooterLinks />
            </footer>
        </div>
    )
}