"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin, Edit, Save, X, ShoppingBag, Heart, Star } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone?: string; address?: string } | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", address: "" })
  const router = useRouter()

  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser")
      const user = raw ? JSON.parse(raw) : null
      if (!user) {
        router.push("/login")
        return
      }
      setCurrentUser(user)
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || ""
      })
    } catch (error) {
      router.push("/login")
    }
  }, [router])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    const updatedUser = { ...currentUser, ...editForm }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || ""
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!currentUser) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">Profile</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-8 font-serif">
          My Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-amber-400 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  {!isEditing && (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      size="sm"
                      className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-amber-300">Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="bg-zinc-800 border-amber-500/30 text-white focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-amber-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="bg-zinc-800 border-amber-500/30 text-white focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-amber-300">Phone</Label>
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="bg-zinc-800 border-amber-500/30 text-white focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-amber-300">Address</Label>
                      <Input
                        id="address"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="bg-zinc-800 border-amber-500/30 text-white focus:border-amber-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        className="bg-amber-500 text-black hover:bg-amber-600"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-amber-100 font-medium">{currentUser.name}</p>
                        <p className="text-amber-100/70 text-sm">Full Name</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-amber-100 font-medium">{currentUser.email}</p>
                        <p className="text-amber-100/70 text-sm">Email Address</p>
                      </div>
                    </div>
                    {currentUser.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="text-amber-100 font-medium">{currentUser.phone}</p>
                          <p className="text-amber-100/70 text-sm">Phone Number</p>
                        </div>
                      </div>
                    )}
                    {currentUser.address && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="text-amber-100 font-medium">{currentUser.address}</p>
                          <p className="text-amber-100/70 text-sm">Address</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-amber-500/50 mx-auto mb-4" />
                  <p className="text-amber-100/70">No orders yet</p>
                  <p className="text-amber-100/50 text-sm">Start shopping to see your order history</p>
                  <Link href="/rings">
                    <Button className="mt-4 bg-amber-500 text-black hover:bg-amber-600">
                      Browse Collections
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/cart">
                  <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/20">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View Cart
                  </Button>
                </Link>
                <Link href="/rings">
                  <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/20">
                    <Star className="w-4 h-4 mr-2" />
                    Browse Rings
                  </Button>
                </Link>
                <Link href="/necklaces">
                  <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/20">
                    <Star className="w-4 h-4 mr-2" />
                    Browse Necklaces
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Account Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20"
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
