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
      // For now, just log the search query. You can implement actual search logic later
      console.log("Searching for:", searchQuery)
      // You could redirect to a search results page or filter products
      setSearchQuery("")
      setSearchOpen(false)
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-zinc-800 text-amber-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="rounded-lg ring-2 ring-amber-500/50 bg-zinc-900 p-1 shadow-amber-500/20 shadow-lg group-hover:shadow-amber-500/40 transition-shadow">
                <img
                  src="/logo.png"
                  alt="HAIDER DIAMONDS"
                  className="h-9 w-auto brightness-125 contrast-125 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-amber-400 font-semibold hidden sm:block drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]">
                HAIDER DIAMONDS
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/rings"
              className="text-white hover:text-amber-500 transition-colors duration-200"
            >
              Rings
            </Link>
            <Link
              href="/earrings"
              className="text-white hover:text-amber-500 transition-colors duration-200"
            >
              Earrings
            </Link>
            <Link
              href="/necklaces"
              className="text-white hover:text-amber-500 transition-colors duration-200"
            >
              Necklaces
            </Link>
            <Link
              href="/bracelets"
              className="text-white hover:text-amber-500 transition-colors duration-200"
            >
              Bracelets
            </Link>
            <Link
              href="/custom-design"
              className="text-white hover:text-amber-500 transition-colors duration-200"
            >
              Custom Design
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jewelry..."
                  className="px-3 py-1 bg-zinc-800 border border-amber-500/30 rounded-md text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none text-sm w-48"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-md hover:bg-zinc-800 text-amber-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 rounded-md hover:bg-zinc-800 text-amber-500"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <Link
              href="/cart"
              className="p-2 rounded-md hover:bg-zinc-800 text-amber-500 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-white text-sm hidden sm:block">
                  Welcome, {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md hover:bg-zinc-800 text-amber-500"
                  aria-label="Logout"
                >
                  <User className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-md hover:bg-zinc-800 text-amber-500"
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