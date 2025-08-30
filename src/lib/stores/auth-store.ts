import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// User profile interface based on guest user model
export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: 'GUEST' | 'HOST' | 'FACILITATOR' | 'TRANSLATOR' | 'ADMIN'
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED'
  emailVerified: boolean
  emailVerifiedAt?: Date
  createdAt: Date
  updatedAt: Date
  // Guest-specific fields (from User model)
  // bookings?: any[]
  // reviews?: any[]
  // savedTours?: any[]
  // Role-specific profile data
  profile?: string
}

interface AuthState {
  // Auth state
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Auth actions
  setUser: (user: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  
  // Profile actions
  updateProfile: (updates: Partial<UserProfile>) => void
  clearCache: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

      // Auth actions
      setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        error: null
      }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
        error: null
      }),

      // Profile actions
      updateProfile: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates }
          })
        }
      },

      clearCache: () => {
        // Clear any cached data when profile is updated
        set({})
      }
    }),
    {
      name: 'auth-storage',
      // Only persist user data, not loading/error states
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

// Selector hooks for better performance
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)
export const useUserRole = () => useAuthStore((state) => state.user?.role)
export const useUserStatus = () => useAuthStore((state) => state.user?.status) 