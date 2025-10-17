"use client"

import { useState } from "react"
import {  SlidersHorizontal, Star, MapPin } from "lucide-react"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { myTours } from "@/data/tour-management-data"
import { EmptyState } from "@/components/admin/empty-state"

export default function MyToursPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTours = myTours.filter((tour) => tour.status === activeTab)
  const hasNoTours = filteredTours.length === 0

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tours</h1>
            <p className="text-gray-600 mt-1">Manage your experience and edit your listings</p>
          </div>
          <Link href="/dashboard/my-tours/create">
            <Button variant="primary">Create New Tour</Button>
          </Link>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setActiveTab("upcoming")}
              variant={activeTab === "upcoming" ? "primary" : "secondary"}
              className="rounded-full"
            >
              Upcoming
            </Button>
            <Button
              onClick={() => setActiveTab("completed")}
              variant={activeTab === "completed" ? "primary" : "secondary"}
              className="rounded-full"
            >
              Completed
            </Button>
            <Button
              onClick={() => setActiveTab("cancelled")}
              variant={activeTab === "cancelled" ? "primary" : "secondary"}
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

        {/* Tours Grid or Empty State */}
        {hasNoTours ? (
          <EmptyState description="You have no tours yet" hasButton={true} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#18171799] rounded-[18px] px-2 py-1">
                    <Image
                      src={tour.host.avatar || "/placeholder.svg"}
                      alt={tour.host.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="text-xs font-medium">{tour.host.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tour.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tour.categories.map((category) => (
                      <span key={category} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{tour.rating}</span>
                      <span className="text-sm text-gray-500">({tour.reviewCount} Reviews)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${tour.price}</div>
                      <div className="text-xs text-gray-500">/ Person</div>
                    </div>
                  </div>
                  <Button className="w-full mt-3 bg-coral-500 hover:bg-coral-600 text-white">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


