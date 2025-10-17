/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

interface ChecklistTour {
  id: string
  title: string
  location: string
  time: string
  image: string
  host: {
    name: string
    avatar: string
  }
  translator?: {
    name: string
    avatar: string
  }
  progress: number
  status: "in-progress" | "overdue" | "completed"
  completedTasks: number
  totalTasks: number
}

const checklistTours: ChecklistTour[] = [
  {
    id: "1",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    image: "/historic-downtown-walking-tour.jpg",
    host: {
      name: "Maria Santos",
      avatar: "/maria-santos.jpg",
    },
    translator: {
      name: "Marco Rodriguez",
      avatar: "/marco-rodriguez.jpg",
    },
    progress: 66,
    status: "in-progress",
    completedTasks: 4,
    totalTasks: 6,
  },
  {
    id: "2",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    image: "/historic-downtown-walking-tour.jpg",
    host: {
      name: "Maria Santos",
      avatar: "/maria-santos.jpg",
    },
    progress: 33,
    status: "overdue",
    completedTasks: 2,
    totalTasks: 6,
  },
  {
    id: "3",
    title: "Historic Downtown Walking Tour",
    location: "Queensland, Australia",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    image: "/historic-downtown-walking-tour.jpg",
    host: {
      name: "Maria Santos",
      avatar: "/maria-santos.jpg",
    },
    translator: {
      name: "Marco Rodriguez",
      avatar: "/marco-rodriguez.jpg",
    },
    progress: 100,
    status: "completed",
    completedTasks: 6,
    totalTasks: 6,
  },
]

export default function PreTourChecklistPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500"
      case "overdue":
        return "bg-red-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pre-Tour Checklist</h1>
        <p className="text-gray-600 mt-2">Track and complete essential tasks before your scheduled tours.</p>
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

      {/* Checklist Tours */}
      <div className="space-y-4">
        {checklistTours.map((tour) => (
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
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tour.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>📍 {tour.location}</span>
                      <span>🕐 {tour.time}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(tour.status)}>
                    {tour.status === "in-progress" && "In Progress"}
                    {tour.status === "overdue" && "Overdue"}
                    {tour.status === "completed" && "Completed"}
                  </Badge>
                </div>

                {/* People */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={tour.host.avatar || "/placeholder.svg"}
                      alt={tour.host.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Host</p>
                      <p className="text-gray-600">{tour.host.name}</p>
                    </div>
                  </div>
                  {tour.translator && (
                    <div className="flex items-center gap-2">
                      <img
                        src={tour.translator.avatar || "/placeholder.svg"}
                        alt={tour.translator.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">Translator</p>
                        <p className="text-gray-600">{tour.translator.name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">
                      {tour.completedTasks}/{tour.totalTasks} complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(tour.status)}`}
                      style={{ width: `${tour.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 flex items-center">
                <Link href={`/dashboard/facilitator/pre-tour-checklist/${tour.id}`}>
                  <Button variant="primary">Open Checklist</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
