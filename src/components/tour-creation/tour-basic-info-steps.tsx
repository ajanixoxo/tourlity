"use client"

import { useState } from "react"
import Button from "../root/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, DollarSign, Calendar } from "lucide-react"

interface TourBasicInfoStepProps {
  onNext: () => void
}

export function TourBasicInfoStep({ onNext }: TourBasicInfoStepProps) {
  const [giveFacilitatorAccess, setGiveFacilitatorAccess] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
          <p className="text-gray-600 mt-1">Fill in your tour details to create new tour</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">Give Facilitator tour access</span>
          <Switch checked={giveFacilitatorAccess} onCheckedChange={setGiveFacilitatorAccess} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="name" placeholder="Blueberry Smith" className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="tourType">Tour Type</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food and Cuisine</SelectItem>
                <SelectItem value="culture">Culture and History</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="arts">Arts and Crafts</SelectItem>
                <SelectItem value="nature">Nature and Outdoors</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Enter Description</Label>
          <Textarea id="description" placeholder="Type your message here.." className="mt-2 min-h-32" />
          <div className="text-right text-sm text-gray-500 mt-1">0/1000 characters</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="location">Enter Location</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="location" placeholder="Destination of your choice" className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="price" placeholder="$200" className="pl-10" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="startDate" type="text" placeholder="MM/YY" className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="endDate" type="text" placeholder="MM/YY" className="pl-10" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button variant="secondary">Cancel</Button>
          <Button onClick={onNext} variant="primary">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
