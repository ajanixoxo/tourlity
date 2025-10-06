
import { Card } from "@/components/ui/card"
import type { AdminPaymentMetrics } from "@/types/admin-payment"
import MoneyBag from "@/components/dashboard/icons/MoneyBag"
import MoneyRing from "@/components/dashboard/icons/MoneyRing"
import Users from "@/components/dashboard/icons/Users"

interface PaymentMetricsProps {
  metrics: AdminPaymentMetrics
}

export function PaymentMetrics({ metrics }: PaymentMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Payouts */}
      <Card className="p-6 border-l-4 border-l-blue-500">
        <div className="flex flex-row-reverse items-start justify-between gap-3">
          <div className="flex flex-col items-end justify-between gap-4">
            <div className="">
              <MoneyBag />
            </div>
            <span className="text-xs text-gray-500">{metrics.period}</span>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Total Payouts</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">${metrics.totalPayouts}</p>

            </div>
          </div>
        </div>
      </Card>

      {/* Pending Refunds */}
      <Card className="p-6 border-l-4 border-l-green-500">
        <div className="flex flex-row-reverse items-start justify-between gap-3">
          <div className="">
            <MoneyRing />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Refunds</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.pendingRefunds}</p>
          </div>
        </div>
      </Card>

      {/* Top Earner */}
      <Card className="p-6 border-l-4 border-l-yellow-500">
        <div className="flex flex-row-reverse items-start justify-between gap-3">
          <div className="">
            <Users />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Top Earner</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.topEarner}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
