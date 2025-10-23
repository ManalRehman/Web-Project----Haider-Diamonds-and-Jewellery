"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  ShoppingBag,
  Heart,
  Star,
  LogOut,
  Package,
  Sparkles,
  Crown,
  Gift,
  Headphones,
  ChevronRight,
  Award,
  Trash2,
  Zap,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/user-context"
import { useFavorites } from "@/lib/favorites-context"

interface ProfileStats {
  totalOrders: number
  totalSpent: number
  favoriteItems: number
  rewardsPoints: number
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", address: "" })
  const [stats, setStats] = useState<ProfileStats>({
    totalOrders: 0,
    totalSpent: 0,
    favoriteItems: 0,
    rewardsPoints: 0,
  })
  
  const router = useRouter()
  const { user, login, logout, isLoading } = useUser()
  const { favorites, removeFromFavorites, getFavoritesCount } = useFavorites()

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

    // Load stats from localStorage or set defaults
    const statsRaw = localStorage.getItem("profileStats")
    if (statsRaw) {
      setStats(JSON.parse(statsRaw))
    }
  }, [user, isLoading, router])

  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      favoriteItems: getFavoritesCount(),
    }))
  }, [favorites, getFavoritesCount])

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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold font-serif mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-blue-100 text-lg">Manage your account and preferences</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-2 border-white/40 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm w-full sm:w-auto transition-all hover:border-white/60 py-6 text-base"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2 font-medium">Total Orders</p>
                  <p className="text-4xl font-bold text-blue-600 mb-1">{stats.totalOrders}</p>
                  <p className="text-xs text-blue-500">Lifetime orders</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2 font-medium">Total Spent</p>
                  <p className="text-4xl font-bold text-blue-600 mb-1">PKR {stats.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-blue-500">Lifetime value</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-200 hover:shadow-xl hover:border-rose-300 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2 font-medium">Saved Items</p>
                  <p className="text-4xl font-bold text-rose-600 mb-1">{stats.favoriteItems}</p>
                  <p className="text-xs text-rose-500">Your wishlist</p>
                </div>
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-4 rounded-2xl shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 hover:shadow-xl hover:border-purple-300 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2 font-medium">Rewards Points</p>
                  <p className="text-4xl font-bold text-purple-600 mb-1">{stats.rewardsPoints}</p>
                  <p className="text-xs text-purple-500">Earn & redeem</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-700 flex items-center gap-3 text-xl">
                    <div className="bg-blue-600 text-white p-2 rounded-xl">
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
                    <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                      <p className="text-xs text-blue-700 uppercase tracking-wide mb-1.5 font-semibold">Full Name</p>
                      <p className="font-semibold text-slate-900 text-lg">{user.name}</p>
                    </div>
                    <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                      <p className="text-xs text-blue-700 uppercase tracking-wide mb-1.5 font-semibold">Email Address</p>
                      <p className="font-semibold text-slate-900 break-all">{user.email}</p>
                    </div>
                    {user.phone && (
                      <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                        <p className="text-xs text-blue-700 uppercase tracking-wide mb-1.5 font-semibold">Phone Number</p>
                        <p className="font-semibold text-slate-900">{user.phone}</p>
                      </div>
                    )}
                    {user.address && (
                      <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                        <p className="text-xs text-blue-700 uppercase tracking-wide mb-1.5 font-semibold">Delivery Address</p>
                        <p className="font-semibold text-slate-900">{user.address}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Saved Items */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white p-2 rounded-xl">
                    <Heart className="w-5 h-5" />
                  </div>
                  Your Saved Items
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No saved items yet</h3>
                    <p className="text-slate-600 mb-6">Save your favorite pieces while browsing</p>
                    <Link href="/collections">
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all px-8 py-6">
                        <Star className="w-5 h-5 mr-2" />
                        Start Browsing
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {favorites.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg shadow-sm border border-blue-100"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                            <p className="text-lg text-blue-600 font-bold">{item.price}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/${item.category}/${item.slug}`}>
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-6">
                              View
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-2 border-red-300 text-red-600 hover:bg-red-50 bg-white"
                            onClick={() => removeFromFavorites(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order History */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-3 text-xl">
                  <div className="bg-blue-600 text-white p-2 rounded-xl">
                    <Package className="w-5 h-5" />
                  </div>
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No orders yet</h3>
                  <p className="text-slate-600 mb-6">Start your jewelry journey today!</p>
                  <Link href="/rings">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all px-8 py-6">
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
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-3 text-xl">
                  <div className="bg-blue-600 text-white p-2 rounded-xl">
                    <Zap className="w-5 h-5" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <Link href="/cart">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6 text-base font-medium justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      View My Cart
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/rings">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6 text-base font-medium justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Browse Rings
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/necklaces">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6 text-base font-medium justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Browse Necklaces
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/custom-design">
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 justify-between py-6 text-base shadow-md hover:shadow-lg transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Custom Design
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <div className="bg-blue-600 text-white p-1.5 rounded-xl">
                    <Headphones className="w-4 h-4" />
                  </div>
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <p className="text-sm text-slate-600 mb-2">Our support team is here for you</p>
                <Button
                  variant="outline"
                  className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  View FAQs
                </Button>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-red-100">
                <CardTitle className="text-red-700 text-base flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </CardTitle>
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