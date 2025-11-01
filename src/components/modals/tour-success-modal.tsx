"use client"

import React from 'react'
import BaseModal from './base-modal'
import Button from '../root/button'
import Image from 'next/image'

interface TourSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  tourTitle?: string
  isLoading?: boolean
}

export default function TourSuccessModal({
  isOpen,
  onClose,
  onNext,
  tourTitle,
  isLoading = false
}: TourSuccessModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showOnMobile={true}>
      <div className="p-8 text-center flex flex-col items-center justify-center">
        <div className="mb-6">
          <Image
            src="/images/success-icon.png"
            alt="Success"
            width={200}
            height={200}
            className="w-full max-w-[200px] h-auto mx-auto"
          />
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F26457] mb-4">
          Trip Successfully Booked!
        </h2>
        
        {tourTitle && (
          <p className="text-gray-600 mb-6">
            Your booking for <span className="font-semibold">{tourTitle}</span> has been confirmed.
          </p>
        )}

        <Button
          variant="primary"
          onClick={onNext}
          disabled={isLoading}
          className="w-full bg-[#F26457] hover:bg-[#CA3F33] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Loading...
            </span>
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </BaseModal>
  )
}

