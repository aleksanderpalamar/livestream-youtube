"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { FaYoutube } from "react-icons/fa6"

export const Header = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-zinc-900 shadow-md border-b border-zinc-950">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="flex items-center text-2xl font-bold text-zinc-950">
          <FaYoutube className="mr-2 text-violet-500 w-8 h-8" />
          <span className="text-zinc-50">Livestream-YouTube</span>
        </h1>
        <div className="flex items-center space-x-2 text-zinc-50 p-1">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <button
              onClick={goBack}
              className="flex items-center text-zinc-50 p-1">
              <ArrowLeft className="w-6 h-6 mr-2" />
            </button>
            <UserButton afterSwitchSessionUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}