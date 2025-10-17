import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ReviewHighlights } from "@/components/dashboard/review-highlights"
import Button from "@/components/root/button"
import { emptyDashboardData } from "@/data/dashboard-data"

export default function EmptyDashboard() {
  const data = emptyDashboardData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening on your tours today.</p>
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
    </div>
  )
}
