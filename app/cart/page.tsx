"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteNavbar } from "@/components/site-navbar"
import { useCart } from "@/lib/cart-context"
import { ProductImage } from "@/components/product-image"
import { CheckoutPopup } from "@/components/checkout-popup"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart()

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ''))
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

        <h1 className="text-3xl font-bold text-blue-700 mb-6 font-serif">
          Shopping Cart ({getTotalItems()} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <ProductImage 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-semibold mb-2">{item.title}</h3>
                      <p className="text-blue-600 mb-2">{item.price}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-gray-800 w-8 text-center">{item.quantity}</span>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-200 shadow-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-blue-700">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-blue-700">
                    <span>Total</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <CheckoutPopup>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      Proceed to Checkout
                    </Button>
                  </CheckoutPopup>
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Clear Cart
                  </Button>
                </div>
                <div className="text-center">
                  <Link href="/rings" className="text-blue-600 hover:text-blue-700 text-sm">
                    Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
