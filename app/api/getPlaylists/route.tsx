import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from '../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import { getPlaylists } from '@/utils/helpers';

export async function GET(request: NextRequest, response: NextResponse) {

    let playlists = [] as SpotifyApi.PlaylistObjectSimplified[];

    try {

        const session = await getServerSession(authConfig);

        const { searchParams } = new URL(request.url)
        let offsetString = searchParams.get('offset');
        let limitString = searchParams.get('limit');

        let offset = 0;
        if (offsetString) {
            let offsetInt = parseInt(offsetString);
            if (!isNaN(offsetInt)) offset = offsetInt;
        }

        let limit = null;
        if (limitString) {
            let limitInt = parseInt(limitString);
            if (!isNaN(limitInt)) limit = limitInt;
        }

        playlists = await getPlaylists(session?.accessToken, offset, limit);

    } catch (err) {
        console.error('An error occured in getPlaylists, GET: ', err);
    }

    return Response.json({ playlists });

}