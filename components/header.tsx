"use client"

import { useEffect, useState } from "react"
import { FaYoutube } from "react-icons/fa6"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { SignInButton } from "./sign-in"

export const Header = () => {
  const [isClient, setIsClient] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="flex items-center text-2xl font-bold text-zinc-950">
          <FaYoutube className="mr-2 text-violet-500 w-8 h-8" />
          <span className="text-zinc-50">Livestream-YouTube</span>
        </h1>
        {status === "authenticated" ? (
          <div className="flex items-center gap-4">
            <span className="text-zinc-50">
              Olá, {session.user?.name}
            </span>
            <Button onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        ) : status === "unauthenticated" ? (
          <SignInButton />
        ) : null}
      </div>
    </header>
  )
}