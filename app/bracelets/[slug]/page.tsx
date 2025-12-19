"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"
import { useFavorites } from "@/lib/favorites-context"
import { useCart } from "@/lib/cart-context"
import { useEffect, useState } from "react"
import { getApiUrl } from "@/lib/utils"

type Product = {
  slug: string
  title: string
  price: string
  image: string
}

export default function BraceletDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavorites()

  const [itemId, setItemId] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(getApiUrl("/api/products?category=bracelets"))
        if (!res.ok) throw new Error(`Failed to load product (${res.status})`)

        const data: any[] = await res.json()
        const mapped: Product[] = data.map((item) => {
          const priceNumber = typeof item.price === "number" ? item.price : Number(item.price ?? 0)
          const formattedPrice =
            Number.isFinite(priceNumber) && priceNumber > 0
              ? `PKR ${priceNumber.toLocaleString()}`
              : "PKR 0"

          return {
            slug: item.slug || String(item._id),
            title: item.title || item.name || "Untitled Bracelet",
            price: formattedPrice,
            image: item.image || "/bracelet1.jpg",
          }
        })

        const current =
          mapped.find((p) => p.slug === params.slug) ||
          mapped.find((p) => p.slug.toLowerCase() === params.slug.toLowerCase()) ||
          mapped[0]

        if (!current) throw new Error("Product not found")

        setProduct(current)
        setImages([current.image])
        setRelated(mapped.filter((p) => p.slug !== current.slug))

        const id = `bracelets-${current.slug}`
        setItemId(id)
        setIsSaved(isFavorited(id))
      } catch (err: any) {
        console.error("Failed to load bracelet:", err)
        setError(err.message || "Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug])

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  const selectImage = (index: number) => setCurrentIndex(index)

  const handleSaveItem = () => {
    if (!product || !itemId) return
    if (isSaved) {
      removeFromFavorites(itemId)
      setIsSaved(false)
    } else {
      addToFavorites({
        id: itemId,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: images[0],
        category: "bracelets",
      })
      setIsSaved(true)
    }
  }

  const handleAddToCart = () => {
    if (!product || !itemId) return
    addToCart({
      id: itemId,
      title: product.title,
      price: product.price,
      image: images[0],
      slug: product.slug,
      category: "bracelets",
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading && <div className="py-12 text-center text-blue-600">Loading bracelet…</div>}
        {!loading && error && <div className="py-12 text-center text-red-600">{error}</div>}
        {!loading && !error && !product && (
          <div className="py-12 text-center text-slate-600">Bracelet not found.</div>
        )}

        {!loading && !error && product && (
          <>
        {/* Breadcrumb */}
        <div className="mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <Link href="/bracelets" className="hover:text-blue-700">
            Bracelets
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <span className="text-blue-500">{product.title}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image Gallery */}
          <div className="bg-slate-50 rounded-lg border border-blue-200 p-4 relative">
            <div className="aspect-square overflow-hidden rounded-lg">
              <ProductImage
                src={images[currentIndex]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {images.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center p-2">
                  <button
                    onClick={prevImage}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center p-2">
                  <button
                    onClick={nextImage}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}

            {/* Thumbnail Images */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => selectImage(i)}
                  className={`aspect-square overflow-hidden rounded border ${
                    currentIndex === i ? "border-blue-500" : "border-blue-200"
                  } hover:border-blue-500`}
                >
                  <ProductImage
                    src={src}
                    alt={`${product.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 font-serif">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 text-amber-500 mb-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-xs text-slate-600">(67 reviews)</span>
            </div>
            <div className="text-2xl font-semibold text-amber-600 mb-4">{product.price}</div>

            <p className="text-slate-700 leading-relaxed mb-4">
              A sleek diamond bracelet crafted with precision for elegance and luxury — perfect for
              everyday wear or special occasions.
            </p>

            <ul className="list-disc pl-5 text-slate-700 mb-6 space-y-1">
              <li>
                <span className="text-blue-600">Stone color:</span> D–F (Colorless)
              </li>
              <li>
                <span className="text-blue-600">Stone type:</span> Natural diamond
              </li>
              <li>
                <span className="text-blue-600">In-store availability:</span> Available at Lahore
                flagship
              </li>
            </ul>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
                <option>Metal: 18k Yellow Gold</option>
                <option>18k White Gold</option>
                <option>18k Rose Gold</option>
              </select>
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
                <option>Length: 7 in</option>
                <option>6.5 in</option>
                <option>7.5 in</option>
              </select>
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
                <option>Total Carat: 3.00 ct</option>
                <option>5.00 ct</option>
                <option>7.00 ct</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className={`${
                  addedToCart ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {addedToCart ? "Added to Cart!" : "Add to Bag"}
              </Button>
              <Button
                onClick={handleSaveItem}
                variant="outline"
                className={`${
                  isSaved
                    ? "bg-pink-50 border-pink-300 text-pink-600"
                    : "border-blue-300 text-blue-600 hover:bg-blue-50"
                } bg-transparent`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-pink-600" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4 font-serif">
            Related Bracelets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <Card key={item.slug} className="bg-slate-50 border border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-600 text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded">
                    <ProductImage
  src={item.image}
  alt={item.title}
  className="w-full h-full object-cover"
/>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-amber-600 font-medium">{item.price}</span>
                  <Link href={`/bracelets/${item.slug}`}>
                    <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                      View
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  )
}
