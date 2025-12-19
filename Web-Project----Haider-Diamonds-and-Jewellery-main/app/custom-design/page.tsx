"use client"

import { useState } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gem, Heart, Star, Diamond, Crown, Sparkles, Send, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function CustomDesignPage() {
  const [formData, setFormData] = useState({
    jewelryType: "",
    metalType: "",
    stoneType: "",
    budget: "",
    occasion: "",
    description: "",
    name: "",
    email: "",
    phone: "",
  })

  const [showPopup, setShowPopup] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Custom design request:", formData)
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 4000)
  }

  const jewelryTypes = [
    { value: "ring", label: "Ring", icon: Heart },
    { value: "necklace", label: "Necklace", icon: Gem },
    { value: "earrings", label: "Earrings", icon: Star },
    { value: "bracelet", label: "Bracelet", icon: Crown },
    { value: "pendant", label: "Pendant", icon: Diamond },
  ]

  const metalTypes = [
    { value: "gold", label: "Gold" },
    { value: "white-gold", label: "White Gold" },
    { value: "rose-gold", label: "Rose Gold" },
    { value: "platinum", label: "Platinum" },
    { value: "silver", label: "Silver" },
    { value: "palladium", label: "Palladium" },
  ]

  const stoneTypes = [
    { value: "diamond", label: "Diamond" },
    { value: "emerald", label: "Emerald" },
    { value: "ruby", label: "Ruby" },
    { value: "sapphire", label: "Sapphire" },
    { value: "pearl", label: "Pearl" },
    { value: "other", label: "Other" },
  ]

  const occasions = [
    { value: "engagement", label: "Engagement" },
    { value: "wedding", label: "Wedding" },
    { value: "anniversary", label: "Anniversary" },
    { value: "birthday", label: "Birthday" },
    { value: "graduation", label: "Graduation" },
    { value: "special", label: "Special Occasion" },
  ]

  return (
    <div className="bg-white min-h-screen text-slate-900 relative overflow-hidden">
      <SiteNavbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <span className="text-blue-700">Custom Design</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6"></div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 font-serif">
            Create Your Dream Jewellery
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Tell us about your vision and we'll bring it to life with our master craftsmanship and premium materials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section – Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Design Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Jewelry Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-blue-600 mb-2 block">Jewellery Type *</Label>
                      <Select
                        value={formData.jewelryType}
                        onValueChange={(value) => handleInputChange("jewelryType", value)}
                      >
                        <SelectTrigger className="bg-white border-blue-200 text-slate-900">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-blue-200">
                          {jewelryTypes.map((type) => {
                            const IconComponent = type.icon
                            return (
                              <SelectItem
                                key={type.value}
                                value={type.value}
                                className="text-slate-900 hover:bg-blue-50"
                              >
                                <div className="flex items-center gap-2">
                                  <IconComponent className="w-4 h-4 text-blue-600" />
                                  {type.label}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-blue-600 mb-2 block">Metal Type *</Label>
                      <Select
                        value={formData.metalType}
                        onValueChange={(value) => handleInputChange("metalType", value)}
                      >
                        <SelectTrigger className="bg-white border-blue-200 text-slate-900">
                          <SelectValue placeholder="Select metal" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-blue-200">
                          {metalTypes.map((metal) => (
                            <SelectItem
                              key={metal.value}
                              value={metal.value}
                              className="text-slate-900 hover:bg-blue-50"
                            >
                              {metal.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-blue-600 mb-2 block">Stone Type *</Label>
                      <Select
                        value={formData.stoneType}
                        onValueChange={(value) => handleInputChange("stoneType", value)}
                      >
                        <SelectTrigger className="bg-white border-blue-200 text-slate-900">
                          <SelectValue placeholder="Select stone" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-blue-200">
                          {stoneTypes.map((stone) => (
                            <SelectItem
                              key={stone.value}
                              value={stone.value}
                              className="text-slate-900 hover:bg-blue-50"
                            >
                              {stone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-blue-600 mb-2 block">Occasion</Label>
                      <Select
                        value={formData.occasion}
                        onValueChange={(value) => handleInputChange("occasion", value)}
                      >
                        <SelectTrigger className="bg-white border-blue-200 text-slate-900">
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-blue-200">
                          {occasions.map((occasion) => (
                            <SelectItem
                              key={occasion.value}
                              value={occasion.value}
                              className="text-slate-900 hover:bg-blue-50"
                            >
                              {occasion.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <Label className="text-blue-600 mb-2 block">Budget Range</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => handleInputChange("budget", value)}
                    >
                      <SelectTrigger className="bg-white border-blue-200 text-slate-900">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-blue-200">
                        <SelectItem value="under-1000" className="text-slate-900 hover:bg-blue-50">
                          Under PKR 100,000
                        </SelectItem>
                        <SelectItem value="1000-5000" className="text-slate-900 hover:bg-blue-50">
                          PKR 100,000 - 500,000
                        </SelectItem>
                        <SelectItem value="5000-10000" className="text-slate-900 hover:bg-blue-50">
                          PKR 500,000 - 1,000,000
                        </SelectItem>
                        <SelectItem value="over-10000" className="text-slate-900 hover:bg-blue-50">
                          Over PKR 1,000,000
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div>
                    <Label className="text-blue-600 mb-2 block">Design Description *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your vision, inspiration, or any specific details you have in mind..."
                      className="bg-white border-blue-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-blue-600 mb-2 block">Your Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Full name"
                        className="bg-white border-blue-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-blue-600 mb-2 block">Email *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className="bg-white border-blue-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-blue-600 mb-2 block">Phone *</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+92 300 1234567"
                        className="bg-white border-blue-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 py-3 text-lg font-semibold">
                    <Send className="w-5 h-5 mr-2" />
                    Submit Design Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <Card className="bg-white border border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-600">Design Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { step: 1, title: "Consultation", desc: "We discuss your vision and requirements" },
                  { step: 2, title: "Design", desc: "Our designers create detailed sketches" },
                  { step: 3, title: "Crafting", desc: "Master craftsmen bring your design to life" },
                  { step: 4, title: "Delivery", desc: "Your custom piece is delivered safely" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold text-sm">{s.step}</span>
                    </div>
                    <div>
                      <h4 className="text-blue-600 font-semibold">{s.title}</h4>
                      <p className="text-slate-600 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white border border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-600">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Diamond className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-700 text-sm">Certified authentic diamonds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-700 text-sm">Master craftsmanship</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-700 text-sm">Lifetime guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-700 text-sm">Ethical sourcing</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-600">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-700 text-sm">
                  Have questions? Our design team is here to help you create the perfect piece.
                </p>
                <div className="space-y-2">
                  <p className="text-blue-600 text-sm font-semibold">Phone: +92 300 1234567</p>
                  <p className="text-blue-600 text-sm font-semibold">Email: design@haiderdiamonds.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Elegant Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white border border-blue-200 shadow-xl rounded-2xl p-8 max-w-sm w-full text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-amber-50 to-blue-50 opacity-50 animate-shimmer" />
            <div className="relative z-10">
              <Diamond className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-bounce" />
              <h2 className="text-blue-700 font-serif text-2xl font-semibold mb-2">
                Thank You!
              </h2>
              <p className="text-slate-700 text-sm mb-4">
                We’ll contact you within 24 hours to discuss your custom design.
              </p>
              <Button
                onClick={() => setShowPopup(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
