"use client"

<<<<<<< HEAD
import type React from "react"

=======
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
<<<<<<< HEAD
import { CreditCard, MapPin, User } from "lucide-react"
=======
import { X, CreditCard, MapPin, User, Phone, Mail } from "lucide-react"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
import { useCart } from "@/lib/cart-context"

interface CheckoutPopupProps {
  children: React.ReactNode
}

export function CheckoutPopup({ children }: CheckoutPopupProps) {
  const { cart, getTotalItems, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "",
<<<<<<< HEAD
    specialInstructions: "",
=======
    specialInstructions: ""
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
  })

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
<<<<<<< HEAD
      const price = Number.parseFloat(item.price.replace(/[^\d]/g, ""))
      return total + price * item.quantity
=======
      const price = parseFloat(item.price.replace(/[^\d]/g, ''))
      return total + (price * item.quantity)
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
    }, 0)
  }

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`
  }

  const handleInputChange = (field: string, value: string) => {
<<<<<<< HEAD
    setFormData((prev) => ({
      ...prev,
      [field]: value,
=======
    setFormData(prev => ({
      ...prev,
      [field]: value
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
<<<<<<< HEAD

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would typically send the data to your backend
    console.log("Checkout data:", { formData, cart, total: getTotalPrice() })

=======
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the data to your backend
    console.log("Checkout data:", { formData, cart, total: getTotalPrice() })
    
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
    // Clear cart and close popup
    clearCart()
    setIsOpen(false)
    setIsProcessing(false)
<<<<<<< HEAD

=======
    
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "",
<<<<<<< HEAD
      specialInstructions: "",
=======
      specialInstructions: ""
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
    })
  }

  const isFormValid = () => {
<<<<<<< HEAD
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.postalCode &&
      formData.country &&
      formData.paymentMethod
    )
=======
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.address && 
           formData.city && 
           formData.postalCode && 
           formData.country && 
           formData.paymentMethod
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
<<<<<<< HEAD
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-blue-200 text-slate-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600 font-serif flex items-center gap-2">
=======
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-amber-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-400 font-serif flex items-center gap-2">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            <CreditCard className="w-6 h-6" />
            Checkout
          </DialogTitle>
        </DialogHeader>
<<<<<<< HEAD

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <Card className="bg-slate-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
=======
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <Card className="bg-zinc-800 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
<<<<<<< HEAD
                    <Label htmlFor="firstName" className="text-blue-700">
                      First Name *
                    </Label>
=======
                    <Label htmlFor="firstName" className="text-amber-300">First Name *</Label>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
<<<<<<< HEAD
                      className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
=======
                      className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                      required
                    />
                  </div>
                  <div>
<<<<<<< HEAD
                    <Label htmlFor="lastName" className="text-blue-700">
                      Last Name *
                    </Label>
=======
                    <Label htmlFor="lastName" className="text-amber-300">Last Name *</Label>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
<<<<<<< HEAD
                      className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
=======
                      className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                      required
                    />
                  </div>
                </div>
                <div>
<<<<<<< HEAD
                  <Label htmlFor="email" className="text-blue-700">
                    Email *
                  </Label>
=======
                  <Label htmlFor="email" className="text-amber-300">Email *</Label>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
<<<<<<< HEAD
                    className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
=======
                    className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    required
                  />
                </div>
                <div>
<<<<<<< HEAD
                  <Label htmlFor="phone" className="text-blue-700">
                    Phone Number *
                  </Label>
=======
                  <Label htmlFor="phone" className="text-amber-300">Phone Number *</Label>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
<<<<<<< HEAD
                    className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
=======
                    className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
<<<<<<< HEAD
            <Card className="bg-slate-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
=======
            <Card className="bg-zinc-800 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
<<<<<<< HEAD
                  <Label htmlFor="address" className="text-blue-700">
                    Address *
                  </Label>
=======
                  <Label htmlFor="address" className="text-amber-300">Address *</Label>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
<<<<<<< HEAD
                    className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
=======
                    className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
<<<<<<< HEAD
                    <Label htmlFor="city" className="text-blue-700">
                      City *
                    </Label>
=======
                    <Label htmlFor="city" className="text-amber-300">City *</Label>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
<<<<<<< HEAD
                      className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
=======
                      className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                      required
                    />
                  </div>
                  <div>
<<<<<<< HEAD
                    <Label htmlFor="postalCode" className="text-blue-700">
                      Postal Code *
                    </Label>
=======
                    <Label htmlFor="postalCode" className="text-amber-300">Postal Code *</Label>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
<<<<<<< HEAD
                      className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
=======
                      className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                      required
                    />
                  </div>
                </div>
                <div>
<<<<<<< HEAD
                  <Label htmlFor="country" className="text-blue-700">
                    Country *
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="bg-white border-blue-300 text-slate-900 focus:border-blue-500">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-blue-200">
                      <SelectItem value="pakistan">Pakistan</SelectItem>
=======
                  <Label htmlFor="country" className="text-amber-300">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-amber-500/30">
                      <SelectItem value="pakistan">Pakistan</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method */}
<<<<<<< HEAD
          <Card className="bg-slate-50 border border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600 flex items-center gap-2">
=======
          <Card className="bg-zinc-800 border border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-400 flex items-center gap-2">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                <CreditCard className="w-5 h-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
<<<<<<< HEAD
                <Label htmlFor="paymentMethod" className="text-blue-700">
                  Select Payment Method *
                </Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger className="bg-white border-blue-300 text-slate-900 focus:border-blue-500">
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-blue-200">
=======
                <Label htmlFor="paymentMethod" className="text-amber-300">Select Payment Method *</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                  <SelectTrigger className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500">
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-amber-500/30">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="jazzcash">JazzCash</SelectItem>
                    <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
<<<<<<< HEAD
          <Card className="bg-slate-50 border border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600">Special Instructions</CardTitle>
=======
          <Card className="bg-zinc-800 border border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-400">Special Instructions</CardTitle>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                placeholder="Any special delivery instructions or notes..."
<<<<<<< HEAD
                className="bg-white border-blue-300 text-slate-900 focus:border-blue-500"
=======
                className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Order Summary */}
<<<<<<< HEAD
          <Card className="bg-slate-50 border border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600">Order Summary</CardTitle>
=======
          <Card className="bg-zinc-800 border border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-400">Order Summary</CardTitle>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cart.map((item) => (
<<<<<<< HEAD
                  <div key={item.id} className="flex justify-between text-slate-700">
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                    <span className="text-amber-600 font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-blue-200 pt-4">
                <div className="flex justify-between text-lg font-semibold text-blue-600">
                  <span>Total ({getTotalItems()} items)</span>
                  <span className="text-amber-600">{formatPrice(getTotalPrice())}</span>
=======
                  <div key={item.id} className="flex justify-between text-amber-100">
                    <span>{item.title} x {item.quantity}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-amber-500/20 pt-4">
                <div className="flex justify-between text-lg font-semibold text-amber-400">
                  <span>Total ({getTotalItems()} items)</span>
                  <span>{formatPrice(getTotalPrice())}</span>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
<<<<<<< HEAD
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
=======
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isProcessing}
<<<<<<< HEAD
              className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
=======
              className="bg-amber-500 text-black hover:bg-amber-600 disabled:opacity-50"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            >
              {isProcessing ? "Processing..." : `Place Order - ${formatPrice(getTotalPrice())}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


