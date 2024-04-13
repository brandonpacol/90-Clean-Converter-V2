import StaticPageWrapper from "@/components/StaticPageWrapper";

export default function Privacy() {
    return (
        <StaticPageWrapper>
            <h1 className="text-3xl mb-5 text-center font-bold">Privacy Policy</h1>
            <p className="text-center mb-2 w-full lg:w-1/2">
                <b>90% Clean Converter</b> is powered by the Spotify Web API. By choosing to use this app, you agree to the use of your Spotify account to view your account’s username, playlists you’ve created, and playlists you’ve followed. You also grant the app permission to create playlists on your behalf.
                <br /><br />
                None of the data used by <b>90% Clean Converter</b> is stored or collected anywhere, and it is NOT shared with any third parties. All information is used solely for creating a clean playlist from an existing playlist you’ve created or followed.
            </p>
        </StaticPageWrapper>
    );
}