import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Haider Diamonds - Where Elegance Meets Perfection",
  description:
    "Luxury jewelry crafted with unmatched brilliance and timeless design. Custom engagement rings, necklaces, and fine jewelry.",
  keywords: "diamonds, jewelry, engagement rings, luxury, custom design, necklaces, earrings",
  authors: [{ name: "Haider Diamonds" }],
  openGraph: {
    title: "Haider Diamonds - Where Elegance Meets Perfection",
    description: "Luxury jewelry crafted with unmatched brilliance and timeless design.",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </CartProvider>
      </body>
    </html>
  )
}
