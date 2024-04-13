import Image from "next/image"

export default function SpotifyCredit() {
    return (
        <div className="flex flex-col items-center">
            <span className="text-sm mb-4">Built by Brandon Pacol with</span>
            <Image
                src="/spotify-logo.png"
                alt="spotify logo"
                width={100}
                height={30}
            />
        </div>
    )
}