import { create } from 'zustand'

interface AdminDashboardMetric {
  title: string
  value: string | number
  change: string
  changeType: "positive" | "negative"
  icon: string
}

interface AdminDashboardData {
  metrics: AdminDashboardMetric[]
  chartData: Array<{
    name: string
    bookings: number
    revenue: number
    users: number
  }>
  quickActions: Array<{
    id: string
    title: string
    description: string
    icon: string
    status?: "warning" | "info"
  }>
  recentTours: Array<{
    id: string
    title: string
    status: string
    host: {
      name: string
      avatar?: string
    }
    stats: {
      bookings: number
      reviews: number
    }
  }>
  userStats: {
    hosts: number
    guests: number
    facilitators: number
  }
  hasData: boolean
}

interface AdminDashboardStore {
  data: AdminDashboardData | null
  isLoading: boolean
  error: string | null
  fetchDashboardData: () => Promise<void>
}

export const useAdminDashboardStore = create<AdminDashboardStore>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch('/api/admin/dashboard')
      
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
