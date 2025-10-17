/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, MessageCircle, Phone } from "lucide-react"

interface Guest {
  id: string
  name: string
  type: string
  avatar: string
  languages: string[]
  notes: string
  specialNeeds?: string
  accessibility?: string
}

const guests: Guest[] = [
  {
    id: "1",
    name: "Michael Johnson",
    type: "Solo Traveler",
    avatar: "/images/img_image_24x24.png",
    languages: ["English", "Spanish"],
    notes: "Prefers accessible routes, enjoys photography",
    specialNeeds: "Uses wheelchair",
    accessibility: "Requires accessible routes",
  },
  {
    id: "2",
    name: "Lisa Chen",
    type: "Couple",
    avatar: "/images/img_image_24x24.png",
    languages: ["English", "Mandarin"],
    notes: "First time in Cape Town, very enthusiastic about wildlife",
    specialNeeds: "2 children (ages 8, 12)",
    accessibility: "None",
  },
  {
    id: "3",
    name: "Maria Santos",
    type: "Family (4 people)",
    avatar: "/images/img_image_2.png",
    languages: ["English", "French"],
    notes: "Kids are very active, need frequent breaks and snacks",
    specialNeeds: "Vegetarian",
    accessibility: "None",
  },
  {
    id: "4",
    name: "Margaret Thompson",
    type: "Solo Traveler",
    avatar: "/images/img_image_2.png",
    languages: ["English"],
    notes: "Retired botanist, very knowledgeable about local flora",
    specialNeeds: "None",
    accessibility: "Uses wheelchair",
  },
]

export default function GuestDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/dashboard/facilitator/guest-notes">
        <Button variant="secondary" className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Guest Notes
        </Button>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Guest Notes</h1>
        <p className="text-gray-600 mt-2">
          View preferences, accessibility needs, and special instructions for assigned guests.
        </p>
      </div>

      {/* Tour Info Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Historic Downtown Walking Tour</h3>
            <p className="text-gray-600 mt-1">Today, 2:00 PM - 5:00 PM (GMT+2)</p>
            <p className="text-gray-600">Queensland, Australia</p>
          </div>
          <div className="text-right">
            <img src="/images/img_image_3.png" alt="Tour" className="w-20 h-20 rounded-lg object-cover" />
          </div>
        </div>
      </Card>

      {/* Guests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guests.map((guest) => (
          <Card key={guest.id} className="p-6">
            {/* Guest Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={guest.avatar || "/placeholder.svg"} alt={guest.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">{guest.name}</h4>
                  <p className="text-sm text-gray-600">{guest.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button  variant="secondary" className="p-2 bg-transparent">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button  variant="secondary" className="p-2 bg-transparent">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Languages</p>
              <div className="flex flex-wrap gap-2">
                {guest.languages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Notes</p>
              <p className="text-sm text-gray-600">{guest.notes}</p>
            </div>

            {/* Special Needs */}
            {guest.specialNeeds && (
              <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-900">⚠️ Special Needs</p>
                <p className="text-sm text-orange-800">{guest.specialNeeds}</p>
              </div>
            )}

            {/* Accessibility */}
            {guest.accessibility && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-900">♿ Accessibility</p>
                <p className="text-sm text-green-800">{guest.accessibility}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Download Summary Button */}
      <div className="flex justify-end">
        <Button variant="primary">Download Summary</Button>
      </div>
    </div>
  )
}
