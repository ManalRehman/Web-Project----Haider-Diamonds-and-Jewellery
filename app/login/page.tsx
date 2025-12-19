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
import { getApiUrl } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { user, login } = useUser()

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(getApiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || "Invalid email or password")
        setLoading(false)
        return
      }

      // Save token for future authenticated requests
      if (data.token) {
        localStorage.setItem("authToken", data.token)
      }

      // Use the user context login function
      if (data.user) {
        login({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: "",
          address: "",
        })
      }

      router.push("/dashboard")
    } catch (err) {
      console.error("Login error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleLogin() {
    // Placeholder: real Google OAuth would go here
    setError("Google login is not yet implemented.")
  }

  function handleFacebookLogin() {
    // Placeholder: real Facebook OAuth would go here
    setError("Facebook login is not yet implemented.")
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
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Demo credential card removed; auth now uses real backend */}
        </div>
      </div>
    </div>
  )
}