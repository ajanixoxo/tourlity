"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Feedback {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  text: string
  reviews: number
}

const feedbackData: Feedback[] = [
  {
    id: "1",
    name: "Marco Rossi",
    role: "Cooking Experience Host",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.3,
    text: "Sharing my family's pasta-making traditions has been incredibly rewarding. I've met amazing people from around the world and built a thriving business doing what I love.",
    reviews: 98,
  },
  {
    id: "2",
    name: "Yuki Tanaka",
    role: "Tea Ceremony Host",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.8,
    text: "Hosting tea ceremonies allows me to preserve and share our cultural heritage. It's wonderful to see guests discover the beauty and tranquility of this ancient practice.",
    reviews: 75,
  },
  {
    id: "3",
    name: "Sofia Martinez",
    role: "Street Art Tour Host",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.9,
    text: "Through my street art tours, I've been able to showcase our city's creative spirit and support local artists. Every tour brings new perspectives and connections.",
    reviews: 300,
  },
  {
    id: "4",
    name: "Yuki Tanaka",
    role: "Tea Ceremony Host",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.8,
    text: "Hosting tea ceremonies allows me to preserve and share our cultural heritage. It's wonderful to see guests discover the beauty and tranquility of this ancient practice.",
    reviews: 75,
  },
  {
    id: "5",
    name: "Sofia Martinez",
    role: "Street Art Tour Host",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.9,
    text: "Through my street art tours, I've been able to showcase our city's creative spirit and support local artists. Every tour brings new perspectives and connections.",
    reviews: 300,
  },
  {
    id: "6",
    name: "Marco Rossi",
    role: "Cooking Experience Host",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.3,
    text: "Sharing my family's pasta-making traditions has been incredibly rewarding. I've met amazing people from around the world and built a thriving business doing what I love.",
    reviews: 98,
  },
]

export function FeedbackPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Feedback</h1>
        <p className="text-muted-foreground">Read guest/host feedback</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackData.map((feedback) => (
          <Card key={feedback.id} className="p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={feedback.avatar || "/placeholder.svg"} alt={feedback.name} />
                <AvatarFallback>{feedback.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{feedback.name}</p>
                <p className="text-sm text-muted-foreground">{feedback.role}</p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-4 flex-1">{feedback.text}</p>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(feedback.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{feedback.rating}</span>
              <span className="text-sm text-muted-foreground">({feedback.reviews} Reviews)</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
