"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Search, Phone, MessageCircle } from "lucide-react"
import Image from "next/image"

interface Guest {
  id: string
  name: string
  avatar: string
  type: string
  languages: string[]
  specialNeeds: string[]
  notes: string
}

const guestData: Guest[] = [
  {
    id: "1",
    name: "Michael Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    type: "Solo Traveler",
    languages: ["English", "Spanish"],
    specialNeeds: ["Uses wheelchair"],
    notes: "Prefers accessible routes, enjoys photography",
  },
  {
    id: "2",
    name: "Lisa Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    type: "Couple",
    languages: ["English", "Mandarin"],
    specialNeeds: ["2 children (ages 8, 12)"],
    notes: "First time in Cape Town, very enthusiastic about wildlife",
  },
  {
    id: "3",
    name: "Maria Santos",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    type: "Family (4 people)",
    languages: ["English", "French"],
    specialNeeds: ["Vegetarian"],
    notes: "Kids are very active, need frequent breaks and snacks",
  },
  {
    id: "4",
    name: "Margaret Thompson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    type: "Solo Traveler",
    languages: ["English"],
    specialNeeds: ["Uses wheelchair"],
    notes: "Retired botanist, very knowledgeable about local flora",
  },
  {
    id: "5",
    name: "Maria Santos",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    type: "Family (4 people)",
    languages: ["English", "French"],
    specialNeeds: ["Vegetarian"],
    notes: "Kids are very active, need frequent breaks and snacks",
  },
  {
    id: "6",
    name: "Margaret Thompson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    type: "Solo Traveler",
    languages: ["English"],
    specialNeeds: ["Uses wheelchair"],
    notes: "Retired botanist, very knowledgeable about local flora",
  },
]

export function GuestNotesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Dashboard</span>
          <span>/</span>
          <span>Guest Notes</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Museum Tour</h1>
        <p className="text-muted-foreground">Review tour scripts, guest notes, and message hosts.</p>
      </div>

      {/* Tour Details Card */}
      <Card className="p-6 mb-6">
        <div className="flex gap-6 items-start mb-6">
          <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop"
              alt="Museum Tour"
              width={128}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Historic Downtown Walking Tour</h2>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>Today, 2:00 PM - 5:00 PM (GMT+2)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>In Person</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>18 attendees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-border">
          <Button variant="ghost" className="rounded-none">
            Review Tour Script
          </Button>
          <Button variant="ghost" className="border-b-2 border-coral-600 rounded-none">
            Guest Notes
          </Button>
          <Button variant="ghost" className="rounded-none">
            Message Host
          </Button>
        </div>
      </Card>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search for guests..." className="pl-10" />
        </div>
        <Button variant="secondary">Filters</Button>
      </div>

      {/* Guest Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guestData.map((guest) => (
          <Card key={guest.id} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={guest.avatar || "/placeholder.svg"} alt={guest.name} />
                <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="font-semibold">{guest.name}</h3>
                <p className="text-sm text-muted-foreground">{guest.type}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {guest.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {guest.specialNeeds.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Special Needs</p>
                  <div className="flex flex-wrap gap-2">
                    {guest.specialNeeds.map((need) => (
                      <Badge key={need} className="bg-orange-100 text-orange-800 text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Notes</p>
                <p className="text-sm">{guest.notes}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
