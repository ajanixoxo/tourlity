"use client"

import { useEffect } from "react"
import { usePaymentStore } from "@/lib/stores/payment-store"
import { fetchTransactions, refreshPaymentData } from "@/lib/api/payment-api"
import { PaymentSummaryCards } from "@/components/dashboard/payment/payment-summary"
import { PaymentMethods } from "@/components/dashboard/payment/payment-method"
import { TransactionHistory } from "@/components/dashboard/payment/transaction-history"
import Button from "@/components/root/button"

export default function PaymentDashboard() {
  const summary = usePaymentStore(state => state.summary)
  const transactions = usePaymentStore(state => state.transactions)
  const pagination = usePaymentStore(state => state.pagination)
  const isLoading = usePaymentStore(state => state.isLoading)

  // Handle pagination
  const handlePageChange = async (page: number) => {
    if (pagination) {
      await fetchTransactions(page, pagination.itemsPerPage);
    }
  };

  // Refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshPaymentData();
    }, 3000000);

    return () => clearInterval(interval);
  }, []);

  const hasData = transactions.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Payment</h1>
            <p className="text-gray-600 mt-1">
              View your transactions and track your tour payments
            </p>
          </div>
          <Button 
            onClick={refreshPaymentData}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {/* Payment Summary */}
        <PaymentSummaryCards 
          summary={{
            upcomingTrips: summary?.upcomingTrips || 0,
            totalSpent: summary?.totalSpent || 0,
            nextTripDays: 0 // We'll implement this later
          }} 
        />

        {/* Payment Methods */}
        <PaymentMethods
          paymentMethods={[
            {
              id: 'stripe',
              type: 'visa',
              isDefault: true,
              imgSrc: '/images/visa-payment.png'
            }
          ]}
          exchangeRates={[
            { currency: "USD", rate: 1 }
          ]}
          hasData={true}
        />

        {/* Transaction History */}
        <TransactionHistory 
          transactions={transactions}
          hasData={hasData}
        />
      </div>
    </div>
  )
}
