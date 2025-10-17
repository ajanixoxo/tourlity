"use client"

import { useState } from "react"
import Button from "@/components/root/button"
import { Card } from "@/components/ui/card"
import { Star, MapPin, Users, Eye } from "lucide-react"
import { customTourRequests, hostProposals } from "@/data/tour-management-data"
import type { CustomTourRequest } from "@/types/tour-management"
import Image from "next/image"
import Link from "next/link"

export default function CustomizeTourDetailsPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [showProposalDetails, setShowProposalDetails] = useState(false)

  const request = customTourRequests.find((r) => r.id === params.id)

  if (!request) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-muted-foreground">Tour request not found</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: CustomTourRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "negotiating":
        return "bg-blue-100 text-blue-700"
      case "declined":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard/customize-tours" className="hover:text-foreground">
            Customize Tours
          </Link>
          <span>›</span>
          <span>View Details</span>
        </div>

        {/* Header with Edit Button */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Custom Tour Details</h1>
          <Button variant="secondary">Edit Request</Button>
        </div>

        {/* Tour Details Card */}
        <Card className="mb-6 p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{request.title}</h2>
              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(request.status)}`}
              >
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <div className="mt-1 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-coral-500" />
                <p className="font-medium text-foreground">{request.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="mt-1 font-medium text-foreground">{request.tourType[0]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="mt-1 font-medium text-foreground">{request.dateTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Group Size</p>
              <div className="mt-1 flex items-center gap-2">
                <Users className="h-4 w-4 text-coral-500" />
                <p className="font-medium text-foreground">{request.groupInfo}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Your Proposal Section */}
        <Card className="mb-6 p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Your Proposal</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Budget Range</p>
              <p className="mt-1 text-lg font-semibold text-foreground">{request.priceRange}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Special Notes</p>
              <p className="mt-1 text-foreground">{request.description}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Accessibility Requirements</p>
              <p className="mt-1 text-foreground">{request.assistanceNeeded}</p>
            </div>
          </div>
        </Card>

        {/* Host Proposals Section */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Host Proposals ({hostProposals.length})</h3>

          <div className="space-y-4">
            {hostProposals.map((proposal) => (
              <Card key={proposal.id} className="p-6">
                {/* Host Info */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={proposal.hostAvatar || "/placeholder.svg"}
                      alt={proposal.hostName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{proposal.hostName}</p>
                      <p className="text-sm text-muted-foreground">{proposal.hostRole}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(proposal.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-foreground">{proposal.rating}</span>
                        <span className="text-sm text-muted-foreground">({proposal.reviewCount} Reviews)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{proposal.responseTime}</p>
                </div>

                {/* Pricing */}
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Base Tour Price</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">${proposal.baseTourPrice}</p>
                  </div>
                  {proposal.additionalServices.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Additional Services</p>
                      <div className="mt-1 space-y-1">
                        {proposal.additionalServices.map((service, idx) => (
                          <p key={idx} className="text-sm text-foreground">
                            {service.name} <span className="text-muted-foreground">+${service.price}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Total Price */}
                <div className="mb-4 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">Total Price</p>
                    <p className="text-2xl font-bold text-coral-500">${proposal.totalPrice}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button className="flex-1 bg-coral-500 hover:bg-coral-600 text-white">Accept Proposal</Button>
                  <Button variant="secondary" className="flex-1 bg-transparent">
                    Decline
                  </Button>
                  <Button
                    variant="secondary"
                    className="text-coral-500 hover:text-coral-600"
                    onClick={() => setShowProposalDetails(!showProposalDetails)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Proposal
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
