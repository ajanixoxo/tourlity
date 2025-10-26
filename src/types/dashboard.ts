import { Tour } from './tour'

export interface HostDashboardMetrics {
  totalTours: number
  activeTours: number
  totalBookings: number
  totalEarnings: number
  completedTours: number
  averageRating: number
  monthlyBookings: number
  monthlyEarnings: number
}

export interface HostChartData {
  bookings: Array<{ date: string; count: number }>
  earnings: Array<{ date: string; amount: number }>
  ratings: Array<{ date: string; rating: number }>
  timeRange: 'weekly' | 'monthly' | 'yearly'
}

export interface HostQuickAction {
  pendingRequests: number
  upcomingTours: number
  pendingReviews: number
  messageRequests: number
}

export interface HostActivity {
  id: string
  type: 'booking' | 'review' | 'request' | 'payment'
  title: string
  description: string
  timestamp: string
  status?: string
  tour?: {
    id: string
    title: string
    image?: string
  }
  guest?: {
    name: string
    avatar?: string
  }
}

export interface HostReview {
  id: string
  tourName: string
  rating: number
  comment: string
  guestName: string
  date: string
  avatar?: string
  tourId: string
}

export interface HostDashboardData {
  metrics: HostDashboardMetrics
  chartData: HostChartData
  quickActions: HostQuickAction
  recentActivity: HostActivity[]
  reviewHighlights: HostReview[]
  hasData: boolean
}
