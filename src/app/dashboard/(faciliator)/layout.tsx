import React from 'react'
import { FacilitatorOnly } from "@/components/auth/ProtectedRoute"
function FacilitatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <FacilitatorOnly>{children}</FacilitatorOnly>
  )
}

export default FacilitatorLayout