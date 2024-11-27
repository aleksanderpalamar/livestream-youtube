import axios from 'axios'
import { getSession } from 'next-auth/react'

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

interface YouTubeSearchItem {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    channelTitle: string
    thumbnails: {
      medium: {
        url: string
      }
    }
  }
}

interface YouTubeVideoDetails {
  id: string
  snippet: {
    title: string
    channelTitle: string
    thumbnails: {
      medium: {
        url: string
      }
    }
  }
  liveStreamingDetails: {
    concurrentViewers: string
  }
}

export interface LiveStream {
  id: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  viewerCount: number
}

export async function fetchVideoDetails(videoId: string,): Promise<LiveStream | null> {
  
  if (!API_KEY) {
    console.error('Chave da API do YouTube não está configurada.')
    return null
  }

  try {
    const response = await axios.get<{ items: YouTubeVideoDetails[] }>(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: {
          part: 'snippet,liveStreamingDetails',
          id: videoId,
          key: API_KEY,
        },
      }
    )

    if (!response.data.items?.length) {
      return null
    }

    const video = response.data.items[0]
    return {
      id: video.id,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      viewerCount: parseInt(video.liveStreamingDetails?.concurrentViewers || '0', 10),
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do vídeo:', error)
    return null
  }
}

export async function fetchLiveStreams(query: string = ''): Promise<LiveStream[]> {
  const session = await getSession()

  if (!session || !session.accessToken) {
    console.error('Usuário não autenticado ou token de acesso ausente.')
    return []
  }
  
  if (!API_KEY) {
    console.error('Chave da API do YouTube não está configurada.')
    return []
  }

  try {
    const response = await axios.get<{ items: YouTubeSearchItem[] }>(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          eventType: 'live',
          type: 'video',
          q: `${query} Brasil`,
          videCaption: 'closedCaption',
          regionCode: 'BR',
          relevanceLanguage: 'pt',
          order: 'relevance',
          safeSearch: 'moderate',
          maxResults: 6,
          key: API_KEY,
        },
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
        }
      }
    )

    if (!response.data.items?.length) {
      return []
    }

    const videoIds = response.data.items.map(item => item.id.videoId)
    const streams: LiveStream[] = []

    for (const videoId of videoIds) {
      const videoDetails = await fetchVideoDetails(videoId)
      if (videoDetails) {
        streams.push(videoDetails)
      }
    }

    return streams
  } catch (error) {
    console.error('Erro ao buscar live streams:', error)
    return []
  }
}