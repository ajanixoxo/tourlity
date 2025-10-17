/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

interface TranslatorRequest {
  id: string
  title: string
  time: string
  languages: {
    from: string
    to: string
  }
  status: "pending" | "unmatched"
  image: string
  translatorCount: {
    from: number
    to: number
  }
}

const translatorRequests: TranslatorRequest[] = [
  {
    id: "1",
    title: "Historic Downtown Walking Tour",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    languages: { from: "English", to: "Portuguese" },
    status: "pending",
    image: "/placeholder.svg?key=8bnvl",
    translatorCount: { from: 8, to: 3 },
  },
  {
    id: "2",
    title: "Historic Downtown Walking Tour",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    languages: { from: "English", to: "Portuguese" },
    status: "unmatched",
    image: "/placeholder.svg?key=2bnvl",
    translatorCount: { from: 8, to: 3 },
  },
  {
    id: "3",
    title: "Historic Downtown Walking Tour",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    languages: { from: "English", to: "Portuguese" },
    status: "unmatched",
    image: "/placeholder.svg?key=3bnvl",
    translatorCount: { from: 8, to: 3 },
  },
  {
    id: "4",
    title: "Historic Downtown Walking Tour",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    languages: { from: "English", to: "Portuguese" },
    status: "pending",
    image: "/placeholder.svg?key=4bnvl",
    translatorCount: { from: 8, to: 3 },
  },
  {
    id: "5",
    title: "Historic Downtown Walking Tour",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    languages: { from: "Japanese", to: "English" },
    status: "unmatched",
    image: "/placeholder.svg?key=5bnvl",
    translatorCount: { from: 8, to: 3 },
  },
  {
    id: "6",
    title: "Historic Downtown Walking Tour",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    languages: { from: "English", to: "Portuguese" },
    status: "pending",
    image: "/placeholder.svg?key=6bnvl",
    translatorCount: { from: 8, to: 3 },
  },
]

export default function TranslatorRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
    return <Badge className="bg-red-100 text-red-800">Unmatched</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Translator Requests</h1>
        <p className="text-gray-600 mt-2">Manage language pairing duties and see which tours have translator needs.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for tours..."
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

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {translatorRequests.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* Tour Image */}
            <div className="mb-4">
              <img
                src={request.image || "/placeholder.svg"}
                alt={request.title}
                className="w-full h-40 rounded-lg object-cover"
              />
            </div>

            {/* Tour Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h3>

            {/* Time */}
            <p className="text-sm text-gray-600 mb-4">🕐 {request.time}</p>

            {/* Languages */}
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{request.languages.from}</Badge>
              <span className="text-gray-400">⟷</span>
              <Badge variant="secondary">{request.languages.to}</Badge>
              {getStatusBadge(request.status)}
            </div>

            {/* Translator Count */}
            <div className="flex gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-600">{request.languages.from}</span>
                <p className="font-semibold text-gray-900">{request.translatorCount.from}</p>
              </div>
              <div>
                <span className="text-gray-600">{request.languages.to}</span>
                <p className="font-semibold text-gray-900">{request.translatorCount.to}</p>
              </div>
            </div>

            {/* Action Button */}
            <Link href={`/dashboard/facilitator/translator-requests/${request.id}`}>
              <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">View Available Translators</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
