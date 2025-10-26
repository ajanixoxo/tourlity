import { useEffect } from 'react'
import { AdminOnly } from '@/components/auth/ProtectedRoute'
import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { MetricsCards } from "@/components/admin/dashboard/metrics-cards"
import { PerformanceChart } from "@/components/admin/dashboard/performance-chart"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"
import { RecentTourListings } from '@/components/admin/dashboard/recent-tour-listing'
import { useAdminDashboardStore } from '@/lib/stores/admin-dashboard-store'
import { Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const { data, isLoading, error, fetchDashboardData } = useAdminDashboardStore()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-coral-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchDashboardData()}
            className="text-coral-500 hover:text-coral-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No dashboard data available</p>
      </div>
    )
  }

  return (
    <AdminOnly>
      <div className="space-y-6">
        <DashboardHeader />
        <MetricsCards metrics={data.metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart data={data.chartData} hasData={data.hasData} />
          </div>
          <div>
            <QuickActions actions={data.quickActions} hasData={data.hasData} title="Quick Actions" />
          </div>
        </div>

        <RecentTourListings tours={data.recentTours} hasData={data.hasData} />
      </div>
    </AdminOnly>
  )
}