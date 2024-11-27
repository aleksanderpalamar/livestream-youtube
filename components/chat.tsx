//import { useState } from "react"

export const Chat = () => {
  //const [messages, setMessages] = useState<string[]>([])
  //const [input, setInput] = useState('')
  //const [loading, setLoading] = useState(false)

  return (
    <div className="lg:w-1/4 h-full bg-zinc-800 flex flex-col">
      <div className="p-4 border-b border-zinc-700">
        <h2 className="text-xl font-bold text-white">Chat</h2>
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
  )
}