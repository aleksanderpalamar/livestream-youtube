'use client'

import { Chat } from "@/components/chat"
import { Header } from "@/components/header"
import { Player } from "@/components/player"
import { fetchLiveStreams, LiveStream } from "@/lib/youtube"
import { Loader } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function WatchPage() {
  const params = useParams()
  const videoId = Array.isArray(params.id) ? params.id[0] : params.id
  const [stream, setStream] = useState<LiveStream | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getStreamDetails = async () => {
      if (!videoId) {
        setError('Video ID not found')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const streamDetails = await fetchLiveStreams(videoId)

        if (streamDetails) {
          setStream(streamDetails[0])
          setError(null)
        } else {
          setError('Stream not found')
        }
      } catch (error) {
        console.error('Error fetching stream details:', error)
        setError('Error fetching stream details')
      } finally {
        setLoading(false)
      }
    }

    getStreamDetails()
  }, [videoId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-zinc-50">Loading...</h1>
        <Loader className="animate-spin ml-2 w-6 h-6" />
      </div>
    )
  }

  if (error || !stream) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
        <p className="text-red-500 bg-red-500/10 text-sm font-semibold px-2 py-1 rounded">
          {error || 'Stream not found'}
        </p>
        <Link href="/" className="text-violet-500 hover:text-violet-400 mt-4">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1">
        <Player stream={stream} />
        <Chat />
      </div>
    </div>
  )
}