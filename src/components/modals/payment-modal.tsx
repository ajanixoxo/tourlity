"use client"

import type React from "react"

import { useState } from "react"
import Button from "../root/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import type { PaymentSummary } from "@/types/tour-management"

interface PaymentModalProps {
  paymentSummary: PaymentSummary
  onClose: () => void
  onSubmit?: () => void
}

export function PaymentModal({ paymentSummary, onClose, onSubmit }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-2xl font-semibold text-foreground">Make Payment</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Details */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Booking Details</h3>
            <div className="space-y-2 text-sm bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Host</span>
                <span className="font-medium text-foreground">Michael Thompson</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event Type</span>
                <span className="font-medium text-foreground">Corporate Workshop</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">March 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium text-foreground">4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Participants</span>
                <span className="font-medium text-foreground">25 people</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Host Fee</span>
                <span className="font-medium text-foreground">${paymentSummary.hostFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Facilitator Fee</span>
                <span className="font-medium text-foreground">${paymentSummary.facilitatorFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Translator Fee</span>
                <span className="font-medium text-foreground">${paymentSummary.translatorFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-medium text-foreground">${paymentSummary.platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span className="font-medium text-foreground">${paymentSummary.taxes.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-lg text-foreground">${paymentSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                  paymentMethod === "card"
                    ? "border-coral-500 bg-coral-50 text-coral-600"
                    : "border-border text-foreground hover:border-coral-300"
                }`}
              >
                💳 Card
              </button>
              <button
                onClick={() => setPaymentMethod("paypal")}
                className={`flex-1 px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                  paymentMethod === "paypal"
                    ? "border-coral-500 bg-coral-50 text-coral-600"
                    : "border-border text-foreground hover:border-coral-300"
                }`}
              >
                🅿️ Paypal
              </button>
            </div>
          </div>

          {/* Card Information */}
          {paymentMethod === "card" && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                <Input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  placeholder="e.g., 0897 9078 6779 0957"
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Expiry Date</label>
                  <Input
                    type="text"
                    name="expiryDate"
                    value={cardData.expiryDate}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">CVV</label>
                  <Input
                    type="text"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    placeholder="e.g., 756"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Terms Agreement */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the terms and conditions
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border bg-muted/30 p-6 flex gap-3">
          <Button variant="secondary" className="flex-1 bg-transparent" onClick={onClose}>
            Go Back
          </Button>
          <Button
            className="flex-1 bg-coral-500 hover:bg-coral-600 text-white"
            disabled={!agreedToTerms}
            onClick={onSubmit}
          >
            Pay ${paymentSummary.total.toFixed(2)} Now
          </Button>
        </div>
      </Card>
    </div>
  )
}
