"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose a provider to sign in with</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => signIn("github", { callbackUrl: "/" })}>Sign in with GitHub</Button>
          <Button onClick={() => signIn("google", { callbackUrl: "/" })}>Sign in with Google</Button>
        </CardContent>
      </Card>
    </div>
  )
}

