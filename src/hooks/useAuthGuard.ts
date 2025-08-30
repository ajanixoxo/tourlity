'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-utils';
import type { AuthUser } from '@/lib/auth-utils';

interface UseAuthGuardOptions {
  required?: boolean
  requiredRole?: string | string[]
  redirectTo?: string
  onUnauthorized?: () => void
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const {
    required = true,
    requiredRole,
    redirectTo = '/sign-up',
    onUnauthorized
  } = options

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);

      // If authentication is required but user is not authenticated
      if (required && !currentUser) {
        if (onUnauthorized) {
          onUnauthorized();
        } else {
          router.push(redirectTo);
        }
        return;
      }

      // If user is authenticated but shouldn't be (e.g., on sign-in page)
      if (!required && currentUser) {
        const dashboardRoute = getDashboardRoute(currentUser.role);
        router.push(dashboardRoute);
        return;
      }

      // Check role-based access
      if (required && currentUser && requiredRole) {
        const userRole = currentUser.role;
        const hasRequiredRole = Array.isArray(requiredRole)
          ? requiredRole.includes(userRole)
          : userRole === requiredRole;

        if (!hasRequiredRole) {
          if (onUnauthorized) {
            onUnauthorized();
          } else {
            const dashboardRoute = getDashboardRoute(userRole);
            router.push(dashboardRoute);
          }
        }
      }
    };

    checkAuth();

    // Listen for storage changes to update auth state
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [required, requiredRole, redirectTo, onUnauthorized, router]);

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
}

// 5. Fix middleware dashboard routes (remove parentheses)
// Update your getDashboardRoute function in middleware.ts
function getDashboardRoute(role: string): string {
  switch (role) {
    case 'HOST':
      return '/dashboard'      // Remove parentheses
    case 'FACILITATOR':
      return '/dashboard'  // Remove parentheses
    case 'TRANSLATOR':
      return '/dashboard'   // Remove parentheses
    case 'ADMIN':
      return '/dashboard'        // Remove parentheses
    case 'GUEST':
    default:
      return '/dashboard'        // Remove parentheses
  }
}