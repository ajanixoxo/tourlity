export interface TourCreationStep {
  id: number
  name: string
  completed: boolean
}

export interface TourBasicInfo {
  name: string
  tourType: string
  description: string
  location: string
  price: number
  startDate: string
  endDate: string
  giveFacilitatorAccess: boolean
}

export interface TourItineraryDay {
  day: number
  todo: string
  hotelLocation: string
  description: string
  arrivalTime: string
  pickupTime: string
}

export interface TourAccommodation {
  hotelName: string
  hotelLocation: string
  description: string
  arrivalTime: string
  pickupTime: string
  propertyImages: string[]
  coverImage?: string
}

export interface TourListing {
  id: string
  title: string
  description: string
  categories: string[]
  location: string
  rating: number
  reviewCount: number
  price: number
  image: string
  host: {
    name: string
    avatar: string
  }
  status: "in-progress" | "upcoming" | "completed" | "cancelled"
}

export interface CustomTourRequest {
  id: string
  title: string
  tourType: string[]
  location: string
  dateTime: string
  groupInfo: string
  assistanceNeeded: string
  description: string
  status: "pending" | "negotiating" | "accepted" | "declined" | "confirmed"
  priceRange?: string
}

export interface CustomTourRequestForm {
  guestName: string
  tourType: string
  description: string
  location: string
  budgetProposal: number
  tourCategory: string
  groupSize: number
  preferredLanguages: string[]
  startDate: string
  endDate: string
  accessibilityNotes?: string
  amenitiesNeeded: string[]
}

export interface SavedTour {
  id: string
  title: string
  location: string
  dateTime: string
  host: {
    name: string
    avatar: string
  }
  translator: {
    name: string
    avatar: string
  }
  image: string
}

export interface Booking {
  id: string
  title: string
  location: string
  dateTime: string
  host: {
    name: string
    avatar: string
  }
  translator: {
    name: string
    avatar: string
  }
  image: string
  status: "in-progress" |"upcoming" | "completed" | "cancelled"
}
export interface HostProposal {
  id: string
  hostName: string
  hostRole: string
  hostAvatar: string
  rating: number
  reviewCount: number
  baseTourPrice: number
  additionalServices: Array<{
    name: string
    price: number
  }>
  totalPrice: number
  responseTime: string
}

export interface BookingReceipt {
  id: string
  receiptNumber: string
  issuedDate: string
  tourName: string
  status: "completed" | "pending" | "ongoing"
  dateTime: string
  location: string
  tourId: string
  customerDetails: {
    name: string
    email: string
    phone: string
  }
  hostDetails: {
    name: string
    email: string
    emergencyContact: string
  }
  paymentDetails: {
    amount: number
    method: string
    transactionId: string
    transactionDate: string
  }
}

export interface PaymentSummary {
  hostFee: number
  facilitatorFee: number
  translatorFee: number
  platformFee: number
  taxes: number
  total: number
}

export interface HostBooking {
  id: string
  title: string
  amount: number
  dateTime: string
  status: "in-progress"| "pending" | "upcoming" | "completed" | "cancelled"
  guestName?: string
  guestAvatar?: string
}

export interface Review {
  id: string
  hostName: string
  hostRole: string
  hostAvatar: string
  reviewText: string
  rating: number
  reviewCount: number
}