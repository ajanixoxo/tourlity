import { AdminOnly } from '@/components/auth/ProtectedRoute';
import { DashboardHeader } from "@/components/admin/dashboard/dashboard-header"
import { MetricsCards } from "@/components/admin/dashboard/metrics-cards"
import { PerformanceChart } from "@/components/admin/dashboard/performance-chart"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"
import { RecentTourListings } from '../admin/dashboard/recent-tour-listing';
export default function AdminDashboard() {
  return (
    <AdminOnly>
         <div className="space-y-6">
      <DashboardHeader />
      <MetricsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <RecentTourListings />
    </div>
    </AdminOnly>
  );
}
