"use client"

import { useEffect } from "react"
import { PaymentMetrics } from "@/components/admin/payment/payment-metrics"
import { PayoutHistory } from "@/components/admin/payment/payout-history"
import { RefundHistory } from "@/components/admin/payment/refund-history"
import { 
    useAdminPaymentMetrics, 
    useAdminPayoutHistory, 
    useAdminRefundHistory,
    useAdminPaymentLoading,
    useAdminPaymentError
} from "@/lib/stores/admin-payment-store"
import { initializeAdminPaymentData } from "@/lib/api/admin-payment-api"

export default function AdminPaymentManagementPage() {
    const metrics = useAdminPaymentMetrics()
    const payoutHistory = useAdminPayoutHistory()
    const refundHistory = useAdminRefundHistory()
    const loading = useAdminPaymentLoading()
    const error = useAdminPaymentError()

    useEffect(() => {
        initializeAdminPaymentData()
    }, [])

    const hasData = metrics && (metrics.totalPayouts > 0 || metrics.pendingRefunds > 0 || payoutHistory.length > 0 || refundHistory.length > 0)

    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Payment Management</h1>
                    <p className="text-gray-600 mt-1">View host/facilitator earnings, approve payouts, and refunds</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">Error loading payment data: {error}</p>
                </div>
            </div>
        )
    }

    if (loading.metrics || loading.payouts || loading.refunds) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Payment Management</h1>
                    <p className="text-gray-600 mt-1">View host/facilitator earnings, approve payouts, and refunds</p>
                </div>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Payment Management</h1>
                <p className="text-gray-600 mt-1">View host/facilitator earnings, approve payouts, and refunds</p>
            </div>

            {metrics && <PaymentMetrics metrics={metrics} />}

            <PayoutHistory transactions={payoutHistory} hasData={hasData || null} />

            {hasData && <RefundHistory transactions={refundHistory} hasData={hasData} />}
        </div>
    )
}
