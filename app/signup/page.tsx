"use client"

<<<<<<< HEAD
import type React from "react"

=======
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
      const usersRaw = localStorage.getItem("users")
      const users: StoredUser[] = usersRaw ? JSON.parse(usersRaw) : []
      const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())
      if (exists) {
        setError("An account with this email already exists")
        return
      }

      const newUser: StoredUser = { name: name.trim(), email: email.trim(), password }
      const nextUsers = [...users, newUser]
      localStorage.setItem("users", JSON.stringify(nextUsers))
      localStorage.setItem("currentUser", JSON.stringify({ name: newUser.name, email: newUser.email }))
      router.push("/")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleSignup() {
<<<<<<< HEAD
    const mockGoogleUser = {
      name: "Google User",
      email: "user@gmail.com",
=======
    // Simulate Google signup - in a real app, you'd integrate with Google OAuth
    const mockGoogleUser = {
      name: "Google User",
      email: "user@gmail.com"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
    }
    localStorage.setItem("currentUser", JSON.stringify(mockGoogleUser))
    router.push("/")
  }

  function handleFacebookSignup() {
<<<<<<< HEAD
    const mockFacebookUser = {
      name: "Facebook User",
      email: "user@facebook.com",
=======
    // Simulate Facebook signup - in a real app, you'd integrate with Facebook OAuth
    const mockFacebookUser = {
      name: "Facebook User", 
      email: "user@facebook.com"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
    }
    localStorage.setItem("currentUser", JSON.stringify(mockFacebookUser))
    router.push("/")
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-zinc-950 text-white">
      <SiteNavbar />
      <div className="flex items-center justify-center px-4 pt-20">
        <Card className="w-full max-w-md bg-zinc-900 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-amber-500">Create Account</CardTitle>
          <CardDescription className="text-amber-100/70">Join Haider Diamonds</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm text-amber-100/80">Full Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="bg-zinc-800 border-amber-500/30 text-white placeholder-amber-100/50"
                required
              />
            </div>
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
                minLength={6}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-amber-100/80">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-zinc-800 border-amber-500/30 text-white placeholder-amber-100/50"
                required
                minLength={6}
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-amber-500 text-black hover:bg-amber-600" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
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
                onClick={handleGoogleSignup}
                variant="outline"
                className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/20 bg-transparent"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button
                type="button"
                onClick={handleFacebookSignup}
                variant="outline"
                className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/20 bg-transparent"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </div>

            <p className="text-sm text-amber-100/70 text-center">
              Already have an account? <Link href="/login" className="text-amber-400 hover:underline">Log in</Link>
            </p>
          </form>
        </CardContent>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
        </Card>
      </div>
    </div>
  )
}
<<<<<<< HEAD
=======


>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
