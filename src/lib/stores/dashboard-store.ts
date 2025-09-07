// stores/dashboard-store.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { dashboardAPI, type User, type UsersParams } from '@/lib/dashboard-api'

interface DashboardState {
  // Users data
  users: User[]
  usersLoading: boolean
  usersError: string | null
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  } | null
  
  // Cache management
  lastFetch: number | null
  cacheExpiry: number // 5 minutes in milliseconds
  
  // Actions
  fetchUsers: (params?: UsersParams, force?: boolean) => Promise<void>
  updateUserStatus: (userId: string, status: string) => Promise<void>
  setUsersLoading: (loading: boolean) => void
  clearUsersError: () => void
  invalidateCache: () => void
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      // Initial state
      users: [],
      usersLoading: false,
      usersError: null,
      pagination: null,
      lastFetch: null,
      cacheExpiry: 20 * 60 * 1000, // 5 minutes

      // Actions
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
          
          // Update local state
          set((state) => ({
            users: state.users.map((user) =>
              user.id === userId ? { ...user, status: status as any } : user
            ),
          }))
        } catch (error) {
          set({
            usersError: error instanceof Error ? error.message : 'Failed to update user status',
          })
        }
      },

      setUsersLoading: (loading: boolean) => set({ usersLoading: loading }),
      
      clearUsersError: () => set({ usersError: null }),
      
      invalidateCache: () => set({ lastFetch: null }),
    }),
    {
      name: 'dashboard-store',
    }
  )
)