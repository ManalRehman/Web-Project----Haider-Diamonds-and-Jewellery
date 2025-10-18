"use client"

import { useState } from "react"
import AdminDashboard from "@/components/admin/dashboard"
import AdminLogin from "@/components/admin/login"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard />
}
