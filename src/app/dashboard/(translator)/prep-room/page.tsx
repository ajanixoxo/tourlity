"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { MapPin, Clock, Users } from "lucide-react"
import Image from "next/image"

interface PrepTour {
  id: string
  title: string
  image: string
  time: string
  location: string
  attendees: number
  host: { name: string; avatar: string }
}

const prepToursData: PrepTour[] = [
  {
    id: "1",
    title: "Historic Downtown Walking Tour",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    location: "Queensland, Australia",
    attendees: 18,
    host: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
  },
  {
    id: "2",
    title: "Historic Downtown Walking Tour",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    location: "Queensland, Australia",
    attendees: 18,
    host: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
  },
  {
    id: "3",
    title: "Historic Downtown Walking Tour",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    location: "Queensland, Australia",
    attendees: 18,
    host: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
  },
  {
    id: "4",
    title: "Art & Culture Exhibition",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    time: "Tomorrow, 1:00 PM - 4:00 PM (GMT+2)",
    location: "Melbourne, Australia",
    attendees: 30,
    host: {
      name: "James Lee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
  },
]

export default function PrepRoomPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Prep Room</h1>
        <p className="text-muted-foreground">Review tour scripts, guest notes, and message hosts.</p>
      </div>

      <div className="space-y-4">
        {prepToursData.map((tour) => (
          <Card key={tour.id} className="p-6">
            <div className="flex gap-6 items-start">
              <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  width={128}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">{tour.title}</h3>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {tour.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {tour.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {tour.attendees} attendees
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium">Host</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center text-white text-xs font-bold">
                    {tour.host.name.charAt(0)}
                  </div>
                  <span className="text-sm">{tour.host.name}</span>
                </div>
              </div>

              <Button className="bg-coral-600 hover:bg-coral-700 flex-shrink-0">View Tour Prep Room</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
