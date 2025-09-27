"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

type Product = {
  slug: string
  title: string
  price: string
  images: string[]
}

const products: Product[] = [
  {
    slug: "solitaire-diamond-engagement-ring",
    title: "Solitaire Diamond Engagement Ring",
    price: "PKR 599,000",
    images: [
      "/luxury-diamond-engagement-ring-with-solitaire-sett.jpg",
      "/placeholder.jpg",
    ],
  },
  { slug: "halo-diamond-ring", title: "Halo Diamond Ring", price: "PKR 499,000", images: ["/placeholder.jpg"] },
  { slug: "vintage-cushion-ring", title: "Vintage Cushion Ring", price: "PKR 579,000", images: ["/placeholder.jpg"] },
]

export default function RingDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug) ?? products[0]
  const images = product.images
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)

  const related = products.filter((p) => p.slug !== product.slug)

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      category: "rings"
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <Link href="/rings" className="hover:text-amber-400">Rings</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-lg border border-amber-500/20 p-4 relative">
            <div className="aspect-square overflow-hidden rounded-lg">
              <ProductImage src={images[0]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center p-2">
              <button className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-200">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center p-2">
              <button className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-200">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {images.map((src, i) => (
                <button key={i} className="aspect-square overflow-hidden rounded border border-amber-500/20 hover:border-amber-500">
                  <ProductImage src={src} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2 font-serif">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 text-amber-300 mb-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-xs text-amber-100/70">(124 reviews)</span>
            </div>
            <div className="text-2xl font-semibold text-amber-500 mb-4">{product.price}</div>
            <p className="text-amber-100/80 leading-relaxed mb-4">
              A timeless solitaire showcasing a brilliant round-cut diamond in a refined, secure setting for maximum brilliance.
            </p>
            <ul className="list-disc pl-5 text-amber-100/80 mb-6 space-y-1">
              <li><span className="text-amber-500">Stone color:</span> D–F (Colorless)</li>
              <li><span className="text-amber-500">Stone type:</span> Natural diamond</li>
              <li><span className="text-amber-500">In-store availability:</span> Available at Lahore flagship</li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <select className="bg-zinc-900 border border-amber-500/30 rounded p-3 text-sm focus:outline-none">
                <option>Metal: 18k Yellow Gold</option>
                <option>18k White Gold</option>
                <option>18k Rose Gold</option>
                <option>Platinum</option>
              </select>
              <select className="bg-zinc-900 border border-amber-500/30 rounded p-3 text-sm focus:outline-none">
                <option>Size: 6</option>
                <option>5</option>
                <option>7</option>
                <option>8</option>
              </select>
              <select className="bg-zinc-900 border border-amber-500/30 rounded p-3 text-sm focus:outline-none">
                <option>Carat: 1.00 ct</option>
                <option>0.75 ct</option>
                <option>1.25 ct</option>
                <option>1.50 ct</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart}
                className={`${addedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'} text-black`}
              >
                <ShoppingBag className="w-4 h-4 mr-2" /> 
                {addedToCart ? 'Added to Cart!' : 'Add to Bag'}
              </Button>
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/20">
                <Heart className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-500 mb-4 font-serif">Related Rings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <Card key={item.slug} className="bg-zinc-900 border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-amber-400 text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-amber-300 font-medium">{item.price}</span>
                  <Link href={`/rings/${item.slug}`}>
                    <Button size="sm" className="bg-amber-500 text-black hover:bg-amber-600">View</Button>
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


