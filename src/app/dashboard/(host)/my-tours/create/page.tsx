"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { TourBasicInfoStep } from "@/components/tour-creation/tour-basic-info-steps"
import { TourItineraryStep } from "@/components/tour-creation/tour-itinerary-steps"
import { TourAccommodationStep } from "@/components/tour-creation/tour-accommodation-steps"

export default function CreateTourPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, name: "Basic Information" },
    { id: 2, name: "Itinerary" },
    { id: 3, name: "Accommodation" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <span>My Tours</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Create new Tour</span>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      currentStep >= step.id ? "bg-coral-500 text-white" : "bg-gray-200 text-gray-500"
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
                  <div className={`h-1 flex-1 mx-4 ${currentStep > step.id ? "bg-coral-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && <TourBasicInfoStep onNext={() => setCurrentStep(2)} />}
        {currentStep === 2 && <TourItineraryStep onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
        {currentStep === 3 && <TourAccommodationStep onBack={() => setCurrentStep(2)} />}
      </div>
    </div>
  )
}
