import React from 'react'
import { HostOnly } from "@/components/auth/ProtectedRoute"
function HostLayout({ children }: { children: React.ReactNode }) {
  return (
    <HostOnly>{children}</HostOnly>
  )
}

export default HostLayout