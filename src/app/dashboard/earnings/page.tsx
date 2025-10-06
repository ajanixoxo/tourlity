"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/stores/auth-store";
import Skeleton from "@/components/skeleton/skeleton";
import HostEarnings from "@/components/dashboards/payment/HostEarning";
import TranslatorEarnings from "@/components/dashboards/payment/TranslatorEarning";
import FacilitatorEarnings from "@/components/dashboards/payment/FacilatorEarning";

export default function DashboardPage() {
  const user = useUser();
  const role = user?.role?.toLowerCase();
  const router = useRouter();

  useEffect(() => {
    if (!role) return;

    // Conditional redirection for Guest and Admin
    if (role === "guest") {
      router.replace("/payment"); // Guest → Payment Route
    } else if (role === "admin") {
      router.replace("/payment-management"); // Admin → Payment Management Route
    }
  }, [role, router]);

  if (!role) {
    return <Skeleton />;
  }

  switch (role) {
    case "host":
      return <HostEarnings />;
    case "translator":
      return <TranslatorEarnings />;
    case "facilitator":
      return <FacilitatorEarnings />;
    default:
      // For Guest/Admin, show skeleton while redirect happens
      return <Skeleton />;
  }
}
