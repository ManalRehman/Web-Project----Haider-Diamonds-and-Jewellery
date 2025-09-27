"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteNavbar } from "@/components/site-navbar"
import { Facebook, Chrome } from "lucide-react"

type StoredUser = {
  name: string
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const existing = localStorage.getItem("currentUser")
    if (existing) {
      router.push("/")
    }
  }, [router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const usersRaw = localStorage.getItem("users")
      const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : []
      const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
      if (!found || found.password !== password) {
        setError("Invalid email or password")
        return
      }
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: found.name, email: found.email }),
      )
      router.push("/")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleLogin() {
    // Simulate Google login - in a real app, you'd integrate with Google OAuth
    const mockGoogleUser = {
      name: "Google User",
      email: "user@gmail.com"
    }
    localStorage.setItem("currentUser", JSON.stringify(mockGoogleUser))
    router.push("/")
  }

  function handleFacebookLogin() {
    // Simulate Facebook login - in a real app, you'd integrate with Facebook OAuth
    const mockFacebookUser = {
      name: "Facebook User", 
      email: "user@facebook.com"
    }
    localStorage.setItem("currentUser", JSON.stringify(mockFacebookUser))
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteNavbar />
      <div className="flex items-center justify-center px-4 pt-20">
        <Card className="w-full max-w-md bg-zinc-900 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-amber-500">Login</CardTitle>
          <CardDescription className="text-amber-100/70">Welcome back to Haider Diamonds</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm text-amber-100/80">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-zinc-800 border-amber-500/30 text-white placeholder-amber-100/50"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-amber-100/80">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-zinc-800 border-amber-500/30 text-white placeholder-amber-100/50"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-amber-500 text-black hover:bg-amber-600" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-amber-500/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-amber-100/70">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/20 bg-transparent"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button
                type="button"
                onClick={handleFacebookLogin}
                variant="outline"
                className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/20 bg-transparent"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </div>

            <p className="text-sm text-amber-100/70 text-center">
              Don&apos;t have an account? <Link href="/signup" className="text-amber-400 hover:underline">Sign up</Link>
            </p>
          </form>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}


