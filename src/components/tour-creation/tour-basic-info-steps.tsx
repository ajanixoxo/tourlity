/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Button from "@/components/root/button"
import { User, MapPin, DollarSign, Calendar, Upload, X, Sparkles, Compass, ListChecks, Trophy, UtensilsCrossed, Mountain, Waves, Ticket, Bed, Wifi, GraduationCap, Gem, Clock, Repeat } from "lucide-react"
import { toast } from "react-toastify"
interface TourBasicInfo {
  name: string
  tourType: 'physical' | 'virtual'
  description: string
  location: string
  price: string
  startDate: string
  endDate: string
  giveFacilitatorAccess: boolean
  coverageAreas: string[]
  tourImages: File[]
  amenities: string[]
  country: string
  languages: string[]
  duration: string
  categories: string[]
}

interface TourBasicInfoStepProps {
  data: TourBasicInfo
  onUpdate: (data: Partial<TourBasicInfo>) => void
  onNext: () => void
}

export function TourBasicInfoStep({ data, onUpdate, onNext }: TourBasicInfoStepProps) {
  const [newLocation, setNewLocation] = useState("")
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [descriptionCount, setDescriptionCount] = useState(data.description.length)
  useEffect(() => {
    if (data.tourImages.length > 0) {
      const urls = data.tourImages.map(file => URL.createObjectURL(file))
      setImagePreviewUrls(urls)

      // Cleanup function to revoke URLs when component unmounts
      return () => {
        urls.forEach(url => URL.revokeObjectURL(url))
      }
    }
  }, [data.tourImages.length])


  const handleAddLocation = () => {
    if (newLocation.trim()) {
      onUpdate({ coverageAreas: [...data.coverageAreas, newLocation.trim()] })
      setNewLocation("")
    }
  }

  const handleRemoveLocation = (location: string) => {
    onUpdate({ coverageAreas: data.coverageAreas.filter(loc => loc !== location) })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      const newPreviews = newFiles.map(file => URL.createObjectURL(file))

      onUpdate({ tourImages: [...data.tourImages, ...newFiles] })
      setImagePreviewUrls([...imagePreviewUrls, ...newPreviews])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = data.tourImages.filter((_, i) => i !== index)
    const newPreviews = imagePreviewUrls.filter((_, i) => i !== index)

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index])

    onUpdate({ tourImages: newImages })
    setImagePreviewUrls(newPreviews)
  }

  const toggleAmenity = (amenity: string) => {
    if (data.amenities.includes(amenity)) {
      onUpdate({ amenities: data.amenities.filter(a => a !== amenity) })
    } else {
      onUpdate({ amenities: [...data.amenities, amenity] })
    }
  }

  const handleDescriptionChange = (value: string) => {
    if (value.length <= 1000) {
      onUpdate({ description: value })
      setDescriptionCount(value.length)
    }
  }

  const amenitiesList = [
    { name: "Special deals", icon: Sparkles },
    { name: "Adventure", icon: Compass },
    { name: "Things to do", icon: ListChecks },
    { name: "Sport", icon: Trophy },
    { name: "Food", icon: UtensilsCrossed },
    { name: "Solo", icon: Mountain },
    { name: "Itinerary", icon: ListChecks },
    { name: "Water Activity", icon: Waves },
    { name: "Mobile Ticketing", icon: Ticket },
    { name: "Stay", icon: Bed },
    { name: "Accessibility", icon: Mountain },
    { name: "Wi-Fi", icon: Wifi },
    { name: "Instructor", icon: GraduationCap },
    { name: "Luxury", icon: Gem },
    { name: "Reserve Now and Pay Later", icon: Clock },
    { name: "Transfer", icon: Repeat }
  ]

  // In TourBasicInfoStep, replace the handleNext function with:
  const handleNext = () => {
    const missingFields = [];

    if (!data.name) missingFields.push("name");
    if (!data.description) missingFields.push("description");
    if (!data.location) missingFields.push("location");
    if (!data.price) missingFields.push("price");
    if (!data.startDate) missingFields.push("startDate");
    if (!data.endDate) missingFields.push("endDate");
    if (!data.coverageAreas || data.coverageAreas.length === 0)
      missingFields.push("coverageAreas");
    if (!data.tourImages || data.tourImages.length === 0)
      missingFields.push("tourImages");

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      toast.error(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // ✅ Calculate duration
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      toast.error("Invalid start or end date");
      return;
    }

    const diffInDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1; // +1 to include both start and end date

    // ✅ Update duration using onUpdate instead of mutating
    onUpdate({ duration: `${diffInDays} day${diffInDays > 1 ? "s" : ""}` });

    console.log("✅ Moving to next step with duration:", `${diffInDays} days`);

    onNext();
  };



  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
          <p className="text-gray-600 mt-1">Fill in your tour details to create new tour</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">Give Facilitator tour access</span>
          <Switch
            checked={data.giveFacilitatorAccess}
            onCheckedChange={(checked) => onUpdate({ giveFacilitatorAccess: checked })}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="name"
                placeholder="Paris Adventure Tour"
                className="pl-10"
                value={data.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tourType">Tour Type</Label>
            <Select value={data.tourType} onValueChange={(value: 'physical' | 'virtual') => onUpdate({ tourType: value })}>
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Physical Tour</SelectItem>
                <SelectItem value="virtual">Virtual Tour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Enter Description</Label>
          <Textarea
            id="description"
            placeholder="Type your message here.."
            className="mt-2 min-h-32"
            value={data.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
          <div className="text-right text-sm text-gray-500 mt-1">{descriptionCount}/1000 characters</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="location">Enter Location</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="location"
                placeholder="Destination of your choice"
                className="pl-10"
                value={data.location}
                onChange={(e) => onUpdate({ location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="price">Price (Total Tour Price)</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="price"
                type="number"
                placeholder="200"
                className="pl-10"
                value={data.price}
                onChange={(e) => onUpdate({ price: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="startDate"
                type="date"
                className="pl-10"
                value={data.startDate}
                onChange={(e) => onUpdate({ startDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="endDate"
                type="date"
                className="pl-10"
                value={data.endDate}
                onChange={(e) => onUpdate({ endDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Coverage Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Coverage Area</Label>
            <span className="text-sm text-gray-500">Where the tour takes place</span>
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Enter location"
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddLocation()
                }
              }}
            />
            <Button onClick={handleAddLocation} className="bg-red-400 hover:bg-red-500 text-white">
              Add Location
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {data.coverageAreas.map((location) => (
              <span
                key={location}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-400 text-white rounded-full text-sm"
              >
                {location}
                <button
                  onClick={() => handleRemoveLocation(location)}
                  className="hover:bg-red-500 rounded-full p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Upload Property Image */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Upload Tour Images</Label>
            <span className="text-sm text-red-500">Upload Cover Image first!</span>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="imageUpload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                <span className="text-red-400">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </label>
          </div>

          {imagePreviewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Cover
                    </div>
                  )}
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

        {/* Amenities */}
        <div>
          <Label>Amenities</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {amenitiesList.map((amenity) => {
              const Icon = amenity.icon
              const isSelected = data.amenities.includes(amenity.name)
              return (
                <button
                  key={amenity.name}
                  onClick={() => toggleAmenity(amenity.name)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${isSelected
                    ? "bg-red-400 text-white border-red-400"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {amenity.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button variant="secondary">Cancel</Button>
          <Button onClick={handleNext} className="bg-red-400 hover:bg-red-500 text-white">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TourBasicInfoStep