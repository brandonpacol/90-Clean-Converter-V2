import { usePlaylist } from "@/contexts/PlaylistContext"

export default function PlaylistLabel() {

    const { selectedPlaylist } = usePlaylist();

    return (
        <p className="mb-1">{selectedPlaylist ? selectedPlaylist.name : "No playlist selected"}</p>
    )
}