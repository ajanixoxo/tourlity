"use client"

import Button from "../root/button"
import { Card } from "@/components/ui/card"
import { Download, X } from "lucide-react"
import type { BookingReceipt } from "@/types/tour-management"

interface BookingReceiptModalProps {
  receipt: BookingReceipt
  onClose: () => void
}

export function BookingReceiptModal({ receipt, onClose }: BookingReceiptModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "ongoing":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-coral-500 text-white p-6">
          <div>
            <h2 className="text-2xl font-semibold">Booking Receipt</h2>
            <p className="mt-1 text-coral-100">{receipt.receiptNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-coral-100">Issued Date</p>
            <p className="font-semibold">{receipt.issuedDate}</p>
          </div>
          <button onClick={onClose} className="ml-4 p-1 hover:bg-coral-600 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tour Info */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">{receipt.tourName}</h3>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
                {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
              </span>
              <p className="text-sm text-muted-foreground">{receipt.dateTime}</p>
              <p className="text-sm text-muted-foreground">{receipt.location}</p>
              <p className="text-sm text-muted-foreground">#{receipt.tourId}</p>
            </div>
          </div>

          {/* Customer and Host Details */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Customer Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium text-foreground">{receipt.customerDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email address</span>
                  <span className="font-medium text-foreground">{receipt.customerDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span className="font-medium text-foreground">{receipt.customerDetails.phone}</span>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Host Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium text-foreground">{receipt.hostDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email address</span>
                  <span className="font-medium text-foreground">{receipt.hostDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency Contact</span>
                  <span className="font-medium text-foreground">{receipt.hostDetails.emergencyContact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Payment</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium text-foreground">${receipt.paymentDetails.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium text-foreground">{receipt.paymentDetails.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-medium text-foreground">{receipt.paymentDetails.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-medium text-foreground">{receipt.paymentDetails.transactionDate}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Need help with this receipt?{" "}
              <a href="mailto:support@tourplatform.com" className="text-coral-500 hover:text-coral-600 font-medium">
                Contact support at support@tourplatform.com
              </a>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border bg-muted/30 p-6 flex gap-3">
          <Button variant="secondary" className="flex-1 bg-transparent" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1 bg-coral-500 hover:bg-coral-600 text-white gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </Card>
    </div>
  )
}
