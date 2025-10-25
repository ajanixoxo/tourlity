"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users } from "lucide-react"
import Image from "next/image"

interface Tour {
  id: string
  title: string
  image: string
  location: string
  time: string
  attendees: number
  status: "pending" | "overdue" | "completed"
  completion: number
}

const toursData: Tour[] = [
  {
    id: "1",
    title: "Historic Downtown Walking Tour",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    location: "Queensland, Australia",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    attendees: 18,
    status: "pending",
    completion: 0,
  },
  {
    id: "2",
    title: "Historic Downtown Walking Tour",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    location: "Queensland, Australia",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    attendees: 18,
    status: "overdue",
    completion: 0,
  },
  {
    id: "3",
    title: "Historic Downtown Walking Tour",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    location: "Queensland, Australia",
    time: "Today, 2:00 PM - 5:00 PM (GMT+2)",
    attendees: 18,
    status: "completed",
    completion: 100,
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
}

 function SubmitReportsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit Report</h1>
        <p className="text-muted-foreground">Fill post-tour recap, log issues, or submit satisfaction checklists.</p>
      </div>

      <div className="space-y-4">
        {toursData.map((tour) => (
          <Card key={tour.id} className="p-6">
            <div className="flex gap-6">
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
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {tour.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {tour.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {tour.attendees} attendees
                      </div>
                    </div>
                  </div>
                  <Badge className={statusConfig[tour.status].color}>{statusConfig[tour.status].label}</Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completion</span>
                    <span>{tour.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-coral-600 h-2 rounded-full transition-all"
                      style={{ width: `${tour.completion}%` }}
                    />
                  </div>
                </div>

                <Button className="bg-coral-600 hover:bg-coral-700">
                  {tour.status === "completed" ? "Check Report" : "Complete Report"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
 export default SubmitReportsPage