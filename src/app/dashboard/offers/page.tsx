/* eslint-disable @next/next/no-img-element */
"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

interface Offer {
  id: string
  title: string
  discount: string
  description: string
  expiresIn: string
  image: string
}

const offers: Offer[] = [
  {
    id: "1",
    title: "Summer Special",
    discount: "20% OFF",
    description: "All tours in July and August",
    expiresIn: "Expires in 15 days",
    image: "/placeholder.svg?key=offer1",
  },
  {
    id: "2",
    title: "Group Discount",
    discount: "15% OFF",
    description: "Book for 4 or more people",
    expiresIn: "Expires in 30 days",
    image: "/placeholder.svg?key=offer2",
  },
]

export default function OffersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
        <p className="text-gray-600 mt-2">Exclusive deals and discounts for you</p>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={offer.image || "/placeholder.svg"}
                alt={offer.title}
                className="w-24 h-24 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                </div>
                <p className="text-gray-600 mb-2">{offer.description}</p>
                <p className="text-sm text-gray-500">{offer.expiresIn}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <Badge className="bg-coral-100 text-coral-800 text-lg px-4 py-2">{offer.discount}</Badge>
                <Button variant="primary">Claim Offer</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
