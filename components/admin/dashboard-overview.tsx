"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 4000, orders: 24 },
  { month: "Feb", sales: 3000, orders: 18 },
  { month: "Mar", sales: 2000, orders: 12 },
  { month: "Apr", sales: 2780, orders: 39 },
  { month: "May", sales: 1890, orders: 28 },
  { month: "Jun", sales: 2390, orders: 35 },
]

// Simple SVG icon components
const TrendingUpIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const ShoppingCartIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)

const PackageIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m0 0v10l8 4"
    />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 8.048M12 4.354L8.646 7.708m6.708 0L15.354 7.708M9 20h6a2 2 0 002-2v-1a6 6 0 00-12 0v1a2 2 0 002 2z"
    />
  </svg>
)

const stats = [
  { label: "Total Revenue", value: "Rs 24,58,000", icon: TrendingUpIcon, color: "text-blue-600" },
  { label: "Total Orders", value: "156", icon: ShoppingCartIcon, color: "text-blue-500" },
  { label: "Products", value: "48", icon: PackageIcon, color: "text-blue-400" },
  { label: "Customers", value: "342", icon: UsersIcon, color: "text-blue-600" },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your business overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="bg-white border-blue-200 p-6 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 font-serif">{stat.value}</p>
                </div>
                <div className={stat.color}>
                  <Icon />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-serif">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #3b82f6" }} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-white border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-serif">Orders by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #3b82f6" }} />
              <Legend />
              <Bar dataKey="orders" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-white border-blue-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 font-serif">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-3 px-4 text-blue-600 font-serif">Order ID</th>
                <th className="text-left py-3 px-4 text-blue-600 font-serif">Customer</th>
                <th className="text-left py-3 px-4 text-blue-600 font-serif">Amount</th>
                <th className="text-left py-3 px-4 text-blue-600 font-serif">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#ORD001", customer: "Shahbaz Tariq", amount: "Rs 245,000", status: "Completed" },
                { id: "#ORD002", customer: "Mayra Amjad", amount: "Rs 189,000", status: "Pending" },
                { id: "#ORD003", customer: "Farukh Rehman", amount: "Rs 320,000", status: "Completed" },
              ].map((order) => (
                <tr key={order.id} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900 font-semibold">{order.id}</td>
                  <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-green-500/20 text-green-700"
                          : "bg-yellow-500/20 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
