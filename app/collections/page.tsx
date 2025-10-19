"use client"

import type React from "react"
import { useState } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductImage } from "@/components/product-image"
import { Heart, Star, ArrowLeft, Filter, Search, Grid, List } from "lucide-react"
import Link from "next/link"

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "All Collections", count: 48 },
    { id: "rings", name: "Rings", count: 12 },
    { id: "necklaces", name: "Necklaces", count: 10 },
    { id: "earrings", name: "Earrings", count: 8 },
    { id: "bracelets", name: "Bracelets", count: 6 },
    { id: "pendants", name: "Pendants", count: 7 },
    { id: "sets", name: "Jewelry Sets", count: 5 },
  ]

  const collections = [
    {
      id: 1,
      title: "Eternal Love Diamond Ring",
      price: "PKR 450,000",
      image: "/luxury-diamond-engagement-ring-with-solitaire-sett.jpg",
      category: "rings",
      rating: 5,
      reviews: 24,
      description: "A timeless solitaire diamond ring that captures the essence of eternal love.",
      featured: true,
    },
    {
      id: 2,
      title: "Princess Cut Diamond Necklace",
      price: "PKR 320,000",
      image: "/luxury-diamond-tennis-necklace-with-brilliant-cut.jpg",
      category: "necklaces",
      rating: 5,
      reviews: 18,
      description: "Elegant princess cut diamonds set in a stunning tennis necklace design.",
      featured: true,
    },
    {
      id: 3,
      title: "Pearl Drop Earrings",
      price: "PKR 85,000",
      image: "/sparkling-diamond-stud-earrings-on-luxury-jewelry-.jpg",
      category: "earrings",
      rating: 4,
      reviews: 12,
      description: "Classic pearl drop earrings with diamond accents for a sophisticated look.",
      featured: false,
    },
    {
      id: 4,
      title: "Emerald & Diamond Bracelet",
      price: "PKR 180,000",
      image: "/placeholder.jpg",
      category: "bracelets",
      rating: 5,
      reviews: 8,
      description: "Stunning emerald and diamond bracelet that adds elegance to any outfit.",
      featured: false,
    },
    {
      id: 5,
      title: "Sapphire Pendant",
      price: "PKR 95,000",
      image: "/placeholder.jpg",
      category: "pendants",
      rating: 4,
      reviews: 15,
      description: "Beautiful blue sapphire pendant with diamond halo setting.",
      featured: false,
    },
    {
      id: 6,
      title: "Wedding Ring Set",
      price: "PKR 280,000",
      image: "/placeholder.jpg",
      category: "sets",
      rating: 5,
      reviews: 22,
      description: "Matching wedding ring set with complementary designs for both partners.",
      featured: true,
    },
    {
      id: 7,
      title: "Ruby & Diamond Ring",
      price: "PKR 220,000",
      image: "/placeholder.jpg",
      category: "rings",
      rating: 4,
      reviews: 16,
      description: "Vibrant ruby center stone surrounded by brilliant diamonds.",
      featured: false,
    },
    {
      id: 8,
      title: "Diamond Tennis Bracelet",
      price: "PKR 150,000",
      image: "/placeholder.jpg",
      category: "bracelets",
      rating: 5,
      reviews: 20,
      description: "Classic tennis bracelet with uniform diamonds for timeless elegance.",
      featured: false,
    },
  ]

  const filteredCollections = collections.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

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
            Discover our exquisite collection of handcrafted jewelry, each piece telling a unique story of elegance and
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
                Showing {filteredCollections.length} of {collections.length} items
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
                {filteredCollections.map((item) => (
                  <Card
                    key={item.id}
                    className="bg-white border border-blue-200 group hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="relative overflow-hidden">
                      <ProductImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.featured && (
                        <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-blue-600 font-semibold mb-2 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < item.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-slate-500 text-sm">({item.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-600 font-bold text-lg">{item.price}</span>
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCollections.map((item) => (
                  <Card
                    key={item.id}
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
                            {item.featured && (
                              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 text-sm mb-3">{item.description}</p>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < item.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                                  }`}
                                />
                              ))}
                              <span className="text-slate-500 text-sm ml-1">({item.reviews})</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-600 font-bold text-xl">{item.price}</span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                Wishlist
                              </Button>
                              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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