"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingBag,
  Heart,
  Star,
  TrendingUp,
  Clock,
  Package,
  Zap,
  Settings,
  LogOut,
  ChevronRight,
  Award,
  Trash2,
  Sparkles,
  Crown,
  Gift,
  Headphones,
} from "lucide-react"
import Link from "next/link"
import { useFavorites } from "../../lib/favorites-context"

interface DashboardStats {
  totalOrders: number
  totalSpent: number
  favoriteItems: number
  recentActivity: string
}

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<{
    name: string
    email: string
    phone?: string
    address?: string
  } | null>(null)

  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalSpent: 0,
    favoriteItems: 0,
    recentActivity: "No recent activity",
  })

  const router = useRouter()
  const { favorites, removeFromFavorites, getFavoritesCount } = useFavorites()

  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser")
      const user = raw ? JSON.parse(raw) : null
      if (!user) {
        router.push("/login")
        return
      }
      setCurrentUser(user)

      const statsRaw = localStorage.getItem("dashboardStats")
      if (statsRaw) {
        setStats(JSON.parse(statsRaw))
      }
    } catch (error) {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      favoriteItems: getFavoritesCount(),
    }))
  }, [favorites, getFavoritesCount])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!currentUser) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen text-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
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
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold font-serif mb-2">
                  Welcome back, {currentUser.name}!
                </h1>
                <p className="text-blue-100 text-lg">Your jewellery journey continues here</p>
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
                  <TrendingUp className="w-8 h-8 text-white" />
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
                  <p className="text-4xl font-bold text-purple-600 mb-1">0</p>
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
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/rings">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 justify-between py-6 text-base shadow-md hover:shadow-lg transition-all">
                      <span>Browse Rings</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/necklaces">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 justify-between py-6 text-base shadow-md hover:shadow-lg transition-all">
                      <span>Browse Necklaces</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/earrings">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 justify-between py-6 text-base shadow-md hover:shadow-lg transition-all">
                      <span>Browse Earrings</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/bracelets">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 justify-between py-6 text-base shadow-md hover:shadow-lg transition-all">
                      <span>Browse Bracelets</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/custom-design" className="sm:col-span-2">
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 justify-between py-6 text-base shadow-md hover:shadow-lg transition-all">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Start Custom Design
                      </span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
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

            {/* Recent Orders */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-3 text-xl">
                  <div className="bg-blue-600 text-white p-2 rounded-xl">
                    <Package className="w-5 h-5" />
                  </div>
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No orders yet</h3>
                  <p className="text-slate-600 mb-6">Start shopping to see your order history</p>
                  <Link href="/collections">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all px-8 py-6">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-3 text-xl">
                  <div className="bg-gradient-to-br from-violet-500 to-violet-600 text-white p-2 rounded-xl">
                    <Star className="w-5 h-5" />
                  </div>
                  Recommended For You
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {[
                    { title: "Diamond Engagement Rings", desc: "Timeless elegance for your special moment" },
                    { title: "Tennis Necklaces", desc: "Brilliant sparkle for every occasion" },
                    { title: "Stud Earrings", desc: "Classic beauty that never goes out of style" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors mb-1">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Account Info */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <div className="bg-blue-600 text-white p-1.5 rounded-xl">
                    <Settings className="w-4 h-4" />
                  </div>
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-700 uppercase tracking-wide mb-1.5 font-semibold">Full Name</p>
                  <p className="font-semibold text-slate-900 text-base">{currentUser.name}</p>
                </div>
                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-700 uppercase tracking-wide mb-1.5 font-semibold">Email Address</p>
                  <p className="font-semibold text-slate-900 break-all text-sm">{currentUser.email}</p>
                </div>
                {currentUser.phone && (
                  <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-700 uppercase tracking-wide mb-1.5 font-semibold">Phone</p>
                    <p className="font-semibold text-slate-900">{currentUser.phone}</p>
                  </div>
                )}
                {currentUser.address && (
                  <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-700 uppercase tracking-wide mb-1.5 font-semibold">Address</p>
                    <p className="font-semibold text-slate-900 text-sm">{currentUser.address}</p>
                  </div>
                )}
                <Link href="/profile" className="block pt-2">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Edit Profile
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
          </div>
        </div>
      </div>
    </div>
  )
}