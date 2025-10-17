/* eslint-disable react/no-unescaped-entities */
"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2">Get help with your bookings and account</p>
      </div>

      {/* FAQ */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">How do I book a tour?</h4>
            <p className="text-gray-600 text-sm">
              Browse tours, select your preferred date and time, and complete the booking process.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Can I cancel my booking?</h4>
            <p className="text-gray-600 text-sm">
              Yes, you can cancel up to 48 hours before the tour for a full refund.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">How do I leave a review?</h4>
            <p className="text-gray-600 text-sm">
              After your tour is completed, you'll receive an email to leave a review.
            </p>
          </div>
        </div>
      </Card>

      {/* Contact Support */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <Input placeholder="How can we help?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Describe your issue..."
            />
          </div>
          <Button variant="primary">Send Message</Button>
        </div>
      </Card>
    </div>
  )
}
