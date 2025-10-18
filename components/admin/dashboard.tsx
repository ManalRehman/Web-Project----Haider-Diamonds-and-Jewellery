"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import AdminSidebar from "./sidebar"
import DashboardOverview from "./dashboard-overview"
import ProductManagement from "./product-management"
import OrderManagement from "./order-management"
import CustomerManagement from "./customer-management"

type AdminView = "dashboard" | "products" | "orders" | "customers"

// Simple SVG icon components
const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const LogOutIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
)

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="fixed top-0 right-0 left-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-200 lg:left-64 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
          >
            {sidebarOpen ? <XIcon /> : <MenuIcon />}
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-blue-600">Admin User</p>
              <p className="text-xs text-blue-600/60">Haider Diamonds</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition-all"
            >
              <LogOutIcon />
              <span className="ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="pt-16 lg:ml-64">
        <div className="p-6 max-w-7xl">
          {currentView === "dashboard" && <DashboardOverview />}
          {currentView === "products" && <ProductManagement />}
          {currentView === "orders" && <OrderManagement />}
          {currentView === "customers" && <CustomerManagement />}
        </div>
      </main>
    </div>
  )
}
