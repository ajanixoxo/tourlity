/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  MapPin,
  Users,
  Languages,
  Tag,
  Mountain,
  List,
  Trophy,
  UtensilsCrossed,
  User,
  Waves,
  Smartphone,
  Hotel,
  AccessibilityIcon,
  Wifi,
  GraduationCap,
  Crown,
  Car,
} from "lucide-react"
import { amenitiesOptions } from "@/data/tour-management-data"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { toast } from "react-toastify"

const iconMap: Record<string, any> = {
  Tag,
  Mountain,
  List,
  Trophy,
  UtensilsCrossed,
  User,
  Waves,
  Smartphone,
  Hotel,
  Accessibility: AccessibilityIcon,
  Wifi,
  GraduationCap,
  
  Crown,
  Calendar,
  Car,
}

export default function NewCustomTourRequestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["special-deals", "stay", "reserve-pay-later"])
  
  // Form state
  const [formData, setFormData] = useState({
    guestName: "",
    tourType: "",
    description: "",
    location: "",
    budgetProposal: "",
    tourCategory: "",
    groupSize: "",
    preferredLanguages: "",
    startDate: "",
    endDate: "",
    accessibilityNotes: "",
    coverageAreas: ""
  })

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/custom-tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `${formData.tourType} Tour in ${formData.location}`,
          description: formData.description,
          tourType: formData.tourType,
          location: formData.location,
          budgetProposal: parseFloat(formData.budgetProposal),
          tourCategory: formData.tourCategory,
          groupSize: parseInt(formData.groupSize),
          preferredLanguages: formData.preferredLanguages.split(",").map(lang => lang.trim()),
          startDate: formData.startDate,
          endDate: formData.endDate,
          accessibilityNotes: formData.accessibilityNotes,
          amenitiesNeeded: selectedAmenities,
          coverageAreas: formData.coverageAreas ? formData.coverageAreas.split(",").map(area => area.trim()) : [formData.location]
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Custom tour request created successfully!")
        router.push("/dashboard/customize-tours")
      } else {
        toast.error(result.error || "Failed to create custom tour request")
      }
    } catch (error) {
      console.error("Error creating custom tour:", error)
      toast.error("Failed to create custom tour request")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 ">
      <div className="mx-auto ">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard/customize-tours" className="hover:text-foreground">
            Customize Tours
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">New Tour Request</span>
        </div>
        <div className='bg-white p-4 rounded-3xl'>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground md:text-3xl">New Custom Tour Request</h1>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">Fill in your tour details to customize tour</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest Name and Tour Type */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="guestName">Guest Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="guestName" 
                    placeholder="Blueberry Smith" 
                    className="pl-10 !bg-[#FAF9F6]"
                    value={formData.guestName}
                    onChange={(e) => handleInputChange("guestName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tourType">Tour Type</Label>
                <Select onValueChange={(value) => handleInputChange("tourType", value)}>
                  <SelectTrigger id="tourType" className="w-full">
                    <SelectValue placeholder="Select tour type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cultural">Cultural Tour</SelectItem>
                    <SelectItem value="Adventure">Adventure Tour</SelectItem>
                    <SelectItem value="Food">Food Tour</SelectItem>
                    <SelectItem value="Historical">Historical Tour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Enter Description</Label>
              <Textarea 
                id="description" 
                placeholder="Type your message here.." 
                rows={5} 
                className="resize-none"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
              />
              <div className="text-right text-xs text-muted-foreground">{formData.description.length}/1000 characters</div>
            </div>

            {/* Location and Budget */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Enter Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="location" 
                    placeholder="Destination of your choice" 
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Proposal</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    id="budget" 
                    placeholder="200" 
                    className="pl-8"
                    type="number"
                    value={formData.budgetProposal}
                    onChange={(e) => handleInputChange("budgetProposal", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tour Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Tour Category</Label>
              <Select onValueChange={(value) => handleInputChange("tourCategory", value)}>
                <SelectTrigger id="category" className=" w-1/2 md:w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arts">Arts and Crafts</SelectItem>
                  <SelectItem value="Nature">Nature and Outdoors</SelectItem>
                  <SelectItem value="Food">Food and Cuisine</SelectItem>
                  <SelectItem value="Culture">Culture and History</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Group Size and Languages */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="groupSize" 
                    placeholder="e.g, 12" 
                    className="pl-10"
                    type="number"
                    value={formData.groupSize}
                    onChange={(e) => handleInputChange("groupSize", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">Preferred Languages</Label>
                <div className="relative">
                  <Languages className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="languages" 
                    placeholder="e.g, English, Spanish" 
                    className="pl-10"
                    value={formData.preferredLanguages}
                    onChange={(e) => handleInputChange("preferredLanguages", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Start and End Date */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="startDate" 
                    type="date" 
                    className="pl-10"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="endDate" 
                    type="date" 
                    className="pl-10"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Accessibility Notes */}
            <div className="space-y-2">
              <Label htmlFor="accessibility">
                Accessibility Notes <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Textarea
                id="accessibility"
                placeholder="Any special accessibility requirements or considerations..."
                rows={4}
                className="resize-none"
                value={formData.accessibilityNotes}
                onChange={(e) => handleInputChange("accessibilityNotes", e.target.value)}
              />
              <div className="text-right text-xs text-muted-foreground">{formData.accessibilityNotes.length}/1000 characters</div>
            </div>

            {/* Amenities Needed */}
            <div className="space-y-3">
              <Label>Amenities Needed</Label>
              <div className="flex flex-wrap gap-2">
                {amenitiesOptions.map((amenity) => {
                  const Icon = iconMap[amenity.icon]
                  const isSelected = selectedAmenities.includes(amenity.id)
                  return (
                    <Button
                      key={amenity.id}
                      type="button"
                      variant={isSelected ? "primary" : "secondary"}
                      onClick={() => toggleAmenity(amenity.id)}
                      
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {amenity.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Customize"}
              </Button>
            </div>
          </form>
        </div>


      </div>
    </div>
  )
}
