"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteNavbar } from "@/components/site-navbar"
import { Facebook, Chrome } from "lucide-react"
import { useUser } from "@/lib/user-context"

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
  const { user, login } = useUser()

  useEffect(() => {
    // Check if user is already logged in
    if (user) {
      router.push("/profile")
    }

    // Initialize demo users if they don't exist
    const usersRaw = localStorage.getItem("users")
    if (!usersRaw) {
      const exampleUsers: StoredUser[] = [
        { name: "Sarah Johnson", email: "sarah@example.com", password: "password123" },
        { name: "Ahmed Hassan", email: "ahmed@example.com", password: "password123" },
      ]
      localStorage.setItem("users", JSON.stringify(exampleUsers))
    }
  }, [user, router])

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
        setLoading(false)
        return
      }

      // Use the user context login function
      login({
        id: found.email, // Using email as ID for demo
        name: found.name,
        email: found.email,
        phone: "", // Initialize as empty string
        address: "" // Initialize as empty string
      })
      
      router.push("/profile")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleLogin() {
    const mockGoogleUser = {
      id: "google-user-123",
      name: "Google User",
      email: "user@gmail.com",
      phone: "",
      address: ""
    }
    login(mockGoogleUser)
    router.push("/profile")
  }

  function handleFacebookLogin() {
    const mockFacebookUser = {
      id: "facebook-user-123",
      name: "Facebook User",
      email: "user@facebook.com",
      phone: "",
      address: ""
    }
    login(mockFacebookUser)
    router.push("/profile")
  }

  // If user is already logged in, show loading
  if (user) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <SiteNavbar />
        <div className="flex items-center justify-center px-4 pt-20 pb-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">Redirecting to profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteNavbar />
      <div className="flex items-center justify-center px-4 pt-20 pb-20">
        <div className="w-full max-w-md space-y-6">
          <Card className="bg-gray-50 border border-blue-300 shadow-md">
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

          <Card className="bg-gray-100 border border-gray-300">
            <CardContent className="pt-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>
                  <span className="font-medium">Email:</span> <span className="text-blue-400">sarah@example.com</span>
                </p>
                <p>
                  <span className="font-medium">Password:</span> password123
                </p>
                <p className="text-gray-500 mt-1">or</p>
                <p>
                  <span className="font-medium">Email:</span> <span className="text-blue-400">ahmed@example.com</span>
                </p>
                <p>
                  <span className="font-medium">Password:</span> password123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}