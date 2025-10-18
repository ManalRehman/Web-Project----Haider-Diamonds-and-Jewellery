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
  const [currentUser, setCurrentUser] = useState<{
    name: string
    email: string
    phone?: string
    address?: string
  } | null>(null)
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
        address: user.address || "",
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
      address: currentUser?.address || "",
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!currentUser) {
    return (
      <div className="bg-white min-h-screen text-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SiteNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
          <span className="mx-2 text-blue-600/60">/</span>
          <span className="text-blue-700">Profile</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-8 font-serif">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-600 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                  {!isEditing && (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
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
                      <Label htmlFor="name" className="text-blue-600">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-blue-600">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-blue-600">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-blue-600">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-slate-900 font-medium">{currentUser.name}</p>
                        <p className="text-slate-600 text-sm">Full Name</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-slate-900 font-medium">{currentUser.email}</p>
                        <p className="text-slate-600 text-sm">Email Address</p>
                      </div>
                    </div>
                    {currentUser.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-slate-900 font-medium">{currentUser.phone}</p>
                          <p className="text-slate-600 text-sm">Phone Number</p>
                        </div>
                      </div>
                    )}
                    {currentUser.address && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-slate-900 font-medium">{currentUser.address}</p>
                          <p className="text-slate-600 text-sm">Address</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <p className="text-slate-600">No orders yet</p>
                  <p className="text-slate-500 text-sm">Start shopping to see your order history</p>
                  <Link href="/rings">
                    <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700">Browse Collections</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/cart">
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View Cart
                  </Button>
                </Link>
                <Link href="/rings">
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Browse Rings
                  </Button>
                </Link>
                <Link href="/necklaces">
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Browse Necklaces
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">Account Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
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
