"use client"

import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, Users, Download } from "lucide-react"
import Image from "next/image"

export default function ReviewScriptPage() {
  const scriptSections = [
    {
      title: "Welcome & Introduction",
      content:
        "Welcome to our Historic Downtown Walking Tour! Today we'll explore the rich heritage of our city center, dating back to the early 1800s. This tour covers approximately 1.2 miles and takes about 90 minutes.",
      note: "The term 'downtown' originated from Manhattan, where the original settlement was at the southern tip of the island.",
    },
    {
      title: "Stop 1: City Hall Plaza",
      content:
        "Our first stop is the magnificent City Hall, built in 1847 in the Greek Revival style. Notice the Corinthian columns and the limestone facade.",
      note: "Greek Revival ( ), Corinthian columns ( ), limestone ( )",
    },
    {
      title: "Stop 2: Historic Market Square",
      content:
        "The bustling Market Square has been the heart of commerce since 1823. Local farmers and artisans still gather here every Saturday morning...",
      note: "",
    },
  ]

  const checklistItems = [
    { label: "Venue confirmed and accessible", completed: true, date: "July 10, 2025 at 9:30 AM" },
    { label: "Translator briefed and confirmed attendance", completed: true, date: "July 10, 2025 at 11:45 AM" },
    { label: "Guest list reviewed", completed: true, date: "July 10, 2025 at 1:20 PM" },
    { label: "Safety procedures understood", completed: true, date: "July 10, 2025 at 9:30 AM" },
    { label: "Materials received (if applicable)", completed: false, date: "Yet to do this" },
    { label: "Assigned start time synced with host", completed: false, date: "Yet to do this" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>Dashboard</span>
          <span>/</span>
          <span>Review Tour Script</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Museum Tour</h1>
        <p className="text-muted-foreground">
          Overview of assigned translation sessions, performance, and upcoming tours
        </p>
      </div>

      {/* Tour Details Card */}
      <Card className="p-6 mb-6">
        <div className="flex gap-6 items-start mb-6">
          <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0">
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
                <span>18 attendees</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-border mb-6">
          <Button variant="secondary" className="border-b-2 border-coral-600 rounded-none">
            Review Tour Script
          </Button>
          <Button variant="secondary" className="rounded-none">
            Guest Notes
          </Button>
          <Button variant="secondary" className="rounded-none">
            Message Host
          </Button>
        </div>

        {/* Tour Details */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Tour Details</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Host</span>
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                  alt="Maria Santos"
                />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <span className="text-sm">Maria Santos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Facilitator</span>
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                  alt="Marco Rodriguez"
                />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <span className="text-sm">Marco Rodriguez</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tour Script */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-6">Tour Script</h3>

        <div className="space-y-6">
          {scriptSections.map((section, idx) => (
            <div key={idx} className="border-l-4 border-coral-600 pl-4">
              <h4 className="font-semibold mb-2">{section.title}</h4>
              <p className="text-sm text-foreground mb-3">{section.content}</p>
              {section.note && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm text-blue-900">
                    <strong>Key Vocabulary:</strong> {section.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Preparation Checklist */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Preparation Checklist</h3>
          <Badge className="bg-orange-100 text-orange-800">Completed: 75%</Badge>
        </div>

        <div className="space-y-3">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <Checkbox checked={item.completed} disabled className="mt-1" />
              <div className="flex-1">
                <Label className="font-medium text-sm">{item.label}</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.completed ? "Completed on " : ""}
                  {item.date}
                </p>
              </div>
              {item.completed && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
              {!item.completed && <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
