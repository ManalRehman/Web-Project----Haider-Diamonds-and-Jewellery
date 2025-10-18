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
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="rounded-lg ring-2 ring-blue-300 bg-white p-1 shadow-blue-200/50 shadow-lg group-hover:shadow-blue-300/50 transition-shadow">
                <img
                  src="/logo.png"
                  alt="HAIDER DIAMONDS"
                  className="h-9 w-auto brightness-100 contrast-100 drop-shadow-[0_0_4px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-blue-600 font-semibold hidden sm:block drop-shadow-[0_0_2px_rgba(37,99,235,0.1)]">
                HAIDER DIAMONDS
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/rings" className="text-slate-700 hover:text-blue-600 transition-colors">
              Rings
            </Link>
            <Link href="/earrings" className="text-slate-700 hover:text-blue-600 transition-colors">
              Earrings
            </Link>
            <Link href="/necklaces" className="text-slate-700 hover:text-blue-600 transition-colors">
              Necklaces
            </Link>
            <Link href="/bracelets" className="text-slate-700 hover:text-blue-600 transition-colors">
              Bracelets
            </Link>
            <Link href="/custom-design" className="text-slate-700 hover:text-blue-600 transition-colors">
              Custom Design
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jewelry..."
                  className="px-3 py-1 bg-white border border-blue-300 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none text-sm w-48"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-md hover:bg-blue-50 text-blue-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <Link href="/cart" aria-label="Cart" className="p-2 rounded-md hover:bg-blue-50 text-blue-600 relative">
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link href="/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 text-blue-600">
                  <User className="w-5 h-5" />
                  <span className="text-xs text-blue-700 hidden sm:block">{currentUser.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" aria-label="Profile" className="p-2 rounded-md hover:bg-blue-50 text-blue-600">
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
          <SiteSidebar onClose={() => setSidebarOpen(false)} />
        </>
      )}
    </>
  )
}
