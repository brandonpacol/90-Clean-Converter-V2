import SpotifyWebApi from "spotify-web-api-node";

export async function getPlaylists(accessToken: string | undefined, offset: number, limit: number | null): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
    try {

        if (limit === null) limit = 50;

        if (accessToken) {
            const spotifyApi = new SpotifyWebApi({
                accessToken: accessToken,
            });

            const result = await spotifyApi.getUserPlaylists({ offset: offset, limit: limit });
            return result.body.items;

        }

    } catch (err) {
        console.error("Error in helpers.tsx, getPlaylists: ", err);
    }
    return [];
}