/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { PaymentSummaryCards } from "@/components/dashboard/payment/payment-summary"
import { PaymentMethods } from "@/components/dashboard/payment/payment-method"
import { TransactionHistory } from "@/components/dashboard/payment/transaction-history"
import Button from "@/components/root/button"
import { paymentDataWithTransactions, paymentDataEmpty } from "@/data/payment-data"

export default function PaymentDashboard() {
  // Toggle between states for demo purposes
  const [hasData, setHasData] = useState(true)
  const data = hasData ? paymentDataWithTransactions : paymentDataEmpty

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      <div className=" space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Payment</h1>
            <p className="text-gray-600 mt-1">
              View your transactions, manage payment methods, and track discounts or referral bonuses
            </p>
          </div>
          {/* Demo Toggle Button */}
          {/* <Button onClick={() => setHasData(!hasData)} variant="primary" className="text-gray-600 border-gray-300">
            Toggle {hasData ? "Empty" : "Data"} State
          </Button> */}
        </div>

        {/* Payment Summary */}
        <PaymentSummaryCards summary={data.summary} />

        {/* Payment Methods */}
        <PaymentMethods
          paymentMethods={data.paymentMethods}
          exchangeRates={data.exchangeRates}
          hasData={data.hasData}
        />

        {/* Transaction History */}
        <TransactionHistory transactions={data.transactions} hasData={data.hasData} />
      </div>
    </div>
  )
}
