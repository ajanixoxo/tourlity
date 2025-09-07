

"use client";
import GuestDashboard from '@/components/dashboards/GuestDashboard';
import HostDashboard from '@/components/dashboards/HostDashboard';
import TranslatorDashboard from '@/components/dashboards/TranslatorDashboard';
import FacilitatorDashboard from '@/components/dashboards/FacilitatorDashboard';
import { useUser } from '@/lib/stores/auth-store';
import Skeleton from '@/components/skeleton/skeleton';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
export default function DashboardPage() {
  const user = useUser();
  const role = user?.role?.toLowerCase();
  console.log("User:", user);
  if (!role) {
    return <Skeleton />

  }

  switch (role) {
    case 'guest':
      return <GuestDashboard />;
    case 'host':
      return <HostDashboard />;
    case 'translator':
      return <TranslatorDashboard />;
    case 'facilitator':
      return <FacilitatorDashboard />;
    case 'admin':
      return <AdminDashboard />
    default:
      return <div>Unknown role</div>;
  }
}

