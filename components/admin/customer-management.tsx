"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  totalOrders: number
  totalSpent: number
  joinDate: string
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

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Shahbaz Tariq",
    email: "shahbaz@example.com",
    phone: "+92 300 1234567",
    location: "Lahore, Pakistan",
    totalOrders: 5,
    totalSpent: 12450,
    joinDate: "2024-06-15",
  },
  {
    id: "2",
    name: "Mayra Amjad",
    email: "mayra@example.com",
    phone: "+92 321 9876543",
    location: "Karachi, Pakistan",
    totalOrders: 3,
    totalSpent: 8900,
    joinDate: "2024-08-20",
  },
  {
    id: "3",
    name: "Farukh Rehman",
    email: "farukh@example.com",
    phone: "+92 333 5555555",
    location: "Islamabad, Pakistan",
    totalOrders: 7,
    totalSpent: 18500,
    joinDate: "2024-05-10",
  },
  {
    id: "4",
    name: "Amina Khan",
    email: "amina@example.com",
    phone: "+92 345 1111111",
    location: "Lahore, Pakistan",
    totalOrders: 2,
    totalSpent: 4200,
    joinDate: "2024-11-01",
  },
]

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm),
  )

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id))
    setSelectedCustomer(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customers</h1>
        <p className="text-gray-600">Manage and view customer information</p>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute left-3 top-3 w-4 h-4 text-blue-500/50">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card
            key={customer.id}
            className="bg-white border-blue-200 p-6 hover:border-blue-400 transition-colors cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => setSelectedCustomer(customer)}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
              <p className="text-gray-600 text-sm">{customer.location}</p>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="text-blue-600">
                  <MailIcon />
                </div>
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="text-blue-600">
                  <PhoneIcon />
                </div>
                <span>{customer.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
              <div>
                <p className="text-gray-600 text-xs">Total Orders</p>
                <p className="text-gray-900 font-semibold">{customer.totalOrders}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs">Total Spent</p>
                <p className="text-blue-600 font-semibold">Rs {customer.totalSpent.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-white border-blue-200 max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Customer Details</h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Name</p>
                  <p className="text-gray-900 font-semibold">{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="text-gray-700">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="text-gray-700">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Location</p>
                  <p className="text-gray-700">{selectedCustomer.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                  <div>
                    <p className="text-gray-600 text-xs">Total Orders</p>
                    <p className="text-gray-900 font-semibold text-lg">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Total Spent</p>
                    <p className="text-blue-600 font-semibold text-lg">
                      Rs {selectedCustomer.totalSpent.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Member Since</p>
                  <p className="text-gray-700">{selectedCustomer.joinDate}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedCustomer(null)}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteCustomer(selectedCustomer.id)
                  }}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <TrashIcon />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
