"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { getApiUrl } from "@/lib/utils"

type Product = { slug: string; title: string; price: string; image: string }

export default function NecklacesPage() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(getApiUrl("/api/products?category=necklaces"))
        if (!res.ok) {
          throw new Error(`Failed to load products (${res.status})`)
        }

        const data: any[] = await res.json()

        const mapped: Product[] = data.map((item) => {
          const priceNumber = typeof item.price === "number" ? item.price : Number(item.price ?? 0)
          const formattedPrice =
            Number.isFinite(priceNumber) && priceNumber > 0
              ? `PKR ${priceNumber.toLocaleString()}`
              : "PKR 0"

          return {
            slug: item.slug || String(item._id),
            title: item.title || item.name || "Untitled Necklace",
            price: formattedPrice,
            image: item.image || "/necklace1.jpg",
          }
        })

        setProducts(mapped)
      } catch (err: any) {
        console.error("Failed to fetch necklaces:", err)
        setError(err.message || "Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      image: product.image,
      slug: product.slug,
      category: "necklaces",
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
        <div className="mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
          <span className="mx-2 text-blue-600/60">/</span>
          <span className="text-blue-700">Necklaces</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 font-serif">Necklaces</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-blue-600">Loading necklaces…</div>
          ) : error ? (
            <div className="col-span-full py-12 text-center text-red-600">{error}</div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-600">No necklaces found.</div>
          ) : (
            products.map((item) => (
              <Card
                key={item.slug}
                className="bg-gray-50 border border-blue-200 transition-transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-200/50"
              >
                <CardHeader>
                  <CardTitle className="text-blue-600 text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <ProductImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
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
                    <Link href={`/necklaces/${item.slug}`}>
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}