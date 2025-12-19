"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductImage } from "@/components/product-image"
import {
  Search,
  ShoppingBag,
  Lock,
  User,
  X,
  Home,
  Gem,
  Heart,
  Star,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  Mail,
  MapPin,
  Check,
  ChevronDown,
} from "lucide-react"
import { useUser } from "@/lib/user-context"
import { getApiUrl } from "@/lib/utils"

type Product = {
  slug: string
  title: string
  price: string
  image: string
  category: string
}

export default function HaiderDiamonds() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [reviewsInView, setReviewsInView] = useState<boolean>(false)
  const [starsAnimating, setStarsAnimating] = useState<boolean>(false)
  const [collectionsOpen, setCollectionsOpen] = useState<boolean>(false)
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState<boolean>(false)
  const { user } = useUser()
  const searchRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const collectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setReviewsInView(true)
            setStarsAnimating(true)
            setTimeout(() => {
              setStarsAnimating(false)
            }, 3000)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (reviewsRef.current) {
      observer.observe(reviewsRef.current)
    }

    return () => {
      if (reviewsRef.current) {
        observer.unobserve(reviewsRef.current)
      }
    }
  }, [])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
      if (collectionsRef.current && !collectionsRef.current.contains(event.target as Node)) {
        setCollectionsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(getApiUrl("/api/products"))
        if (!res.ok) throw new Error(`Failed to load products (${res.status})`)

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

        setAllProducts(mapped)
      } catch (err) {
        console.error("Failed to load products for search:", err)
      }
    }

    fetchProducts()
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim())
    }
  }

  const performSearch = (query: string) => {
    const filtered = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )
    setSearchResults(filtered)
    setShowResults(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim()) {
      performSearch(query.trim())
    } else {
      setShowResults(false)
      setSearchResults([])
    }
  }

  const handleSearchResultClick = (product: Product) => {
    router.push(`/${product.category}/${product.slug}`)
    setSearchQuery("")
    setShowResults(false)
    setSearchOpen(false)
  }

  const handleViewAllResults = () => {
    router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`)
    setSearchQuery("")
    setShowResults(false)
    setSearchOpen(false)
  }

  const handleUserIconClick = () => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden custom-scrollbar">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/80 backdrop-blur-sm"
        } border-b border-blue-200`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                className="mr-2 p-2 rounded-md hover:bg-gray-100 text-blue-600"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <Link href="/" className="relative group flex items-center gap-2 sm:gap-3">
                <div className="rounded-lg ring-2 ring-blue-400/50 bg-white p-1 shadow-blue-200/20 shadow-lg group-hover:shadow-blue-300/40 transition-shadow">
                  <img
                    src="/logo.png"
                    alt="HAIDER DIAMONDS"
                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 brightness-100 contrast-100 drop-shadow-[0_0_10px_rgba(59,130,246,0.25)] group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-blue-600 font-semibold text-sm sm:text-base hidden sm:block drop-shadow-[0_0_6px_rgba(59,130,246,0.15)]">
                  HAIDER DIAMONDS
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-4 flex items-baseline space-x-6">
                {/* Static items (Home, Custom Design) */}
                {[
                  { label: "Home", href: "#home" },
                  { label: "Custom Design", href: "/custom-design" },
                ].map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative group text-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault()
                        const element = document.querySelector(item.href)
                        if (element) element.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}

                {/* Collections dropdown */}
                <div
                  className="relative"
                  ref={collectionsRef}
                  onMouseEnter={() => setCollectionsOpen(true)}
                  onMouseLeave={() => setCollectionsOpen(false)}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={collectionsOpen}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative text-sm"
                  >
                    Collections
                    <ChevronDown
                      className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${
                        collectionsOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                        collectionsOpen ? "w-full" : "w-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full mt-1 z-30 bg-white shadow-lg rounded-xl py-2 w-48 border border-gray-100 transform transition-all duration-200 origin-top ${
                      collectionsOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {[
                      { label: "Rings", href: "/rings", icon: Heart },
                      { label: "Earrings", href: "/earrings", icon: Star },
                      { label: "Necklaces", href: "/necklaces", icon: Gem },
                      { label: "Bracelets", href: "/bracelets", icon: Star },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-md text-sm"
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search */}
              <div ref={searchRef} className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search jewellery..."
                        className="px-3 py-2 bg-gray-100 border border-blue-300/50 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm w-40 sm:w-48"
                        autoFocus
                      />
                      
                      {/* Search Results Dropdown */}
                      {showResults && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                          {searchResults.slice(0, 5).map((product) => (
                            <div
                              key={`${product.category}-${product.slug}`}
                              className="p-3 hover:bg-blue-50 cursor-pointer border-b border-blue-100 last:border-b-0"
                              onClick={() => handleSearchResultClick(product)}
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-8 h-8 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{product.title}</p>
                                  <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                                  <p className="text-sm font-semibold text-amber-600">{product.price}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {searchResults.length > 5 && (
                            <div
                              className="p-3 text-center bg-blue-50 hover:bg-blue-100 cursor-pointer"
                              onClick={handleViewAllResults}
                            >
                              <p className="text-sm font-medium text-blue-600">
                                View all {searchResults.length} results
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false)
                        setShowResults(false)
                        setSearchQuery("")
                      }}
                      className="p-1 rounded-md hover:bg-gray-200 text-blue-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search"
                    className="p-2 rounded-md hover:bg-gray-100 text-blue-600 transition-all duration-300 hover:scale-110"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>

              {/* Cart */}
              <div className="transition-all duration-300 hover:scale-110">
                <Link href="/cart" className="p-2 rounded-md hover:bg-gray-100 block">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </Link>
              </div>

              {/* User/Auth - Desktop */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className="transition-all duration-300 hover:scale-110">
                  <Button
                    onClick={handleUserIconClick}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-white hover:bg-blue-600/20 text-xs sm:text-sm h-9 px-3"
                  >
                    {user ? (
                      <>
                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Profile</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Login</span>
                      </>
                    )}
                  </Button>
                </div>
                
                {!user && (
                  <div className="transition-all duration-300 hover:scale-110">
                    <Link href="/signup">
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm h-9 px-3"
                      >
                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Sign Up</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Collections Dropdown */}
          <div className="lg:hidden border-t border-blue-100 pt-2 pb-1">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector("#home")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Home
              </a>
              
              <Link href="/custom-design" className="text-gray-700 hover:text-blue-600 transition-colors">
                Custom Design
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Collections
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${
                      mobileCollectionsOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                
                {mobileCollectionsOpen && (
                  <div className="absolute left-0 top-full mt-1 bg-white border border-blue-200 rounded-lg shadow-lg z-40 w-40 py-2">
                    {[
                      { label: "Rings", href: "/rings" },
                      { label: "Earrings", href: "/earrings" },
                      { label: "Necklaces", href: "/necklaces" },
                      { label: "Bracelets", href: "/bracelets" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => setMobileCollectionsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar - Now visible on all screens */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40" 
            onClick={() => setSidebarOpen(false)} 
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-white via-gray-50 to-white border-r border-blue-200 z-50 flex flex-col transform transition-transform duration-300">
            <div className="flex-shrink-0 p-6 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setSidebarOpen(false)}>
                  <h2 className="text-xl font-bold text-blue-600 font-serif hover:text-blue-700 transition-colors">
                    HAIDER DIAMONDS
                  </h2>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600 hover:text-gray-900"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <nav className="space-y-4 mb-8">
                {[
                  { icon: Home, text: "Home", href: "#home" },
                  { icon: Gem, text: "Custom Design", href: "/custom-design" },
                  { icon: Heart, text: "Rings", href: "/rings" },
                  { icon: Star, text: "Earrings", href: "/earrings" },
                  { icon: Gem, text: "Necklaces", href: "/necklaces" },
                  { icon: Star, text: "Bracelets", href: "/bracelets" },
                  { icon: Phone, text: "Contact", href: "#contact" },
                ].map((item) => {
                  const IconComponent = item.icon
                  return (
                    <a
                      key={item.text}
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("#")) {
                          e.preventDefault()
                          setSidebarOpen(false)
                          const element = document.querySelector(item.href)
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" })
                          }
                        } else {
                          setSidebarOpen(false)
                        }
                      }}
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer hover:translate-x-2 text-sm"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.text}</span>
                    </a>
                  )
                })}
              </nav>

              <div className="mb-8 space-y-3">
                <Button
                  onClick={() => {
                    handleUserIconClick()
                    setSidebarOpen(false)
                  }}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent text-sm"
                >
                  {user ? (
                    <>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Login
                    </>
                  )}
                </Button>
                {!user && (
                  <Link href="/signup" className="block" onClick={() => setSidebarOpen(false)}>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                )}
              </div>

              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((IconComponent, index) => (
                  <div key={index} className="hover:scale-125 hover:rotate-6 transition-transform">
                    <IconComponent className="w-5 h-5 text-blue-600 cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-14 sm:pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white" />

        <div className="absolute inset-0">
          {/* Enhanced sparkles with more visible animation */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`large-${i}`}
              className="absolute w-3 h-3 bg-blue-400 rounded-full animate-ping shadow-lg shadow-blue-400/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`,
              }}
            />
          ))}

          {/* Pulsing medium sparkles */}
          {[...Array(16)].map((_, i) => (
            <div
              key={`medium-${i}`}
              className="absolute w-2 h-2 bg-blue-500/80 rounded-full animate-pulse shadow-md shadow-blue-300/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 1}s`,
              }}
            />
          ))}

          {/* Bouncing small sparkles */}
          {[...Array(24)].map((_, i) => (
            <div
              key={`small-${i}`}
              className="absolute w-1.5 h-1.5 bg-blue-600/60 rounded-full animate-bounce shadow shadow-blue-500/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${0.8 + Math.random() * 1.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 bg-clip-text text-transparent font-serif animate-fade-in-up">
            HAIDER DIAMONDS & JEWELLERY
          </h1>

          <h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-600 mb-6 sm:mb-8 font-serif italic animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Where Elegance Meets Perfection
          </h2>

          <p
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-12 animate-fade-in-up px-4"
            style={{ animationDelay: "0.4s" }}
          >
            Luxury jewellery crafted with unmatched brilliance and timeless design.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up px-4"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="hover:scale-110 transition-all duration-300 hover:-translate-y-2">
              <Link href="/custom-design">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-600 hover:shadow-2xl hover:shadow-blue-400/40 text-sm sm:text-base">
                  START CUSTOM DESIGN
                </Button>
              </Link>
            </div>
            <div className="hover:scale-110 transition-all duration-300 hover:-translate-y-2">
              <Link href="/collections">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white bg-white hover:shadow-2xl hover:shadow-blue-400/40 text-sm sm:text-base"
                >
                  VIEW COLLECTIONS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design Process */}
      <section id="custom-design" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 sm:mb-6 font-serif animate-fade-in-up">
            CUSTOM DESIGN PROCESS
          </h2>
          <p className="text-gray-700 mb-8 sm:mb-12 animate-fade-in-up px-4" style={{ animationDelay: "0.1s" }}>
            Your story, our craftsmanship — together creating perfection.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { step: "1", title: "Consultation" },
              { step: "2", title: "Design" },
              { step: "3", title: "Crafting" },
              { step: "4", title: "Delivery" },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative hover:-translate-y-4 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-400 mb-2 sm:mb-4 hover:text-blue-700 hover:scale-125 transition-all duration-500 hover:rotate-12">
                  {item.step}
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </p>

                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Collection */}
      <section id="signature-pieces" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 sm:mb-6 font-serif animate-fade-in-up">
            SIGNATURE PIECES
          </h2>
          <p className="text-gray-700 mb-8 sm:mb-12 animate-fade-in-up px-4" style={{ animationDelay: "0.1s" }}>
            Defining timeless elegance with every piece.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                title: "Rings",
                desc: "Crafted with love, certified diamonds.",
                image: "/ring1.1.jpg",
                href: "/rings",
              },
              {
                icon: Gem,
                title: "Necklaces",
                desc: "Exquisite designs for every occasion.",
                image: "/necklace1.jpg",
                href: "/necklaces",
              },
              {
                icon: Star,
                title: "Earrings",
                desc: "Elegant and timeless sparkle.",
                image: "/earring4.jpeg",
                href: "/earrings",
              },
              {
                icon: Star,
                title: "Bracelets",
                desc: "Refined brilliance for the wrist.",
                image: "/bracelet5.jpg",
                href: "/bracelets",
              },
            ].map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                className="p-4 sm:p-6 bg-white rounded-lg border border-blue-200 group overflow-hidden hover:-translate-y-4 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="relative mb-4 sm:mb-6 overflow-hidden rounded-lg aspect-square group-hover:scale-110 transition-transform duration-500">
                  <ProductImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-4 bg-white"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl text-blue-600 mb-2 font-semibold group-hover:scale-105 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="animate-fade-in-left">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4 sm:mb-6 font-serif">
              ABOUT HAIDER DIAMONDS &amp; JEWELLERY{" "}
            </h2>
            <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
              Haider Diamonds has been a trusted name in luxury jewellery, creating timeless designs with ethically
              sourced diamonds and master craftsmanship.
            </p>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
              {["Certified Authenticity", "Ethically Sourced Diamonds", "Lifetime Guarantee"].map((item, index) => (
                <li
                  key={item}
                  className="flex items-center hover:translate-x-4 transition-all duration-300 hover:text-blue-600 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-3 hover:scale-125 transition-transform duration-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center animate-fade-in-right">
            <div className="relative">
              <div className="animate-spin-slow hover:animate-pulse">
                <Gem className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400/70 hover:text-blue-600 hover:scale-125 transition-all duration-500" />
              </div>
              <div className="absolute inset-0 animate-ping">
                <Gem className="w-16 h-16 sm:w-20 sm:h-20 text-blue-300/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section ref={reviewsRef} className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 sm:mb-6 font-serif animate-fade-in-up">
            CUSTOMER REVIEWS
          </h2>
          <p className="text-gray-700 mb-8 sm:mb-12 animate-fade-in-up px-4" style={{ animationDelay: "0.1s" }}>
            What our valued customers say about their experience with us.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Shahbaz Tariq",
                review:
                  "Absolutely stunning craftsmanship! The engagement ring exceeded all expectations. The attention to detail and quality is unmatched.",
                rating: 5,
                initials: "ST",
              },
              {
                name: "Mayra Amjad",
                review:
                  "Beautiful necklace that perfectly complements my style. The diamonds are brilliant and the design is timeless. Highly recommend!",
                rating: 5,
                initials: "MA",
              },
              {
                name: "Farukh Rehman",
                review:
                  "Exceptional service and exquisite jewellery. The custom design process was smooth and the final result was beyond my imagination.",
                rating: 5,
                initials: "FR",
              },
            ].map((review, index) => (
              <div
                key={review.name}
                className="p-4 sm:p-6 bg-white rounded-lg border border-blue-200 group hover:-translate-y-4 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg hover:scale-125 hover:rotate-12 transition-all duration-500 hover:shadow-lg hover:shadow-blue-400/50">
                    {review.initials}
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-amber-500 text-lg sm:text-xl transition-all duration-500 ${
                        starsAnimating && reviewsInView
                          ? "animate-bounce hover:scale-150 hover:rotate-12"
                          : "hover:scale-125 hover:rotate-6"
                      }`}
                      style={{
                        animationDelay: starsAnimating ? `${i * 0.2 + index * 0.1}s` : "0s",
                        animationDuration: starsAnimating ? "1s" : "0.3s",
                      }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  "{review.review}"
                </p>

                <h4 className="text-blue-600 font-semibold hover:scale-110 transition-transform duration-300 text-sm sm:text-base">
                  {review.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 sm:mb-6 font-serif">
            GET IN TOUCH
          </h2>
          <p className="text-gray-700 mb-8 sm:mb-12 px-4">Ready to create your perfect piece? Contact us today.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base break-all">info@haiderdiamonds.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">+92 300 1234567</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-gray-700 text-sm sm:text-base">
                    <p>Park Lane Tower, B-5 Mall Of Lahore,</p>
                    <p>172 Tufail Rd, Cantt, Lahore, 54000</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-blue-200">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4 sm:mb-6">Send us a Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-gray-50 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-gray-50 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 bg-gray-50 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none text-sm sm:text-base"
                  ></textarea>
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 sm:py-12 border-t border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="animate-fade-in-up sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-blue-600 mb-4 font-serif text-base sm:text-lg">
              HAIDER DIAMONDS &amp; JEWELLERY{" "}
            </h3>
            <p className="text-gray-700 mb-4 text-sm sm:text-base">Where Elegance Meets Perfection</p>
            <div className="text-gray-600 text-xs sm:text-sm">
              <p>Park Lane Tower, B-5 Mall Of Lahore,</p>
              <p>172 Tufail Rd, Cantt, Lahore, 54000</p>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-blue-600 mb-4 font-semibold text-sm sm:text-base">Collections</h4>
            <ul className="space-y-2 text-gray-700 text-xs sm:text-sm">
              <li className="transition-all duration-300 hover:translate-x-2 hover:text-blue-600 hover:scale-105">
                <a href="/rings">Rings</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-2 hover:text-blue-600 hover:scale-105">
                <a href="/necklaces">Necklaces</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-2 hover:text-blue-600 hover:scale-105">
                <a href="/earrings">Earrings</a>
              </li>
              <li className="transition-all duration-300 hover:translate-x-2 hover:text-blue-600 hover:scale-105">
                <a href="/bracelets">Bracelets</a>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-blue-600 mb-4 font-semibold text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-gray-700 text-xs sm:text-sm">
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-blue-600 hover:scale-105">
                Custom Designs
              </li>
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-blue-600 hover:scale-105">
                Ethical Sourcing
              </li>
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-blue-600 hover:scale-105">
                Consultations
              </li>
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-blue-600 mb-4 font-semibold text-sm sm:text-base">Connect</h4>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((IconComponent, index) => (
                <div
                  key={index}
                  className="hover:scale-150 hover:rotate-12 transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors duration-300 hover:drop-shadow-lg hover:drop-shadow-blue-400/50" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="text-center mt-6 sm:mt-8 text-gray-700 border-t border-blue-200 pt-6 sm:pt-8 animate-fade-in-up text-xs sm:text-sm"
          style={{ animationDelay: "0.4s" }}
        >
          © 2025 Haider Diamonds & Jewellery. All rights reserved.
        </div>
      </footer>
    </div>
  )
}