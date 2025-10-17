/* eslint-disable react/no-unescaped-entities */
"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Translator {
  id: string
  name: string
  avatar: string
  verified: boolean
  location: string
  hourlyRate: number
  toursCompleted: number
  rating: number
  level: string
  about: string
  languages: { name: string; level: string }[]
}

const translatorData: Translator = {
  id: "1",
  name: "Marco Rodriguez",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  verified: true,
  location: "Queensland, Australia",
  hourlyRate: 20,
  toursCompleted: 127,
  rating: 4.8,
  level: "Expert",
  about:
    "I'm Marco Rodriguez, a professional translator based in Australia with over 5 years of experience working in tourism, hospitality, and event coordination. I specialize in supporting live cultural experiences, food tours, and adventure-based outings across both urban and rural destinations.\n\nFluent in English and Spanish, I've helped hundreds of guests connect meaningfully with hosts, ensuring nothing is lost in translation. I focus on more than just words; I aim to carry tone, energy, and intention across languages so everyone feels heard, included, and fully part of the moment.\n\nWhether it's a coastal hike, a museum walkthrough, or a live cooking session, I take pride in being the bridge that helps stories and memories travel further.",
  languages: [
    { name: "Japanese", level: "Native" },
    { name: "English", level: "Professional" },
  ],
}

export function TranslatorRequestsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Translator Requests</h1>
        <p className="text-muted-foreground">View Available Translators</p>
      </div>

      <Card className="p-8">
        <div className="flex gap-8 mb-8">
          <Avatar className="w-32 h-32">
            <AvatarImage src={translatorData.avatar || "/placeholder.svg"} alt={translatorData.name} />
            <AvatarFallback>{translatorData.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">{translatorData.name}</h2>
              {translatorData.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Hourly Rate</p>
                <p className="text-2xl font-bold">${translatorData.hourlyRate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tours Completed</p>
                <p className="text-2xl font-bold">{translatorData.toursCompleted}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{translatorData.rating}</p>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-2xl font-bold">{translatorData.level}</p>
              </div>
            </div>

            <Button className="bg-coral-600 hover:bg-coral-700">Select Translator</Button>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <p className="text-foreground whitespace-pre-line mb-6">{translatorData.about}</p>

          <div className="mb-6">
            <h4 className="font-semibold mb-3">Languages</h4>
            <div className="space-y-2">
              {translatorData.languages.map((lang) => (
                <div key={lang.name} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-muted-foreground">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Recent Reviews</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm">
                    "Marco's pasta-making class was the highlight of our trip to Rome! His knowledge of Italian cuisine
                    and warm personality made for an unforgettable experience."
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
