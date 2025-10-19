"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { SiteSidebar } from "@/components/site-sidebar"
import { useCart } from "@/lib/cart-context"

export function SiteNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null)
  const { getTotalItems } = useCart()

  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentUser")
      setCurrentUser(raw ? JSON.parse(raw) : null)
    } catch {}
    const onStorage = () => {
      try {
        const raw = localStorage.getItem("currentUser")
        setCurrentUser(raw ? JSON.parse(raw) : null)
      } catch {}
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery)
      setSearchQuery("")
      setSearchOpen(false)
    }
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
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jewelry..."
                  className="px-3 py-1 bg-white border border-blue-300 rounded-md text-gray-700 placeholder-blue-400/60 focus:border-blue-500 focus:outline-none text-sm w-48 shadow-sm"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
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

            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm hidden sm:block">
                  Welcome, {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md hover:bg-blue-100 text-blue-600"
                  aria-label="Logout"
                >
                  <User className="w-5 h-5" />
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
