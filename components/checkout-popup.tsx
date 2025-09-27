"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { X, CreditCard, MapPin, User, Phone, Mail } from "lucide-react"
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
    specialInstructions: ""
  })

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the data to your backend
    console.log("Checkout data:", { formData, cart, total: getTotalPrice() })
    
    // Clear cart and close popup
    clearCart()
    setIsOpen(false)
    setIsProcessing(false)
    
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
      specialInstructions: ""
    })
  }

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.address && 
           formData.city && 
           formData.postalCode && 
           formData.country && 
           formData.paymentMethod
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-amber-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-400 font-serif flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            Checkout
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <Card className="bg-zinc-800 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-amber-300">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-amber-300">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-amber-300">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-amber-300">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="bg-zinc-800 border border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-amber-300">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-amber-300">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-amber-300">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
                <div>
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
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method */}
          <Card className="bg-zinc-800 border border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-400 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="paymentMethod" className="text-amber-300">Select Payment Method *</Label>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                  <SelectTrigger className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500">
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-amber-500/30">
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
          <Card className="bg-zinc-800 border border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-400">Special Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                placeholder="Any special delivery instructions or notes..."
                className="bg-zinc-700 border-amber-500/30 text-white focus:border-amber-500"
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="bg-zinc-800 border border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-400">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cart.map((item) => (
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
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isProcessing}
              className="bg-amber-500 text-black hover:bg-amber-600 disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : `Place Order - ${formatPrice(getTotalPrice())}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
