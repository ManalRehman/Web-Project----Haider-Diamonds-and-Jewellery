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
import { getApiUrl } from "@/lib/utils"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const existing = localStorage.getItem("user")
    if (existing) {
      router.push("/dashboard")
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(getApiUrl("/api/auth/signup"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || "Failed to create account")
        setLoading(false)
        return
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token)
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
          }),
        )
      }

      router.push("/login")
    } catch (err) {
      console.error("Signup error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleSignup() {
    setError("Google signup is not yet implemented.")
  }

  function handleFacebookSignup() {
    setError("Facebook signup is not yet implemented.")
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteNavbar />
      <div className="flex items-center justify-center px-4 pt-20">
        <Card className="w-full max-w-md bg-gray-50 border-blue-300">
          <CardHeader>
            <CardTitle className="text-blue-600">Create Account</CardTitle>
            <CardDescription className="text-slate-600">Join Haider Diamonds</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm text-slate-700">Full Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="bg-white border-blue-300 text-slate-900 placeholder-slate-500"
                  required
                />
              </div>
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
                  minLength={6}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-slate-700">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white border-blue-300 text-slate-900 placeholder-slate-500"
                  required
                  minLength={6}
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
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
                  onClick={handleGoogleSignup}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-white"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  onClick={handleFacebookSignup}
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-white"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>

              <p className="text-sm text-slate-600 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



