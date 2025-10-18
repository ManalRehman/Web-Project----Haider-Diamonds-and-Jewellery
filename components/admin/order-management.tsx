"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  customer: string
  email: string
  amount: number
  date: string
  status: "pending" | "processing" | "completed" | "cancelled"
  items: number
}

// Simple SVG icon components
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const initialOrders: Order[] = [
  {
    id: "#ORD001",
    customer: "Shahbaz Tariq",
    email: "shahbaz@example.com",
    amount: 245000,
    date: "2025-01-15",
    status: "completed",
    items: 1,
  },
  {
    id: "#ORD002",
    customer: "Mayra Amjad",
    email: "mayra@example.com",
    amount: 189000,
    date: "2025-01-14",
    status: "processing",
    items: 2,
  },
  {
    id: "#ORD003",
    customer: "Farukh Rehman",
    email: "farukh@example.com",
    amount: 320000,
    date: "2025-01-13",
    status: "pending",
    items: 1,
  },
  {
    id: "#ORD004",
    customer: "Amina Khan",
    email: "amina@example.com",
    amount: 180000,
    date: "2025-01-12",
    status: "completed",
    items: 3,
  },
]

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-700"
      case "processing":
        return "bg-blue-500/20 text-blue-700"
      case "pending":
        return "bg-yellow-500/20 text-yellow-700"
      case "cancelled":
        return "bg-red-500/20 text-red-700"
      default:
        return "bg-gray-500/20 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute left-3 top-3 w-4 h-4 text-blue-500/50">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search by order ID, customer name, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Orders Table */}
      <Card className="bg-white border-blue-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-3 px-4 text-blue-600">Order ID</th>
                <th className="text-left py-3 px-4 text-blue-600">Customer</th>
                <th className="text-left py-3 px-4 text-blue-600">Amount</th>
                <th className="text-left py-3 px-4 text-blue-600">Items</th>
                <th className="text-left py-3 px-4 text-blue-600">Date</th>
                <th className="text-left py-3 px-4 text-blue-600">Status</th>
                <th className="text-left py-3 px-4 text-blue-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-semibold">{order.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-900">{order.customer}</p>
                      <p className="text-gray-600 text-xs">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">Rs {order.amount.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-4 text-gray-900">{order.items}</td>
                  <td className="py-3 px-4 text-gray-700">{order.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                    >
                      <EyeIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-white border-blue-200 max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="text-gray-900 font-semibold">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Customer</p>
                  <p className="text-gray-900">{selectedOrder.customer}</p>
                  <p className="text-gray-600 text-sm">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Amount</p>
                  <p className="text-blue-600 font-semibold text-lg">
                    Rs {selectedOrder.amount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Current Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedOrder.status)}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-gray-600 text-sm font-semibold">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["pending", "processing", "completed", "cancelled"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, status)
                        setSelectedOrder({ ...selectedOrder, status })
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        selectedOrder.status === status
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
