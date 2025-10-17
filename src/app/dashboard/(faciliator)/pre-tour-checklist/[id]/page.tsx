/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Clock, Users, AlertCircle } from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  completed: boolean
  completedAt?: string
}

const checklistItems: ChecklistItem[] = [
  {
    id: "1",
    title: "Venue confirmed and accessible",
    completed: true,
    completedAt: "Completed on July 10, 2025 at 9:30 AM",
  },
  {
    id: "2",
    title: "Translator briefed and confirmed attendance",
    completed: true,
    completedAt: "Completed on July 10, 2025 at 11:45 AM",
  },
  {
    id: "3",
    title: "Guest list reviewed",
    completed: true,
    completedAt: "Completed on July 10, 2025 at 1:20 PM",
  },
  {
    id: "4",
    title: "Emergency contacts verified",
    completed: false,
  },
  {
    id: "5",
    title: "Weather conditions checked",
    completed: false,
  },
  {
    id: "6",
    title: "Equipment prepared",
    completed: false,
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ChecklistDetailsPage({ params }: { params: { id: string } }) {
  const [items, setItems] = useState(checklistItems)

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              completedAt: !item.completed
                ? `Completed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`
                : undefined,
            }
          : item,
      ),
    )
  }

  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/dashboard/facilitator/pre-tour-checklist">
        <Button variant="secondary" className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Pre-Tour Checklist
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pre-Tour Checklist</h1>
          <p className="text-gray-600 mt-2">Ensure all tasks are completed before the tour</p>
        </div>
        <div className="text-right text-sm text-gray-600">Last updated: July 10, 2025, 3:15 PM</div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card */}
          <Card className="p-6 bg-gradient-to-r from-coral-50 to-orange-50 border-coral-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-coral-500 rounded-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pre-Tour Checklist</h3>
                <p className="text-gray-700">Ensure all tasks are completed before the tour</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Completion: {completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-coral-500 transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Tour Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tour Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <img src="/historic-downtown-walking-tour.jpg" alt="Tour" className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Historic Downtown Walking Tour</h4>
                    <p className="text-sm text-gray-600">Queensland, Australia</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Today, 2:00 PM - 5:00 PM (GMT+2)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">6 Adults • Family</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Required Tasks */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Tasks</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                  <Checkbox checked={item.completed} onChange={() => toggleItem(item.id)} className="mt-1" />
                  <div className="flex-1">
                    <p className={`font-medium ${item.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                      {item.title}
                    </p>
                    {item.completedAt && <p className="text-sm text-green-600 mt-1">{item.completedAt}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* People */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">People</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/maria-santos.jpg" alt="Host" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium text-gray-900">Host</p>
                  <p className="text-sm text-gray-600">Maria Santos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src="/marco-rodriguez.jpg" alt="Translator" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium text-gray-900">Translator</p>
                  <p className="text-sm text-gray-600">Marco Rodriguez</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Emergency Contacts & Map */}
        <div className="space-y-6">
          {/* Emergency Contacts */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Local Emergency</p>
                <p className="text-lg font-semibold text-coral-600">+27 10 1777 987</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tour Support</p>
                <p className="text-lg font-semibold text-coral-600">+ 55 50 0123 568</p>
              </div>
            </div>
          </Card>

          {/* Meeting Point */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Point</h3>
            <div className="bg-gray-200 rounded-lg h-48 mb-3 flex items-center justify-center">
              <img src="/map-location.png" alt="Map" className="w-full h-full rounded-lg object-cover" />
            </div>
            <p className="text-sm text-gray-700">
              Meet at the main entrance near the Clock Tower Centre. Look for the tour group with Sarah Chen.
            </p>
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
