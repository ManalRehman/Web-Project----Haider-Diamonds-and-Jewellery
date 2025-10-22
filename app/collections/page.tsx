"use client"

import type React from "react"
import { useState } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductImage } from "@/components/product-image"
import { Star, ArrowLeft, Filter, Search, Grid, List, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

// Import all products from category pages
const ringsProducts = [
  {
    slug: "Leafy-Lux-Ring",
    title: "Leafy Lux Ring",
    price: "PKR 599,000",
    image: "/ring1.jpg",
    category: "rings",
  },
  {
    slug: "Floral-Embrace-Ring",
    title: "Floral Embrace Ring",
    price: "PKR 499,000",
    image: "/ring2.jpg",
    category: "rings",
  },
  {
    slug: "The-Rose-Knot-Ring",
    title: "The Rose Knot Ring",
    price: "PKR 579,000",
    image: "/ring3.jpg",
    category: "rings",
  },
  {
    slug: "The-Modern-Sparkle-Ring",
    title: "The Modern Sparkle Ring",
    price: "PKR 579,000",
    image: "/ring4.jpg",
    category: "rings",
  },
  {
    slug: "The-Petal-Heart-Ring",
    title: "The Petal Heart Ring",
    price: "PKR 649,000",
    image: "/ring5.jpg",
    category: "rings",
  },
  {
    slug: "The-Timeless-Row-Ring",
    title: "The Timeless Row Ring",
    price: "PKR 699,000",
    image: "/ring6.jpg",
    category: "rings",
  },
]

const necklacesProducts = [
  {
    slug: "diamond-tennis-necklace",
    title: "Diamond Tennis Necklace",
    price: "PKR 599,000",
    image: "/necklace1.jpg",
    category: "necklaces",
  },
  {
    slug: "solitaire-pendant-necklace",
    title: "Solitaire Pendant Necklace",
    price: "PKR 359,000",
    image: "/necklace2.jpg",
    category: "necklaces",
  },
  {
    slug: "pear-halo-necklace",
    title: "Pear Halo Necklace",
    price: "PKR 549,000",
    image: "/necklace3.jpg",
    category: "necklaces",
  },
  {
    slug: "emerald-diamond-necklace",
    title: "Emerald Diamond Necklace",
    price: "PKR 799,000",
    image: "/necklace4.jpg",
    category: "necklaces",
  },
  {
    slug: "sapphire-drop-necklace",
    title: "Sapphire Drop Necklace",
    price: "PKR 429,000",
    image: "/necklace5.jpg",
    category: "necklaces",
  },
  {
    slug: "classic-pearl-necklace",
    title: "Classic Pearl Necklace",
    price: "PKR 299,000",
    image: "/necklace6.6.jpg",
    category: "necklaces",
  },
]

const earringsProducts = [
  {
    slug: "classic-diamond-studs",
    title: "Classic Diamond Studs",
    price: "PKR 279,000",
    image: "/sparkling-diamond-stud-earrings-on-luxury-jewelry-.jpg",
    category: "earrings",
  },
  {
    slug: "The-Dazzling-Drop-Earrings",
    title: "The Dazzling Drop Earrings",
    price: "PKR 349,000",
    image: "/earring1.jpeg",
    category: "earrings",
  },
  {
    slug: "Emerald-Isle-Hoops",
    title: "Emerald Isle Hoops",
    price: "PKR 419,000",
    image: "/earring2.jpeg",
    category: "earrings",
  },
  {
    slug: "pearl-drop-earrings",
    title: "Pearl Drop Earrings",
    price: "PKR 389,000",
    image: "/earring3.jpeg",
    category: "earrings",
  },
  {
    slug: "Ruby-Blush-Mini-Hoops",
    title: "Ruby Blush Mini Hoops",
    price: "PKR 299,000",
    image: "earring4.2.jpeg",
    category: "earrings",
  },
  {
    slug: "Whisper-Leaf-Hoops",
    title: "Whisper Leaf Hoops",
    price: "PKR 459,000",
    image: "/earring5.jpeg",
    category: "earrings",
  },
]

const braceletsProducts = [
  {
    slug: "diamond-tennis-bracelet",
    title: "Diamond Tennis Bracelet",
    price: "PKR 599,000",
    image: "/bracelet1.jpg",
    category: "bracelets",
  },
  {
    slug: "bangle-bracelet",
    title: "Bangle Bracelet",
    price: "PKR 549,000",
    image: "/bracelet2.jpg",
    category: "bracelets",
  },
  {
    slug: "chain-link-bracelet",
    title: "Chain Link Bracelet",
    price: "PKR 299,000",
    image: "/bracelet3.jpg",
    category: "bracelets",
  },
  {
    slug: "cuff-bracelet",
    title: "Cuff Bracelet",
    price: "PKR 399,000",
    image: "/bracelet4.jpg",
    category: "bracelets",
  },
  {
    slug: "charm-bracelet",
    title: "Charm Bracelet",
    price: "PKR 279,000",
    image: "/bracelet5.jpg",
    category: "bracelets",
  },
  {
    slug: "pearl-bracelet",
    title: "Pearl Bracelet",
    price: "PKR 329,000",
    image: "/bracelet6.jpg",
    category: "bracelets",
  },
]

// Combine all products
const allCollections = [
  ...ringsProducts,
  ...necklacesProducts,
  ...earringsProducts,
  ...braceletsProducts,
]

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { addToCart } = useCart()
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const categories = [
    { id: "all", name: "All Collections", count: allCollections.length },
    { id: "rings", name: "Rings", count: ringsProducts.length },
    { id: "necklaces", name: "Necklaces", count: necklacesProducts.length },
    { id: "earrings", name: "Earrings", count: earringsProducts.length },
    { id: "bracelets", name: "Bracelets", count: braceletsProducts.length },
  ]

  const filteredCollections = allCollections.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleAddToCart = (item: typeof allCollections[0]) => {
    addToCart({
      id: item.slug,
      title: item.title,
      price: item.price,
      image: item.image,
      slug: item.slug,
      category: item.category,
    })
    setAddedItems((prev) => new Set([...prev, item.slug]))
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(item.slug)
        return newSet
      })
    }, 2000)
  }

  // Mock rating and reviews for display
  const getItemRating = () => Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
  const getItemReviews = () => Math.floor(Math.random() * 20) + 10 // 10-30 reviews

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <span className="text-blue-700">Collections</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 font-serif">Our Collections</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted jewellery, each piece telling a unique story of elegance and
            craftsmanship.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="bg-slate-50 border border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-blue-600 font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-xs text-slate-500">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-blue-600 font-semibold mb-4 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </h3>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search collections..."
                    className="w-full px-3 py-2 bg-white border border-blue-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none text-sm"
                  />
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600">
                Showing {filteredCollections.length} of {allCollections.length} items
              </p>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid" ? "bg-blue-600 text-white" : "border-blue-300 text-blue-600 hover:bg-blue-50"
                  }
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list" ? "bg-blue-600 text-white" : "border-blue-300 text-blue-600 hover:bg-blue-50"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((item) => {
                  const rating = getItemRating()
                  const reviews = getItemReviews()
                  return (
                    <Card
                      key={`${item.category}-${item.slug}`}
                      className="bg-white border border-blue-200 group hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="relative overflow-hidden">
                        <ProductImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-blue-600 font-semibold mb-2 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                          Exquisite {item.category.slice(0, -1)} crafted with precision and elegance
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-slate-500 text-sm">({reviews})</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-amber-600 font-bold text-lg">{item.price}</span>
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
                              {addedItems.has(item.slug) ? "Added!" : "Add"}
                            </Button>
                            <Link href={`/${item.category}/${item.slug}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                              >
                                View
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCollections.map((item) => {
                  const rating = getItemRating()
                  const reviews = getItemReviews()
                  return (
                    <Card
                      key={`${item.category}-${item.slug}`}
                      className="bg-white border border-blue-200 group hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-32 h-32 flex-shrink-0">
                            <ProductImage
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-blue-600 font-semibold text-lg group-hover:text-blue-700 transition-colors">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-slate-600 text-sm mb-3">
                              Exquisite {item.category.slice(0, -1)} crafted with precision and elegance
                            </p>
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-slate-500 text-sm ml-1">({reviews})</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-amber-600 font-bold text-xl">{item.price}</span>
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
                                <Link href={`/${item.category}/${item.slug}`}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                                  >
                                    View
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {filteredCollections.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No items found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}