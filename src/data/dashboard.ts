// Dashboard types for different user roles
export interface DashboardMetric {
  title: string
  value: string | number
  change: string
  changeType: "positive" | "negative"
  icon: string
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  href?: string
  status?: "info" | "warning" | "success"
}

export interface ActivityItem {
  id: string
  tourName: string
  host?: string
  guest?: string
  status: "completed" | "pending" | "cancelled"
  dateTime: string
}

export interface ReviewHighlight {
  id: string
  rating: number
  text: string
  tourName?: string
  guestName?: string
}

export interface ChartDataPoint {
  name: string
  value: number
}

export type UserRole = "host" | "facilitator" | "translator" | "admin"

export interface DashboardData {
  metrics: DashboardMetric[]
  chartData: ChartDataPoint[]
  quickActions: QuickAction[]
  recentActivity: ActivityItem[]
  reviewHighlights: ReviewHighlight[]
  hasData: boolean
}
