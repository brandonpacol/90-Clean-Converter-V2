import { NextAuthOptions } from "next-auth"
import Spotify from "next-auth/providers/spotify"

export const authConfig: NextAuthOptions = {
    providers: [
        Spotify({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'playlist-read-private playlist-read-collaborative, playlist-modify-public, playlist-modify-private',
                    show_dialog: true
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                //token.userId = account.userId;
            }
            return token
        },
        async session({ session, token }) {
            // Forward the access token to the session object
            session.accessToken = token.accessToken;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
};