"use client"

import Link from "next/link"
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Home,
  Gem,
  Heart,
  Star,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type SiteSidebarProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SiteSidebar({ open, onOpenChange }: SiteSidebarProps) {
  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => onOpenChange(false)}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-white via-blue-50 to-blue-100 border-r border-blue-200 z-50 flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-blue-200 bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => onOpenChange(false)}
            >
              <div className="rounded-lg ring-2 ring-blue-400 bg-white p-1 shadow-blue-200 shadow-md">
                <img
                  src="/logo.png"
                  alt="HAIDER DIAMONDS"
                  className="h-9 w-auto brightness-110 contrast-125 drop-shadow-[0_0_4px_rgba(37,99,235,0.2)]"
                />
              </div>
              <span className="text-blue-700 font-semibold drop-shadow-[0_0_2px_rgba(37,99,235,0.1)]">
                HAIDER DIAMONDS
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-blue-600 hover:bg-blue-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Navigation */}
          <nav className="space-y-4 mb-8">
            {[
              { icon: Home, text: "Home", href: "/" },
              { icon: Gem, text: "Custom Design", href: "/custom-design" },
              { icon: Heart, text: "Rings", href: "/rings" },
              { icon: Star, text: "Earrings", href: "/earrings" },
              { icon: Gem, text: "Necklaces", href: "/necklaces" },
              { icon: Star, text: "Bracelets", href: "/bracelets" },
            ].map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.text}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer hover:translate-x-2"
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.text}</span>
                </Link>
              )
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="mb-8 space-y-3">
            <Link href="/login" className="block" onClick={() => onOpenChange(false)}>
              <Button
                variant="outline"
                className="w-full border-blue-400 text-blue-600 hover:bg-blue-50 hover:text-blue-700 bg-white"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup" className="block" onClick={() => onOpenChange(false)}>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-blue-700 font-semibold text-sm">Contact Info</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>info@haiderdiamonds.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                <div>
                  <p>Park Lane Tower, B-5 Mall Of Lahore,</p>
                  <p>172 Tufail Rd, Cantt, Lahore, 54000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <h3 className="text-blue-700 font-semibold text-sm mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((IconComponent, index) => (
                <div
                  key={index}
                  className="hover:scale-125 hover:rotate-6 transition-transform"
                >
                  <IconComponent className="w-6 h-6 text-blue-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
