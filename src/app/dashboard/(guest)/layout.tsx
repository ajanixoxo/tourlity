import React from 'react'
import { GuestOnly } from "@/components/auth/ProtectedRoute"
function GuestOnlyLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuestOnly>{children}</GuestOnly>
  )
}

export default GuestOnlyLayout
