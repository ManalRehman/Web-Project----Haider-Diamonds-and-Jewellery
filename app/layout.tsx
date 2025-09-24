import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Cormorant_Garamond, Montserrat } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
