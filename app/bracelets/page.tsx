"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { ProductImage } from "@/components/product-image"

type Product = { slug: string; title: string; price: string; image: string }

const products: Product[] = [
  { slug: "diamond-tennis-bracelet", title: "Diamond Tennis Bracelet", price: "PKR 599,000", image: "/placeholder.jpg" },
  { slug: "bangle-bracelet", title: "Bangle Bracelet", price: "PKR 549,000", image: "/placeholder.jpg" },
  { slug: "chain-link-bracelet", title: "Chain Link Bracelet", price: "PKR 299,000", image: "/placeholder.jpg" },
]

export default function BraceletsPage() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">Bracelets</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6 font-serif">Bracelets</h1>

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
                <Link href={`/bracelets/${item.slug}`}>
                  <Button size="sm" className="bg-amber-500 text-black hover:bg-amber-600">View details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
  //add a review section
  
}



