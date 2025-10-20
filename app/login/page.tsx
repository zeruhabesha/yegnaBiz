"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Building2, Loader2 } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 px-4 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
          <Link href="/" className="mx-auto flex items-center justify-center gap-2 md:mx-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">YegnaBiz</span>
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Welcome back</h1>
            <p className="text-lg text-white/80">
              Sign in to manage your listings, respond to reviews, and discover new opportunities across Ethiopia.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur">
            <p className="text-sm leading-relaxed">
              “YegnaBiz has connected us with customers all over Ethiopia. Updating our profile and responding to reviews is now effortless.”
            </p>
            <span className="mt-4 block text-sm font-semibold text-white">— Selam, Addis Flower Boutique</span>
          </div>
        </div>

        <Card className="border-white/10 bg-background/80 shadow-xl shadow-primary/10">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Sign in to your account</CardTitle>
            <CardDescription>Manage your presence on Ethiopia’s trusted business directory.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Create one
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )

}
