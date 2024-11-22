import Image from 'next/image'

interface LiveStreamCardProps {
  stream: {
    id: string
    title: string
    channelTitle: string
    thumbnailUrl: string
    viewerCount: number
  }
}

export default function LiveStreamCard({ stream }: LiveStreamCardProps) {
  return (
    <div className="bg-zinc-800 text-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <Image
          src={stream.thumbnailUrl}
          alt={stream.title}
          width={320}
          height={180}
          className="w-full"
          priority
          quality={100}
        />
        <span className="absolute top-2 left-2 bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded border-animate-pulse border-2 border-violet-500">
          AO VIVO
        </span>
        <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {stream.viewerCount.toLocaleString()} espectadores
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-sm font-semibold mb-1 truncate">{stream.title}</h2>
        <p className="text-xs text-gray-400 mb-2">{stream.channelTitle}</p>
        <a
          href={`/watch/${stream.id}`}
          rel="noopener noreferrer"
          className="text-blue-400 text-xs hover:underline"
        >
          Assistir
        </a>
      </div>
    </div>
  )
}

