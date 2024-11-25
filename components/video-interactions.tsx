/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { ThumbsUp, ThumbsDown, Share, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface VideoInteractionsProps {
  videoId: string
  channelId: string
  initialLikes?: number
  initialSubscribed?: boolean
}

export function VideoInteractions({ 
  videoId, 
  channelId,
  initialLikes = 0,
  initialSubscribed = false
}: VideoInteractionsProps) {
  const { data: session, status } = useSession()
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed)
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)
  const [hasDisliked, setHasDisliked] = useState(false)

  useEffect(() => {
    if (session) {
      checkUserInteractions()
    }
  }, [session, videoId, channelId])

  const checkUserInteractions = async () => {
    try {
      const response = await fetch(`/api/youtube/check-interactions?videoId=${videoId}&channelId=${channelId}`)
      const data = await response.json()
      setHasLiked(data.hasLiked)
      setIsSubscribed(data.isSubscribed)
    } catch (error) {
      console.error('Erro ao verificar interações:', error)
    }
  }

  const handleSubscribe = async () => {
    if (status !== "authenticated") {
      signIn("google")
      return
    }

    try {
      const response = await fetch('/api/youtube/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId, isSubscribed })
      })
      const data = await response.json()
      setIsSubscribed(data.isSubscribed)
    } catch (error) {
      console.error('Erro ao processar inscrição:', error)
    }
  }

  const handleLike = async () => {
    if (status !== "authenticated") {
      signIn("google")
      return
    }

    try {
      const response = await fetch('/api/youtube/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, hasLiked })
      })
      const data = await response.json()
      setHasLiked(data.hasLiked)
      setLikes(data.likes)
      if (hasDisliked) setHasDisliked(false)
    } catch (error) {
      console.error('Erro ao processar like:', error)
    }
  }

  const handleDislike = async () => {
    if (status !== "authenticated") {
      signIn("google")
      return
    }

    try {
      const response = await fetch('/api/youtube/dislike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, hasDisliked })
      })
      const data = await response.json()
      setHasDisliked(data.hasDisliked)
      if (hasLiked) {
        setHasLiked(false)
        setLikes(prev => prev - 1)
      }
    } catch (error) {
      console.error('Erro ao processar dislike:', error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Compartilhar vídeo',
        url: `https://youtube.com/watch?v=${videoId}`
      })
    } else {
      navigator.clipboard.writeText(`https://youtube.com/watch?v=${videoId}`)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isSubscribed ? "default" : "secondary"}
            className={`gap-2 ${isSubscribed ? 'bg-zinc-800 hover:bg-zinc-700' : ''}`}
            onClick={handleSubscribe}
          >
            {isSubscribed ? 'Inscrito' : 'Inscrever-se'}
            {isSubscribed && <ChevronDown className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        {isSubscribed && (
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleSubscribe}>
              Cancelar inscrição
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>

      <div className="flex items-center bg-zinc-800 rounded-full">
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-l-full px-4 ${hasLiked ? 'text-white' : 'text-zinc-400'}`}
          onClick={handleLike}
        >
          <ThumbsUp className={`h-4 w-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
          {likes > 0 && <span>{likes}</span>}
        </Button>
        <div className="w-[1px] h-6 bg-zinc-700" />
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-r-full px-4 ${hasDisliked ? 'text-white' : 'text-zinc-400'}`}
          onClick={handleDislike}
        >
          <ThumbsDown className={`h-4 w-4 ${hasDisliked ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="gap-2"
        onClick={handleShare}
      >
        <Share className="h-4 w-4" />
        Compartilhar
      </Button>
    </div>
  )
}