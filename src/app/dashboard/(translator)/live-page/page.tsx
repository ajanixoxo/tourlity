"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, Users } from "lucide-react"
import Image from "next/image"

interface LiveTour {
  id: string
  title: string
  image: string
  time: string
  location: string
  attendees: number
  host: { name: string; avatar: string }
  facilitator: { name: string; avatar: string }
  languages: string[]
}

const liveToursData: LiveTour[] = [
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
    facilitator: {
      name: "Marco Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    languages: ["en", "es", "fr", "de"],
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
    facilitator: {
      name: "Marco Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    languages: ["en", "es", "fr", "de"],
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
    facilitator: {
      name: "Marco Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    languages: ["en", "es", "fr", "de"],
  },
  {
    id: "4",
    title: "Art & Culture Exhibition",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    time: "Tomorrow, 1:00 PM - 4:00 PM (GMT+2)",
    location: "Melbourne, Australia",
    attendees: 30,
    host: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    facilitator: {
      name: "Marco Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    languages: ["en", "es", "fr", "de"],
  },
]

const languageColors: Record<string, string> = {
  en: "bg-blue-100 text-blue-800",
  es: "bg-red-100 text-red-800",
  fr: "bg-purple-100 text-purple-800",
  de: "bg-green-100 text-green-800",
}

const languageNames: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
}

 function TranslateLivePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Translate Live</h1>
        <p className="text-muted-foreground">Access the in-session translation panel during live tours.</p>
      </div>

      <div className="space-y-4">
        {liveToursData.map((tour) => (
          <Card key={tour.id} className="p-6">
            <div className="flex gap-6 items-start">
              <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0">
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

                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Host</span>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={tour.host.avatar || "/placeholder.svg"} alt={tour.host.name} />
                      <AvatarFallback>{tour.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{tour.host.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Facilitator</span>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={tour.facilitator.avatar || "/placeholder.svg"} alt={tour.facilitator.name} />
                      <AvatarFallback>{tour.facilitator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{tour.facilitator.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {tour.languages.map((lang) => (
                    <Badge key={lang} className={languageColors[lang]}>
                      {languageNames[lang]}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="bg-coral-600 hover:bg-coral-700 shrink-0">Translate Live Tour</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default  TranslateLivePage