/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Star } from "lucide-react"

interface Translator {
  id: string
  name: string
  avatar: string
  location: string
  languages: string[]
  rate: string
  rating: number
  verified: boolean
}

const translators: Translator[] = [
  {
    id: "1",
    name: "Marco Rodriguez",
    avatar: "/images/img_image_2.png",
    location: "Queensland, Australia",
    languages: ["English", "Portuguese"],
    rate: "$25 / Per Hour",
    rating: 4.8,
    verified: true,
  },
  {
    id: "2",
    name: "Yuki Tanaka",
    avatar: "/images/img_image_2.png",
    location: "Queensland, Australia",
    languages: ["English", "Portuguese"],
    rate: "$25 / Per Hour",
    rating: 4.8,
    verified: true,
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    avatar: "/images/img_image_2.png",
    location: "Queensland, Australia",
    languages: ["English", "Portuguese"],
    rate: "$25 / Per Hour",
    rating: 4.8,
    verified: true,
  },
  {
    id: "4",
    name: "Marco Rodriguez",
    avatar: "/images/img_image_2.png",
    location: "Queensland, Australia",
    languages: ["English", "Portuguese"],
    rate: "$25 / Per Hour",
    rating: 4.8,
    verified: true,
  },
  {
    id: "5",
    name: "Marco Rodriguez",
    avatar: "/images/img_image_2.png",
    location: "Queensland, Australia",
    languages: ["English", "Portuguese"],
    rate: "$25 / Per Hour",
    rating: 4.8,
    verified: true,
  },
  {
    id: "6",
    name: "Yuki Tanaka",
    avatar: "/images/img_image_2.png",
    location: "Queensland, Australia",
    languages: ["English", "Portuguese"],
    rate: "$25 / Per Hour",
    rating: 4.8,
    verified: true,
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AvailableTranslatorsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/dashboard/facilitator/translator-requests">
        <Button variant="secondary" className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Translator Requests
        </Button>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">View Available Translators</h1>
        <p className="text-gray-600 mt-2">Select a translator for your tour</p>
      </div>

      {/* Translators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {translators.map((translator) => (
          <Card key={translator.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <img
                src={translator.avatar || "/placeholder.svg"}
                alt={translator.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            {/* Name and Verified Badge */}
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{translator.name}</h3>
              {translator.verified && <Badge className="bg-green-100 text-green-800 mt-2">Verified</Badge>}
            </div>

            {/* Location */}
            <p className="text-sm text-gray-600 text-center mb-4">📍 {translator.location}</p>

            {/* Languages */}
            <div className="flex justify-center gap-2 mb-4">
              {translator.languages.map((lang) => (
                <Badge key={lang} variant="secondary">
                  {lang}
                </Badge>
              ))}
            </div>

            {/* Rate */}
            <p className="text-center text-coral-600 font-semibold mb-4">{translator.rate}</p>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-6">
              <span className="text-sm font-medium text-gray-900">{translator.rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1 bg-transparent">
                View Profile
              </Button>
              <Button className="flex-1 bg-coral-500 hover:bg-coral-600 text-white">Select</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
