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
  Info,
  ShoppingBag,
  Sparkles,
  X,
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
    cardType: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    accountNumber: "",
    cnicNumber: "",
    easypaisaNumber: "",
    jazzcashNumber: "",
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-2 border-blue-300 shadow-2xl text-gray-900 p-0 sm:p-6">
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <DialogHeader className="border-b border-blue-200 pb-4 bg-gradient-to-r from-blue-600 to-indigo-600 -mx-0 sm:-mx-6 -mt-0 sm:-mt-6 px-4 sm:px-6 pt-4 sm:pt-6 rounded-t-lg">
          <DialogTitle className="text-xl sm:text-3xl font-bold text-white font-serif flex items-center gap-2 sm:gap-3">
            <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg backdrop-blur-sm">
              <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            Complete Your Order
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-auto animate-pulse" />
          </DialogTitle>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 sm:mt-2">Just a few steps away from your perfect look!</p>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 px-2 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Customer Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 sm:py-4">
                <CardTitle className="text-blue-700 flex items-center gap-2 text-base sm:text-lg">
                  <div className="bg-blue-600 text-white p-1 sm:p-1.5 rounded-md">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label className="text-gray-700 font-medium text-xs sm:text-sm">First Name *</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium text-xs sm:text-sm">Last Name *</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700 font-medium text-xs sm:text-sm">Email Address *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium text-xs sm:text-sm">Phone Number *</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                    placeholder="03XX-XXXXXXX"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 sm:py-4">
                <CardTitle className="text-blue-700 flex items-center gap-2 text-base sm:text-lg">
                  <div className="bg-blue-600 text-white p-1 sm:p-1.5 rounded-md">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
                <div>
                  <Label className="text-gray-700 font-medium text-xs sm:text-sm">Street Address *</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                    placeholder="House #, Street, Area"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label className="text-gray-700 font-medium text-xs sm:text-sm">City *</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                      placeholder="e.g., Lahore"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium text-xs sm:text-sm">Postal Code *</Label>
                    <Input
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                      placeholder="54000"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700 font-medium text-xs sm:text-sm">Country *</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      handleInputChange("country", value)
                    }
                  >
                    <SelectTrigger className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-blue-200">
                      <SelectItem value="pakistan" className="text-sm sm:text-base">Pakistan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 sm:py-4">
              <CardTitle className="text-blue-700 flex items-center gap-2 text-base sm:text-lg">
                <div className="bg-blue-600 text-white p-1 sm:p-1.5 rounded-md">
                  <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  handleInputChange("paymentMethod", value)
                }
              >
                <SelectTrigger className="bg-white border-2 border-blue-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all h-10 sm:h-12 text-sm sm:text-base">
                  <SelectValue placeholder="Choose payment method" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-blue-200">
                  <SelectItem value="cod" className="py-2 sm:py-3 text-sm sm:text-base">💵 Cash on Delivery</SelectItem>
                  <SelectItem value="bank_transfer" className="py-2 sm:py-3 text-sm sm:text-base">🏦 Bank Transfer</SelectItem>
                  <SelectItem value="card" className="py-2 sm:py-3 text-sm sm:text-base">💳 Card Payment</SelectItem>
                  <SelectItem value="jazzcash" className="py-2 sm:py-3 text-sm sm:text-base">📱 JazzCash</SelectItem>
                  <SelectItem value="easypaisa" className="py-2 sm:py-3 text-sm sm:text-base">📲 EasyPaisa</SelectItem>
                </SelectContent>
              </Select>

              {/* Dynamic Fields */}
              {formData.paymentMethod === "card" && (
                <div className="space-y-3 sm:space-y-4 border-t-2 border-blue-100 pt-4 sm:pt-6 bg-blue-50/50 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 sm:pb-4 rounded-lg">
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-gray-700 font-medium text-sm">Card Type *</Label>
                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-4">
                      <label className="flex items-center gap-2 cursor-pointer bg-white border-2 border-blue-200 rounded-lg px-3 py-2 sm:px-4 sm:py-3 hover:border-blue-500 transition-all flex-1">
                        <input
                          type="radio"
                          name="cardType"
                          value="debit"
                          checked={formData.cardType === "debit"}
                          onChange={(e) =>
                            handleInputChange("cardType", e.target.value)
                          }
                          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                          required
                        />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">Debit Card</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-white border-2 border-blue-200 rounded-lg px-3 py-2 sm:px-4 sm:py-3 hover:border-blue-500 transition-all flex-1">
                        <input
                          type="radio"
                          name="cardType"
                          value="credit"
                          checked={formData.cardType === "credit"}
                          onChange={(e) =>
                            handleInputChange("cardType", e.target.value)
                          }
                          className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                          required
                        />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">Credit Card</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium text-xs sm:text-sm">Card Number *</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium text-xs sm:text-sm">Name on Card *</Label>
                    <Input
                      placeholder="Full Name as on Card"
                      value={formData.cardName}
                      onChange={(e) =>
                        handleInputChange("cardName", e.target.value)
                      }
                      className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label className="text-gray-700 font-medium text-xs sm:text-sm">Expiry Date *</Label>
                      <Input
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={(e) =>
                          handleInputChange("cardExpiry", e.target.value)
                        }
                        className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label className="flex items-center gap-1.5 text-gray-700 font-medium text-xs sm:text-sm">
                        CVV *
                        <span
                          className="group relative cursor-help"
                          title="The CVV is the 3-digit number on the back of your card."
                        >
                          <Info className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          <span className="invisible group-hover:visible absolute left-6 top-0 w-40 sm:w-52 bg-gray-900 text-white text-xs rounded-lg px-2 sm:px-3 py-1 sm:py-2 z-10 shadow-xl">
                            The CVV is the 3-digit security code on the back of your card.
                          </span>
                        </span>
                      </Label>
                      <Input
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={(e) =>
                          handleInputChange("cardCvc", e.target.value)
                        }
                        className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === "jazzcash" && (
                <div className="space-y-2 sm:space-y-3 border-t-2 border-blue-100 pt-4 sm:pt-6 bg-blue-50/50 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 sm:pb-4 rounded-lg">
                  <Label className="text-gray-700 font-medium text-sm">JazzCash Mobile Number *</Label>
                  <Input
                    placeholder="03XX-XXXXXXX"
                    value={formData.jazzcashNumber}
                    onChange={(e) =>
                      handleInputChange("jazzcashNumber", e.target.value)
                    }
                    className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                    required
                  />
                </div>
              )}

              {formData.paymentMethod === "easypaisa" && (
                <div className="space-y-2 sm:space-y-3 border-t-2 border-blue-100 pt-4 sm:pt-6 bg-blue-50/50 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 sm:pb-4 rounded-lg">
                  <Label className="text-gray-700 font-medium text-sm">EasyPaisa Account Number *</Label>
                  <Input
                    placeholder="03XX-XXXXXXX"
                    value={formData.easypaisaNumber}
                    onChange={(e) =>
                      handleInputChange("easypaisaNumber", e.target.value)
                    }
                    className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                    required
                  />
                </div>
              )}

              {formData.paymentMethod === "bank_transfer" && (
                <div className="space-y-3 sm:space-y-4 border-t-2 border-blue-100 pt-4 sm:pt-6 bg-blue-50/50 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-3 sm:pb-4 rounded-lg">
                  <div>
                    <Label className="text-gray-700 font-medium text-sm">Account Number *</Label>
                    <Input
                      placeholder="Your Bank Account Number"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        handleInputChange("accountNumber", e.target.value)
                      }
                      className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium text-sm">CNIC Number *</Label>
                    <Input
                      placeholder="XXXXX-XXXXXXX-X"
                      value={formData.cnicNumber}
                      onChange={(e) =>
                        handleInputChange("cnicNumber", e.target.value)
                      }
                      className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base h-10 sm:h-12"
                      required
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 sm:py-4">
              <CardTitle className="text-blue-700 text-base sm:text-lg">
                💬 Special Instructions (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6">
              <Textarea
                value={formData.specialInstructions}
                onChange={(e) =>
                  handleInputChange("specialInstructions", e.target.value)
                }
                placeholder="Any special delivery notes or gift wrapping requests..."
                className="bg-white border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 py-3 sm:py-4">
              <CardTitle className="text-blue-700 flex items-center gap-2 text-base sm:text-lg">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
              <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 sm:py-3 border-b border-blue-100 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-gray-900 block text-sm sm:text-base truncate">
                        {item.title}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold text-amber-600 text-sm sm:text-lg whitespace-nowrap ml-2">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 flex justify-between items-center border-2 border-blue-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  Total ({getTotalItems()} items)
                </span>
                <span className="text-xl sm:text-2xl font-bold text-blue-700 whitespace-nowrap">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-end pt-3 sm:pt-4 border-t-2 border-blue-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg font-semibold transition-all w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isProcessing}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isProcessing
                ? "Processing..."
                : `Place Order - ${formatPrice(getTotalPrice())}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}