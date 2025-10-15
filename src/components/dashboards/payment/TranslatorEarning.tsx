"use client"

import { useEffect } from "react"
import { EarningsMetrics } from "@/components/dashboard/earnings/earning-metrics"
import { PayoutMethods } from "@/components/dashboard/earnings/payout-methods"
import { TransactionHistory } from "@/components/dashboard/earnings/transaction-history"
import Button from "@/components/root/button"
import {
  useEarningsMetrics,
  usePayoutMethods,
  useEarningsTransactions,
  useEarningsHasData,
  useEarningsLoading,
  useEarningsError,
  useEarningsStore,
} from "@/lib/stores/earnings-store"

export default function TranslatorEarnings() {
  const metrics = useEarningsMetrics()
  const payoutMethods = usePayoutMethods()
  const transactions = useEarningsTransactions()
  const hasData = useEarningsHasData()
  const loading = useEarningsLoading()
  const error = useEarningsError()
  const fetchEarnings = useEarningsStore((state) => state.fetchEarnings)

  useEffect(() => {
    fetchEarnings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Earnings</h1>
            <p className="text-gray-600 mt-1">View compensation breakdowns, payout status, and assigned tour income.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="bg-white">
              Download Report (.CSV)
            </Button>
          </div>
        </div>
        {loading && <div className="text-center text-gray-500">Loading earnings...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        {!loading && !error && (
          <>
            <EarningsMetrics metrics={metrics} />
            <PayoutMethods payoutMethods={payoutMethods} hasData={hasData} />
            <TransactionHistory transactions={transactions} hasData={hasData} />
          </>
        )}
      </div>
    </div>
  )
}
