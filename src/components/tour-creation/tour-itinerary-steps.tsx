/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock } from "lucide-react"

interface ItineraryDay {
  dayNumber: number
  todo: string
  hotelLocation: string
  description: string
  arrivalTime: string
  pickupTime: string
  inclusive: string
  exclusive: string
}

interface TourItineraryStepProps {
  data: ItineraryDay[]
  onUpdate: (dayNumber: number, data: Partial<ItineraryDay>) => void
  onNext: () => void
  onBack: () => void
}

export function TourItineraryStep({ data, onUpdate, onNext, onBack }: TourItineraryStepProps) {
  const [selectedDay, setSelectedDay] = useState(1)
  const [descriptionCount, setDescriptionCount] = useState(0)
  const [inclusiveCount, setInclusiveCount] = useState(0)
  const [exclusiveCount, setExclusiveCount] = useState(0)

  const currentDayData = data.find(day => day.dayNumber === selectedDay) || {
    dayNumber: selectedDay,
    todo: '',
    hotelLocation: '',
    description: '',
    arrivalTime: '',
    pickupTime: '',
    inclusive: '',
    exclusive: ''
  }

  // Update character counts when day changes
  useEffect(() => {
    setDescriptionCount(currentDayData.description.length)
    setInclusiveCount(currentDayData.inclusive.length)
    setExclusiveCount(currentDayData.exclusive.length)
  }, [selectedDay, currentDayData])

  const handleFieldChange = (field: keyof ItineraryDay, value: string) => {
    // Limit text fields to 1000 characters
    if ((field === 'description' || field === 'inclusive' || field === 'exclusive') && value.length > 1000) {
      return
    }
    
    onUpdate(selectedDay, { [field]: value })
  }

  const handleNext = () => {
    // Validate all days are filled
    const incompleteDays = data.filter(day => 
      !day.todo || !day.hotelLocation || !day.description || !day.arrivalTime || !day.pickupTime
    )
    
    if (incompleteDays.length > 0) {
      alert(`Please complete all fields for Day ${incompleteDays[0].dayNumber}`)
      setSelectedDay(incompleteDays[0].dayNumber)
      return
    }
    
    onNext()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
        <p className="text-gray-600 mt-1">Fill in the details for each day of your tour</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Days</Label>
          <div className="flex gap-3 mt-2 flex-wrap">
            {data.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`rounded-3xl py-3 px-6 font-medium transition-colors ${
                  selectedDay === day.dayNumber 
                    ? "bg-red-400 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Day {day.dayNumber}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="todo">To do</Label>
            <Input
              id="todo"
              className="mt-2"
              placeholder="Arrival & Introduction to Paris"
              value={currentDayData.todo}
              onChange={(e) => handleFieldChange('todo', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="hotelLocation">Hotel Location</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                id="hotelLocation" 
                placeholder="Hotel name or location" 
                className="pl-10" 
                value={currentDayData.hotelLocation}
                onChange={(e) => handleFieldChange('hotelLocation', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Enter Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe the day's activities..." 
            className="mt-2 min-h-32" 
            value={currentDayData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
          <div className="text-right text-sm text-gray-500 mt-1">{descriptionCount}/1000 characters</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <div className="relative mt-2">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                id="arrivalTime" 
                type="time" 
                className="pl-10" 
                value={currentDayData.arrivalTime}
                onChange={(e) => handleFieldChange('arrivalTime', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="pickupTime">Pick-up Time</Label>
            <div className="relative mt-2">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                id="pickupTime" 
                type="time" 
                className="pl-10" 
                value={currentDayData.pickupTime}
                onChange={(e) => handleFieldChange('pickupTime', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="inclusive">Inclusive</Label>
          <Textarea 
            id="inclusive" 
            placeholder="What's included (e.g., Meals, Transportation, Tickets)..." 
            className="mt-2 min-h-32" 
            value={currentDayData.inclusive}
            onChange={(e) => handleFieldChange('inclusive', e.target.value)}
          />
          <div className="text-right text-sm text-gray-500 mt-1">{inclusiveCount}/1000 characters</div>
        </div>
        
        <div>
          <Label htmlFor="exclusive">Exclusive</Label>
          <Textarea 
            id="exclusive" 
            placeholder="What's not included (e.g., Personal expenses, Optional activities)..." 
            className="mt-2 min-h-32" 
            value={currentDayData.exclusive}
            onChange={(e) => handleFieldChange('exclusive', e.target.value)}
          />
          <div className="text-right text-sm text-gray-500 mt-1">{exclusiveCount}/1000 characters</div>
        </div>

        <div className="flex justify-between gap-3 pt-6">
          <Button variant="secondary" onClick={onBack}>
            Previous
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={handleNext} className="bg-red-400 hover:bg-red-500 text-white">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourItineraryStep