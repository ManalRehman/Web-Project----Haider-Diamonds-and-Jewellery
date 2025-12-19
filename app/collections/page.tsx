"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductImage } from "@/components/product-image"
import { Star, ArrowLeft, Filter, Search, Grid, List, ShoppingBag, X } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { getApiUrl } from "@/lib/utils"

type Product = {
  slug: string
  title: string
  price: string
  image: string
  category: string
}

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const { addToCart } = useCart()
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [allCollections, setAllCollections] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(getApiUrl("/api/products"))
        if (!res.ok) throw new Error(`Failed to load collections (${res.status})`)

        const data: any[] = await res.json()
        const mapped: Product[] = data.map((item) => {
          const priceNumber = typeof item.price === "number" ? item.price : Number(item.price ?? 0)
          const formattedPrice =
            Number.isFinite(priceNumber) && priceNumber > 0
              ? `PKR ${priceNumber.toLocaleString()}`
              : "PKR 0"

          return {
            slug: item.slug || String(item._id),
            title: item.title || item.name || "Untitled",
            price: formattedPrice,
            image: item.image || "/ring1.jpg",
            category: (item.category || "rings").toLowerCase(),
          }
        })

        setAllCollections(mapped)
      } catch (err: any) {
        console.error("Failed to load collections:", err)
        setError(err.message || "Failed to load collections")
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const categories = [
    { id: "all", name: "All Collections", count: allCollections.length },
    { id: "rings", name: "Rings", count: allCollections.filter((p) => p.category === "rings").length },
    { id: "necklaces", name: "Necklaces", count: allCollections.filter((p) => p.category === "necklaces").length },
    { id: "earrings", name: "Earrings", count: allCollections.filter((p) => p.category === "earrings").length },
    { id: "bracelets", name: "Bracelets", count: allCollections.filter((p) => p.category === "bracelets").length },
  ]

  const filteredCollections = allCollections.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleAddToCart = (item: Product) => {
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 text-blue-600 text-sm">
          <Link href="/" className="hover:text-blue-700 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Home</span>
          </Link>
          <span className="mx-2 text-blue-400">/</span>
          <span className="text-blue-700">Collections</span>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-3 sm:mb-4 font-serif">Our Collections</h1>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Discover our exquisite collection of handcrafted jewellery, each piece telling a unique story of elegance and
            craftsmanship.
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <Button
            onClick={() => setIsFiltersOpen(true)}
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 text-sm"
            size="sm"
          >
            <Filter className="w-4 h-4" />
            Filters
            {selectedCategory !== "all" && (
              <span className="bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                !
              </span>
            )}
          </Button>
          
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

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Filters Overlay */}
          {isFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex">
              <div className="bg-white w-4/5 max-w-sm h-full overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-blue-600">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFiltersOpen(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Categories */}
                <Card className="bg-slate-50 border border-blue-200 mb-4">
                  <CardContent className="p-4">
                    <h3 className="text-blue-600 font-semibold mb-3 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id)
                            setIsFiltersOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            selectedCategory === category.id
                              ? "bg-blue-100 text-blue-700"
                              : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{category.name}</span>
                            <span className="text-xs text-slate-500">({category.count})</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Search */}
                <Card className="bg-slate-50 border border-blue-200">
                  <CardContent className="p-4">
                    <h3 className="text-blue-600 font-semibold mb-3 flex items-center gap-2">
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

                {/* Clear Filters Button */}
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setIsFiltersOpen(false)
                    }}
                    className="w-full bg-slate-200 text-slate-700 hover:bg-slate-300"
                    size="sm"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-64 space-y-6">
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
            <div className="hidden lg:flex justify-between items-center mb-6">
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

            {/* Results Count - Mobile */}
            <div className="lg:hidden text-center mb-4">
              <p className="text-slate-600 text-sm">
                Showing {filteredCollections.length} of {allCollections.length} items
                {selectedCategory !== "all" && (
                  <span className="ml-2 text-blue-600">
                    • {categories.find((c) => c.id === selectedCategory)?.name}
                  </span>
                )}
              </p>
            </div>

            {loading && (
              <div className="py-12 text-center text-blue-600">Loading collections…</div>
            )}

            {!loading && error && (
              <div className="py-12 text-center text-red-600">{error}</div>
            )}

            {!loading && !error && allCollections.length === 0 && (
              <div className="py-12 text-center text-slate-600">No collections found.</div>
            )}

           {!loading && !error && allCollections.length > 0 && (
  viewMode === "grid" ? (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {filteredCollections.map((item) => {
        const rating = getItemRating()
        const reviews = getItemReviews()
        return (
          <Card
            key={`${item.category}-${item.slug}`}
            className="bg-white border border-blue-200 group hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col h-full"
          >
            <div className="relative overflow-hidden flex-shrink-0 aspect-square">
              <ProductImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 bg-white"
              />
            </div>

            <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
              <div className="flex-1">
                <h3 className="text-blue-600 font-semibold mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-500">({reviews})</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-amber-600 font-bold">{item.price}</span>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className={`${
                      addedItems.has(item.slug)
                        ? "bg-green-500"
                        : "bg-blue-600"
                    } text-white`}
                  >
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    {addedItems.has(item.slug) ? "Added!" : "Add"}
                  </Button>

                  <Link href={`/${item.category}/${item.slug}`}>
                    <Button size="sm" variant="outline">
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
    <div className="space-y-3 sm:space-y-4">
      {filteredCollections.map((item) => {
        const rating = getItemRating()
        const reviews = getItemReviews()
        return (
          <Card key={`${item.category}-${item.slug}`}>
            <CardContent className="p-4 flex gap-4">
              <div className="w-24 h-24">
                <ProductImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-blue-600 font-semibold">{item.title}</h3>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-500">({reviews})</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold">{item.price}</span>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAddToCart(item)}>
                      Add
                    </Button>
                    <Link href={`/${item.category}/${item.slug}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
)}


            {!loading && !error && filteredCollections.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">No items found</h3>
                <p className="text-slate-600 text-sm sm:text-base mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setIsFiltersOpen(false)
                  }}
                  className="bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base"
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