"use client"

import { useState } from "react"
import { PaymentMetrics } from "@/components/admin/payment/payment-metrics"
import { PayoutHistory } from "@/components/admin/payment/payout-history"
import { RefundHistory } from "@/components/admin/payment/refund-history"
import { adminPaymentDataWithTransactions, adminPaymentDataEmpty } from "@/data/admin-payment-data"

export default function AdminPaymentManagementPage() {
    // Toggle between populated and empty state for demo
    const [hasData] = useState(true)
    const data = hasData ? adminPaymentDataWithTransactions : adminPaymentDataEmpty

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Payment Management</h1>
                <p className="text-gray-600 mt-1">View host/facilitator earnings, approve payouts, and refunds</p>
            </div>

            <PaymentMetrics metrics={data.metrics} />

            <PayoutHistory transactions={data.payoutHistory} hasData={data.hasData} />

            {data.hasData && <RefundHistory transactions={data.refundHistory} hasData={data.hasData} />}
        </div>
    )
}
