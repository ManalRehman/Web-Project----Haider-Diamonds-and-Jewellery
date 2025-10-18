"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"

type Product = {
  slug: string
  title: string
  price: string
  images: string[]
}

const products: Product[] = [
<<<<<<< HEAD
  {
    slug: "classic-diamond-studs",
    title: "Classic Diamond Stud Earrings",
    price: "PKR 279,000",
    images: ["/sparkling-diamond-stud-earrings-on-luxury-jewelry-.jpg", "/placeholder.jpg"],
  },
=======
  { slug: "classic-diamond-studs", title: "Classic Diamond Stud Earrings", price: "PKR 279,000", images: ["/sparkling-diamond-stud-earrings-on-luxury-jewelry-.jpg", "/placeholder.jpg"] },
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
  { slug: "halo-stud-earrings", title: "Halo Stud Earrings", price: "PKR 349,000", images: ["/placeholder.jpg"] },
  { slug: "drop-earrings", title: "Drop Earrings", price: "PKR 419,000", images: ["/placeholder.jpg"] },
]

export default function EarringsDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug) ?? products[0]
  const images = product.images
  const related = products.filter((p) => p.slug !== product.slug)

  return (
<<<<<<< HEAD
    <div className="bg-white min-h-screen text-slate-900">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <Link href="/earrings" className="hover:text-blue-700">
            Earrings
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <span className="text-blue-500">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-50 rounded-lg border border-blue-200 p-4 relative">
=======
    <div className="bg-zinc-950 min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <Link href="/earrings" className="hover:text-amber-400">Earrings</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-lg border border-amber-500/20 p-4 relative">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            <div className="aspect-square overflow-hidden rounded-lg">
              <ProductImage src={images[0]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center p-2">
<<<<<<< HEAD
              <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600">
=======
              <button className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-200">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center p-2">
<<<<<<< HEAD
              <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600">
=======
              <button className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-200">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {images.map((src, i) => (
<<<<<<< HEAD
                <button
                  key={i}
                  className="aspect-square overflow-hidden rounded border border-blue-200 hover:border-blue-500"
                >
=======
                <button key={i} className="aspect-square overflow-hidden rounded border border-amber-500/20 hover:border-amber-500">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  <ProductImage src={src} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 font-serif">{product.title}</h1>
            <div className="flex items-center gap-2 text-amber-500 mb-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-xs text-slate-600">(212 reviews)</span>
            </div>
            <div className="text-2xl font-semibold text-amber-600 mb-4">{product.price}</div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Perfectly matched round brilliant diamonds set in secure four-prong studs, designed for everyday radiance
              and timeless appeal.
            </p>
            <ul className="list-disc pl-5 text-slate-700 mb-6 space-y-1">
              <li>
                <span className="text-blue-600">Stone color:</span> D–G
              </li>
              <li>
                <span className="text-blue-600">Stone type:</span> Natural diamond
              </li>
              <li>
                <span className="text-blue-600">In-store availability:</span> Available at Lahore flagship
              </li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
=======
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2 font-serif">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 text-amber-300 mb-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-xs text-amber-100/70">(212 reviews)</span>
            </div>
            <div className="text-2xl font-semibold text-amber-500 mb-4">{product.price}</div>
            <p className="text-amber-100/80 leading-relaxed mb-4">
              Perfectly matched round brilliant diamonds set in secure four-prong studs, designed for everyday radiance and timeless appeal.
            </p>
            <ul className="list-disc pl-5 text-amber-100/80 mb-6 space-y-1">
              <li><span className="text-amber-500">Stone color:</span> D–G</li>
              <li><span className="text-amber-500">Stone type:</span> Natural diamond</li>
              <li><span className="text-amber-500">In-store availability:</span> Available at Lahore flagship</li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <select className="bg-zinc-900 border border-amber-500/30 rounded p-3 text-sm focus:outline-none">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                <option>Metal: 18k White Gold</option>
                <option>18k Yellow Gold</option>
                <option>18k Rose Gold</option>
              </select>
<<<<<<< HEAD
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
=======
              <select className="bg-zinc-900 border border-amber-500/30 rounded p-3 text-sm focus:outline-none">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                <option>Total Carat: 0.50 ct</option>
                <option>1.00 ct</option>
                <option>1.50 ct</option>
              </select>
<<<<<<< HEAD
              <select className="bg-white border border-blue-300 rounded p-3 text-sm focus:outline-none text-slate-900">
=======
              <select className="bg-zinc-900 border border-amber-500/30 rounded p-3 text-sm focus:outline-none">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                <option>Back Type: Screw Back</option>
                <option>Push Back</option>
              </select>
            </div>

            <div className="flex gap-3">
<<<<<<< HEAD
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to Bag
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent">
=======
              <Button className="bg-amber-500 text-black hover:bg-amber-600">
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to Bag
              </Button>
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/20">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                <Heart className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
<<<<<<< HEAD
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4 font-serif">Related Earrings</h2>
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
                  <Link href={`/earrings/${item.slug}`}>
                    <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                      View
                    </Button>
=======
          <h2 className="text-xl sm:text-2xl font-bold text-amber-500 mb-4 font-serif">Related Earrings</h2>
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
                  <Link href={`/earrings/${item.slug}`}>
                    <Button size="sm" className="bg-amber-500 text-black hover:bg-amber-600">View</Button>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
=======


>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
