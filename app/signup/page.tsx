"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteNavbar } from "@/components/site-navbar"

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

  return (
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
            <p className="text-sm text-amber-100/70 text-center">
              Already have an account? <Link href="/login" className="text-amber-400 hover:underline">Log in</Link>
            </p>
          </form>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}


