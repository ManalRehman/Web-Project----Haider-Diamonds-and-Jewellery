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

      localStorage.setItem("currentUser", JSON.stringify({ name: found.name, email: found.email }))
      router.push("/")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleLogin() {
    const mockGoogleUser = {
      name: "Google User",
      email: "user@gmail.com",
    }
    localStorage.setItem("currentUser", JSON.stringify(mockGoogleUser))
    router.push("/")
  }

  function handleFacebookLogin() {
    const mockFacebookUser = {
      name: "Facebook User",
      email: "user@facebook.com",
    }
    localStorage.setItem("currentUser", JSON.stringify(mockFacebookUser))
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteNavbar />
      <div className="flex items-center justify-center px-4 pt-20">
        <Card className="w-full max-w-md bg-gray-50 border border-blue-300 shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-600 text-2xl font-semibold">Login</CardTitle>
            <CardDescription className="text-slate-600">Welcome back to Haider Diamonds</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm text-slate-700">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-white border-blue-300 text-slate-900 placeholder-slate-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-slate-700">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white border-blue-300 text-slate-900 placeholder-slate-500"
                  required
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-blue-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-2 text-slate-600">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-white"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  onClick={handleFacebookLogin}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-white"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>

              <p className="text-sm text-slate-600 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
