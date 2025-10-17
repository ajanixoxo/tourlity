"use client"

import { useState } from "react"
import Button from "@/components/root/button"
import { MapPin, DollarSign, Eye } from "lucide-react"
import { customTourRequests } from "@/data/tour-management-data"
import type { CustomTourRequest } from "@/types/tour-management"
import Link from "next/link"

type FilterStatus = "all" | "pending" | "negotiating" | "confirmed" | "declined"

export default function CustomizeToursPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = customTourRequests.filter((request) => {
    const matchesFilter = activeFilter === "all" || request.status === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: CustomTourRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "negotiating":
        return "bg-blue-100 text-blue-700"
      case "declined":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: CustomTourRequest["status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Customize Tours</h1>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              Request a tour your way. Compare host offers and pick what fits best.
            </p>
          </div>
          <Link href="/dashboard/customize-tours/new">
            <Button  className="w-full sm:w-auto">
              New Tour Request
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "all" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("all")}
            className="rounded-full"
          >
            All
          </Button>
          <Button
            variant={activeFilter === "pending" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("pending")}
            className="rounded-full"
          >
            Pending
          </Button>
          <Button
            variant={activeFilter === "negotiating" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("negotiating")}
            className="rounded-full"
          >
            Negotiating
          </Button>
          <Button
            variant={activeFilter === "confirmed" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("confirmed")}
            className="rounded-full"
          >
            Confirmed
          </Button>
          <Button
            variant={activeFilter === "declined" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("declined")}
            className="rounded-full"
          >
            Declined
          </Button>
        </div>

        {/* Count */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-foreground">
            All <span className="text-muted-foreground">({filteredRequests.length})</span>
          </h2>
        </div>

        {/* Tour Requests Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="relative rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              {/* Status Badge */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">{request.title}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(request.status)}`}>
                  {getStatusLabel(request.status)}
                </span>
              </div>

              {/* Categories */}
              <div className="mb-3 flex flex-wrap gap-2">
                {request.tourType.map((type, index) => (
                  <span key={index} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {type}
                  </span>
                ))}
              </div>

              {/* Location */}
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{request.location}</span>
              </div>

              {/* Price Range */}
              {request.priceRange && (
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{request.priceRange}</span>
                </div>
              )}

              {/* View Details Link */}
              <Link
                href={`/dashboard/customize-tours/${request.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">No tour requests found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters or create a new tour request
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
