"use client"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { ChevronDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { performanceData } from "@/data/admin-data"
import { EmptyState } from "@/components/admin/empty-state"

export function PerformanceChart() {
  const hasData = performanceData.length > 0

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
        <Button variant="primary" className="flex items-center gap-2 bg-transparent">
          This Year
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {hasData ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              <Bar dataKey="tourViews" name="Tour Views" fill="#ef6144" radius={[2, 2, 0, 0]} />
              <Bar dataKey="clickedBook" name="Clicked Book" fill="#f48b6b" radius={[2, 2, 0, 0]} />
              <Bar dataKey="completedBooking" name="Completed Booking" fill="#dc4a2a" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState
          title="You haven't any action yet."
          description="Performance data will appear here once you have tour activity."
        />
      )}
    </Card>
  )
}
