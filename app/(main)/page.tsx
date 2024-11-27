'use client'
import { GradientBackground } from "@/components/gradient-background"
import LiveStreamList from "@/components/live-stream-list"
import { SignInButton } from "@/components/sign-in"
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"

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
    <div className="">
      <div className="space-y-8">
        {session ? (
          <LiveStreamList />
        ) : (
          <div className="min-h-screen w-full flex">
            <div className="hidden md:flex w-[60%] relative">
              <GradientBackground />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="flex items-center text-2xl font-bold">
                  <span className="text-zinc-50">Livestream</span>
                  <span className="text-violet-500 ml-2">YouTube</span>
                </h1>
              </div>
            </div>
            <main className="flex-1 flex flex-col items-center justify-center bg-zinc-900 p-8">
              <div className="md:hidden mb-8">
                <h1 className="flex items-center text-2xl font-bold">
                  <span className="text-zinc-50">Livestream</span>
                  <span className="text-violet-500 ml-2">YouTube</span>
                </h1>
              </div>
              <div
                className="w-full max-w-[400px] p-8 space-y-6 
                border border-zinc-800 rounded-lg flex flex-col items-center">
                <header className="space-y-4">
                  <h1 className="text-2xl font-bold text-zinc-50">
                    Acesse sua conta
                  </h1>
                </header>
                <SignInButton />
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  )
}