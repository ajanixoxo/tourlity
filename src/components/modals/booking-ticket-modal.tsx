"use client"

import React, { useEffect, useState } from 'react'
import BaseModal from './base-modal'
import Button from '../root/button'
import { Download, X } from 'lucide-react'
// QR Code will be generated using qrcode library
// Install: npm install qrcode @types/qrcode

interface BookingDetails {
  id: string
  confirmationNumber: string
  tourTitle: string
  startDate: string
  endDate: string
  guestEmail: string
  guestName: string
}

interface BookingTicketModalProps {
  isOpen: boolean
  onClose: () => void
  booking: BookingDetails | null
  onDownloadTicket?: () => void
  onGoToBookings?: () => void
}

export default function BookingTicketModal({
  isOpen,
  onClose,
  booking,
  onDownloadTicket,
  onGoToBookings
}: BookingTicketModalProps) {
  const [qrCodeData, setQrCodeData] = useState('')

  useEffect(() => {
    if (booking) {
      // Generate QR code data with booking information
      setQrCodeData(JSON.stringify({
        bookingId: booking.id,
        confirmationNumber: booking.confirmationNumber,
        tourTitle: booking.tourTitle
      }))
    }
  }, [booking])

  if (!isOpen || !booking) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showOnMobile={true}>
      <div className="relative p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition cursor-pointer z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Your Tour Is Booked!
        </h2>

        {/* Ticket Design */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 mb-6 relative">
          {/* Perforated line effect */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>
          <div className="absolute left-1/2 top-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-1/2 bottom-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center p-4 border-r-2 border-dashed border-gray-300 md:border-r md:border-b-0 border-b-2 md:pr-6 md:pb-0 pb-6">
              <div className="bg-white p-4 rounded-lg flex items-center justify-center min-h-[150px]">
                {qrCodeData ? (
                  <div className="w-[150px] h-[150px] border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">QR Code</p>
                      <div className="w-[120px] h-[120px] bg-black grid grid-cols-8 gap-0.5 p-2">
                        {/* Simple QR Code representation - Replace with actual QR code library */}
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`${
                              Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">Generating QR...</div>
                )}
              </div>
            </div>

            {/* Booking Details Section */}
            <div className="flex flex-col justify-center space-y-4 md:pl-6 pt-6 md:pt-0">
              <div>
                <p className="text-gray-600 text-sm mb-2">Tour</p>
                <p className="text-gray-900 font-semibold text-lg">
                  {booking.tourTitle}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Dates</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Confirmation Number</p>
                <p className="text-gray-900 font-bold text-xl">
                  #{booking.confirmationNumber}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Email Confirmation</p>
                <p className="text-gray-900 font-medium text-sm">
                  Sent to {booking.guestEmail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            onClick={onDownloadTicket}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Download size={18} />
            Download Ticket
          </Button>
          <Button
            variant="primary"
            onClick={onGoToBookings}
            className="flex-1 border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
          >
            Go to Bookings
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}

