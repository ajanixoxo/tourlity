"use client"

import { useState } from "react"
import Button from "@/components/root/button"
import { MapPin, Calendar, Download, SlidersHorizontal } from "lucide-react"
import { bookings } from "@/data/tour-management-data"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"

type FilterStatus = "in-progress" | "upcoming" | "completed" | "cancelled"

export default function MyBookingsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("in-progress")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBookings = bookings.filter((booking) => booking.status === activeFilter)

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
          <div className="flex items-center gap-2">
            <Button
              variant={activeFilter === "in-progress" ? "primary" : "secondary"}
              onClick={() => setActiveFilter("in-progress")}
              className="rounded-full"
            >
              In Progess
            </Button>
            <Button
              variant={activeFilter === "upcoming" ? "primary" : "secondary"}
              onClick={() => setActiveFilter("upcoming")}
              className="rounded-full"
            >
              Upcoming
            </Button>
            <Button
              variant={activeFilter === "completed" ? "primary" : "secondary"}
              onClick={() => setActiveFilter("completed")}
              className="rounded-full"
            >
              Completed
            </Button>
            <Button
              variant={activeFilter === "cancelled" ? "primary" : "secondary"}
              onClick={() => setActiveFilter("cancelled")}
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
            {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Bookings{" "}
            <span className="text-muted-foreground">({filteredBookings.length})</span>
          </h2>
        </div>

        {/* Bookings List */}
        <div className="space-y-4 bg-white rounded-3xl p-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md md:flex-row md:items-center"
            >
              {/* Tour Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-32 md:w-48 md:shrink-0">
                <Image
                  src={booking.image || "/placeholder.svg"}
                  alt={booking.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>

              {/* Tour Details */}
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-lg font-semibold text-foreground">{booking.title}</h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{booking.location}</span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{booking.dateTime}</span>
                </div>

                {/* Host and Translator */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={booking.host.avatar || "/placeholder.svg"}
                        alt={booking.host.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Host</p>
                      <p className="font-medium text-foreground">{booking.host.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={booking.translator.avatar || "/placeholder.svg"}
                        alt={booking.translator.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Translator</p>
                      <p className="font-medium text-foreground">{booking.translator.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 md:shrink-0 md:items-end">

                <div className="flex gap-2">
                  {activeFilter === "upcoming" && (
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
                  {activeFilter === "completed" && (
                    <Button className="flex items-center">
                      <Download className="mr-2 h-4 w-4 " />
                      Download Ticket
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">No {activeFilter} bookings found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {activeFilter === "upcoming"
                  ? "Book a tour to see it here"
                  : `You don't have any ${activeFilter} bookings`}
              </p>
              {activeFilter === "upcoming" && (
                <Link href="/explore">
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
