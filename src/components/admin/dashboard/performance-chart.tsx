"use client"
import { Card } from "@/components/ui/card"
import Button from "@/components/root/button"
import { ChevronDown } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { EmptyState } from "@/components/admin/empty-state"

interface PerformanceChartProps {
  data: Array<{
    name: string
    bookings: number
    revenue: number
    users: number
  }>
  hasData: boolean
}

export function PerformanceChart({ data, hasData }: PerformanceChartProps) {
  if (!hasData) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
          <Button variant="secondary" className="flex items-center gap-2">
            This Year
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <EmptyState
          title="No performance data yet"
          description="Performance metrics will appear here once you have platform activity."
        />
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
        <Button variant="secondary" className="flex items-center gap-2">
          This Year
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
            <Bar dataKey="bookings" name="Bookings" fill="#ef6144" radius={[2, 2, 0, 0]} />
            <Bar dataKey="revenue" name="Revenue ($)" fill="#f48b6b" radius={[2, 2, 0, 0]} />
            <Bar dataKey="users" name="New Users" fill="#dc4a2a" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}