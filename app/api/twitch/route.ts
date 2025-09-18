// app/api/twitch/route.ts

import { NextResponse } from "next/server";

interface TwitchStream {
  id: string;
  user_name: string;
  title: string;
  game_name: string;
  viewer_count: number;
  thumbnail_url: string;
}

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("✅ API Route called for ARABIC streamers!"); 

  try {
    const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
    const tokenResponse = await fetch(tokenUrl, { method: "POST" });
    if (!tokenResponse.ok) throw new Error("Failed to get Twitch token");
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    console.log("🔑 Got Twitch Access Token: Success");

    const streamsUrl = `https://api.twitch.tv/helix/streams?language=ar&first=100`;

    console.log(`🚀 Querying Twitch for streams with language 'ar'...`); 

    const streamsResponse = await fetch(streamsUrl, {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 },
    });

    if (!streamsResponse.ok) {
      throw new Error(`Failed to fetch streams: ${streamsResponse.statusText}`);
    }

    const streamsData = await streamsResponse.json();
    let liveStreams: TwitchStream[] = streamsData.data || [];

    console.log(`📡 Found ${liveStreams.length} live Arabic-language streams.`);

    liveStreams.sort((a, b) => b.viewer_count - a.viewer_count);

    return NextResponse.json({ streams: liveStreams });
  } catch (error) {
    console.error("🔥 CRITICAL ERROR in Twitch API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Twitch" },
      { status: 500 }
    );
  }
}
