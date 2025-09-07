"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreVertical } from "lucide-react"
import { recentTourListings } from "@/data/admin-data"
import { EmptyState } from "@/components/admin/empty-state"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function RecentTourListings() {
  const [searchQuery, setSearchQuery] = useState("")
  const hasListings = recentTourListings.length > 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Tour Listing...</h3>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by ID or host..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="secondary" className="flex items-center gap-2 bg-transparent">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button variant="secondary" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {hasListings ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-[#FFF6F5] border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tour Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Host Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Guest</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTourListings.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{listing.title}</td>
                  <td className="py-4 px-4 text-gray-700">{listing.hostName}</td>
                  <td className="py-4 px-4 text-gray-700">{listing.guest}</td>
                  <td className="py-4 px-4 text-gray-700">{listing.date}</td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(listing.status)}>{listing.status}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="border-none" >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                        <DropdownMenuItem>Contact Host</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No recent tour listings found"
          description="Recent tour bookings and listings will appear here once you have activity on the platform."
        />
      )}
    </Card>
  )
}
