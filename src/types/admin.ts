export enum UserRole {
  GUEST = "GUEST",
  HOST = "HOST",
  FACILITATOR = "FACILITATOR",
  TRANSLATOR = "TRANSLATOR",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  REJECTED = "REJECTED",
}

export enum TourType {
  PHYSICAL = "PHYSICAL",
  VIRTUAL = "VIRTUAL",
}

export enum TourStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
}

export enum SubscriptionTier {
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  ENTERPRISE = "ENTERPRISE",
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  bio?: string
  location?: string
  languages?: string[]
  tourDrafts?: number
  verificationDocuments?: string[]
  phone?: string
  avatar?: string
  role: UserRole
  status: UserStatus
  emailVerified: boolean
  emailVerifiedAt?: Date
  createdAt: Date
  updatedAt: Date
  idType?: string

  // Role-specific profiles (relations)
  hostProfile?: HostProfile
  facilitatorProfile?: FacilitatorProfile
  translatorProfile?: TranslatorProfile
  adminProfile?: AdminProfile
}

export interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: UserRole
  status: UserStatus
  emailVerified: boolean
  emailVerifiedAt?: string
  createdAt: string
  updatedAt: string
  idType?: string

  // Role-specific profiles
  hostProfile?: HostProfile
  facilitatorProfile?: FacilitatorProfile
  translatorProfile?: TranslatorProfile
  adminProfile?: AdminProfile

  // Computed fields for admin display
  name: string // firstName + lastName
  joinedDate: string // formatted createdAt
  submittedDocs?: string[]
  bio?: string
  languages?: string[]
  tourDrafts?: number
  location?: string
  verificationDocuments?: string[]
}

export interface HostProfile {
  id: string
  userId: string
  bio?: string
  location?: string
  languages: string[]
  specialties: string[]
  subscriptionTier: SubscriptionTier
  verified: boolean
  responseTime?: string
  rating: number
  reviewCount: number
  totalEarnings: number
  certificationUrl?: string
  idType:string
  hotelImageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface FacilitatorProfile {
  id: string
  userId: string
  bio?: string
  location?: string
  languages: string[]
  specialties: string[]
  certification?: string
  rating: number
  reviewCount: number
  totalEarnings: number
  isAvailable: boolean
  idType:string
  certificationUrl?: string
  createdAt: Date
  updatedAt: Date
  hotelImageUrl?:string
}

export interface TranslatorProfile {
  id: string
  userId: string
  bio?: string
  location?: string
  sourceLanguages: string[]
  targetLanguages: string[]
  certification?: string
  rating: number
  reviewCount: number
  totalEarnings: number
   idType:string
  isAvailable: boolean
  certificationUrl?: string
  createdAt: Date
  hotelImageUrl?:string
  updatedAt: Date
  languages: string[]
}

export interface AdminProfile {
  id: string
  userId: string
  permissions: string[]
  department?: string
  createdAt: Date
  updatedAt: Date
}

export interface AdminTourListing {
  id: string
  hostId: string
  title: string
  description: string
  type: TourType
  status: TourStatus
  price: number
  originalPrice?: number
  location: string
  country: string
  duration: string
  groupSize: string
  languages: string[]
  categories: string[]
  images: string[]
  isLive: boolean
  isFeatured: boolean
  maxVirtualSlots: number
  currentVirtualSlots: number
  maxInPersonSlots?: number
  currentInPersonSlots: number
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string

  // Computed fields for admin display
  hostName: string
  submittedOn: string // formatted createdAt
  category: string[] // alias for categories
}

export interface AdminBooking {
  id: string
  tourId: string
  guestId: string
  status: BookingStatus
  amount: number
  currency: string
  paymentStatus: string
  paymentMethod?: string
  scheduledDate: string
  participants: number
  specialRequests?: string
  facilitatorId?: string
  translatorId?: string
  createdAt: string
  updatedAt: string

  // Relations for display
  tour?: AdminTourListing
  guest?: AdminUser
}

export interface AdminAnalytics {
  ongoingTours: {
    count: number
    change: string
  }
  activeUsers: {
    count: number
    change: string
  }
  hostsVerified: {
    count: number
    change: string
  }
  totalPayouts: {
    amount: number
    period: string
  }
}

export interface PerformanceData {
  month: string
  tourViews: number
  clickedBook: number
  completedBooking: number
}

export interface RecentTourListing {
  id: string
  title: string
  hostName: string
  guest: string
  date: string
  status: BookingStatus
}

export interface AdminFilters {
  search: string
  role?: UserRole
  status?: UserStatus | TourStatus
  category?: string
  type?: TourType
}

export interface AdminStats {
  totalUsers: number
  totalHosts: number
  totalFacilitators: number
  totalTranslators: number
  totalTours: number
  activeTours: number
  totalBookings: number
  totalRevenue: number
  pendingVerifications: number
  pendingTours: number
}

export interface AdminNotification {
  id: string
  userId: string
  title: string
  message: string
  type: string
  isRead: boolean
  data?: any
  createdAt: string
}

export interface AdminAction {
  type: "APPROVE" | "REJECT" | "REQUEST_EDITS" | "SUSPEND" | "ACTIVATE"
  reason?: string
  userId?: string
  tourId?: string
  performedBy: string
  performedAt: string
}
