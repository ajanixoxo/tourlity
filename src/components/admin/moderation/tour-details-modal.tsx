"use client"

import { useState } from "react"
import { X, MapPin, Calendar, Users, Star, Clock, Globe, Check, X as XIcon, Edit } from "lucide-react"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Tour {
  id: string
  title: string
  description: string
  type: 'PHYSICAL' | 'VIRTUAL'
  status: string
  price: number
  location: string
  country?: string
  duration: string
  groupSize?: string
  languages: string[]
  categories: string[]
  images: string[]
  rating: number
  reviewCount: number
  startDate?: string
  endDate?: string
  coverageAreas?: string[]
  amenities?: string[]
  createdAt: string
  host: {
    id: string
    firstName: string
    lastName: string
    email: string
    avatar?: string
    phoneNumber?: string
    bio?: string
    specialties?: string[]
    rating: number
    reviewCount: number
  }
  itinerary?: Array<{
    id: string
    dayNumber: number
    todo: string
    hotelLocation: string
    description: string
    arrivalTime: string
    pickupTime: string
    inclusive?: string
    exclusive?: string
  }>
  accommodation?: {
    id: string
    hotelName: string
    hotelLocation: string
    description: string
    arrivalTime: string
    pickupTime: string
    hotelImages: string[]
  }
  _count: {
    bookings: number
    reviews: number
  }
}

interface TourDetailsModalProps {
  tour: Tour
  isOpen: boolean
  onClose: () => void
  onApprove: () => void
  onReject: () => void
  onRequestEdits: () => void
}

export function TourDetailsModal({
  tour,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestEdits
}: TourDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'host'>('overview')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING_APPROVAL":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      case "DRAFT":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">{tour.title}</DialogTitle>
            <Button variant="secondary"  onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tour Header */}
          <div className="flex items-start space-x-4">
            {tour.images.length > 0 && (
              <img
                src={tour.images[0]}
                alt={tour.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {getStatusBadge(tour.status)}
                <Badge variant="outline">{tour.type}</Badge>
              </div>
              <p className="text-gray-600 mb-2">{tour.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {tour.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {tour.duration}
                </div>
                {tour.groupSize && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {tour.groupSize}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(tour.price)}
              </div>
              {tour.rating > 0 && (
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {tour.rating.toFixed(1)} ({tour.reviewCount} reviews)
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'itinerary', label: 'Itinerary' },
                { id: 'host', label: 'Host Info' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-coral-500 text-coral-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Tour Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Tour Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{tour.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{tour.location}</span>
                    </div>
                    {tour.country && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Country:</span>
                        <span className="font-medium">{tour.country}</span>
                      </div>
                    )}
                    {tour.startDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-medium">{formatDate(tour.startDate)}</span>
                      </div>
                    )}
                    {tour.endDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">End Date:</span>
                        <span className="font-medium">{formatDate(tour.endDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Languages & Categories</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Languages:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tour.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Categories:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tour.categories.map((category, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage Areas & Amenities */}
              {(tour.coverageAreas?.length || tour.amenities?.length) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.coverageAreas?.length && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Coverage Areas</h3>
                      <div className="flex flex-wrap gap-1">
                        {tour.coverageAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {tour.amenities?.length && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Amenities</h3>
                      <div className="flex flex-wrap gap-1">
                        {tour.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Images */}
              {tour.images.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Tour Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${tour.title} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'itinerary' && tour.itinerary && (
            <div className="space-y-4">
              {tour.itinerary.map((day) => (
                <div key={day.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Day {day.dayNumber}</h3>
                    <div className="text-sm text-gray-500">
                      Arrival: {day.arrivalTime} | Pickup: {day.pickupTime}
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">{day.todo}</h4>
                  <p className="text-gray-600 mb-2">{day.description}</p>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      Hotel: {day.hotelLocation}
                    </div>
                    {day.inclusive && (
                      <div className="mt-2">
                        <span className="font-medium text-green-700">Included:</span>
                        <p className="text-green-600">{day.inclusive}</p>
                      </div>
                    )}
                    {day.exclusive && (
                      <div className="mt-2">
                        <span className="font-medium text-red-700">Not Included:</span>
                        <p className="text-red-600">{day.exclusive}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'host' && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                {tour.host.avatar ? (
                  <img
                    src={tour.host.avatar}
                    alt={`${tour.host.firstName} ${tour.host.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {tour.host.firstName[0]}{tour.host.lastName[0]}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {tour.host.firstName} {tour.host.lastName}
                  </h3>
                  <p className="text-gray-600">{tour.host.email}</p>
                  {tour.host.phoneNumber && (
                    <p className="text-gray-600">{tour.host.phoneNumber}</p>
                  )}
                  {tour.host.bio && (
                    <p className="text-gray-600 mt-2">{tour.host.bio}</p>
                  )}
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {tour.host.rating.toFixed(1)} ({tour.host.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {tour.host.specialties?.length && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {tour.host.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {tour.accommodation && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Accommodation Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hotel:</span>
                      <span className="font-medium">{tour.accommodation.hotelName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{tour.accommodation.hotelLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival:</span>
                      <span className="font-medium">{tour.accommodation.arrivalTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pickup:</span>
                      <span className="font-medium">{tour.accommodation.pickupTime}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{tour.accommodation.description}</p>
                    {tour.accommodation.hotelImages.length > 0 && (
                      <div className="mt-3">
                        <span className="text-sm text-gray-600">Hotel Images:</span>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {tour.accommodation.hotelImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Hotel ${index + 1}`}
                              className="w-full h-20 object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={onRequestEdits}
            className="flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Request Edits
          </Button>
          <Button
            variant="secondary"
            onClick={onReject}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <XIcon className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button
            variant="primary"
            onClick={onApprove}
            className="flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Approve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
