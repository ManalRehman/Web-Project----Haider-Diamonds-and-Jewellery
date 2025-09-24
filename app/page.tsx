"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Search,
  ShoppingBag,
  Lock,
  User,
  X,
  Home,
  Gem,
  Heart,
  Star,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  Mail,
  MapPin,
  Check,
} from "lucide-react"

export default function HaiderDiamonds() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [reviewsInView, setReviewsInView] = useState(false)
  const [starsAnimating, setStarsAnimating] = useState(false)
  const reviewsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setReviewsInView(true)
            setStarsAnimating(true)
            setTimeout(() => {
              setStarsAnimating(false)
            }, 3000)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (reviewsRef.current) {
      observer.observe(reviewsRef.current)
    }

    return () => {
      if (reviewsRef.current) {
        observer.unobserve(reviewsRef.current)
      }
    }
  }, [])

  return (
    <div className="bg-zinc-950 text-white overflow-x-hidden custom-scrollbar">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-zinc-950/95 backdrop-blur-md" : "bg-zinc-950/80 backdrop-blur-sm"
        } border-b border-amber-500/20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="h-16 flex items-center ml-4 sm:ml-8 md:ml-12">
              <div className="relative group">
                <img
                  src="/logo.png"
                  alt="HAIDER DIAMONDS"
                  className="h-12 w-18 sm:h-16 sm:w-24 group-hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-lg group-hover:drop-shadow-2xl group-hover:drop-shadow-amber-500/50"
                />
                <div className="absolute inset-0 bg-amber-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["Home", "Custom Design", "Rings", "Collections", "About"].map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="text-white hover:text-amber-500 transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 mr-4 sm:mr-0">
              <div className="hover:scale-125 hover:rotate-12 transition-all duration-300">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 cursor-pointer" />
              </div>
              <div className="hover:scale-125 hover:rotate-12 transition-all duration-300">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 cursor-pointer" />
              </div>
              <div className="hidden sm:block hover:scale-110 transition-all duration-300">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-500 hover:text-white hover:bg-amber-500/20 hover:scale-105 text-xs sm:text-sm"
                >
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Login
                </Button>
              </div>
              <div className="hidden sm:block hover:scale-110 transition-all duration-300">
                <Button
                  size="sm"
                  className="bg-amber-500 text-black hover:bg-amber-600 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30 text-xs sm:text-sm"
                >
                  <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-r border-amber-500/20 z-50 flex flex-col transform transition-transform duration-300">
            <div className="flex-shrink-0 p-8 border-b border-amber-500/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-amber-500 font-serif px-14 text-center">HAIDER DIAMONDS</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-amber-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <nav className="space-y-4 mb-8">
                {[
                  { icon: Home, text: "Home", href: "#home" },
                  { icon: Gem, text: "Custom Design", href: "#custom-design" },
                  { icon: Heart, text: "Engagement Rings", href: "#signature-pieces" },
                  { icon: Star, text: "Earrings", href: "#signature-pieces" },
                  { icon: Gem, text: "Necklaces", href: "#signature-pieces" },
                  { icon: Phone, text: "Contact", href: "#contact" },
                ].map((item) => {
                  const IconComponent = item.icon
                  return (
                    <a
                      key={item.text}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        setSidebarOpen(false)
                        const element = document.querySelector(item.href)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      className="flex items-center space-x-3 text-amber-100/80 hover:text-amber-500 transition-colors duration-200 cursor-pointer hover:translate-x-2"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.text}</span>
                    </a>
                  )
                })}
              </nav>

              <div className="mb-8 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black bg-transparent"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button className="w-full bg-amber-500 text-black hover:bg-amber-600">
                  <User className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>

              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((IconComponent, index) => (
                  <div key={index} className="hover:scale-125 hover:rotate-6 transition-transform">
                    <IconComponent className="w-6 h-6 text-amber-500 cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-50 bg-amber-500 text-black p-2 sm:p-3 rounded-full hover:bg-amber-600 transition-all duration-300 hover:scale-125 hover:rotate-180 hover:shadow-xl hover:shadow-amber-500/50"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

        <div className="absolute inset-0">
          {/* Large sparkles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`large-${i}`}
              className="absolute w-2 h-2 bg-amber-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}

          {/* Medium sparkles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`medium-${i}`}
              className="absolute w-1.5 h-1.5 bg-amber-300/70 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`,
              }}
            />
          ))}

          {/* Small twinkling dots */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`small-${i}`}
              className="absolute w-1 h-1 bg-amber-500/40 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-100 bg-clip-text text-transparent font-serif animate-fade-in-up">
            HAIDER DIAMONDS & JEWELLERY
          </h1>

          <h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-500 mb-6 sm:mb-8 font-serif italic animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Where Elegance Meets Perfection
          </h2>

          <p
            className="text-base sm:text-lg md:text-xl text-amber-100/80 mb-8 sm:mb-12 animate-fade-in-up px-4"
            style={{ animationDelay: "0.4s" }}
          >
            Luxury jewelry crafted with unmatched brilliance and timeless design.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up px-4"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="hover:scale-110 transition-all duration-300 hover:-translate-y-2">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-amber-600 hover:to-amber-500 hover:shadow-2xl hover:shadow-amber-500/40 text-sm sm:text-base">
                START CUSTOM DESIGN
              </Button>
            </div>
            <div className="hover:scale-110 transition-all duration-300 hover:-translate-y-2">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-amber-500 text-amber-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-amber-500 hover:text-black bg-transparent hover:shadow-2xl hover:shadow-amber-500/40 text-sm sm:text-base"
              >
                VIEW COLLECTIONS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design Process */}
      <section id="custom-design" className="py-12 sm:py-16 lg:py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-500 mb-4 sm:mb-6 font-serif animate-fade-in-up">
            CUSTOM DESIGN PROCESS
          </h2>
          <p className="text-amber-100/70 mb-8 sm:mb-12 animate-fade-in-up px-4" style={{ animationDelay: "0.1s" }}>
            Your story, our craftsmanship — together creating perfection.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { step: "1", title: "Consultation" },
              { step: "2", title: "Design" },
              { step: "3", title: "Crafting" },
              { step: "4", title: "Delivery" },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative hover:-translate-y-4 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-500/20 mb-2 sm:mb-4 hover:text-amber-500 hover:scale-125 transition-all duration-500 hover:rotate-12">
                  {item.step}
                </div>
                <p className="text-sm sm:text-base text-amber-100 font-medium hover:text-amber-300 transition-colors duration-300">
                  {item.title}
                </p>

                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-amber-500 to-transparent animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Collection */}
      <section id="signature-pieces" className="py-12 sm:py-16 lg:py-20 bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-500 mb-4 sm:mb-6 font-serif animate-fade-in-up">
            SIGNATURE PIECES
          </h2>
          <p className="text-amber-100/70 mb-8 sm:mb-12 animate-fade-in-up px-4" style={{ animationDelay: "0.1s" }}>
            Defining timeless elegance with every piece.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                title: "Rings",
                desc: "Crafted with love, certified diamonds.",
                image: "/luxury-diamond-engagement-ring-with-solitaire-sett.jpg",
              },
              {
                icon: Gem,
                title: "Necklaces",
                desc: "Exquisite designs for every occasion.",
                image: "/luxury-diamond-tennis-necklace-with-brilliant-cut.jpg",
              },
              {
                icon: Star,
                title: "Earrings",
                desc: "Elegant and timeless sparkle.",
                image: "/sparkling-diamond-stud-earrings-on-luxury-jewelry-.jpg",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="p-4 sm:p-6 bg-zinc-950 rounded-lg border border-amber-500/30 group overflow-hidden hover:-translate-y-4 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="relative mb-4 sm:mb-6 overflow-hidden rounded-lg group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl text-amber-500 mb-2 font-semibold group-hover:scale-105 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-amber-100/70 group-hover:text-amber-100 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="animate-fade-in-left">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-500 mb-4 sm:mb-6 font-serif">
              ABOUT HAIDER DIAMONDS &amp; JEWELLERY{" "}
            </h2>
            <p className="text-amber-100/80 mb-4 sm:mb-6 text-sm sm:text-base">
              Haider Diamonds has been a trusted name in luxury jewelry, creating timeless designs with ethically
              sourced diamonds and master craftsmanship.
            </p>

            <ul className="space-y-2 text-amber-100/80 text-sm sm:text-base">
              {["Certified Authenticity", "Ethically Sourced Diamonds", "Lifetime Guarantee"].map((item, index) => (
                <li
                  key={item}
                  className="flex items-center hover:translate-x-4 transition-all duration-300 hover:text-amber-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 mr-3 hover:scale-125 transition-transform duration-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center animate-fade-in-right">
            <div className="relative">
              <div className="animate-spin-slow hover:animate-pulse">
                <Gem className="w-16 h-16 sm:w-20 sm:h-20 text-amber-500/70 hover:text-amber-500 hover:scale-125 transition-all duration-500" />
              </div>
              <div className="absolute inset-0 animate-ping">
                <Gem className="w-16 h-16 sm:w-20 sm:h-20 text-amber-500/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section ref={reviewsRef} className="py-12 sm:py-16 lg:py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-500 mb-4 sm:mb-6 font-serif animate-fade-in-up">
            CUSTOMER REVIEWS
          </h2>
          <p className="text-amber-100/70 mb-8 sm:mb-12 animate-fade-in-up px-4" style={{ animationDelay: "0.1s" }}>
            What our valued customers say about their experience with us.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Shahbaz Tariq",
                review:
                  "Absolutely stunning craftsmanship! The engagement ring exceeded all expectations. The attention to detail and quality is unmatched.",
                rating: 5,
                initials: "ST",
              },
              {
                name: "Mayra Amjad",
                review:
                  "Beautiful necklace that perfectly complements my style. The diamonds are brilliant and the design is timeless. Highly recommend!",
                rating: 5,
                initials: "MA",
              },
              {
                name: "Farukh Rehman",
                review:
                  "Exceptional service and exquisite jewelry. The custom design process was smooth and the final result was beyond my imagination.",
                rating: 5,
                initials: "FR",
              },
            ].map((review, index) => (
              <div
                key={review.name}
                className="p-4 sm:p-6 bg-zinc-950 rounded-lg border border-amber-500/30 group hover:-translate-y-4 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-sm sm:text-lg hover:scale-125 hover:rotate-12 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/50">
                    {review.initials}
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-amber-500 text-lg sm:text-xl transition-all duration-500 ${
                        starsAnimating && reviewsInView
                          ? "animate-bounce hover:scale-150 hover:rotate-12"
                          : "hover:scale-125 hover:rotate-6"
                      }`}
                      style={{
                        animationDelay: starsAnimating ? `${i * 0.2 + index * 0.1}s` : "0s",
                        animationDuration: starsAnimating ? "1s" : "0.3s",
                      }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-amber-100/80 mb-4 sm:mb-6 italic leading-relaxed group-hover:text-amber-100 transition-colors duration-300">
                  "{review.review}"
                </p>

                <h4 className="text-amber-500 font-semibold hover:scale-110 transition-transform duration-300 text-sm sm:text-base">
                  {review.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-500 mb-4 sm:mb-6 font-serif">
            GET IN TOUCH
          </h2>
          <p className="text-amber-100/70 mb-8 sm:mb-12 px-4">Ready to create your perfect piece? Contact us today.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-500 mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-amber-100/80 text-sm sm:text-base break-all">info@haiderdiamonds.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-amber-100/80 text-sm sm:text-base">+92 300 1234567</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-black" />
                  </div>
                  <div className="text-amber-100/70 text-sm sm:text-base">
                    <p>Park Lane Tower, B-5 Mall Of Lahore,</p>
                    <p>172 Tufail Rd, Cantt, Lahore, 54000</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-zinc-950 p-6 sm:p-8 rounded-lg border border-amber-500/30">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-500 mb-4 sm:mb-6">Send us a Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-zinc-800 border border-amber-500/30 rounded-lg text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-zinc-800 border border-amber-500/30 rounded-lg text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none text-sm sm:text-base"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 bg-zinc-800 border border-amber-500/30 rounded-lg text-white placeholder-amber-100/50 focus:border-amber-500 focus:outline-none resize-none text-sm sm:text-base"
                  ></textarea>
                  <Button className="w-full bg-amber-500 text-black hover:bg-amber-600 text-sm sm:text-base">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-800 py-8 sm:py-12 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="animate-fade-in-up sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-amber-500 mb-4 font-serif text-base sm:text-lg">
              HAIDER DIAMONDS &amp; JEWELLERY{" "}
            </h3>
            <p className="text-amber-100/70 mb-4 text-sm sm:text-base">Where Elegance Meets Perfection</p>
            <div className="text-amber-100/60 text-xs sm:text-sm">
              <p>Park Lane Tower, B-5 Mall Of Lahore,</p>
              <p>172 Tufail Rd, Cantt, Lahore, 54000</p>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-amber-500 mb-4 font-semibold text-sm sm:text-base">Collections</h4>
            <ul className="space-y-2 text-amber-100/70 text-xs sm:text-sm">
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-amber-500 hover:scale-105">
                Rings
              </li>
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-amber-500 hover:scale-105">
                Necklaces
              </li>
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-amber-500 hover:scale-105">
                Earrings
              </li>
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-amber-500 hover:scale-105">
                Accessories
              </li>
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-amber-500 mb-4 font-semibold text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-amber-100/70 text-xs sm:text-sm">
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-amber-500 hover:scale-105">
                Custom Designs
              </li>
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-amber-500 hover:scale-105">
                Ethical Sourcing
              </li>
              <li className="cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-amber-500 hover:scale-105">
                Consultations
              </li>
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-amber-500 mb-4 font-semibold text-sm sm:text-base">Connect</h4>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((IconComponent, index) => (
                <div
                  key={index}
                  className="hover:scale-150 hover:rotate-12 transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 cursor-pointer hover:text-amber-400 transition-colors duration-300 hover:drop-shadow-lg hover:drop-shadow-amber-500/50" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="text-center mt-6 sm:mt-8 text-amber-100/70 border-t border-amber-500/20 pt-6 sm:pt-8 animate-fade-in-up text-xs sm:text-sm"
          style={{ animationDelay: "0.4s" }}
        >
          {"© 2025 Haider Diamonds & Jewellery. All rights reserved."}
        </div>
      </footer>
    </div>
  )
}
