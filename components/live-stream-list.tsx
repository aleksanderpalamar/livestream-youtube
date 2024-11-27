'use client'

import { useState, useEffect } from 'react'
import { fetchLiveStreams, LiveStream } from '@/lib/youtube'

import LiveStreamCard from '@/components/live-stream-card'
import SearchBar from '@/components/search-bars'
import { Header } from './header'

export default function LiveStreamList() {
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const getLiveStreams = async (query: string = '') => {
    setLoading(true)
    setError(null)
    try {
      const streams = await fetchLiveStreams(query)
      setLiveStreams(streams)
    } catch (err) {
      console.error('Erro ao carregar as streams. Por favor, tente novamente mais tarde.', err)
      setError('Erro ao carregar as streams. Por favor, tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLiveStreams()
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    await getLiveStreams(query)
  }

  if (loading) {
    return <p className="text-xl text-white">Carregando live streams...</p>
  }

  if (error) {
    return <p className="text-xl text-red-500">{error}</p>
  }

  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <div className="mb-20 relative">
        <Header />
      </div>
      <SearchBar onSearch={handleSearch} />
      <h2 className="text-2xl font-bold text-white">
        Canais ao vivo {searchQuery ? `"${searchQuery}"` : ''}
      </h2>      
      {liveStreams.length === 0 ? (
        <p className="text-xl text-white">Nenhum canal encontrado{searchQuery ? ` para "${searchQuery}"` : ''}.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveStreams.map((stream) => (
            <LiveStreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      )}
    </div>
  )
}

