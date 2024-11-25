'use client'

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
      <div className="flex justify-center items-center h-screen">
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
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Área do Player */}
        <div className="lg:w-3/4 h-full flex flex-col mt-20">
          <div className="relative pt-[56.25%] bg-zinc-950">
            <iframe
              src={`https://www.youtube.com/embed/${stream.id}?autoplay=1`}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="p-4">
              <h1 className="text-xl font-bold text-white mb-2">{stream.title}</h1>
              <p className="text-sm text-gray-400">{stream.channelTitle}</p>
              <p className="text-sm text-violet-500 mt-2">
                {stream.viewerCount.toLocaleString()} espectadores
              </p>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="lg:w-1/4 h-full bg-zinc-800 flex flex-col">
          <div className="p-4 border-b border-zinc-700">
            <h2 className="text-lg font-semibold text-white">Chat da Transmissão</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Placeholder para mensagens do chat */}
              <p className="text-zinc-400 text-sm text-center">
                Chat em desenvolvimento...
              </p>
            </div>
          </div>
          <div className="p-4 border-t border-zinc-700">
            <input
              type="text"
              placeholder="Envie uma mensagem..."
              className="w-full px-3 py-2 bg-zinc-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}