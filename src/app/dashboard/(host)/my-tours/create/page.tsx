/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { TourBasicInfoStep } from "@/components/tour-creation/tour-basic-info-steps"
import { TourItineraryStep } from "@/components/tour-creation/tour-itinerary-steps"
import { TourAccommodationStep } from "@/components/tour-creation/tour-accommodation-steps"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

// Types
export interface TourBasicInfo {
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
  categories: string[]
  duration: string
}

export interface ItineraryDay {
  dayNumber: number
  todo: string
  hotelLocation: string
  description: string
  arrivalTime: string
  pickupTime: string
  inclusive: string
  exclusive: string
}

export interface Accommodation {
  hotelName: string
  hotelLocation: string
  description: string
  arrivalTime: string
  pickupTime: string
  hotelImages: File[]
}

export interface TourCreationData {
  basicInfo: TourBasicInfo
  itinerary: ItineraryDay[]
  accommodation: Accommodation
}

// Helper function to calculate days between dates
function calculateTourDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays + 1 // +1 to include both start and end date
}

// Initialize empty itinerary days
function initializeItineraryDays(numDays: number): ItineraryDay[] {
  return Array.from({ length: numDays }, (_, index) => ({
    dayNumber: index + 1,
    todo: '',
    hotelLocation: '',
    description: '',
    arrivalTime: '',
    pickupTime: '',
    inclusive: '',
    exclusive: ''
  }))
}

export default function CreateTourPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  const [tourData, setTourData] = useState<TourCreationData>({
    basicInfo: {
      name: '',
      tourType: 'physical',
      description: '',
      location: '',
      price: '',
      startDate: '',
      endDate: '',
      giveFacilitatorAccess: false,
      coverageAreas: [],
      tourImages: [],
      amenities: [],
      country: '',
      languages: [],
      categories: [],
      duration: ''
    },
    itinerary: [],
    accommodation: {
      hotelName: '',
      hotelLocation: '',
      description: '',
      arrivalTime: '',
      pickupTime: '',
      hotelImages: []
    }
  })

  const steps = [
    { id: 1, name: "Basic Information" },
    { id: 2, name: "Itinerary" },
    { id: 3, name: "Accommodation" },
  ]

  // Calculate itinerary days when dates change
  useEffect(() => {
    if (tourData.basicInfo.startDate && tourData.basicInfo.endDate) {
      const numDays = calculateTourDays(tourData.basicInfo.startDate, tourData.basicInfo.endDate)
      
      // Only reinitialize if the number of days changed and is valid
      if (numDays !== tourData.itinerary.length && numDays > 0) {
        const newItinerary = initializeItineraryDays(numDays)
        setTourData(prev => ({
          ...prev,
          itinerary: newItinerary
        }))
      }
    }
  }, [tourData.basicInfo.startDate, tourData.basicInfo.endDate])

  // Update basic info
  const updateBasicInfo = (data: Partial<TourBasicInfo>) => {
    setTourData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...data }
    }))
  }

  // Update specific itinerary day - FIXED VERSION
  const updateItineraryDay = (dayNumber: number, data: Partial<ItineraryDay>) => {
    setTourData(prev => {
      // Find if the day exists
      const existingDayIndex = prev.itinerary.findIndex(day => day.dayNumber === dayNumber)
      
      if (existingDayIndex !== -1) {
        // Update existing day
        const updatedItinerary = [...prev.itinerary]
        updatedItinerary[existingDayIndex] = { 
          ...updatedItinerary[existingDayIndex], 
          ...data 
        }
        return {
          ...prev,
          itinerary: updatedItinerary
        }
      } else {
        // Add new day if it doesn't exist
        const newDay: ItineraryDay = {
          dayNumber,
          todo: '',
          hotelLocation: '',
          description: '',
          arrivalTime: '',
          pickupTime: '',
          inclusive: '',
          exclusive: '',
          ...data
        }
        return {
          ...prev,
          itinerary: [...prev.itinerary, newDay].sort((a, b) => a.dayNumber - b.dayNumber)
        }
      }
    })
  }

  // Update accommodation
  const updateAccommodation = (data: Partial<Accommodation>) => {
    setTourData(prev => ({
      ...prev,
      accommodation: { ...prev.accommodation, ...data }
    }))
  }

  // Handle navigation
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Submit tour creation
  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      // Basic Info
      formData.append('title', tourData.basicInfo.name)
      formData.append('type', tourData.basicInfo.tourType.toUpperCase())
      formData.append('description', tourData.basicInfo.description)
      formData.append('location', tourData.basicInfo.location)
      formData.append('country', tourData.basicInfo.country)
      formData.append('price', tourData.basicInfo.price)
      formData.append('duration', tourData.basicInfo.duration)
      formData.append('startDate', new Date(tourData.basicInfo.startDate).toISOString())
      formData.append('endDate', new Date(tourData.basicInfo.endDate).toISOString())
      formData.append('giveFacilitatorAccess', String(tourData.basicInfo.giveFacilitatorAccess))
      formData.append('coverageAreas', JSON.stringify(tourData.basicInfo.coverageAreas))
      formData.append('amenities', JSON.stringify(tourData.basicInfo.amenities))
      formData.append('languages', JSON.stringify(tourData.basicInfo.languages))
      formData.append('categories', JSON.stringify(tourData.basicInfo.categories))

      // Tour Images
      tourData.basicInfo.tourImages.forEach((image, index) => {
        formData.append('tourImages', image)
      })

      // Itinerary
      formData.append('itinerary', JSON.stringify(tourData.itinerary))

      // Accommodation
      formData.append('accommodation', JSON.stringify({
        hotelName: tourData.accommodation.hotelName,
        hotelLocation: tourData.accommodation.hotelLocation,
        description: tourData.accommodation.description,
        arrivalTime: tourData.accommodation.arrivalTime,
        pickupTime: tourData.accommodation.pickupTime
      }))

      // Hotel Images
      tourData.accommodation.hotelImages.forEach((image, index) => {
        formData.append('hotelImages', image)
      })

      // Log for debugging
      console.log('Submitting tour data:', {
        basicInfo: tourData.basicInfo,
        itinerary: tourData.itinerary,
        accommodation: tourData.accommodation
      })

      // Submit to API
      const response = await fetch('/api/tours/create', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.message || 'Failed to create tour')
      }

      const result = await response.json()
      console.log('Tour created successfully:', result) 
      toast.success('Tour created successfully!')
      // Redirect or show success message
       router.push('/my-tours')
    } catch (error) {
      console.error('Error creating tour:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <span>My Tours</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Create new Tour</span>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      currentStep >= step.id ? "bg-primary-color text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${currentStep >= step.id ? "text-gray-900" : "text-gray-500"}`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 ${currentStep > step.id ? "bg-red-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <TourBasicInfoStep 
            data={tourData.basicInfo}
            onUpdate={updateBasicInfo}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <TourItineraryStep 
            data={tourData.itinerary}
            onUpdate={updateItineraryDay}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <TourAccommodationStep 
            data={tourData.accommodation}
            onUpdate={updateAccommodation}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  )
}