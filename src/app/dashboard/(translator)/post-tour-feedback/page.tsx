"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, Users, Mic } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function TranslationFeedbackPage() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Dashboard</span>
          <span>/</span>
          <span>Feedback Requested</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Museum Tour</h1>
        <p className="text-muted-foreground">
          Overview of assigned translation sessions, performance, and upcoming tours
        </p>
      </div>

      {/* Tour Details Card */}
      <Card className="p-6 mb-6">
        <div className="flex gap-6 items-start mb-6">
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

          <div className="flex gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                alt="Maria Santos"
              />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                alt="Marco Rodriguez"
              />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </Card>

      {/* Feedback Form */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Translation Quality</h3>

        <div className="space-y-8">
          {/* Rating Question */}
          <div>
            <h4 className="font-semibold mb-4">How would you rate the translation experience?</h4>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-coral-600 hover:bg-coral-50 transition-colors flex items-center justify-center text-lg"
                >
                  ⭐
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">No rating</p>
          </div>

          {/* Challenges Text Area */}
          <div>
            <Label htmlFor="challenges" className="font-semibold mb-3 block">
              Share any challenges or insights from these session...
            </Label>
            <Textarea
              id="challenges"
              placeholder="Share any challenges or insights from these session..."
              className="min-h-32"
            />
          </div>

          {/* Technical Issues */}
          <div>
            <h4 className="font-semibold mb-4">Did you encounter a technical or coordination issue</h4>
            <RadioGroup>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="cursor-pointer">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Voice Note */}
          <div>
            <h4 className="font-semibold mb-4">Voice Note (Optional)</h4>
            <Button
              variant="secondary"
              className={`gap-2 ${isRecording ? "bg-red-50 border-red-300" : ""}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-4 h-4" />
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          </div>

          {/* Suggestions */}
          <div>
            <Label htmlFor="suggestions" className="font-semibold mb-3 block">
              Suggestions or Notes
            </Label>
            <Textarea id="suggestions" placeholder="Suggestions to improve future sessions..." className="min-h-32" />
            <p className="text-xs text-muted-foreground mt-2">0/1000 characters</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t border-border">
            <Button variant="secondary">Save Draft</Button>
            <Button className="bg-coral-600 hover:bg-coral-700">Submit Report</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
