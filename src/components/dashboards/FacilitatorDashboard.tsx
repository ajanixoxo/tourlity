import { FacilitatorOnly } from '@/components/auth/ProtectedRoute';
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ReviewHighlights } from "@/components/dashboard/review-highlights"
import Button from "@/components/root/button"
import { facilitatorDashboardData } from "@/data/dashboard-data"

export default function FacilitatorDashboard() {
  const data = facilitatorDashboardData

  return (
    <FacilitatorOnly>
      <div className="space-y-6">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview of all assigned tours, upcoming sessions, and progress.</p>
            </div>
            <Button className="bg-coral-500 hover:bg-coral-600 text-white">Check Assigned Tours</Button>
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
              <QuickActions actions={data.quickActions} hasData={data.hasData} />
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity activities={data.recentActivity} hasData={data.hasData} />
            <ReviewHighlights reviews={data.reviewHighlights} hasData={data.hasData} />
          </div>
        </div>
      </div>
    </FacilitatorOnly>
  );
}
