import React, { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Pesquisar canais ao vivo..."
          value={query}
          onChange={handleChange}
          className="w-full py-2 px-4 bg-zinc-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-violet-600 text-white px-4 py-1 rounded-full hover:bg-violet-700 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}