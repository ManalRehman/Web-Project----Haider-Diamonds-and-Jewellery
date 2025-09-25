"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function RingsPage() {
  const images = [
    "/luxury-diamond-engagement-ring-with-solitaire-sett.jpg",
    "/placeholder.jpg",
  ]

  const related = [
    {
      title: "Solitaire Diamond Ring",
      price: "$3,499",
      image: "/luxury-diamond-engagement-ring-with-solitaire-sett.jpg",
    },
    { title: "Halo Diamond Ring", price: "$2,899", image: "/placeholder.jpg" },
    { title: "Vintage Cushion Ring", price: "$4,250", image: "/placeholder.jpg" },
  ]

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">Rings</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-lg border border-amber-500/20 p-4 relative">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src={images[0]} alt="Solitaire Ring" className="w-full h-full object-cover" />
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
                  <img src={src} alt={`Ring ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2 font-serif">
              Solitaire Diamond Engagement Ring
            </h1>
            <div className="flex items-center gap-2 text-amber-300 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-xs text-amber-100/70">(124 reviews)</span>
            </div>
            <div className="text-2xl font-semibold text-amber-500 mb-4">$3,499</div>
            <p className="text-amber-100/80 leading-relaxed mb-6">
              A timeless solitaire featuring a brilliant round-cut diamond set in a classic four-prong mount.
              Handcrafted in 18k gold for maximum brilliance and durability.
            </p>

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
              <Button className="bg-amber-500 text-black hover:bg-amber-600">
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to Bag
              </Button>
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/20">
                <Heart className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Diamond", value: "Round Brilliant, Excellent Cut" },
                { label: "Color", value: "D–F (Colorless)" },
                { label: "Clarity", value: "VVS1–VS2" },
                { label: "Certification", value: "GIA Certified" },
              ].map((spec) => (
                <div key={spec.label} className="bg-zinc-900 rounded-lg p-4 border border-amber-500/20">
                  <div className="text-amber-500 text-sm">{spec.label}</div>
                  <div className="text-amber-100/80 text-sm">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-500 mb-4 font-serif">Related Rings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <Card key={item.title} className="bg-zinc-900 border border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-amber-400 text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-amber-300 font-medium">{item.price}</span>
                  <Link href="/rings">
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



