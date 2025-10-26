import { create } from 'zustand'

interface DashboardMetric {
  title: string
  value: string | number
  change: string
  changeType: "positive" | "negative"
  icon: string
}

interface ChartDataPoint {
  name: string
  value: number
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  status?: "warning" | "info"
}

interface ActivityItem {
  id: string
  tourName: string
  status: "completed" | "pending" | "cancelled"
  dateTime: string
  guest?: string
  host?: string
}

interface ReviewHighlight {
  id: string
  rating: number
  text: string
  tourName?: string
  guestName?: string
}

interface HostDashboardData {
  metrics: DashboardMetric[]
  chartData: ChartDataPoint[]
  quickActions: QuickAction[]
  recentActivity: ActivityItem[]
  reviewHighlights: ReviewHighlight[]
  hasData: boolean
}

interface HostDashboardStore {
  data: HostDashboardData | null
  isLoading: boolean
  error: string | null
  fetchDashboardData: () => Promise<void>
}

export const useHostDashboardStore = create<HostDashboardStore>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch('/api/host/dashboard')
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const result = await response.json()
      
      if (result.success) {
        set({ data: result.data })
      } else {
        throw new Error(result.error || 'Failed to fetch dashboard data')
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' })
    } finally {
      set({ isLoading: false })
    }
  }
}))