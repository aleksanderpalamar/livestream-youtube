import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { google } from 'googleapis'

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { videoId, hasDisliked } = await request.json()

  const youtube = google.youtube({
    version: 'v3',
    auth: session.accessToken as string,
  })

  try {
    await youtube.videos.rate({
      id: videoId,
      rating: hasDisliked ? 'none' : 'dislike',
    })

    return NextResponse.json({ hasDisliked: !hasDisliked })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error processing interaction' }, { status: 500 })
  }
}