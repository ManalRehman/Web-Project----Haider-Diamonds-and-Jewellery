"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteNavbar } from "@/components/site-navbar"
import { useCart } from "@/lib/cart-context"
import { ProductImage } from "@/components/product-image"
import {CheckoutPopup}  from "@/components/checkout-popup"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0
      return total + (price * item.quantity)
    }, 0)
  }

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen text-gray-800">
        <SiteNavbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-8">Add some beautiful jewelry to get started</p>
            <Link href="/rings">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Browse Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <SiteNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-blue-600">Cart</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700 font-serif">
            Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
          </h1>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <ProductImage 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-800 font-semibold mb-2 truncate">{item.title}</h3>
                      <p className="text-blue-600 font-medium mb-2">{item.price}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            className="border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-gray-800 w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800 font-semibold">
                        {formatPrice((parseFloat(item.price.replace(/[^\d.]/g, '')) || 0) * item.quantity)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-200 shadow-sm sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>PKR 0</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-blue-700">
                    <span>Total</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <CheckoutPopup>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 text-base py-2.5">
                      Proceed to Checkout
                    </Button>
                  </CheckoutPopup>
                  <div className="text-center">
                    <Link href="/rings" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}