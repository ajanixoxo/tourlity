"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/stores/auth-store";
import { usePaymentStore } from "@/lib/stores/payment-store";
import { initializePaymentData } from "@/lib/api/payment-api";
import Skeleton from "@/components/skeleton/skeleton";
import PaymentDashboard from "@/components/dashboards/payment/GuestPayment";

export default function DashboardPage() {
    const user = useUser();
    const role = user?.role?.toLowerCase();
    const router = useRouter();
    const isLoading = usePaymentStore(state => state.isLoading);
    const error = usePaymentStore(state => state.error);

    useEffect(() => {
        if (!role) return;

        if (role === "translator" || role === "facilitator" || role === "host") {
            router.replace("/earnings"); // redirect to admin's route
        }
        else if (role === "admin") {
            router.replace(`/dashboard/payment-management`); // redirect to their role dashboard
        } else if (role !== "guest") {
            router.replace(`/dashboard`); // redirect to their role dashboard
        }
    }, [role, router]);

    // Initialize payment data when the page loads for a guest
    useEffect(() => {
        if (role === "guest") {
            initializePaymentData();
        }
    }, [role]);

    // Handle loading state
    if (!role || isLoading) {
        return <Skeleton />;
    }

    // Handle error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Error Loading Payment Data</h2>
                    <p className="text-gray-600 mt-2">{error}</p>
                </div>
            </div>
        );
    }

    switch (role) {
        case "guest":
            return <PaymentDashboard />;
        default:
            // while redirecting, just show skeleton
            return <Skeleton />;
    }
}
