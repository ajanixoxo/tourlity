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
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-coral-500">Tourlity</h1>
            <h2 className="text-xl font-medium text-gray-900">Welcome Crownz 👋</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">1</span>
            </div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
              <span className="text-sm text-gray-700">English</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening on your tours today.</p>
          </div>
          <Button className="bg-coral-500 hover:bg-coral-600 text-white">Create New Tour</Button>
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
