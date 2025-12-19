"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import { useEffect, useState } from "react"
import { getApiUrl } from "@/lib/utils"

type Product = {
  slug: string
  title: string
  price: string
  image: string
}

export default function NecklaceDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavorites()
  const [addedToCart, setAddedToCart] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // IMAGE SLIDER STATE
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(getApiUrl("/api/products?category=necklaces"))
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
            title: item.title || item.name || "Untitled Necklace",
            price: formattedPrice,
            image: item.image || "/necklace1.jpg",
          }
        })

        const current =
          mapped.find((p) => p.slug === params.slug) ||
          mapped.find((p) => p.slug.toLowerCase() === params.slug.toLowerCase()) ||
          mapped[0]

        if (!current) throw new Error("Product not found")

        const imgs = [current.image]
        setProduct(current)
        setImages(imgs)
        setRelated(mapped.filter((p) => p.slug !== current.slug))
        setIsSaved(isFavorited(current.slug))
      } catch (err: any) {
        console.error("Failed to load necklace:", err)
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

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      image: images[0], 

      slug: product.slug,
      category: "necklaces",
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleSaveItem = () => {
    if (!product) return
    if (isSaved) {
      removeFromFavorites(product.slug)
      setIsSaved(false)
    } else {
      addToFavorites({
        id: product.slug,
        title: product.title,
        price: product.price,
        image: images[0], // ✅ use the images state array instead
        slug: product.slug,
        category: "necklaces",
      })
      setIsSaved(true)
    }
  }

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading && <div className="py-12 text-center text-blue-600">Loading necklace…</div>}
        {!loading && error && <div className="py-12 text-center text-red-600">{error}</div>}
        {!loading && !error && !product && (
          <div className="py-12 text-center text-slate-600">Necklace not found.</div>
        )}

        {!loading && !error && product && (
          <>
        {/* Breadcrumb */}
        <div className="mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <Link href="/necklaces" className="hover:text-blue-700">
            Necklaces
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <span className="text-blue-500">{product.title}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image Gallery */}
          <div className="bg-slate-50 rounded-lg border border-blue-200 p-4 relative">
            {/* Main Image Container */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
              <ProductImage
                src={images[currentIndex]}
                alt={product.title}
                className="w-full h-full object-contain p-4"
                
              />
            </div>

            {/* Carousel Arrows */}
            {images.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-4 flex items-center">
                  <button
                    onClick={prevImage}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center">
                  <button
                    onClick={nextImage}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => selectImage(i)}
                    className={`aspect-square overflow-hidden rounded border bg-gray-100 flex items-center justify-center ${
                      currentIndex === i ? "border-blue-500 ring-2 ring-blue-200" : "border-blue-200"
                    } hover:border-blue-500 transition-all`}
                  >
                    <ProductImage 
                      src={src} 
                      alt={`${product.title} ${i + 1}`} 
                      className="w-full h-full object-contain p-1"
                     
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 font-serif">{product.title}</h1>
            <div className="flex items-center gap-2 text-amber-500 mb-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-xs text-slate-600">(98 reviews)</span>
            </div>
            <div className="text-2xl font-semibold text-amber-600 mb-4">{product.price}</div>

            <p className="text-slate-700 leading-relaxed mb-4">
              A stunning diamond necklace crafted with exceptional brilliance and timeless elegance — perfect for every
              occasion.
            </p>

            <ul className="list-disc pl-5 text-slate-700 mb-6 space-y-1">
              <li>
                <span className="text-blue-600">Stone type:</span> Natural diamond / Pearl / Sapphire
              </li>
              <li>
                <span className="text-blue-600">Metal:</span> 18k gold / Platinum
              </li>
              <li>
                <span className="text-blue-600">Availability:</span> Available at Lahore flagship store
              </li>
            </ul>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
                <option>Metal: 18k Yellow Gold</option>
                <option>18k White Gold</option>
                <option>18k Rose Gold</option>
                <option>Platinum</option>
              </select>
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
                <option>Length: 16 inch</option>
                <option>18 inch</option>
                <option>20 inch</option>
                <option>22 inch</option>
              </select>
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
                <option>Carat: 1.00 ct</option>
                <option>0.75 ct</option>
                <option>1.25 ct</option>
                <option>1.50 ct</option>
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
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4 font-serif">Related Necklaces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <Card key={item.slug} className="bg-slate-50 border border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-600 text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <ProductImage
  src={item.image}
  alt={item.title}
  className="w-full h-full object-cover"
/>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-amber-600 font-medium">{item.price}</span>
                  <Link href={`/necklaces/${item.slug}`}>
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