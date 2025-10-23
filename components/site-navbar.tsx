"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Menu, Search, ShoppingBag, User, X, LogOut } from "lucide-react"
import { SiteSidebar } from "@/components/site-sidebar"
import { useCart } from "@/lib/cart-context"
import { useUser } from "@/lib/user-context"
import { useRouter } from "next/navigation"

// Import all products for search functionality
const allProducts = [
  // Rings
  { slug: "Leafy-Lux-Ring", title: "Leafy Lux Ring", price: "PKR 599,000", image: "/ring1.jpg", category: "rings" },
  { slug: "Floral-Embrace-Ring", title: "Floral Embrace Ring", price: "PKR 499,000", image: "/ring2.jpg", category: "rings" },
  { slug: "The-Rose-Knot-Ring", title: "The Rose Knot Ring", price: "PKR 579,000", image: "/ring3.jpg", category: "rings" },
  { slug: "The-Modern-Sparkle-Ring", title: "The Modern Sparkle Ring", price: "PKR 579,000", image: "/ring4.jpg", category: "rings" },
  { slug: "The-Petal-Heart-Ring", title: "The Petal Heart Ring", price: "PKR 649,000", image: "/ring5.jpg", category: "rings" },
  { slug: "The-Timeless-Row-Ring", title: "The Timeless Row Ring", price: "PKR 699,000", image: "/ring6.jpg", category: "rings" },
  
  // Necklaces
  { slug: "diamond-tennis-necklace", title: "Diamond Tennis Necklace", price: "PKR 599,000", image: "/necklace1.jpg", category: "necklaces" },
  { slug: "solitaire-pendant-necklace", title: "Solitaire Pendant Necklace", price: "PKR 359,000", image: "/necklace2.jpg", category: "necklaces" },
  { slug: "pear-halo-necklace", title: "Pear Halo Necklace", price: "PKR 549,000", image: "/necklace3.jpg", category: "necklaces" },
  { slug: "emerald-diamond-necklace", title: "Emerald Diamond Necklace", price: "PKR 799,000", image: "/necklace4.jpg", category: "necklaces" },
  { slug: "sapphire-drop-necklace", title: "Sapphire Drop Necklace", price: "PKR 429,000", image: "/necklace5.jpg", category: "necklaces" },
  { slug: "classic-pearl-necklace", title: "Classic Pearl Necklace", price: "PKR 299,000", image: "/necklace6.6.jpg", category: "necklaces" },
  
  // Earrings
  { slug: "classic-diamond-studs", title: "Classic Diamond Studs", price: "PKR 279,000", image: "/sparkling-diamond-stud-earrings-on-luxury-jewelry-.jpg", category: "earrings" },
  { slug: "The-Dazzling-Drop-Earrings", title: "The Dazzling Drop Earrings", price: "PKR 349,000", image: "/earring1.jpeg", category: "earrings" },
  { slug: "Emerald-Isle-Hoops", title: "Emerald Isle Hoops", price: "PKR 419,000", image: "/earring2.jpeg", category: "earrings" },
  { slug: "pearl-drop-earrings", title: "Pearl Drop Earrings", price: "PKR 389,000", image: "/earring3.jpeg", category: "earrings" },
  { slug: "Ruby-Blush-Mini-Hoops", title: "Ruby Blush Mini Hoops", price: "PKR 299,000", image: "earring4.2.jpeg", category: "earrings" },
  { slug: "Whisper-Leaf-Hoops", title: "Whisper Leaf Hoops", price: "PKR 459,000", image: "/earring5.jpeg", category: "earrings" },
  
  // Bracelets
  { slug: "diamond-tennis-bracelet", title: "Diamond Tennis Bracelet", price: "PKR 599,000", image: "/bracelet1.jpg", category: "bracelets" },
  { slug: "bangle-bracelet", title: "Bangle Bracelet", price: "PKR 549,000", image: "/bracelet2.jpg", category: "bracelets" },
  { slug: "chain-link-bracelet", title: "Chain Link Bracelet", price: "PKR 299,000", image: "/bracelet3.jpg", category: "bracelets" },
  { slug: "cuff-bracelet", title: "Cuff Bracelet", price: "PKR 399,000", image: "/bracelet4.jpg", category: "bracelets" },
  { slug: "charm-bracelet", title: "Charm Bracelet", price: "PKR 279,000", image: "/bracelet5.jpg", category: "bracelets" },
  { slug: "pearl-bracelet", title: "Pearl Bracelet", price: "PKR 329,000", image: "/bracelet6.jpg", category: "bracelets" },
]

export function SiteNavbar() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof allProducts>([])
  const [showResults, setShowResults] = useState(false)
  const { getTotalItems } = useCart()
  const { user, logout } = useUser()
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim())
    }
  }

  const performSearch = (query: string) => {
    const filtered = allProducts.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
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

  const handleSearchResultClick = (product: typeof allProducts[0]) => {
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

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Left side: menu + logo */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-blue-100 text-blue-600 transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="rounded-lg ring-2 ring-blue-400 bg-white p-1 shadow-blue-200 shadow-md group-hover:shadow-blue-400/50 transition-shadow">
                <img
                  src="/logo.png"
                  alt="HAIDER DIAMONDS"
                  className="h-9 w-auto brightness-110 contrast-125 drop-shadow-[0_0_4px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-blue-700 font-semibold hidden sm:block drop-shadow-[0_0_4px_rgba(37,99,235,0.1)]">
                HAIDER DIAMONDS
              </span>
            </Link>
          </div>

          {/* Center: navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/rings" className="text-gray-700 hover:text-blue-600 transition-colors">
              Rings
            </Link>
            <Link href="/earrings" className="text-gray-700 hover:text-blue-600 transition-colors">
              Earrings
            </Link>
            <Link href="/necklaces" className="text-gray-700 hover:text-blue-600 transition-colors">
              Necklaces
            </Link>
            <Link href="/bracelets" className="text-gray-700 hover:text-blue-600 transition-colors">
              Bracelets
            </Link>
            <Link href="/custom-design" className="text-gray-700 hover:text-blue-600 transition-colors">
              Custom Design
            </Link>
          </div>

          {/* Right side: search, cart, user */}
          <div className="flex items-center space-x-2">
            {/* Search with dropdown results */}
            <div ref={searchRef} className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search jewelry..."
                      className="px-3 py-1 bg-white border border-blue-300 rounded-md text-gray-700 placeholder-blue-400/60 focus:border-blue-500 focus:outline-none text-sm w-48 shadow-sm"
                      autoFocus
                    />
                    
                    {/* Search Results Dropdown */}
                    {showResults && searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
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
                                className="w-10 h-10 object-cover rounded"
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
                    className="p-1 rounded-md hover:bg-blue-100 text-blue-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="p-2 rounded-md hover:bg-blue-100 text-blue-600 transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            <Link
              href="/cart"
              className="p-2 rounded-md hover:bg-blue-100 text-blue-600 relative transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm hidden sm:block">
                  Welcome, {user.name}
                </span>
                <Link
                  href="/profile"
                  className="p-2 rounded-md hover:bg-blue-100 text-blue-600"
                  aria-label="Profile"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md hover:bg-blue-100 text-blue-600"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-md hover:bg-blue-100 text-blue-600"
                aria-label="Login"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      <SiteSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </>
  )
}