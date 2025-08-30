"use client"
import React from 'react'
import { useAuthGuard } from '@/hooks/useAuthGuard'

interface ProtectedRouteProps {
  children: React.ReactNode
  required?: boolean
  requiredRole?: string | string[]
  redirectTo?: string
  fallback?: React.ReactNode
  onUnauthorized?: () => void
}

export function ProtectedRoute({
  children,
  required = true,
  requiredRole,
  redirectTo = '/sign-up',
  fallback,
  onUnauthorized
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthGuard({
    required,
    requiredRole,
    redirectTo,
    onUnauthorized
  })

  // Show loading state
  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Show unauthorized message if user doesn't have required role
  if (required && requiredRole && isAuthenticated) {
    const userRole = user?.role ?? ''
    const hasRequiredRole = Array.isArray(requiredRole)
      ? requiredRole.includes(userRole)
      : userRole === requiredRole

    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-4">
              You don&apos;t have permission to access this page.
            </p>
            <p className="text-sm text-gray-500">
              Required role: {Array.isArray(requiredRole) ? requiredRole.join(' or ') : requiredRole}
              <br />
              Your role: {userRole}
            </p>
          </div>
        </div>
      )
    }
  }

  // Show children if all checks pass
  return <>{children}</>
}

// Convenience components for specific roles
export function GuestOnly({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="GUEST" {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function HostOnly({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="HOST" {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function FacilitatorOnly({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="FACILITATOR" {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function TranslatorOnly({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="TRANSLATOR" {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function AdminOnly({ children, ...props }: Omit<ProtectedRouteProps, 'requiredRole'>) {
  return (
    <ProtectedRoute requiredRole="ADMIN" {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function AuthenticatedOnly({ children, ...props }: Omit<ProtectedRouteProps, 'required'>) {
  return (
    <ProtectedRoute required={true} {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function UnauthenticatedOnly({ children, ...props }: Omit<ProtectedRouteProps, 'required'>) {
  return (
    <ProtectedRoute required={false} {...props}>
      {children}
    </ProtectedRoute>
  )
} 