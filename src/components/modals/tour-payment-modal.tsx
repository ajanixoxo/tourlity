"use client"

import React, { useState, useEffect } from 'react'
import BaseModal from './base-modal'
import Button from '../root/button'
import { X, CreditCard, Lock } from 'lucide-react'
import Image from 'next/image'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

interface TourPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  tour: {
    title: string
    price: number
    id?: string
  }
  clientSecret: string | null
  onPaymentSuccess: (paymentMethod: 'card' | 'paypal', paymentIntentId?: string) => void
  onPaymentError: (error: string) => void
}

// Payment Form Component using Stripe Elements
function PaymentForm({
  tour,
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
  onClose
}: {
  tour: { title: string; price: number; id?: string }
  clientSecret: string | null
  onPaymentSuccess: (paymentMethod: 'card' | 'paypal', paymentIntentId?: string) => void
  onPaymentError: (error: string) => void
  onClose: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [saveCard, setSaveCard] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!clientSecret) {
      onPaymentError('Payment initialization failed. Please try again.')
    }
  }, [clientSecret, onPaymentError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      onPaymentError('Payment system not ready. Please try again.')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      if (paymentMethod === 'card') {
        // CRITICAL: Must call elements.submit() FIRST, before any async work
        // This validates the payment form and prepares it for confirmation
        const { error: submitError } = await elements.submit()
        
        if (submitError) {
          setError(submitError.message || 'Please check your payment details.')
          setIsProcessing(false)
          return
        }

        // Only after elements.submit() succeeds, confirm the payment
        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: window.location.origin + '/dashboard',
            // Uncomment to save payment method for future use
            // payment_method_data: {
            //   billing_details: {
            //     // Add billing details if needed
            //   }
            // },
            // setup_future_usage: saveCard ? 'off_session' : undefined,
          },
          redirect: 'if_required'
        })

        if (stripeError) {
          // Provide more detailed error information
          let errorMessage = stripeError.message || 'Payment failed. Please try again.'
          
          // Add helpful hints for common errors
          if (stripeError.message?.includes('declined') || stripeError.message?.includes('card')) {
            errorMessage += ' Make sure you\'re using a test card number (4242 4242 4242 4242) and test API keys.'
          }
          
          setError(errorMessage)
          setIsProcessing(false)
          return
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
          // Pass payment intent ID to success handler
          onPaymentSuccess('card', paymentIntent.id)
        } else {
          setError('Payment was not completed. Please try again.')
          setIsProcessing(false)
        }
      } else {
        // PayPal integration would go here
        // For now, show error that PayPal is not yet implemented
        setError('PayPal payment is not yet available. Please use card payment.')
        setIsProcessing(false)
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'An unexpected error occurred. Please try again.')
      setIsProcessing(false)
    }
  }

  const paymentElementOptions = {
    layout: 'tabs' as const,
    business: {
      name: 'Tourlity',
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Amount */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Amount to Pay</span>
          <span className="text-2xl font-bold text-[#F26457]">
            ${tour.price}
          </span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
              paymentMethod === 'card'
                ? 'bg-[#F26457] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <CreditCard size={18} />
            Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
              paymentMethod === 'paypal'
                ? 'bg-[#F26457] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Image
              src="/images/paypal-payment.png"
              alt="PayPal"
              width={18}
              height={18}
              className="object-contain"
            />
            Paypal
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Stripe Payment Element */}
      {paymentMethod === 'card' && clientSecret && (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#F26457] focus:ring-[#F26457]"
            />
            <label htmlFor="saveCard" className="text-sm text-gray-700 cursor-pointer">
              Save card for future bookings
            </label>
          </div>
        </div>
      )}

      {/* PayPal Notice */}
      {paymentMethod === 'paypal' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            PayPal integration is coming soon. Please use card payment for now.
          </p>
        </div>
      )}

      {/* Security Message */}
      <div className="flex items-start gap-2 text-gray-500 text-xs">
        <Lock size={14} className="mt-0.5 shrink-0 text-[#F26457]" />
        <p>
          Securely encrypted. Your information is safe with us. We use
          industry-standard SSL encryption to protect your data.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="flex-1"
          disabled={isProcessing}
        >
          Go Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1 bg-[#F26457] hover:bg-[#CA3F33] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProcessing || !stripe || !elements || !clientSecret || paymentMethod === 'paypal'}
        >
          {isProcessing ? 'Processing...' : `Pay $${tour.price} Now`}
        </Button>
      </div>
    </form>
  )
}

// Main Modal Component
export default function TourPaymentModal({
  isOpen,
  onClose,
  tour,
  clientSecret,
  onPaymentSuccess,
  onPaymentError
}: TourPaymentModalProps) {
  const [stripeOptions, setStripeOptions] = useState<StripeElementsOptions | null>(null)

  useEffect(() => {
    if (clientSecret && isOpen) {
      setStripeOptions({
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#F26457',
            colorBackground: '#FAF9F6',
            colorText: '#1F2937',
            colorDanger: '#EF4444',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '12px',
          },
        },
      })
    }
  }, [clientSecret, isOpen])

  if (!isOpen) return null

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

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          Make Payment
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Please enter your details.
        </p>

        {stripeOptions && clientSecret ? (
          <Elements stripe={stripePromise} options={stripeOptions}>
            <PaymentForm
              tour={tour}
              clientSecret={clientSecret}
              onPaymentSuccess={onPaymentSuccess}
              onPaymentError={onPaymentError}
              onClose={onClose}
            />
          </Elements>
        ) : (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F26457] mx-auto mb-4"></div>
            <p className="text-gray-600">Initializing payment...</p>
          </div>
        )}
      </div>
    </BaseModal>
  )
}
