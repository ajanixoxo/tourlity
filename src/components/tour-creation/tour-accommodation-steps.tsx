"use client"

import Button from "../root/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Upload } from "lucide-react"

interface TourAccommodationStepProps {
  onBack: () => void
}

export function TourAccommodationStep({ onBack }: TourAccommodationStepProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Accommodation</h2>
        <p className="text-gray-600 mt-1">Fill in your details to create a host account</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="hotelName">Hotel name</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Arrival & Introduction to Paris" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hotel1">Grand Hotel Paris</SelectItem>
                <SelectItem value="hotel2">Boutique Hotel</SelectItem>
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

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Upload property Image</Label>
            <span className="text-sm text-coral-500 font-medium">Upload Cover Image first!</span>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-coral-500 transition-colors cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 pt-6">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Create Tour</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
