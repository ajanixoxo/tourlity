/* eslint-disable @typescript-eslint/no-explicit-any */
// stores/dashboard-store.ts - Unified store with auth functionality
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { dashboardAPI, type User, type UsersParams } from '@/lib/dashboard-api'
import { useAuthStore } from './auth-store'

// User profile update interface
interface UserProfileData {
  firstName?: string
  lastName?: string
  phone?: string
  profileData?: {
    location?: string
    languages?: string[]
    bio?: string
    specialties?: string[]
    hourlyRate?: number
  }
}

interface PasswordChangeData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface DashboardState {
  // ============ AUTH STATE ============
  currentUser: User | null
  isAuthenticated: boolean
  authLoading: boolean
  authError: string | null

  // ============ USERS MANAGEMENT ============
  users: User[]
  usersLoading: boolean
  usersError: string | null

  // ============ PROFILE MANAGEMENT ============
  profileLoading: boolean
  profileError: string | null

  // Avatar upload
  avatarUploading: boolean
  avatarError: string | null

  // Password change
  passwordChanging: boolean
  passwordError: string | null

  // Pagination
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  } | null

  // Cache management
  lastFetch: number | null
  cacheExpiry: number

  // ============ AUTH ACTIONS ============
  setCurrentUser: (user: User | null) => void
  setAuthLoading: (loading: boolean) => void
  setAuthError: (error: string | null) => void
  logout: () => void

  // ============ USER MANAGEMENT ACTIONS ============
  fetchUsers: (params?: UsersParams, force?: boolean) => Promise<void>
  updateUserStatus: (userId: string, status: string) => Promise<void>
  updateUserStatusWithReason: (userId: string, status: string, reason?:string) => Promise<void>
  requestUserEdits: (userId: string, status: string, reason?:string ) => Promise<void>

  // ============ PROFILE ACTIONS ============
  fetchCurrentUserProfile: () => Promise<void>
  updateUserProfile: (data: UserProfileData) => Promise<void>
  uploadAvatar: (file: File) => Promise<void>
  deleteAvatar: () => Promise<void>
  changePassword: (data: PasswordChangeData) => Promise<boolean>

  // ============ STATE MANAGEMENT ============
  setUsersLoading: (loading: boolean) => void
  clearUsersError: () => void
  clearProfileError: () => void
  clearAvatarError: () => void
  clearPasswordError: () => void
  clearAuthError: () => void
  invalidateCache: () => void
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set, get) => ({
        // ============ INITIAL STATE ============
        // Auth state
        currentUser: null,
        isAuthenticated: false,
        authLoading: true,
        authError: null,

        // Users management
        users: [],
        usersLoading: false,
        usersError: null,

        // Profile management
        profileLoading: false,
        profileError: null,

        avatarUploading: false,
        avatarError: null,

        passwordChanging: false,
        passwordError: null,

        pagination: null,
        lastFetch: null,
        cacheExpiry: 30 * 60 * 1000, // 30 minutes

        // ============ AUTH ACTIONS ============
        setCurrentUser: (user) => set({
          currentUser: user,
          isAuthenticated: !!user,
          authError: null
        }),

        setAuthLoading: (authLoading) => set({ authLoading }),

        setAuthError: (authError) => set({ authError }),

        logout: () => set({
          currentUser: null,
          isAuthenticated: false,
          authError: null,
          // Reset other state as needed
          users: [],
          lastFetch: null,
        }),

        // ============ USER MANAGEMENT ACTIONS ============
        fetchUsers: async (params = {}, force = false) => {
          const state = get()
          const now = Date.now()

          // Check cache validity
          if (!force && state.lastFetch && (now - state.lastFetch < state.cacheExpiry)) {
            return // Use cached data
          }

          set({ usersLoading: true, usersError: null })

          try {
            const response = await dashboardAPI.fetchUsers(params)

            if (response.success) {
              set({
                users: response.data.users,
                pagination: response.data.pagination,
                lastFetch: now,
                usersLoading: false,
              })
            } else {
              throw new Error('Failed to fetch users')
            }
          } catch (error) {
            set({
              usersError: error instanceof Error ? error.message : 'Unknown error',
              usersLoading: false,
            })
          }
        },

        updateUserStatus: async (userId: string, status: string) => {
          try {
            await dashboardAPI.updateUserStatus(userId, status)

            // Update local state for users list
            set((state) => ({
              users: state.users.map((user) =>
                user.id === userId ? { ...user, status: status as any } : user
              ),
            }))

            // IMPORTANT: Also update currentUser if it's the same user
            const currentState = get()
            if (currentState.currentUser && currentState.currentUser.id === userId) {
              set((state) => ({
                currentUser: state.currentUser ? {
                  ...state.currentUser,
                  status: status as any
                } : null
              }))
            }

          } catch (error) {
            set({
              usersError: error instanceof Error ? error.message : 'Failed to update user status',
            })
          }
        },
        // Add these to your dashboard store actions
        updateUserStatusWithReason: async (userId: string, status: string, reason?: string) => {
          try {
            await dashboardAPI.updateUserStatusWithReason(userId, status, reason)

            // Update local state for users list
            set((state) => ({
              users: state.users.map((user) =>
                user.id === userId ? { ...user, status: status as any } : user
              ),
            }))

            // Also update currentUser if it's the same user
            const currentState = get()
            if (currentState.currentUser && currentState.currentUser.id === userId) {
              set((state) => ({
                currentUser: state.currentUser ? {
                  ...state.currentUser,
                  status: status as any
                } : null
              }))
            }

          } catch (error) {
            set({
              usersError: error instanceof Error ? error.message : 'Failed to update user status',
            })
          }
        },

        requestUserEdits: async (userId: string, reason: string) => {
          try {
            await dashboardAPI.requestUserEdits(userId, reason)

            // Update local state - set status to rejected/needs edits
            set((state) => ({
              users: state.users.map((user) =>
                user.id === userId ? { ...user, status: 'REJECTED' as any } : user
              ),
            }))

          } catch (error) {
            set({
              usersError: error instanceof Error ? error.message : 'Failed to request edits',
            })
          }
        },
        // ============ PROFILE ACTIONS ============
        fetchCurrentUserProfile: async () => {
          set({ profileLoading: true, profileError: null })

          try {
            const token = localStorage.getItem('token')
            if (!token) {
              throw new Error('No authentication token found')
            }

            const response = await fetch('/api/user/profile', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || 'Failed to fetch profile')
            }

            const data = await response.json()
            set({
              currentUser: data.user,
              isAuthenticated: true,
              profileLoading: false,
            })
          } catch (error) {
            set({
              profileError: error instanceof Error ? error.message : 'Failed to fetch profile',
              profileLoading: false,
            })
          }
        },

        updateUserProfile: async (profileData: UserProfileData) => {
          set({ profileLoading: true, profileError: null })

          try {
            const token = localStorage.getItem('token')
            if (!token) {
              throw new Error('No authentication token found')
            }

            const response = await fetch('/api/user/profile', {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(profileData),
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || 'Failed to update profile')
            }

            const data = await response.json()
            set({
              currentUser: data.user,
              profileLoading: false,
            })
            useAuthStore.getState().updateProfile(data.user)
          } catch (error) {
            set({
              profileError: error instanceof Error ? error.message : 'Failed to update profile',
              profileLoading: false,
            })
          }
        },

        uploadAvatar: async (file: File) => {
          set({ avatarUploading: true, avatarError: null })

          try {
            const token = localStorage.getItem('token')
            if (!token) {
              throw new Error('No authentication token found')
            }

            const formData = new FormData()
            formData.append('avatar', file)

            const response = await fetch('/api/user/avatar', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              body: formData,
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || 'Failed to upload avatar')
            }

            const data = await response.json()

            // Update current user with new avatar
            set((state) => ({
              currentUser: state.currentUser ? {
                ...state.currentUser,
                avatar: data.avatar,
                updatedAt: data.user.updatedAt
              } : null,
              avatarUploading: false,
            }))
          } catch (error) {
            set({
              avatarError: error instanceof Error ? error.message : 'Failed to upload avatar',
              avatarUploading: false,
            })
          }
        },

        deleteAvatar: async () => {
          set({ avatarUploading: true, avatarError: null })

          try {
            const token = localStorage.getItem('token')
            if (!token) {
              throw new Error('No authentication token found')
            }

            const response = await fetch('/api/user/avatar', {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || 'Failed to delete avatar')
            }

            // Update current user to remove avatar
            set((state) => ({
              currentUser: state.currentUser ? {
                ...state.currentUser,
                avatar: "",
              } : null,
              avatarUploading: false,
            }))
          } catch (error) {
            set({
              avatarError: error instanceof Error ? error.message : 'Failed to delete avatar',
              avatarUploading: false,
            })
          }
        },

        changePassword: async (passwordData: PasswordChangeData) => {
          set({ passwordChanging: true, passwordError: null })

          try {
            const token = localStorage.getItem('token')
            if (!token) {
              throw new Error('No authentication token found')
            }

            const response = await fetch('/api/user/password', {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(passwordData),
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || 'Failed to change password')
            }

            set({ passwordChanging: false })
            return true
          } catch (error) {
            set({
              passwordError: error instanceof Error ? error.message : 'Failed to change password',
              passwordChanging: false,
            })
            return false
          }
        },

        // ============ STATE MANAGEMENT ============
        setUsersLoading: (loading: boolean) => set({ usersLoading: loading }),
        clearUsersError: () => set({ usersError: null }),
        clearProfileError: () => set({ profileError: null }),
        clearAvatarError: () => set({ avatarError: null }),
        clearPasswordError: () => set({ passwordError: null }),
        clearAuthError: () => set({ authError: null }),
        invalidateCache: () => set({ lastFetch: null }),
      }),
      {
        name: 'dashboard-storage',
        // Only persist auth and essential data
        partialize: (state) => ({
          currentUser: state.currentUser,
          isAuthenticated: state.isAuthenticated,
        })
      }
    ),
    {
      name: 'dashboard-store',
    }
  )
)

// ============ SELECTOR HOOKS ============
// Auth selectors
export const useCurrentUser = () => useDashboardStore((state) => state.currentUser)
export const useIsAuthenticated = () => useDashboardStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useDashboardStore((state) => state.authLoading)
export const useAuthError = () => useDashboardStore((state) => state.authError)
export const useUserRole = () => useDashboardStore((state) => state.currentUser?.role)
export const useUserStatus = () => useDashboardStore((state) => state.currentUser?.status)

// Dashboard selectors
export const useUsers = () => useDashboardStore((state) => state.users)
export const useUsersLoading = () => useDashboardStore((state) => state.usersLoading)
export const usePagination = () => useDashboardStore((state) => state.pagination)

// Profile selectors
export const useProfileLoading = () => useDashboardStore((state) => state.profileLoading)
export const useAvatarUploading = () => useDashboardStore((state) => state.avatarUploading)