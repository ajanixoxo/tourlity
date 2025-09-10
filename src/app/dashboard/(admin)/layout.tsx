import React from 'react'
import { AdminOnly } from "@/components/auth/ProtectedRoute"
function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminOnly>{children}</AdminOnly>
    )
}

export default AdminLayout