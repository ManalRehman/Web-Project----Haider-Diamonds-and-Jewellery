"use client"

import { useState } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gem, Heart, Star, Diamond, Crown, Sparkles, Send, ArrowLeft } from "lucide-react"
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
    phone: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Custom design request:", formData)
    // Here you would typically send the data to your backend
    alert("Thank you! We'll contact you within 24 hours to discuss your custom design.")
  }

  const jewelryTypes = [
    { value: "ring", label: "Ring", icon: Heart },
    { value: "necklace", label: "Necklace", icon: Gem },
    { value: "earrings", label: "Earrings", icon: Star },
    { value: "bracelet", label: "Bracelet", icon: Crown },
    { value: "pendant", label: "Pendant", icon: Diamond }
  ]

  const metalTypes = [
    { value: "gold", label: "Gold" },
    { value: "white-gold", label: "White Gold" },
    { value: "platinum", label: "Platinum" },
    { value: "silver", label: "Silver" }
  ]

  const stoneTypes = [
    { value: "diamond", label: "Diamond" },
    { value: "emerald", label: "Emerald" },
    { value: "ruby", label: "Ruby" },
    { value: "sapphire", label: "Sapphire" },
    { value: "pearl", label: "Pearl" },
    { value: "other", label: "Other" }
  ]

  const occasions = [
    { value: "engagement", label: "Engagement" },
    { value: "wedding", label: "Wedding" },
    { value: "anniversary", label: "Anniversary" },
    { value: "birthday", label: "Birthday" },
    { value: "graduation", label: "Graduation" },
    { value: "special", label: "Special Occasion" }
  ]

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">Custom Design</span>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="animate-spin-slow">
                <Gem className="w-16 h-16 text-amber-500/70" />
              </div>
              <div className="absolute inset-0 animate-ping">
                <Gem className="w-16 h-16 text-amber-500/20" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-4 font-serif">
            Create Your Dream Jewelry
          </h1>
          <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
            Tell us about your vision and we'll bring it to life with our master craftsmanship and premium materials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Design Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-amber-300 mb-2 block">Jewelry Type *</Label>
                      <Select value={formData.jewelryType} onValueChange={(value) => handleInputChange("jewelryType", value)}>
                        <SelectTrigger className="bg-zinc-800 border-amber-500/30 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-amber-500/30">
                          {jewelryTypes.map((type) => {
                            const IconComponent = type.icon
                            return (
                              <SelectItem key={type.value} value={type.value} className="text-white hover:bg-zinc-700">
                                <div className="flex items-center gap-2">
                                  <IconComponent className="w-4 h-4 text-amber-500" />
                                  {type.label}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-amber-300 mb-2 block">Metal Type *</Label>
                      <Select value={formData.metalType} onValueChange={(value) => handleInputChange("metalType", value)}>
                        <SelectTrigger className="bg-zinc-800 border-amber-500/30 text-white">
                          <SelectValue placeholder="Select metal" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-amber-500/30">
                          {metalTypes.map((metal) => (
                            <SelectItem key={metal.value} value={metal.value} className="text-white hover:bg-zinc-700">
                              {metal.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-amber-300 mb-2 block">Stone Type *</Label>
                      <Select value={formData.stoneType} onValueChange={(value) => handleInputChange("stoneType", value)}>
                        <SelectTrigger className="bg-zinc-800 border-amber-500/30 text-white">
                          <SelectValue placeholder="Select stone" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-amber-500/30">
                          {stoneTypes.map((stone) => (
                            <SelectItem key={stone.value} value={stone.value} className="text-white hover:bg-zinc-700">
                              {stone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-amber-300 mb-2 block">Occasion</Label>
                      <Select value={formData.occasion} onValueChange={(value) => handleInputChange("occasion", value)}>
                        <SelectTrigger className="bg-zinc-800 border-amber-500/30 text-white">
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-amber-500/30">
                          {occasions.map((occasion) => (
                            <SelectItem key={occasion.value} value={occasion.value} className="text-white hover:bg-zinc-700">
                              {occasion.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-amber-300 mb-2 block">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="bg-zinc-800 border-amber-500/30 text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-amber-500/30">
                        <SelectItem value="under-1000" className="text-white hover:bg-zinc-700">Under PKR 100,000</SelectItem>
                        <SelectItem value="1000-5000" className="text-white hover:bg-zinc-700">PKR 100,000 - 500,000</SelectItem>
                        <SelectItem value="5000-10000" className="text-white hover:bg-zinc-700">PKR 500,000 - 1,000,000</SelectItem>
                        <SelectItem value="over-10000" className="text-white hover:bg-zinc-700">Over PKR 1,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-amber-300 mb-2 block">Design Description *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your vision, inspiration, or any specific details you have in mind..."
                      className="bg-zinc-800 border-amber-500/30 text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-amber-300 mb-2 block">Your Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Full name"
                        className="bg-zinc-800 border-amber-500/30 text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-amber-300 mb-2 block">Email *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className="bg-zinc-800 border-amber-500/30 text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-amber-300 mb-2 block">Phone *</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+92 300 1234567"
                        className="bg-zinc-800 border-amber-500/30 text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black hover:from-amber-600 hover:to-amber-500 py-3 text-lg font-semibold"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Design Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Design Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-500 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-amber-300 font-semibold">Consultation</h4>
                    <p className="text-amber-100/70 text-sm">We discuss your vision and requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-500 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-amber-300 font-semibold">Design</h4>
                    <p className="text-amber-100/70 text-sm">Our designers create detailed sketches</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-500 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-amber-300 font-semibold">Crafting</h4>
                    <p className="text-amber-100/70 text-sm">Master craftsmen bring your design to life</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-500 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="text-amber-300 font-semibold">Delivery</h4>
                    <p className="text-amber-100/70 text-sm">Your custom piece is delivered safely</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Diamond className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-100/80 text-sm">Certified authentic diamonds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-100/80 text-sm">Master craftsmanship</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-100/80 text-sm">Lifetime guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-100/80 text-sm">Ethical sourcing</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-amber-100/80 text-sm">
                  Have questions? Our design team is here to help you create the perfect piece.
                </p>
                <div className="space-y-2">
                  <p className="text-amber-300 text-sm font-semibold">Phone: +92 300 1234567</p>
                  <p className="text-amber-300 text-sm font-semibold">Email: design@haiderdiamonds.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
