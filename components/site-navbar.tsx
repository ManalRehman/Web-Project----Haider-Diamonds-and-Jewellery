"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingBag, User } from "lucide-react"
import { SiteSidebar } from "@/components/site-sidebar"

export function SiteNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Search" className="p-2 rounded-md hover:bg-zinc-800 text-amber-400">
              <Search className="w-5 h-5" />
            </button>
            <button aria-label="Cart" className="p-2 rounded-md hover:bg-zinc-800 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button aria-label="Profile" className="p-2 rounded-md hover:bg-zinc-800 text-amber-400">
              <User className="w-5 h-5" />
            </button>
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


