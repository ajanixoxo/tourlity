"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreVertical } from "lucide-react"
import { EmptyState } from "@/components/admin/empty-state"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface RecentTourListingsProps {
  tours: Array<{
    id: string
    title: string
    status: string
    host: {
      name: string
      avatar?: string
    }
    stats: {
      bookings: number
      reviews: number
    }
  }>
  hasData: boolean
}

export function RecentTourListings({ tours, hasData }: RecentTourListingsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "PENDING_APPROVAL":
        return "bg-yellow-100 text-yellow-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!hasData) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Tour Listings</h3>
        </div>
        <EmptyState
          title="No tour listings yet"
          description="Recent tour listings will appear here once tours are created."
        />
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Tour Listings</h3>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="secondary" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Tour Title</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Host</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Stats</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{tour.title}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {tour.host.avatar && (
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={tour.host.avatar}
                          alt={tour.host.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-gray-700">{tour.host.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge className={getStatusColor(tour.status)}>
                    {tour.status.replace("_", " ")}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      {tour.stats.bookings} bookings
                    </span>
                    <span className="text-sm text-gray-600">
                      {tour.stats.reviews} reviews
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Tour</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Disable Tour
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}