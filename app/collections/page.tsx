"use client"

<<<<<<< HEAD
import type React from "react"

=======
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
    { id: "sets", name: "Jewelry Sets", count: 5 },
=======
    { id: "sets", name: "Jewelry Sets", count: 5 }
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      featured: true,
=======
      featured: true
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      featured: true,
=======
      featured: true
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      featured: false,
=======
      featured: false
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      featured: false,
=======
      featured: false
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      featured: false,
=======
      featured: false
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      featured: true,
=======
      featured: true
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      featured: false,
=======
      featured: false
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      featured: false,
    },
  ]

  const filteredCollections = collections.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
=======
      featured: false
    }
  ]

  const filteredCollections = collections.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
    return matchesCategory && matchesSearch
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
<<<<<<< HEAD
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
=======
    // Search is handled by the filter function
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <SiteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 text-amber-500 text-sm">
          <Link href="/" className="hover:text-amber-400 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span className="mx-2 text-amber-500/60">/</span>
          <span className="text-amber-300">Collections</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-4 font-serif">
            Our Collections
          </h1>
          <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted jewelry, each piece telling a unique story of elegance and craftsmanship.
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
<<<<<<< HEAD
            <Card className="bg-slate-50 border border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-blue-600 font-semibold mb-4 flex items-center gap-2">
=======
            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardContent className="p-6">
                <h3 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
                          ? "bg-blue-100 text-blue-700"
                          : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
=======
                          ? "bg-amber-500/20 text-amber-400"
                          : "text-amber-100/80 hover:text-amber-400 hover:bg-amber-500/10"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
<<<<<<< HEAD
                        <span className="text-xs text-slate-500">({category.count})</span>
=======
                        <span className="text-xs text-amber-500/60">({category.count})</span>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

<<<<<<< HEAD
            <Card className="bg-slate-50 border border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-blue-600 font-semibold mb-4 flex items-center gap-2">
=======
            <Card className="bg-zinc-900 border border-amber-500/20">
              <CardContent className="p-6">
                <h3 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  <Search className="w-4 h-4" />
                  Search
                </h3>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search collections..."
<<<<<<< HEAD
                    className="w-full px-3 py-2 bg-white border border-blue-200 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none text-sm"
=======
                    className="w-full px-3 py-2 bg-zinc-800 border border-amber-500/30 rounded-md text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none text-sm"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  />
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
<<<<<<< HEAD
              <p className="text-slate-600">
=======
              <p className="text-amber-100/70">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                Showing {filteredCollections.length} of {collections.length} items
              </p>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
<<<<<<< HEAD
                  className={
                    viewMode === "grid" ? "bg-blue-600 text-white" : "border-blue-300 text-blue-600 hover:bg-blue-50"
                  }
=======
                  className={viewMode === "grid" ? "bg-amber-500 text-black" : "border-amber-500/30 text-amber-400 hover:bg-amber-500/20"}
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
<<<<<<< HEAD
                  className={
                    viewMode === "list" ? "bg-blue-600 text-white" : "border-blue-300 text-blue-600 hover:bg-blue-50"
                  }
=======
                  className={viewMode === "list" ? "bg-amber-500 text-black" : "border-amber-500/30 text-amber-400 hover:bg-amber-500/20"}
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((item) => (
<<<<<<< HEAD
                  <Card
                    key={item.id}
                    className="bg-white border border-blue-200 group hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
=======
                  <Card key={item.id} className="bg-zinc-900 border border-amber-500/20 group hover:border-amber-500/50 transition-all duration-300">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                    <div className="relative overflow-hidden">
                      <ProductImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.featured && (
<<<<<<< HEAD
                        <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
=======
                        <div className="absolute top-3 left-3 bg-amber-500 text-black px-2 py-1 rounded-full text-xs font-semibold">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                          Featured
                        </div>
                      )}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
<<<<<<< HEAD
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
=======
                        <Button size="sm" variant="outline" className="bg-zinc-900/80 border-amber-500/30 text-amber-400 hover:bg-amber-500/20">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
<<<<<<< HEAD
                      <h3 className="text-blue-600 font-semibold mb-2 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{item.description}</p>
=======
                      <h3 className="text-amber-400 font-semibold mb-2 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-amber-100/70 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
<<<<<<< HEAD
                                i < item.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
=======
                                i < item.rating ? "text-amber-500 fill-amber-500" : "text-amber-500/30"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                              }`}
                            />
                          ))}
                        </div>
<<<<<<< HEAD
                        <span className="text-slate-500 text-sm">({item.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-600 font-bold text-lg">{item.price}</span>
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
=======
                        <span className="text-amber-100/60 text-sm">({item.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-400 font-bold text-lg">{item.price}</span>
                        <Button size="sm" className="bg-amber-500 text-black hover:bg-amber-600">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
                  <Card
                    key={item.id}
                    className="bg-white border border-blue-200 group hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
=======
                  <Card key={item.id} className="bg-zinc-900 border border-amber-500/20 group hover:border-amber-500/50 transition-all duration-300">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
                            <h3 className="text-blue-600 font-semibold text-lg group-hover:text-blue-700 transition-colors">
                              {item.title}
                            </h3>
                            {item.featured && (
                              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
=======
                            <h3 className="text-amber-400 font-semibold text-lg group-hover:text-amber-300 transition-colors">
                              {item.title}
                            </h3>
                            {item.featured && (
                              <span className="bg-amber-500 text-black px-2 py-1 rounded-full text-xs font-semibold">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                                Featured
                              </span>
                            )}
                          </div>
<<<<<<< HEAD
                          <p className="text-slate-600 text-sm mb-3">{item.description}</p>
=======
                          <p className="text-amber-100/70 text-sm mb-3">
                            {item.description}
                          </p>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
<<<<<<< HEAD
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
=======
                                    i < item.rating ? "text-amber-500 fill-amber-500" : "text-amber-500/30"
                                  }`}
                                />
                              ))}
                              <span className="text-amber-100/60 text-sm ml-1">({item.reviews})</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-400 font-bold text-xl">{item.price}</span>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20">
                                <Heart className="w-4 h-4 mr-1" />
                                Wishlist
                              </Button>
                              <Button size="sm" className="bg-amber-500 text-black hover:bg-amber-600">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No items found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
=======
                <Search className="w-16 h-16 text-amber-500/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-amber-400 mb-2">No items found</h3>
                <p className="text-amber-100/70 mb-4">Try adjusting your search or filter criteria</p>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
<<<<<<< HEAD
                  className="bg-blue-600 text-white hover:bg-blue-700"
=======
                  className="bg-amber-500 text-black hover:bg-amber-600"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
