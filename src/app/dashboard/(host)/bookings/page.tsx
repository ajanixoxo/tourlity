"use client"

import { useState } from "react"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, SlidersHorizontal, Download, Eye } from "lucide-react"
import { hostBookings } from "@/data/tour-management-data"

type FilterStatus = "upcoming" | "completed" | "cancelled"

export default function HostBookingsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("upcoming")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredBookings = hostBookings.filter((booking) => {
    const matchesFilter = activeFilter === "upcoming" ? booking.status === "pending" : booking.status === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestName?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completed</span>
      case "pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Pending</span>
      case "ongoing":
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Ongoing</span>
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">Track your tour status</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                setActiveFilter("upcoming")
                setCurrentPage(1)
              }}
              variant={activeFilter === "upcoming" ? "primary" : "secondary"}
              className="rounded-full"
            >
              Upcoming
            </Button>
            <Button
              onClick={() => {
                setActiveFilter("completed")
                setCurrentPage(1)
              }}
              variant={activeFilter === "completed" ? "primary" : "secondary"}
              className="rounded-full"
            >
              Completed
            </Button>
            <Button
              onClick={() => {
                setActiveFilter("cancelled")
                setCurrentPage(1)
              }}
              variant={activeFilter === "cancelled"? "primary" : "secondary"}
              className="rounded-full"
            >
              Cancelled
            </Button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="secondary" className="gap-2 flex items-center bg-transparent">
             
              Filters
               <SlidersHorizontal className="w-4 h-4" />
            </Button>
            <div className="relative flex-1 ">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by Tour title, location"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 flex flex-1"
              />
            </div>
            <Button variant="secondary">Search Tour</Button>
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tour Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date and Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{booking.title}</td>
                    <td className="px-6 py-4 text-sm text-foreground">${booking.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{booking.dateTime}</td>
                    <td className="px-6 py-4 text-sm">{getStatusBadge(booking.status)}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        {booking.status === "completed" && (
                          <button className="text-primary-color  hover:text-hover-color font-medium flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Receipt
                          </button>
                        )}
                        {booking.status === "pending" && (
                          <button className="text-primary-color hover:text-hover-color font-medium flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            Track
                          </button>
                        )}
                        {booking.status === "in-progress" && (
                          <button className="text-primary-color  hover:text-hover-color font-medium flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Receipt
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} of {filteredBookings.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-border rounded hover:bg-muted disabled:opacity-50"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded font-medium transition-colors ${currentPage === page ? "bg-coral-500 text-white" : "border border-border hover:bg-muted"
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-border rounded hover:bg-muted disabled:opacity-50"
              >
                ›
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {paginatedBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-muted-foreground">No bookings found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search</p>
          </div>
        )}
      </div>
    </div>
  )
}
