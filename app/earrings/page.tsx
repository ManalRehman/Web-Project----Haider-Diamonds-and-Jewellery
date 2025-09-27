"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"

type Product = { slug: string; title: string; price: string; image: string }

const products: Product[] = [
  { slug: "classic-diamond-studs", title: "Classic Diamond Studs", price: "PKR 279,000", image: "/sparkling-diamond-stud-earrings-on-luxury-jewelry-.jpg" },
  { slug: "halo-stud-earrings", title: "Halo Stud Earrings", price: "PKR 349,000", image: "/placeholder.jpg" },
  { slug: "drop-earrings", title: "Drop Earrings", price: "PKR 419,000", image: "/placeholder.jpg" },
]

export default function EarringsPage() {
  const { addToCart } = useCart()
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      image: product.image,
      slug: product.slug,
      category: "earrings"
    })
    setAddedItems(prev => new Set([...prev, product.slug]))
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.slug)
        return newSet
      })
    }, 2000)
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">Earrings</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6 font-serif">Earrings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <Card key={item.slug} className="bg-zinc-900 border border-amber-500/20 transition-transform hover:-translate-y-2 hover:shadow-lg hover:shadow-amber-500/10">
              <CardHeader>
                <CardTitle className="text-amber-400 text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded">
                  <ProductImage src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-amber-300 font-medium">{item.price}</span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleAddToCart(item)}
                    className={`${addedItems.has(item.slug) ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'} text-black`}
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    {addedItems.has(item.slug) ? 'Added!' : 'Add to Cart'}
                  </Button>
                  <Link href={`/earrings/${item.slug}`}>
                    <Button size="sm" variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/20">View</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}



