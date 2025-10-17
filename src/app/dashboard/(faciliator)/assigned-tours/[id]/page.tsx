/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { ChevronLeft, MapPin, Clock, Users, AlertCircle } from "lucide-react"

export default function AssignedTourDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/dashboard/facilitator/assigned-tours">
        <Button variant="secondary" className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Assigned Tours
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tour Details</h1>
          <p className="text-gray-600 mt-2">Carefully go through the details below</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tour Overview */}
          <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-500 rounded-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tour Overview</h3>
                <p className="text-gray-700">
                  Explore the vibrant cultural heritage of Cape Town through historic neighborhoods, local markets, and
                  traditional art galleries.
                </p>
              </div>
            </div>
          </Card>

          {/* Guest Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Guest Count</p>
                <p className="text-2xl font-bold text-gray-900">6 Adults</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Group Type</p>
                <p className="text-2xl font-bold text-gray-900">Family</p>
              </div>
            </div>
          </Card>

          {/* Translator */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Translator</h3>
            <div className="flex items-center gap-3">
              <img src="/placeholder.svg?key=21bnvl" alt="Translator" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-medium text-gray-900">Maria Santos</p>
                <p className="text-sm text-gray-600">English ⟷ Portuguese</p>
              </div>
            </div>
          </Card>

          {/* Pre-Tour Checklist */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pre-Tour Checklist</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked readOnly className="w-4 h-4" />
                <span className="text-gray-700">Route confirmed with host</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" readOnly className="w-4 h-4" />
                <span className="text-gray-700">Emergency contacts verified</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" readOnly className="w-4 h-4" />
                <span className="text-gray-700">Weather conditions checked</span>
              </div>
            </div>
          </Card>

          {/* Host Notes */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Host Notes</h3>
            <p className="text-gray-700">
              Please meet at the main entrance of V&A Waterfront. The group includes elderly guests, so we'll take a
              slower pace. Bring umbrellas as light rain is expected.
            </p>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Tour Image */}
          <Card className="p-0 overflow-hidden">
            <img src="/placeholder.svg?key=22bnvl" alt="Tour" className="w-full h-48 object-cover" />
          </Card>

          {/* Tour Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historic Downtown Walking Tour</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Queensland, Australia</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Today, 2:00 PM - 5:00 PM (GMT+2)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="w-4 h-4" />
                <span className="text-sm">6 Adults • Family</span>
              </div>
            </div>
          </Card>

          {/* Host */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Host</h3>
            <div className="flex items-center gap-3">
              <img src="/images/img_image_2.png" alt="Host" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-medium text-gray-900">Maria Santos</p>
                <p className="text-sm text-gray-600">Host</p>
              </div>
            </div>
          </Card>

          {/* Emergency Contacts */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Local Emergency</p>
                <p className="font-semibold text-coral-600">+27 10 1777 987</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tour Support</p>
                <p className="font-semibold text-coral-600">+ 55 50 0123 568</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button variant="secondary">Decline</Button>
        <Button variant="primary">Accept</Button>
      </div>
    </div>
  )
}
