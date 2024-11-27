import { LiveStream } from "@/lib/youtube"

interface StreamProps {
  stream: LiveStream
}

export const Player = ({ stream }: StreamProps) => {
  return (
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
  )
}