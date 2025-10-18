"use client"

<<<<<<< HEAD
import type React from "react"

=======
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
      console.log("Searching for:", searchQuery)
=======
      // For now, just log the search query. You can implement actual search logic later
      console.log("Searching for:", searchQuery)
      // You could redirect to a search results page or filter products
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
      setSearchQuery("")
      setSearchOpen(false)
    }
  }

  return (
    <>
<<<<<<< HEAD
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-blue-200">
=======
      <nav className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur border-b border-amber-500/20">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
<<<<<<< HEAD
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
=======
              className="p-2 rounded-md hover:bg-zinc-800 text-amber-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/cart" className="flex items-center gap-3 group">
              <div className="rounded-lg ring-2 ring-amber-500/50 bg-zinc-900 p-1 shadow-amber-500/20 shadow-lg group-hover:shadow-amber-500/40 transition-shadow">
                <img src="/logo.png" alt="HAIDER DIAMONDS" className="h-9 w-auto sm:h-10 brightness-125 contrast-125 drop-shadow-[0_0_8px_rgba(245,158,11,0.35)] group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-amber-400 font-semibold hidden sm:block drop-shadow-[0_0_6px_rgba(245,158,11,0.35)]">HAIDER DIAMONDS</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/rings" className="text-amber-100/80 hover:text-amber-400 transition-colors">Rings</Link>
            <Link href="/earrings" className="text-amber-100/80 hover:text-amber-400 transition-colors">Earrings</Link>
            <Link href="/necklaces" className="text-amber-100/80 hover:text-amber-400 transition-colors">Necklaces</Link>
            <Link href="/bracelets" className="text-amber-100/80 hover:text-amber-400 transition-colors">Bracelets</Link>
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
          </div>
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jewelry..."
<<<<<<< HEAD
                  className="px-3 py-1 bg-white border border-blue-300 rounded-md text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none text-sm w-48"
=======
                  className="px-3 py-1 bg-zinc-800 border border-amber-500/30 rounded-md text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none text-sm w-48"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
<<<<<<< HEAD
                  className="p-1 rounded-md hover:bg-blue-50 text-blue-600"
=======
                  className="p-1 rounded-md hover:bg-zinc-800 text-amber-400"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
<<<<<<< HEAD
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
=======
              <button 
                onClick={() => setSearchOpen(true)}
                aria-label="Search" 
                className="p-2 rounded-md hover:bg-zinc-800 text-amber-400"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
              >
                <Search className="w-5 h-5" />
              </button>
            )}
<<<<<<< HEAD
            <Link href="/cart" aria-label="Cart" className="p-2 rounded-md hover:bg-blue-50 text-blue-600 relative">
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
=======
            <Link href="/cart" aria-label="Cart" className="p-2 rounded-md hover:bg-zinc-800 text-amber-400 relative">
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  {getTotalItems()}
                </span>
              )}
            </Link>
            {currentUser ? (
              <div className="flex items-center gap-2">
<<<<<<< HEAD
                <Link href="/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 text-blue-600">
                  <User className="w-5 h-5" />
                  <span className="text-xs text-blue-700 hidden sm:block">{currentUser.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 text-xs"
                >
=======
                <Link href="/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 text-amber-400">
                  <User className="w-5 h-5" />
                  <span className="text-xs text-amber-200/80 hidden sm:block">{currentUser.name}</span>
                </Link>
                <button onClick={handleLogout} className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 text-xs">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                  Logout
                </button>
              </div>
            ) : (
<<<<<<< HEAD
              <Link href="/login" aria-label="Profile" className="p-2 rounded-md hover:bg-blue-50 text-blue-600">
=======
              <Link href="/login" aria-label="Profile" className="p-2 rounded-md hover:bg-zinc-800 text-amber-400">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
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
<<<<<<< HEAD
=======
//

>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5


