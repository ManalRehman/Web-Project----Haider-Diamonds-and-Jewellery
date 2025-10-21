"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"
import { useCart } from "@/lib/cart-context"
import { useFavorites } from "@/lib/favorites-context"
import { useState } from "react"

type Product = {
  slug: string
  title: string
  price: string
  images: string[]
}

const products: Product[] = [
  {
    slug: "diamond-tennis-necklace",
    title: "Diamond Tennis Necklace",
    price: "PKR 599,000",
    images: ["/luxury-diamond-tennis-necklace-with-brilliant-cut.jpg", "/luxury-diamond-tennis-necklace-close.jpg"],
  },
  {
    slug: "solitaire-pendant-necklace",
    title: "Solitaire Pendant Necklace",
    price: "PKR 359,000",
    images: ["/elegant-diamond-necklace-with-pendant-on-luxury-je.jpg", "/solitaire-pendant-necklace-close.jpg"],
  },
  {
    slug: "pear-halo-necklace",
    title: "Pear Halo Necklace",
    price: "PKR 549,000",
    images: ["/placeholder.jpg", "/pear-halo-necklace-close.jpg"],
  },
  {
    slug: "emerald-diamond-necklace",
    title: "Emerald Diamond Necklace",
    price: "PKR 799,000",
    images: ["/emerald-diamond-necklace.jpg", "/emerald-diamond-necklace-close.jpg"],
  },
  {
    slug: "sapphire-drop-necklace",
    title: "Sapphire Drop Necklace",
    price: "PKR 429,000",
    images: ["/sapphire-drop-necklace.jpg", "/sapphire-drop-necklace-close.jpg"],
  },
  {
    slug: "classic-pearl-necklace",
    title: "Classic Pearl Necklace",
    price: "PKR 299,000",
    images: ["/classic-pearl-necklace.jpg", "/classic-pearl-necklace-close.jpg"],
  },
]

export default function NecklaceDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug) ?? products[0]
  const images = product.images
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorited } = useFavorites()
  const [addedToCart, setAddedToCart] = useState(false)
  const [isSaved, setIsSaved] = useState(isFavorited(product.slug))

  // IMAGE SLIDER STATE
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  const selectImage = (index: number) => setCurrentIndex(index)

  const related = products.filter((p) => p.slug !== product.slug)

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      category: "necklaces",
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleSaveItem = () => {
    if (isSaved) {
      removeFromFavorites(product.slug)
      setIsSaved(false)
    } else {
      addToFavorites({
        id: product.slug,
        title: product.title,
        price: product.price,
        image: product.images[0],
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
            <div className="aspect-square overflow-hidden rounded-lg">
              <ProductImage
                src={images[currentIndex]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Carousel Arrows */}
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
                  <ProductImage src={src} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
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
                  <div className="aspect-video overflow-hidden rounded">
                    <img
                      src={item.images[0] || "/placeholder.svg"}
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
      </div>
    </div>
  )
}
