import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Button from "../../root/button"
import { Search } from "lucide-react"
import type { EarningsTransaction } from "@/types/earnings"
import Ghost from "@/components/root/ghost"

interface TransactionHistoryProps {
  transactions: EarningsTransaction[]
  hasData: boolean
}

export function TransactionHistory({ transactions, hasData }: TransactionHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid"
      case "processing":
        return "Processing"
      case "pending":
        return "Pending"
      default:
        return status
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center flex-col gap-2 lg:flex-row justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
        {hasData && (
          <div className="flex flex-col lg:flex-row gap-3">

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search by ID or host..." className="pl-10 w-72 lg:w-80" />
            </div>
            <div className="flex flex-row gap-2">
              <Button variant="secondary" className="text-gray-600 flex !px-2 items-center border-gray-300 bg-transparent">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="secondary" className="flex items-center gap-2 !px-2!bg-transparent">

                Filters
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_11_5696)">
                    <path d="M1.45898 7.00016C1.45898 4.3878 1.45898 3.08161 2.27054 2.27005C3.0821 1.4585 4.38828 1.4585 7.00065 1.4585C9.61302 1.4585 10.9192 1.4585 11.7308 2.27005C12.5423 3.08161 12.5423 4.3878 12.5423 7.00016C12.5423 9.61253 12.5423 10.9187 11.7308 11.7303C10.9192 12.5418 9.61302 12.5418 7.00065 12.5418C4.38828 12.5418 3.0821 12.5418 2.27054 11.7303C1.45898 10.9187 1.45898 9.61253 1.45898 7.00016Z" stroke="#9A9A9A" strokeLinejoin="round" />
                    <path d="M4.95898 5.8335C4.47574 5.8335 4.08398 5.44175 4.08398 4.9585C4.08398 4.47525 4.47574 4.0835 4.95898 4.0835C5.44223 4.0835 5.83398 4.47525 5.83398 4.9585C5.83398 5.44175 5.44223 5.8335 4.95898 5.8335Z" stroke="#9A9A9A" />
                    <path d="M9.04199 9.9165C9.52524 9.9165 9.91699 9.52475 9.91699 9.0415C9.91699 8.55825 9.52524 8.1665 9.04199 8.1665C8.55874 8.1665 8.16699 8.55825 8.16699 9.0415C8.16699 9.52475 8.55874 9.9165 9.04199 9.9165Z" stroke="#9A9A9A" />
                    <path d="M5.83366 4.9585L9.91699 4.9585" stroke="#9A9A9A" strokeLinecap="round" />
                    <path d="M8.16732 9.0415L4.08398 9.0415" stroke="#9A9A9A" strokeLinecap="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_11_5696">
                      <rect width={14} height={14} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Button>
            </div>

          </div>
        )}
      </div>

      {!hasData ? (
        <div className="text-center py-12">
          <div className="w-full flex items-center justify-center mx-auto mb-6 opacity-50">
           <Ghost/>
          </div>
          <p className="text-gray-500 text-lg">You have no transaction history yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Tour Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date and Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-4 px-4 text-gray-900">{transaction.tourName}</td>
                  <td className="py-4 px-4 text-gray-900">${transaction.amount}</td>
                  <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                    >
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
