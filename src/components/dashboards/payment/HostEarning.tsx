"use client"

import { useState } from "react"
import { EarningsMetrics } from "@/components/dashboard/earning-metrics"
import {PayoutMethods} from "@/components/dashboard/payout-methods"
import { TransactionHistory } from "@/components/dashboard/transaction-history"
import Button from "@/components/root/button"
import { hostEarningsData, emptyEarningsData } from "@/data/earnings-data"

export default function HostEarnings() {
  // Toggle between states for demo purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasData, setHasData] = useState(true)
  const data = hasData ? hostEarningsData : emptyEarningsData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Earnings</h1>
            <p className="text-gray-600 mt-1">View compensation breakdowns, payout status, and assigned tour income.</p>
          </div>
          <div className="flex gap-3">
            {/* Demo Toggle Button */}
            {/* <Button onClick={() => setHasData(!hasData)} variant="primary" className="text-gray-600 border-gray-300">
              Toggle {hasData ? "Empty" : "Data"} State
            </Button> */}
            <Button variant="secondary" className="text-gray-600 border-gray-300 bg-transparent">
              Download Report (.CSV)
            </Button>
          </div>
        </div>

        {/* Earnings Metrics */}
        <EarningsMetrics metrics={data.metrics} />

        {/* Payment Methods */}
        <PayoutMethods payoutMethods={data.payoutMethods} hasData={data.hasData} />

        {/* Transaction History */}
        <TransactionHistory transactions={data.transactions} hasData={data.hasData} />
      </div>
    </div>
  )
}
