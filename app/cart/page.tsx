"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteNavbar } from "@/components/site-navbar"
import { useCart } from "@/lib/cart-context"
import { ProductImage } from "@/components/product-image"
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
      <div className="bg-zinc-950 min-h-screen text-white">
        <SiteNavbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-amber-500/50 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-amber-400 mb-4">Your Cart is Empty</h1>
            <p className="text-amber-100/70 mb-8">Add some beautiful jewelry to get started</p>
            <Link href="/rings">
              <Button className="bg-amber-500 text-black hover:bg-amber-600">
                Browse Rings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">Cart</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6 font-serif">
          Shopping Cart ({getTotalItems()} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="bg-zinc-900 border border-amber-500/20">
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
                      <h3 className="text-amber-400 font-semibold mb-2">{item.title}</h3>
                      <p className="text-amber-300 mb-2">{item.price}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-amber-100 w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/20"
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
            <Card className="bg-zinc-900 border border-amber-500/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-amber-400">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-amber-100">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-amber-100">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-amber-500/20 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-amber-400">
                    <span>Total</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-amber-500 text-black hover:bg-amber-600">
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                  >
                    Clear Cart
                  </Button>
                </div>
                <div className="text-center">
                  <Link href="/rings" className="text-amber-400 hover:text-amber-300 text-sm">
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
