import { usePlaylist } from "@/contexts/PlaylistContext"

interface PlaylistConvertButtonProps {
    isConverting: boolean;
    onClick: (selectedPlaylist: SpotifyApi.PlaylistObjectSimplified) => void;
}

export default function PlaylistConvertButton({ isConverting, onClick }: PlaylistConvertButtonProps) {

    const { selectedPlaylist } = usePlaylist();

    function handleConversionClick() {
        if (selectedPlaylist) {
            onClick(selectedPlaylist);
        }
    }

    return (
        <button
            className="bg-green-500 py-2 px-3 rounded-lg text-black mb-5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-300 transition"
            style={{ pointerEvents: isConverting ? "none" : "auto"}}
            onClick={handleConversionClick}
            disabled={!selectedPlaylist || isConverting}
        >
            Convert
        </button>
    )
}