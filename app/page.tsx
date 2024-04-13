import LoginButton from "../components/LoginButton";
import HomePageModal from "@/components/HomePageModal";
import SpotifyCredit from "../components/SpotifyCredit";
import FooterLinks from "@/components/FooterLinks";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col justify-between items-center p-12">
          <div className="flex flex-col items-center justify-center flex-1">
              <h1 className="text-5xl mb-5 text-center font-bold">90% Clean Converter</h1>
              <p className="text-center text-lg font-bold mb-2">
                {"Convert explicit playlists to a 90% clean playlist on Spotify! 🎧"}
              </p>
              <p className="text-center mb-5 text-sm">
                Or 100% if you want to be completely spotless 🫧
              </p>
              <HomePageModal />
              <LoginButton />
          </div>

          <footer className="w-full h-20">
              <SpotifyCredit />
              <FooterLinks />
          </footer>
      </main>
  );
}
