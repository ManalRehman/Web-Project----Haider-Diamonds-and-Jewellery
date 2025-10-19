"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"

type Product = {
  slug: string
  title: string
  price: string
  image: string
}

const products: Product[] = [
  {
    slug: "solitaire-diamond-engagement-ring",
    title: "Solitaire Diamond Engagement Ring",
    price: "PKR 599,000",
    image: "/luxury-diamond-engagement-ring-with-solitaire-sett.jpg",
  },
  {
    slug: "halo-diamond-ring",
    title: "Halo Diamond Ring",
    price: "PKR 499,000",
    image: "/placeholder.jpg",
  },
  {
    slug: "vintage-cushion-ring",
    title: "Vintage Cushion Ring",
    price: "PKR 579,000",
    image: "/placeholder.jpg",
  },
]

export default function RingsPage() {
  const { addToCart } = useCart()
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      image: product.image,
      slug: product.slug,
      category: "rings",
    })
    setAddedItems((prev) => new Set([...prev, product.slug]))
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.slug)
        return newSet
      })
    }, 2000)
  }

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
          <span className="mx-2 text-blue-600/60">/</span>
          <span className="text-blue-700">Rings</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 font-serif">Rings</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <Card
              key={item.slug}
              className="bg-gray-50 border border-blue-200 transition-transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-200/50"
            >
              <CardHeader>
                <CardTitle className="text-blue-600 text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded">
                  <ProductImage src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-amber-600 font-medium">{item.price}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className={`${
                      addedItems.has(item.slug)
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    {addedItems.has(item.slug) ? "Added!" : "Add to Cart"}
                  </Button>
                  <Link href={`/rings/${item.slug}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      View
                    </Button>
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
