import StaticPageWrapper from "@/components/StaticPageWrapper";

export default function About() {
    return (
        <StaticPageWrapper>
            <h1 className="text-3xl mb-5 text-center font-bold">About</h1>
            <div className="text-center mb-2 w-full lg:w-1/2">
                <p>
                    Turning off explicit content in the Spotify app makes explicit songs unplayable across the application. For users who have playlists that only contain explicit music, they would not even have the ability to play a clean version of their playlist. This is where the 90% Clean Converter comes to help!
                    <br /><br />
                </p>
                <p className="font-bold">Why would I want a 90% Clean Playlist? 🤔<br /><br /></p>
                <ol className="list-decimal text-left">
                    <li className="mb-2">You want a mostly clean playlist but do not mind if a few songs are explicit. Some songs do not have a clean version. So adding the explicit version to your playlist is better than not adding the song at all! 😌</li>
                    <li>{"If you do decide to turn off explicit content temporarily, 90% of your playlist is still playable! This is good for filtering your playlist when you play it to sensitive ears (ex. children, family parties, etc.). 👨‍👩‍👧‍👦"}</li>
                </ol>
            </div>
        </StaticPageWrapper>
    );
}