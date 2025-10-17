"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

interface CustomInvite {
  id: string
  title: string
  host: string
  date: string
  time: string
  location: string
  fee: string
  status: "pending" | "confirmed" | "declined"
}

const customInvites: CustomInvite[] = [
  {
    id: "1",
    title: "Cultural Heritage Walking Tour",
    host: "Musa B.",
    date: "Jul 01, 2025",
    time: "09:00am - 12:00pm",
    location: "Boston, MA Freedom Trail Area",
    fee: "$150.00",
    status: "pending",
  },
  {
    id: "2",
    title: "Cultural Heritage Walking Tour",
    host: "Ada O.",
    date: "Jul 01, 2025",
    time: "09:00am - 12:00pm",
    location: "Boston, MA Freedom Trail Area",
    fee: "$150.00",
    status: "pending",
  },
  {
    id: "3",
    title: "Cultural Heritage Walking Tour",
    host: "John D.",
    date: "Jul 01, 2025",
    time: "09:00am - 12:00pm",
    location: "Boston, MA Freedom Trail Area",
    fee: "$150.00",
    status: "confirmed",
  },
  {
    id: "4",
    title: "Cultural Heritage Walking Tour",
    host: "John D.",
    date: "Jul 01, 2025",
    time: "09:00am - 12:00pm",
    location: "Boston, MA Freedom Trail Area",
    fee: "$150.00",
    status: "declined",
  },
]

export default function CustomInvitesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Custom Tour Invites</h1>
        <p className="text-gray-600 mt-2">
          See the tours you&apos;ve been invited to support and confirm your availability.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for tours, hosts or guest..."
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

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tour Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Host Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date and Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fixed Fee</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customInvites.map((invite) => (
                <tr key={invite.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{invite.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-900">{invite.host}</div>
                    <div className="text-xs text-gray-500">Downtown Historical District</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{invite.date}</div>
                    <div className="text-xs text-gray-500">{invite.time}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{invite.location}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{invite.fee}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge className={getStatusColor(invite.status)}>
                      {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button  variant="secondary">
                      ⋮
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 5 of 24 Bookings</p>
        <div className="flex gap-2">
          <Button variant="secondary" >
            ←
          </Button>
          <Button className="bg-coral-500 text-white" >
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
            →
          </Button>
        </div>
      </div>
    </div>
  )
}
