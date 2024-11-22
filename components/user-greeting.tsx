import { currentUser } from "@clerk/nextjs/server";

export default async function UserGreeting() {
  const user = await currentUser();

  if (!user) return null

  return (
    <p className="text-zinc-50 text-xl">
      Bem vindo, {user.firstName || user.username}
    </p>
  )
}