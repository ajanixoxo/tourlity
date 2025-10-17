"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Users } from "lucide-react"
import Image from "next/image"

export function SubmitReportDetailsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Dashboard</span>
          <span>/</span>
          <span>Submit Reports</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Pending Report - Museum Tour</h1>
        <p className="text-muted-foreground">Fill in your report details</p>
      </div>

      <div className="grid gap-6">
        {/* Report Header */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop"
                alt="Museum Tour"
                width={128}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Historic Downtown Walking Tour</h2>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Today, 2:00 PM - 5:00 PM (GMT+2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>In Person</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>18 attendees out of 20</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-red-600 font-medium">Due in 1:58:00</div>
            </div>
          </div>
        </Card>

        {/* Completion Progress */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Completion</h3>
            <span className="text-sm text-muted-foreground">0%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-coral-600 h-2 rounded-full" style={{ width: "0%" }} />
          </div>
        </Card>

        {/* Feedback & Issues Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Feedback & Issues</h3>

          <div className="space-y-6">
            {/* Key Success Points */}
            <div>
              <h4 className="font-semibold mb-4">Key Success Points</h4>
              <div className="space-y-3">
                {[
                  "Tour Started On Time",
                  "Guests Engaged Throughout",
                  "Translator Completed Role",
                  "All Safety Protocols Followed",
                  "Tour Ended On Schedule",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <Checkbox id={point} />
                    <Label htmlFor={point} className="cursor-pointer">
                      {point}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilitator Feedback */}
            <div>
              <h4 className="font-semibold mb-3">Facilitator Feedback</h4>
              <Textarea
                placeholder="Describe any issues, highlights, or concerns from the tour..."
                className="min-h-32"
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button variant="secondary">Save Draft</Button>
          <Button className="bg-coral-600 hover:bg-coral-700">Submit Report</Button>
        </div>
      </div>
    </div>
  )
}
