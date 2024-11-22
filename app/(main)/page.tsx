
import LiveStreamList from "@/components/live-stream-list"
import UserGreeting from "@/components/user-greeting"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
  const { userId } = await auth()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">YouTube Live Streams</h1>
      {userId ? (
        <div className="space-y-8">
          <UserGreeting />
          <LiveStreamList />
        </div>
      ): ( 
        <div className="flex md:flex-row flex-col space-y-8 md:space-y-0 md:space-x-8 items-center justify-center h-full w-full">
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-zinc-700 rounded-lg"/>
          </div>
          <aside className="text-center">            
            <h1 className="text-3xl font-bold mb-8">YouTube Live Streams</h1>
            <p className="text-lg">Para ver os streams ao vivo, por favor, faça login.</p>
          </aside>                   
        </div>
      )}
    </main>
  )
}


