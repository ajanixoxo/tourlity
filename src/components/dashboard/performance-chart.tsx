"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import type { ChartDataPoint } from "@/data/dashboard"

interface PerformanceChartProps {
  data: ChartDataPoint[]
  hasData: boolean
}

export function PerformanceChart({ data, hasData }: PerformanceChartProps) {
  if (!hasData) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Performance</CardTitle>
          <Select defaultValue="this-year">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-80 flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gray-400 rounded-full opacity-50"></div>
          </div>
          <p className="text-gray-500 text-center">You haven&apos;t any action yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Performance</CardTitle>
        <Select defaultValue="this-year">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
              <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
