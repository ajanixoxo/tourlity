"use client"

import { useState } from "react"
import Button from "../root/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar } from "lucide-react"

interface TourItineraryStepProps {
  onNext: () => void
  onBack: () => void
}

export function TourItineraryStep({ onNext, onBack }: TourItineraryStepProps) {
  const [selectedDay, setSelectedDay] = useState(1)
  const days = [1, 2, 3, 4, 5]

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
        <p className="text-gray-600 mt-1">Fill in your details to create a host account</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Days</Label>
          <div className="flex gap-3 mt-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedDay === day ? "bg-coral-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Day {day}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="todo">To do</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Arrival & Introduction to Paris" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arrival">Arrival & Introduction to Paris</SelectItem>
                <SelectItem value="tour">City Tour</SelectItem>
                <SelectItem value="museum">Museum Visit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="hotelLocation">Hotel Location</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="hotelLocation" placeholder="Destination of your choice" className="pl-10" />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Enter Description</Label>
          <Textarea id="description" placeholder="Type your message here.." className="mt-2 min-h-32" />
          <div className="text-right text-sm text-gray-500 mt-1">0/1000 characters</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="arrivalTime" type="text" placeholder="MM/YY" className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="pickupTime">Pick-up Time</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="pickupTime" type="text" placeholder="MM/YY" className="pl-10" />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 pt-6">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={onNext} variant="primary">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
