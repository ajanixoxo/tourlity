/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronRight } from "lucide-react"

interface GuestNotesTour {
  id: string
  title: string
  time: string
  location: string
  image: string
  host: {
    name: string
    avatar: string
  }
  guestCount: number
  specialNeeds: number
  accessibility: number
  dietary: number
}

const guestNotesTours: GuestNotesTour[] = [
  {
    id: "1",
    title: "Historic Downtown Walking Tour",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    location: "Queensland, Australia",
    image: "/historic-downtown-walking-tour.jpg",
    host: {
      name: "Maria Santos",
      avatar: "/maria-santos.jpg",
    },
    guestCount: 18,
    specialNeeds: 2,
    accessibility: 2,
    dietary: 2,
  },
  {
    id: "2",
    title: "Historic Downtown Walking Tour",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    location: "Queensland, Australia",
    image: "/historic-downtown-walking-tour.jpg",
    host: {
      name: "Maria Santos",
      avatar: "/maria-santos.jpg",
    },
    guestCount: 18,
    specialNeeds: 5,
    accessibility: 3,
    dietary: 4,
  },
  {
    id: "3",
    title: "Art & Culture Exhibition",
    time: "Tomorrow, 1:00 PM - 4:00 PM (GMT+2)",
    location: "Melbourne, Australia",
    image: "/art-culture-exhibition.jpg",
    host: {
      name: "James Lee",
      avatar: "/james-lee.jpg",
    },
    guestCount: 30,
    specialNeeds: 3,
    accessibility: 4,
    dietary: 2,
  },
]

export default function GuestNotesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Guest Notes</h1>
        <p className="text-gray-600 mt-2">
          View preferences, accessibility needs, and special instructions for assigned guests.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for guests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="secondary" className="flex items-center gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Tours List */}
      <div className="space-y-4">
        {guestNotesTours.map((tour) => (
          <Card key={tour.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Tour Image */}
              <div className="flex-shrink-0">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </div>

              {/* Tour Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{tour.title}</h3>
                <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm text-gray-600">
                  <span>🕐 {tour.time}</span>
                  <span>📍 {tour.location}</span>
                </div>

                {/* Host */}
                <div className="flex items-center gap-2 mt-3">
                  <img
                    src={tour.host.avatar || "/placeholder.svg"}
                    alt={tour.host.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Host:</span> {tour.host.name}
                  </span>
                </div>

                {/* Guest Stats */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <Badge variant="secondary" className="bg-blue-50">
                    👥 {tour.guestCount} Guests
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-50">
                    ⚠️ {tour.specialNeeds} Special Needs
                  </Badge>
                  <Badge variant="secondary" className="bg-green-50">
                    ♿ {tour.accessibility} Accessibility
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-50">
                    🍽️ {tour.dietary} Dietary
                  </Badge>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 flex items-center">
                <Link href={`/dashboard/facilitator/guest-notes/${tour.id}`}>
                  <Button className="bg-coral-500 hover:bg-coral-600 text-white flex items-center gap-2">
                    View Guest Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
