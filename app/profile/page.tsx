"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin, Edit, Save, X, ShoppingBag, Heart, Star, LogOut, Package, Sparkles } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/user-context"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", address: "" })
  const router = useRouter()
  const { user, login, logout, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      })
    }
  }, [user, isLoading, router])

  const handleEdit = () => setIsEditing(true)

  const handleSave = () => {
    if (user) {
      const updatedUser = { 
        ...user, 
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address
      }
      login(updatedUser)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      })
    }
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen text-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen text-slate-900">
      <SiteNavbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 mb-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-4 text-blue-100 text-sm flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-blue-200">/</span>
            <span className="text-white font-medium">Profile</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif mb-2 flex items-center gap-3">
                Welcome back, {user.name}!
                <Sparkles className="w-6 h-6 animate-pulse" />
              </h1>
              <p className="text-blue-100">Manage your account and view your orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-700 flex items-center gap-2 text-xl">
                    <div className="bg-blue-600 text-white p-2 rounded-lg">
                      <User className="w-5 h-5" />
                    </div>
                    Personal Information
                  </CardTitle>
                  {!isEditing && (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      size="sm"
                      className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all"
                    >
                      <Edit className="w-4 h-4 mr-1" /> Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {isEditing ? (
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-blue-700 font-medium">Full Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="bg-white border-2 border-blue-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-blue-700 font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="bg-white border-2 border-blue-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-blue-700 font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="bg-white border-2 border-blue-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mt-1"
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-blue-700 font-medium">Delivery Address</Label>
                      <Input
                        id="address"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="bg-white border-2 border-blue-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mt-1"
                        placeholder="House #, Street, City"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button 
                        onClick={handleSave} 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
                      >
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white transition-all"
                      >
                        <X className="w-4 h-4 mr-2" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="bg-blue-600 text-white p-2 rounded-lg">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900 font-semibold text-lg">{user.name}</p>
                        <p className="text-slate-600 text-sm">Full Name</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="bg-blue-600 text-white p-2 rounded-lg">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900 font-semibold">{user.email}</p>
                        <p className="text-slate-600 text-sm">Email Address</p>
                      </div>
                    </div>
                    {user.phone && (
                      <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-900 font-semibold">{user.phone}</p>
                          <p className="text-slate-600 text-sm">Phone Number</p>
                        </div>
                      </div>
                    )}
                    {user.address && (
                      <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-900 font-semibold">{user.address}</p>
                          <p className="text-slate-600 text-sm">Delivery Address</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order History */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-2 text-xl">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <Package className="w-5 h-5" />
                  </div>
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No Orders Yet</h3>
                  <p className="text-slate-600 mb-6">Start your jewelry journey today!</p>
                  <Link href="/rings">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all px-6 py-6 text-base">
                      <Star className="w-5 h-5 mr-2" />
                      Explore Collections
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <Link href="/cart">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6 text-base font-medium"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" /> View My Cart
                  </Button>
                </Link>
                <Link href="/rings">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6 text-base font-medium"
                  >
                    <Star className="w-5 h-5 mr-2" /> Browse Rings
                  </Button>
                </Link>
                <Link href="/necklaces">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6 text-base font-medium"
                  >
                    <Heart className="w-5 h-5 mr-2" /> Browse Necklaces
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 border-2 border-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="text-center text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-4">
                    <p className="text-4xl font-bold mb-2">0</p>
                    <p className="text-blue-100 text-sm">Total Orders</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                    <p className="text-4xl font-bold mb-2">PKR 0</p>
                    <p className="text-blue-100 text-sm">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-red-100">
                <CardTitle className="text-red-700 text-base">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 bg-white hover:border-red-500 transition-all py-6 text-base font-medium"
                >
                  <LogOut className="w-5 h-5 mr-2" /> Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}