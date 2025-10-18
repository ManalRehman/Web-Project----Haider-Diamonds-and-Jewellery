"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive"
}

// Simple SVG icon components
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

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

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
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

const initialProducts: Product[] = [
  { id: "1", name: "Diamond Engagement Ring", category: "Rings", price: 245000, stock: 12, status: "active" },
  { id: "2", name: "Tennis Necklace", category: "Necklaces", price: 189000, stock: 8, status: "active" },
  { id: "3", name: "Diamond Stud Earrings", category: "Earrings", price: 125000, stock: 15, status: "active" },
  { id: "4", name: "Diamond Bracelet", category: "Bracelets", price: 180000, stock: 5, status: "inactive" },
]

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "" })

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = () => {
    if (formData.name && formData.category && formData.price && formData.stock) {
      if (editingId) {
        setProducts(
          products.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  name: formData.name,
                  category: formData.category,
                  price: Number.parseFloat(formData.price),
                  stock: Number.parseInt(formData.stock),
                }
              : p,
          ),
        )
        setEditingId(null)
      } else {
        setProducts([
          ...products,
          {
            id: Date.now().toString(),
            name: formData.name,
            category: formData.category,
            price: Number.parseFloat(formData.price),
            stock: Number.parseInt(formData.stock),
            status: "active",
          },
        ])
      }
      setFormData({ name: "", category: "", price: "", stock: "" })
      setShowForm(false)
    }
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your jewelry inventory</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setFormData({ name: "", category: "", price: "", stock: "" })
          }}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <PlusIcon />
          <span className="ml-2">Add Product</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute left-3 top-3 w-4 h-4 text-blue-500/50">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="bg-white border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? "Edit Product" : "Add New Product"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleAddProduct} className="bg-blue-600 text-white hover:bg-blue-700">
              {editingId ? "Update" : "Add"}
            </Button>
            <Button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({ name: "", category: "", price: "", stock: "" })
              }}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Products Table */}
      <Card className="bg-white border-blue-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-3 px-4 text-blue-600">Product Name</th>
                <th className="text-left py-3 px-4 text-blue-600">Category</th>
                <th className="text-left py-3 px-4 text-blue-600">Price</th>
                <th className="text-left py-3 px-4 text-blue-600">Stock</th>
                <th className="text-left py-3 px-4 text-blue-600">Status</th>
                <th className="text-left py-3 px-4 text-blue-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                  <td className="py-3 px-4 text-gray-900">{product.name}</td>
                  <td className="py-3 px-4 text-gray-700">{product.category}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">Rs {product.price.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-4 text-gray-900">{product.stock}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === "active" ? "bg-green-500/20 text-green-700" : "bg-gray-500/20 text-gray-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      >
                        <TrashIcon />
                      </button>
                    </div>
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
