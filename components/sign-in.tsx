'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { FaGoogle } from 'react-icons/fa6'
import { Alert, AlertDescription } from './ui/alert'

export const SignInButton = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin w-8 h-8 text-zinc-50" />
        <p className="ml-2 text-zinc-50">Loading...</p>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-zinc-50">You are already signed in.</p>
      </div>
    )
  }

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {error === 'OAuthCallback'
              ? 'Failed to sign in. Please try again.'
              : 'Failed to sign in with Google. Please try again.'
            }
          </AlertDescription>
        </Alert>
      )}
      <Button
        onClick={() => signIn("google", { callbackUrl: "/", redirect: true })}
        className="w-fit text-zinc-50 bg-red-500 hover:bg-red-600"
      >
        <FaGoogle className="mr-2" />
        Sign in with Google
      </Button>
    </>
  )
}