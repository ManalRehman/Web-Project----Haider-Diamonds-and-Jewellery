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

      // Load dashboard stats from localStorage
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 font-serif mb-2">
                Welcome back, {currentUser.name}!
              </h1>
              <p className="text-gray-600">Manage your account and explore our collections</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent w-full sm:w-auto"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-amber-600">${stats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Saved Items</p>
                  <p className="text-3xl font-bold text-pink-600">{stats.favoriteItems}</p>
                </div>
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-white border border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Member Status</p>
                  <p className="text-3xl font-bold text-green-600">Gold</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-green-600" />
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
            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link href="/rings">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 justify-between">
                      <span>Browse Rings</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/necklaces">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 justify-between">
                      <span>Browse Necklaces</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/earrings">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 justify-between">
                      <span>Browse Earrings</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/bracelets">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 justify-between">
                      <span>Browse Bracelets</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/custom-design" className="sm:col-span-2">
                    <Button className="w-full bg-amber-600 text-white hover:bg-amber-700 justify-between">
                      <span>Start Custom Design</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Heart className="w-5 h-5" /> Your Saved Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">No saved items yet</p>
                    <p className="text-slate-500 text-sm mb-4">Save your favorite pieces while browsing</p>
                    <Link href="/collections">
                      <Button className="bg-blue-600 text-white hover:bg-blue-700">Start Browsing</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {favorites.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{item.title}</p>
                            <p className="text-sm text-amber-600 font-semibold">{item.price}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/${item.category}/${item.slug}`}>
                            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                              View
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
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
            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Package className="w-5 h-5" /> Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">No orders yet</p>
                  <p className="text-slate-500 text-sm mb-4">Start shopping to see your order history</p>
                  <Link href="/collections">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">Start Shopping</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Star className="w-5 h-5" /> Recommended For You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Diamond Engagement Rings", desc: "Timeless elegance for your special moment" },
                    { title: "Tennis Necklaces", desc: "Brilliant sparkle for every occasion" },
                    { title: "Stud Earrings", desc: "Classic beauty that never goes out of style" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white border border-blue-100 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <p className="font-medium text-slate-900">{item.title}</p>
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
            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Full Name</p>
                  <p className="font-medium text-slate-900">{currentUser.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Email Address</p>
                  <p className="font-medium text-slate-900 break-all">{currentUser.email}</p>
                </div>
                {currentUser.phone && (
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Phone</p>
                    <p className="font-medium text-slate-900">{currentUser.phone}</p>
                  </div>
                )}
                {currentUser.address && (
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Address</p>
                    <p className="font-medium text-slate-900">{currentUser.address}</p>
                  </div>
                )}
                <Link href="/profile" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Membership Benefits */}
            <Card className="bg-gradient-to-br from-blue-50 to-white border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Award className="w-5 h-5" /> Gold Member
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {[
                    "10% discount on all purchases",
                    "Free shipping on orders over $500",
                    "Priority customer support",
                    "Early access to new collections",
                    "Exclusive member-only events",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="bg-gray-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Clock className="w-5 h-5" /> Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600 mb-3">Contact our support team</p>
                <Button
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent text-sm"
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent text-sm"
                >
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
