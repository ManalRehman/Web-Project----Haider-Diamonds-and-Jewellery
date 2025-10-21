"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreditCard,
  MapPin,
  User,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface CheckoutPopupProps {
  children: React.ReactNode;
}

export function CheckoutPopup({ children }: CheckoutPopupProps) {
  const { cart, getTotalItems, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "",
    specialInstructions: "",
    // Extra payment info
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    accountName: "",
    accountNumber: "",
    transactionId: "",
  });

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Checkout data:", { formData, cart, total: getTotalPrice() });

    clearCart();
    setIsOpen(false);
    setIsProcessing(false);
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.postalCode &&
      formData.country &&
      formData.paymentMethod
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-blue-200 text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600 font-serif flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            Checkout
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Info */}
            <Card className="bg-white border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">First Name *</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="bg-white border-blue-300 text-gray-900 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Last Name *</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="bg-white border-blue-300 text-gray-900 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    className="bg-white border-blue-300 text-gray-900 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Phone *</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    className="bg-white border-blue-300 text-gray-900 focus:border-blue-500"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card className="bg-white border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-700">Address *</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="bg-white border-blue-300 text-gray-900 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">City *</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="bg-white border-blue-300 text-gray-900 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Postal Code *</Label>
                    <Input
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      className="bg-white border-blue-300 text-gray-900 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700">Country *</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      handleInputChange("country", value)
                    }
                  >
                    <SelectTrigger className="bg-white border-blue-300 text-gray-900 focus:border-blue-500">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-blue-200">
                      <SelectItem value="pakistan">Pakistan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method */}
          <Card className="bg-white border border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  handleInputChange("paymentMethod", value)
                }
              >
                <SelectTrigger className="bg-white border-blue-300 text-gray-900 focus:border-blue-500">
                  <SelectValue placeholder="Choose payment method" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-200">
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="jazzcash">JazzCash</SelectItem>
                  <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                </SelectContent>
              </Select>

              {/* --- Dynamic Fields --- */}
              {formData.paymentMethod === "credit_card" && (
                <div className="space-y-3 border-t border-blue-100 pt-4">
                  <Label>Card Number *</Label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    className="bg-white border-blue-300"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry Date *</Label>
                      <Input
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={(e) =>
                          handleInputChange("cardExpiry", e.target.value)
                        }
                        className="bg-white border-blue-300"
                        required
                      />
                    </div>
                    <div>
                      <Label>CVC *</Label>
                      <Input
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={(e) =>
                          handleInputChange("cardCvc", e.target.value)
                        }
                        className="bg-white border-blue-300"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {(formData.paymentMethod === "jazzcash" ||
                formData.paymentMethod === "easypaisa") && (
                <div className="space-y-3 border-t border-blue-100 pt-4">
                  <Label>Account Holder Name *</Label>
                  <Input
                    placeholder="Full Name"
                    value={formData.accountName}
                    onChange={(e) =>
                      handleInputChange("accountName", e.target.value)
                    }
                    className="bg-white border-blue-300"
                    required
                  />
                  <Label>Account / Mobile Number *</Label>
                  <Input
                    placeholder="03XXXXXXXXX"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      handleInputChange("accountNumber", e.target.value)
                    }
                    className="bg-white border-blue-300"
                    required
                  />
                </div>
              )}

              {formData.paymentMethod === "bank_transfer" && (
                <div className="space-y-3 border-t border-blue-100 pt-4">
                  <Label>Account Holder Name *</Label>
                  <Input
                    placeholder="Your Full Name"
                    value={formData.accountName}
                    onChange={(e) =>
                      handleInputChange("accountName", e.target.value)
                    }
                    className="bg-white border-blue-300"
                    required
                  />
                  <Label>Transaction ID *</Label>
                  <Input
                    placeholder="Enter your transaction ID"
                    value={formData.transactionId}
                    onChange={(e) =>
                      handleInputChange("transactionId", e.target.value)
                    }
                    className="bg-white border-blue-300"
                    required
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card className="bg-white border border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600">
                Special Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.specialInstructions}
                onChange={(e) =>
                  handleInputChange("specialInstructions", e.target.value)
                }
                placeholder="Any special delivery notes..."
                className="bg-white border-blue-300"
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="bg-white border border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-700"
                >
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span className="text-blue-600 font-medium">
                    {item.price}
                  </span>
                </div>
              ))}
              <div className="border-t border-blue-200 pt-4 flex justify-between text-lg font-semibold text-blue-600">
                <span>Total ({getTotalItems()} items)</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isProcessing}
              className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing
                ? "Processing..."
                : `Place Order - ${formatPrice(getTotalPrice())}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
