'use client'
import LiveStreamList from "@/components/live-stream-list"
import { SignInButton } from "@/components/sign-in"
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin w-8 h-8 text-zinc-50" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">YouTube Live Streams</h1>
      <div className="space-y-8">
        {session ? (
          <LiveStreamList />
        ) : (
          <div className="md:flex-row flex flex-col items-center">
            <div className="mr-4 w-3/4 flex-1 flex justify-center overflow-hidden">
              <Image 
                src="/images/youtube-logo.png"
                alt="YouTube Logo"
                width={100}
                height={100}
                className="w-16 h-16 object-cover rounded-lg"
                priority
                quality={100}
              />
            </div>
            <aside>
              <p className="text-zinc-50 text-xl mb-4">
                Faça login para ver as streams
              </p>
              <SignInButton />
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}


