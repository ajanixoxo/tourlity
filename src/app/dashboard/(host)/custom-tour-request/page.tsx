"use client"

import { useState } from "react"
import Button from "@/components/root/button"
import { MapPin, Calendar, Users, Info, Eye, X } from "lucide-react"
import { customTourRequests } from "@/data/tour-management-data"
import type { CustomTourRequest } from "@/types/tour-management"
import { EmptyState } from "@/components/admin/empty-state"

type FilterStatus = "all" | "new" | "negotiating" | "accepted" | "declined"

export default function CustomTourRequestsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = customTourRequests.filter((request) => {
    const statusMap: Record<string, FilterStatus> = {
      pending: "new",
      negotiating: "negotiating",
      accepted: "accepted",
      declined: "declined",
    }
    const mappedStatus = statusMap[request.status]
    const matchesFilter = activeFilter === "all" || mappedStatus === activeFilter
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
      case "accepted":
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
    if (status === "pending") return "Pending"
    if (status === "accepted") return "Accepted"
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getActionButtons = (status: CustomTourRequest["status"]) => {
    if (status === "pending") {
      return (
        <div className="flex gap-2">
          <Button >Accept</Button>
          <Button variant="secondary">
            Negotiate
          </Button>
        </div>
      )
    }
    if (status === "declined") {
      return (
        <div className="flex gap-2">
          <Button variant="secondary" disabled>
            Accept
          </Button>
          <Button variant="secondary" disabled>
            Negotiate
          </Button>
        </div>
      )
    }
    if (status === "accepted") {
      return (
        <Button disabled>
          Accepted
        </Button>
      )
    }
    if (status === "negotiating") {
      return (
        <div className="flex gap-2">
          <Button >Accept</Button>
          <Button variant="secondary">
            Negotiate
          </Button>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Custom Tour Requests</h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Review guest requests, propose budgets, and confirm the tours you can host.
          </p>
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
            variant={activeFilter === "new" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("new")}
            className="rounded-full"
          >
            New
          </Button>
          <Button
            variant={activeFilter === "negotiating" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("negotiating")}
            className="rounded-full"
          >
            Negotiating
          </Button>
          <Button
            variant={activeFilter === "accepted" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("accepted")}
            className="rounded-full"
          >
            Accepted
          </Button>
          <Button
            variant={activeFilter === "declined" ? "primary" : "secondary"}
            onClick={() => setActiveFilter("declined")}
            className="rounded-full"
          >
            Declined
          </Button>
        </div>
        <div className="p-4 bg-white rounded-3xl">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-foreground">
              All <span className="text-muted-foreground">({filteredRequests.length})</span>
            </h2>
          </div>

          {/* Tour Requests Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="relative rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                {/* Close Button */}
                <button className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>

                {/* Header with Status */}
                <div className="mb-4 flex items-start justify-between pr-8">
                  <h3 className="text-lg font-semibold text-foreground">{request.title}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusLabel(request.status)}
                  </span>
                </div>

                {/* Tour Type */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span className="font-medium">Tour Type</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {request.tourType.map((type, index) => (
                      <span key={index} className="rounded-full bg-muted px-3 py-1 text-xs text-foreground">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="text-sm text-foreground">{request.location}</p>
                </div>

                {/* Date & Time */}
                <div className="mb-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Date & Time</span>
                  </div>
                  <p className="text-sm text-foreground">{request.dateTime}</p>
                </div>

                {/* Group Info */}
                <div className="mb-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Group Info</span>
                  </div>
                  <p className="text-sm text-foreground">{request.groupInfo}</p>
                </div>

                {/* Assistance Needed */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span className="font-medium">Assistance Needed</span>
                  </div>
                  <p className="text-sm text-foreground">{request.assistanceNeeded}</p>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm text-muted-foreground">{request.description}</p>

                {/* Actions */}
                <div className="flex items-center justify-between gap-4">
                  {getActionButtons(request.status)}
                  <button className="inline-flex  items-center gap-2 text-sm font-medium text-primary-color hover:underline">
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <EmptyState description="No tour requests found" />
          )}
        </div>
        {/* Count */}

      </div>
    </div>
  )
}
