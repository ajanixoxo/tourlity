import React from 'react'
import { AdminOnly } from "@/components/auth/ProtectedRoute"
export function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminOnly>{children}</AdminOnly>
    )
}

export default AdminLayout