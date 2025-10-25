"use client"

import { useState } from "react"
import { Eye, Check, X, Edit, MoreVertical, MapPin, Calendar, Users, Star } from "lucide-react"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TourDetailsModal } from "./tour-details-modal"
import { RejectTourModal } from "./reject-tour-modal"
import { RequestEditsModal } from "./request-edits-modal"

interface Tour {
  id: string
  title: string
  description: string
  type: 'PHYSICAL' | 'VIRTUAL'
  status: string
  price: number
  location: string
  duration: string
  groupSize?: string
  languages: string[]
  categories: string[]
  images: string[]
  rating: number
  reviewCount: number
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
  _count: {
    bookings: number
    reviews: number
  }
}

interface TourModerationTableProps {
  tours: Tour[]
  onApprove: (tourId: string) => void
  onReject: (tourId: string, reason: string) => void
  onRequestEdits: (tourId: string, reason: string) => void
}

export function TourModerationTable({
  tours,
  onApprove,
  onReject,
  onRequestEdits
}: TourModerationTableProps) {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showEditsModal, setShowEditsModal] = useState(false)
  const [tourToAction, setTourToAction] = useState<Tour | null>(null)

  const handleViewDetails = (tour: Tour) => {
    setSelectedTour(tour)
    setShowDetails(true)
  }

  const handleApprove = (tour: Tour) => {
    onApprove(tour.id)
  }

  const handleReject = (tour: Tour) => {
    setTourToAction(tour)
    setShowRejectModal(true)
  }

  const handleRequestEdits = (tour: Tour) => {
    setTourToAction(tour)
    setShowEditsModal(true)
  }

  const handleRejectConfirm = (reason: string) => {
    if (tourToAction) {
      onReject(tourToAction.id, reason)
      setShowRejectModal(false)
      setTourToAction(null)
    }
  }

  const handleEditsConfirm = (reason: string) => {
    if (tourToAction) {
      onRequestEdits(tourToAction.id, reason)
      setShowEditsModal(false)
      setTourToAction(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      case "IN-ACTIVE":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-900">Tour Title</th>
                <th className="text-left p-4 font-medium text-gray-900">Host</th>
                <th className="text-left p-4 font-medium text-gray-900">Created</th>

                <th className="text-left p-4 font-medium text-gray-900">Type</th>
                <th className="text-left p-4 font-medium text-gray-900">Category</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>

                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-start space-x-3">

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{tour.title}</h3>

                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {tour.host.firstName} {tour.host.lastName}
                        </p>

                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {formatDate(tour.createdAt)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-600">
                      {tour.type}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-900">
                      {tour.categories?.length > 0 ? (
                        tour.categories.map((category) => (
                          <span key={category}>{category}</span>
                        ))
                      ) : (
                        <span className="text-gray-500 italic">No categories</span>
                      )}

                    </div>

                  </td>
                  <td className="p-4">
                    {getStatusBadge(tour.status)}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center space-x-2">


                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" className="border-none!" >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleApprove(tour)}>
                            <Check className="w-4 h-4 mr-2 text-green-600" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReject(tour)}>
                            <X className="w-4 h-4 mr-2 text-red-600" />
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRequestEdits(tour)}>
                            <Edit className="w-4 h-4 mr-2 text-blue-600" />
                            Request Edits
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedTour && (
        <TourDetailsModal
          tour={selectedTour}
          isOpen={showDetails}
          onClose={() => {
            setShowDetails(false)
            setSelectedTour(null)
          }}
          onApprove={() => {
            handleApprove(selectedTour)
            setShowDetails(false)
            setSelectedTour(null)
          }}
          onReject={() => {
            setTourToAction(selectedTour)
            setShowRejectModal(true)
            setShowDetails(false)
            setSelectedTour(null)
          }}
          onRequestEdits={() => {
            setTourToAction(selectedTour)
            setShowEditsModal(true)
            setShowDetails(false)
            setSelectedTour(null)
          }}
        />
      )}

      {tourToAction && (
        <>
          <RejectTourModal
            tour={tourToAction}
            isOpen={showRejectModal}
            onClose={() => {
              setShowRejectModal(false)
              setTourToAction(null)
            }}
            onConfirm={handleRejectConfirm}
          />

          <RequestEditsModal
            tour={tourToAction}
            isOpen={showEditsModal}
            onClose={() => {
              setShowEditsModal(false)
              setTourToAction(null)
            }}
            onConfirm={handleEditsConfirm}
          />
        </>
      )}
    </>
  )
}