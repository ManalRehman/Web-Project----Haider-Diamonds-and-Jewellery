"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
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
  Send,
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
  const [showFaqDialog, setShowFaqDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  
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

  const handleSendMessage = () => {
    // Validate form
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill in all fields")
      return
    }
    
    // Here you would typically send the message to your backend
    console.log("Message sent:", contactForm)
    
    // Show success message
    alert("Message sent successfully! We'll get back to you soon.")
    
    // Reset form and close dialog
    setContactForm({ name: "", email: "", message: "" })
    setShowContactDialog(false)
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
                  onClick={() => setShowContactDialog(true)}
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 bg-white hover:border-blue-500 transition-all py-6"
                  onClick={() => setShowFaqDialog(true)}
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

      {/* FAQ Dialog */}
      <Dialog open={showFaqDialog} onOpenChange={setShowFaqDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Gift className="w-6 h-6" />
              Frequently Asked Questions
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Find answers to common questions about our jewelry and services
            </DialogDescription>
          </DialogHeader>
          <Accordion type="single" collapsible className="w-full space-y-3 mt-4">
            <AccordionItem value="item-1" className="border-2 border-blue-100 rounded-lg px-4">
              <AccordionTrigger className="text-blue-700 font-semibold hover:text-blue-800">
                What materials are your jewelry pieces made from?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700">
                Our jewelry is crafted using premium materials including 18K and 22K gold, platinum, sterling silver, 
                and genuine diamonds. Each piece comes with an authenticity certificate verifying the quality and 
                purity of the materials used.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 border-blue-100 rounded-lg px-4">
              <AccordionTrigger className="text-blue-700 font-semibold hover:text-blue-800">
                Do you offer custom jewelry design services?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700">
                Yes! We specialize in custom jewelry design. Our expert designers work closely with you to bring 
                your vision to life. Visit our Custom Design page or contact our team to start creating your unique piece.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 border-blue-100 rounded-lg px-4">
              <AccordionTrigger className="text-blue-700 font-semibold hover:text-blue-800">
                What is your return and exchange policy?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700">
                We offer a 7-day return and exchange policy for all non-customized items. The jewelry must be in 
                its original condition with all certificates and packaging. Custom-designed pieces are non-returnable 
                unless there's a manufacturing defect.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 border-blue-100 rounded-lg px-4">
              <AccordionTrigger className="text-blue-700 font-semibold hover:text-blue-800">
                How do I determine my ring size?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700">
                We provide a complimentary ring sizing service. Visit any of our stores for professional measurement, 
                or order a ring sizer online. You can also download our ring size guide from the product pages.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-2 border-blue-100 rounded-lg px-4">
              <AccordionTrigger className="text-blue-700 font-semibold hover:text-blue-800">
                Do you provide jewelry certification?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700">
                Yes, every piece comes with a certificate of authenticity. Diamond jewelry includes GIA or IGI 
                certification, and gold jewelry comes with hallmark certification confirming the karat purity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-2 border-blue-100 rounded-lg px-4">
              <AccordionTrigger className="text-blue-700 font-semibold hover:text-blue-800">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700">
                We accept multiple payment methods including credit/debit cards, bank transfers, and cash on delivery. 
                We also offer installment plans for purchases above PKR 50,000 through select partner banks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-2 border-blue-100 rounded-lg px-4">
              <AccordionTrigger className="text-blue-700 font-semibold hover:text-blue-800">
                How long does delivery take?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700">
                Standard delivery within Lahore takes 1-2 business days. For other cities in Pakistan, delivery 
                takes 3-5 business days. Custom-designed pieces typically take 2-4 weeks depending on complexity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-2 border-blue-100 rounded-lg px-4">
              <AccordionTrigger className="text-blue-700 font-semibold hover:text-blue-800">
                Do you offer jewelry cleaning and maintenance?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700">
                Yes! We provide complimentary jewelry cleaning and inspection services. We recommend bringing your 
                jewelry for professional cleaning every 6 months to maintain its brilliance and check for any repairs needed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>

      {/* Contact Support Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Headphones className="w-6 h-6" />
              Contact Support
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Get in touch with our support team. We're here to help!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="font-semibold text-blue-700 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Contact Information
              </h3>
              <div className="space-y-3 text-slate-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-blue-600">Email</p>
                    <a href="mailto:info@haiderdiamonds.com" className="hover:text-blue-700 font-semibold">
                      info@haiderdiamonds.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-blue-600">Phone</p>
                    <a href="tel:+923001234567" className="hover:text-blue-700 font-semibold">
                      +92 300 1234567
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-blue-600">Address</p>
                    <p className="font-semibold">Park Lane Tower, B-5 Mall Of Lahore,</p>
                    <p className="font-semibold">172 Tufail Rd, Cantt, Lahore, 54000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-blue-700 flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send us a Message
              </h3>
              <div>
                <Label htmlFor="contact-name" className="text-blue-700 font-medium">Your Name</Label>
                <Input
                  id="contact-name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Enter your name"
                  className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contact-email" className="text-blue-700 font-medium">Your Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Enter your email"
                  className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contact-message" className="text-blue-700 font-medium">Your Message</Label>
                <Textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can we help you?"
                  rows={5}
                  className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mt-1 resize-none"
                />
              </div>
              <Button 
                onClick={handleSendMessage}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all py-6 text-base font-medium"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}