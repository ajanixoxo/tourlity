"use client"

import { useState, useEffect } from "react"
import Button from "@/components/root/button"
import { MapPin, Calendar, Download, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { fetchBookings, type Booking } from "@/lib/services/bookingService"
import { format } from "date-fns"

type FilterStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"

const statusMap: Record<FilterStatus, string> = {
  "PENDING": "In Progress",
  "CONFIRMED": "Upcoming",
  "COMPLETED": "Completed",
  "CANCELLED": "Cancelled"
}

export default function MyBookingsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("CONFIRMED")
  const [searchQuery, setSearchQuery] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch bookings on mount and when filter changes
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetchBookings({
          page: 1,
          limit: 50,
          status: activeFilter
        })
        setBookings(response.bookings)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load bookings")
        console.error("Error loading bookings:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [activeFilter])

  // Filter bookings by search query
  const filteredBookings = bookings.filter((booking) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      booking.tour?.title?.toLowerCase().includes(query) ||
      booking.tour?.location?.toLowerCase().includes(query) ||
      booking.id.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">My Bookings</h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Manage your upcoming and past tours — update details, download tickets, or cancel with ease.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={activeFilter === "PENDING" ? "primary" : "secondary"}
              onClick={() => setActiveFilter("PENDING")}
              className="rounded-full"
            >
              In Progress
            </Button>
            <Button
              variant={activeFilter === "CONFIRMED" ? "primary" : "secondary"}
              onClick={() => setActiveFilter("CONFIRMED")}
              className="rounded-full"
            >
              Upcoming
            </Button>
            <Button
              variant={activeFilter === "COMPLETED" ? "primary" : "secondary"}
              onClick={() => setActiveFilter("COMPLETED")}
              className="rounded-full"
            >
              Completed
            </Button>
            <Button
              variant={activeFilter === "CANCELLED" ? "primary" : "secondary"}
              onClick={() => setActiveFilter("CANCELLED")}
              className="rounded-full"
            >
              Cancelled
            </Button>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="secondary" className="flex items-center gap-2 bg-transparent">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
            <div className="relative flex-1 sm:w-96">
              {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /> */}
              <Input
                placeholder="Search by Tour title, location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 !py-5 !bg-white rounded-[18px]"
              />
            </div>
            <Button variant="secondary">Search Tour</Button>
          </div>
        </div>

        {/* Count */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-foreground">
            {statusMap[activeFilter]} Bookings{" "}
            <span className="text-muted-foreground">({filteredBookings.length})</span>
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Bookings List */}
        {!isLoading && !error && (
          <div className="space-y-4 bg-white rounded-3xl p-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md md:flex-row md:items-center"
              >
                {/* Tour Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-32 md:w-48 md:shrink-0">
                  <Image
                    src={booking.tour?.images?.[0] || "/placeholder.svg"}
                    alt={booking.tour?.title || "Tour"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 192px"
                  />
                </div>

                {/* Tour Details */}
                <div className="flex flex-1 flex-col gap-3">
                  <Link href={booking.tourId ? `/dashboard/tours/${booking.tourId}` : "#"}>
                    <h3 className="text-lg font-semibold text-foreground hover:text-coral-500 cursor-pointer">
                      {booking.tour?.title || "Tour"}
                    </h3>
                  </Link>

                  {/* Location */}
                  {booking.tour?.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.tour.location}</span>
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(booking.scheduledDate), "PPP 'at' p")}</span>
                  </div>

                  {/* Booking Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Amount: </span>
                      <span className="font-medium text-foreground">
                        ${booking.amount} {booking.currency}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Participants: </span>
                      <span className="font-medium text-foreground">{booking.participants}</span>
                    </div>
                  </div>

                  {/* Host */}
                  {booking.tour?.host && (
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src={booking.tour.host.avatar || "/placeholder.svg"}
                          alt={`${booking.tour.host.firstName} ${booking.tour.host.lastName}`}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Host</p>
                        <p className="font-medium text-foreground">
                          {booking.tour.host.firstName} {booking.tour.host.lastName}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 md:shrink-0 md:items-end">
                  <div className="flex gap-2">
                    {activeFilter === "CONFIRMED" && (
                      <>
                        <Button variant="secondary">
                          Cancel Tour
                        </Button>
                        <Button className="flex items-center">
                          <Download className="mr-2 h-4 w-4 flex items-center" />
                          Download Ticket
                        </Button>
                      </>
                    )}
                    {(activeFilter === "COMPLETED" || booking.status === "COMPLETED") && (
                      <Button className="flex items-center">
                        <Download className="mr-2 h-4 w-4 " />
                        Download Ticket
                      </Button>
                    )}
                    <Link href={`/dashboard/bookings/${booking.id}`}>
                      <Button variant="secondary">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">No {statusMap[activeFilter]} bookings found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {activeFilter === "CONFIRMED"
                  ? "Book a tour to see it here"
                  : `You don't have any ${statusMap[activeFilter].toLowerCase()} bookings`}
              </p>
              {activeFilter === "CONFIRMED" && (
                <Link href="/dashboard">
                  <Button className="mt-4">Explore Tours</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
