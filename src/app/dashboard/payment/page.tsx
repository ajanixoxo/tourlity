"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/stores/auth-store";
import Skeleton from "@/components/skeleton/skeleton";
import PaymentDashboard from "@/components/dashboards/payment/GuestPayment";

export default function DashboardPage() {
    const user = useUser();
    const role = user?.role?.toLowerCase();
    const router = useRouter();

    useEffect(() => {
        if (!role) return;

        if (role === "translator" || role === "facilitator" || role === "host") {
            router.replace("/earnings"); // redirect to admin's route
        }
        else if (role == "admin") {
            router.replace(`/dashboard/payment-management`); // redirect to their role dashboard
        } else if (role !== "guest") {
            router.replace(`/dashboard}`); // redirect to their role dashboard
        }
    }, [role, router]);

    if (!role) {
        return <Skeleton />;
    }

    switch (role) {
        case "guest":
            return <PaymentDashboard />;
        default:
            // while redirecting, just show skeleton
            return <Skeleton />;
    }
}
