/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock, Upload, X } from "lucide-react"

interface Accommodation {
  hotelName: string
  hotelLocation: string
  description: string
  arrivalTime: string
  pickupTime: string
  hotelImages: File[]
}

interface TourAccommodationStepProps {
  data: Accommodation
  onUpdate: (data: Partial<Accommodation>) => void
  onBack: () => void
  onSubmit: () => void
}

export function TourAccommodationStep({ data, onUpdate, onBack, onSubmit }: TourAccommodationStepProps) {
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [descriptionCount, setDescriptionCount] = useState(data.description.length)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
  if (data.hotelImages.length > 0) {
    const urls = data.hotelImages.map(file => URL.createObjectURL(file))
    setImagePreviewUrls(urls)
    
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url))
    }
  }
}, [data.hotelImages.length])
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      const newPreviews = newFiles.map(file => URL.createObjectURL(file))
      
      onUpdate({ hotelImages: [...data.hotelImages, ...newFiles] })
      setImagePreviewUrls([...imagePreviewUrls, ...newPreviews])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = data.hotelImages.filter((_, i) => i !== index)
    const newPreviews = imagePreviewUrls.filter((_, i) => i !== index)
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index])
    
    onUpdate({ hotelImages: newImages })
    setImagePreviewUrls(newPreviews)
  }

  const handleDescriptionChange = (value: string) => {
    if (value.length <= 1000) {
      onUpdate({ description: value })
      setDescriptionCount(value.length)
    }
  }

  const handleSubmit = async () => {
    // Validate fields
    if (!data.hotelName || !data.hotelLocation || !data.description || 
        !data.arrivalTime || !data.pickupTime) {
      alert('Please fill in all required fields')
      return
    }

    if (data.hotelImages.length === 0) {
      alert('Please upload at least one hotel image')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit()
    } catch (error) {
      console.error('Error submitting tour:', error)
      alert('Failed to create tour. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Accommodation</h2>
        <p className="text-gray-600 mt-1">Fill in the main hotel details for your tour</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="hotelName">Hotel name</Label>
            <Input
              id="hotelName"
              className="mt-2"
              placeholder="Grand Hotel Paris"
              value={data.hotelName}
              onChange={(e) => onUpdate({ hotelName: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="hotelLocation">Hotel Location</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                id="hotelLocation" 
                placeholder="City Center, Paris" 
                className="pl-10" 
                value={data.hotelLocation}
                onChange={(e) => onUpdate({ hotelLocation: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Enter Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe the hotel amenities, rooms, services..." 
            className="mt-2 min-h-32" 
            value={data.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
          <div className="text-right text-sm text-gray-500 mt-1">{descriptionCount}/1000 characters</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="arrivalTime">Check-in Time</Label>
            <div className="relative mt-2">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                id="arrivalTime" 
                type="time" 
                className="pl-10" 
                value={data.arrivalTime}
                onChange={(e) => onUpdate({ arrivalTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="pickupTime">Check-out Time</Label>
            <div className="relative mt-2">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                id="pickupTime" 
                type="time" 
                className="pl-10" 
                value={data.pickupTime}
                onChange={(e) => onUpdate({ pickupTime: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Upload Hotel Images</Label>
            <span className="text-sm text-red-500">Upload at least one image!</span>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              id="hotelImageUpload"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="hotelImageUpload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">
                  <span className="text-red-400">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </label>
          </div>

          {imagePreviewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Hotel ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between gap-3 pt-6">
          <Button variant="secondary" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" disabled={isSubmitting}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-red-400 hover:bg-red-500 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Tour...' : 'Create Tour'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourAccommodationStep