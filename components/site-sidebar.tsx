"use client"

import Link from "next/link"
<<<<<<< HEAD
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Home, Gem, Star, X } from "lucide-react"
=======
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Home, Gem, Heart, Star, X } from "lucide-react"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
import { Button } from "@/components/ui/button"

type SiteSidebarProps = {
  onClose: () => void
}

export function SiteSidebar({ onClose }: SiteSidebarProps) {
  return (
<<<<<<< HEAD
    <aside className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-white via-slate-50 to-white border-r border-blue-200 z-50 flex flex-col">
      <div className="flex-shrink-0 p-6 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="rounded-lg ring-2 ring-blue-300 bg-white p-1 shadow-blue-200/50 shadow-lg">
              <img
                src="/logo.png"
                alt="HAIDER DIAMONDS"
                className="h-9 w-auto brightness-100 contrast-100 drop-shadow-[0_0_4px_rgba(37,99,235,0.2)]"
              />
            </div>
            <span className="text-blue-600 font-semibold drop-shadow-[0_0_2px_rgba(37,99,235,0.1)]">
              HAIDER DIAMONDS
            </span>
          </Link>
          <button className="text-blue-600 hover:text-blue-700" onClick={onClose} aria-label="Close menu">
=======
    <aside className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-r border-amber-500/20 z-50 flex flex-col">
      <div className="flex-shrink-0 p-6 border-b border-amber-500/20">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <div className="rounded-lg ring-2 ring-amber-500/50 bg-zinc-900 p-1 shadow-amber-500/20 shadow-lg">
              <img src="/logo.png" alt="HAIDER DIAMONDS" className="h-9 w-auto brightness-125 contrast-125 drop-shadow-[0_0_8px_rgba(245,158,11,0.35)]" />
            </div>
            <span className="text-amber-400 font-semibold drop-shadow-[0_0_6px_rgba(245,158,11,0.35)]">HAIDER DIAMONDS</span>
          </Link>
          <button className="text-amber-400 hover:text-amber-300" onClick={onClose} aria-label="Close menu">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <nav className="space-y-4">
          {[
            { icon: Home, text: "Home", href: "/" },
            { icon: Gem, text: "Rings", href: "/rings" },
            { icon: Star, text: "Earrings", href: "/earrings" },
            { icon: Gem, text: "Necklaces", href: "/necklaces" },
            { icon: Star, text: "Bracelets", href: "/bracelets" },
<<<<<<< HEAD
            { icon: Gem, text: "Custom Design", href: "/custom-design" }, // Added Custom Design to sidebar menu
=======
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <Link
                key={item.text}
                href={item.href}
                onClick={onClose}
<<<<<<< HEAD
                className="flex items-center space-x-3 text-slate-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer hover:translate-x-2"
=======
                className="flex items-center space-x-3 text-amber-100/80 hover:text-amber-400 transition-colors duration-200 cursor-pointer hover:translate-x-2"
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.text}</span>
              </Link>
            )
          })}
        </nav>

        <div className="space-y-3">
          <Link href="/login" onClick={onClose}>
<<<<<<< HEAD
            <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-white">
=======
            <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black bg-transparent">
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
              Login
            </Button>
          </Link>
          <Link href="/signup" onClick={onClose}>
<<<<<<< HEAD
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Sign Up</Button>
          </Link>
        </div>

        <div className="space-y-3 text-slate-700 text-sm">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-amber-600" />
            <span>info@haiderdiamonds.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-amber-600" />
            <span>+92 300 1234567</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-amber-600 mt-0.5" />
=======
            <Button className="w-full bg-amber-500 text-black hover:bg-amber-600">Sign Up</Button>
          </Link>
        </div>

        <div className="space-y-3 text-amber-100/80 text-sm">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-amber-500" />
            <span>info@haiderdiamonds.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-amber-500" />
            <span>+92 300 1234567</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-amber-500 mt-0.5" />
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            <span>Park Lane Tower, B-5 Mall Of Lahore, 172 Tufail Rd, Cantt, Lahore, 54000</span>
          </div>
        </div>

        <div className="flex space-x-4">
          {[Instagram, Facebook, Twitter].map((Icon, index) => (
            <div key={index} className="hover:scale-125 hover:rotate-6 transition-transform">
<<<<<<< HEAD
              <Icon className="w-6 h-6 text-amber-600 cursor-pointer" />
=======
              <Icon className="w-6 h-6 text-amber-500 cursor-pointer" />
>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
<<<<<<< HEAD
=======


>>>>>>> 3c48e0b558f548c4ad48cadecc2d98e191225be5


