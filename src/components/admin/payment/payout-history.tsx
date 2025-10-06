/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { Search, Download,  MoreVertical } from "lucide-react"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { PayoutTransaction } from "@/types/admin-payment"

interface PayoutHistoryProps {
  transactions: PayoutTransaction[]
  hasData: boolean
}

export function PayoutHistory({ transactions, hasData }: PayoutHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (!hasData) {
    return (
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Payout History</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by ID or host..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
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
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-32 h-32 mb-6">
            <svg viewBox="0 0 120 120" className="w-full h-full text-gray-300">
              <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.1" />
              <circle cx="45" cy="50" r="3" fill="currentColor" opacity="0.3" />
              <circle cx="75" cy="50" r="3" fill="currentColor" opacity="0.3" />
              <path d="M40 75 Q60 85 80 75" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">You don't have transaction yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Payout History</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by ID or host..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-72 lg:w-100 !bg-transparent "
              />
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
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-900">Name</th>
              <th className="text-left p-4 font-medium text-gray-900">Role</th>
              <th className="text-left p-4 font-medium text-gray-900">Amount</th>
              <th className="text-left p-4 font-medium text-gray-900">Date</th>
              <th className="text-left p-4 font-medium text-gray-900">Status</th>
              <th className="text-left p-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{transaction.name}</td>
                <td className="p-4 text-gray-600">{transaction.role}</td>
                <td className="p-4 text-gray-900">${transaction.amount}</td>
                <td className="p-4 text-gray-600">{transaction.date}</td>
                <td className="p-4">{getStatusBadge(transaction.status)}</td>
                <td className="p-4 flex flex-col justify-center ">
                  <div className="flex items-center gap-2">
                    {transaction.status === "Paid" ? (
                      <div  className="flex gap-1 text-xs text-primary-color  items-center text-coral-600 hover:text-coral-700">
                        <Download className="w-4 h-4 mr-1" />
                        Download receipt
                      </div>
                    ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex flex-col justify-center" >
                          <MoreVertical className="w-4 h-4" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact User</DropdownMenuItem>
                        {transaction.status === "Pending" && <DropdownMenuItem>Process Payment</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t">
        <p className="text-sm text-gray-600">
          Showing {Math.min(5, filteredTransactions.length)} of {filteredTransactions.length} transactions
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" disabled>
            &lt;
          </Button>
          <Button className="bg-coral-500 text-white">
            1
          </Button>
          <Button variant="secondary" >
            2
          </Button>
          <Button variant="secondary" >
            3
          </Button>
          <Button variant="secondary" >
            4
          </Button>
          <Button variant="secondary" >
            5
          </Button>
          <Button variant="secondary" >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
