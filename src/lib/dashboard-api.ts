import { FacilitatorProfile, TranslatorProfile, AdminProfile, HostProfile } from "@/types/admin"
// import { HostProfile } from "@prisma/client"
import { UserRole, UserStatus } from "@/types/admin"

// lib/dashboard-api.ts
export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    avatar?: string
    role: UserRole
    status: UserStatus
    emailVerified: boolean
    createdAt: Date
    updatedAt: Date
    hostProfile?: HostProfile
    facilitatorProfile?: FacilitatorProfile
    translatorProfile?: TranslatorProfile
    adminProfile?: AdminProfile
}

export interface UsersResponse {
    success: boolean
    data: {
        users: User[]
        pagination: {
            total: number
            page: number
            limit: number
            totalPages: number
        }
    }
}

export interface UsersParams {
    role?: string
    status?: string
    search?: string
    page?: number
    limit?: number
}

class DashboardAPI {
    private baseUrl = '/api'

    async fetchUsers(params: UsersParams = {}): Promise<UsersResponse> {
        const searchParams = new URLSearchParams()

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString())
            }
        })

        const url = `${this.baseUrl}/admin/users${searchParams.toString() ? `?${searchParams}` : ''}`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    }

    async updateUserStatus(userId: string, status: string): Promise<{ success: boolean }> {
        const response = await fetch(`${this.baseUrl}/admin/users/${userId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    }
    // Add these methods to your DashboardAPI class
    async updateUserStatusWithReason(userId: string, status: string, reason?: string): Promise<{ success: boolean }> {
        const response = await fetch(`${this.baseUrl}/admin/users/${userId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({ status, reason }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    }

    async requestUserEdits(userId: string, reason: string): Promise<{ success: boolean }> {
        const response = await fetch(`${this.baseUrl}/admin/users/${userId}/request-edits`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    }
}

export const dashboardAPI = new DashboardAPI()