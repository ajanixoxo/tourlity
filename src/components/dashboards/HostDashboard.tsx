import { HostOnly } from '@/components/auth/ProtectedRoute';
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ReviewHighlights } from "@/components/dashboard/review-highlights"
import Button from "@/components/root/button"
import { useHostDashboardStore } from "@/lib/stores/host-dashboard-store"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function HostDashboard() {
  const { data, isLoading, error, fetchDashboardData } = useHostDashboardStore()

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
          <Button onClick={fetchDashboardData}>Retry</Button>
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
    <HostOnly>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of all assigned tours, upcoming sessions, and progress.</p>
          </div>
          <Button variant="primary">Create New Tour</Button>
        </div>

        {/* Metrics */}
        <DashboardMetrics metrics={data.metrics} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <PerformanceChart data={data.chartData} hasData={data.hasData} />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions actions={data.quickActions} hasData={data.hasData} title="Quick Update" />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity activities={data.recentActivity} hasData={data.hasData} />
          <ReviewHighlights reviews={data.reviewHighlights} hasData={data.hasData} />
        </div>
      </div>
    </HostOnly>
  );
}
