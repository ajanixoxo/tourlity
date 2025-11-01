"use client"

import React from 'react'
import BaseModal from './base-modal'
import Button from '../root/button'
import { X } from 'lucide-react'
import Image from 'next/image'

interface Tour {
  id: string
  title: string
  description: string
  price: number
  location: string
  duration?: string
  images?: string[]
  host: {
    id: string
    firstName: string
    lastName: string
    avatar?: string
  }
}

interface BookingConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  tour: Tour | null
  onConfirm: () => void
  isLoading?: boolean
}

export default function BookingConfirmationModal({
  isOpen,
  onClose,
  tour,
  onConfirm,
  isLoading = false
}: BookingConfirmationModalProps) {
  if (!isOpen || !tour) return null

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showOnMobile={true}>
      <div className="relative p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          Confirm Booking
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Please review your booking details before confirming.
        </p>

        {/* Tour Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-4">
          {tour.images && tour.images.length > 0 && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
              <Image
                src={tour.images[0]}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Tour</h3>
              <p className="text-gray-700">{tour.title}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Host</h3>
              <div className="flex items-center gap-2">
                {tour.host.avatar && (
                  <Image
                    src={tour.host.avatar}
                    alt={`${tour.host.firstName} ${tour.host.lastName}`}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <p className="text-gray-700">
                  {tour.host.firstName} {tour.host.lastName}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-gray-700">{tour.location}</p>
            </div>

            {tour.duration && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Duration</h3>
                <p className="text-gray-700">{tour.duration}</p>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Total Price</h3>
                <p className="text-2xl font-bold text-[#F26457]">
                  ${tour.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-[#F26457] hover:bg-[#CA3F33] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Processing...
              </span>
            ) : (
              'Confirm & Proceed to Payment'
            )}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}

