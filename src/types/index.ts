// export interface Tour {
//   id: string
//   title: string
//   description: string
//   price: number
//   originalPrice?: number
//   rating: number
//   reviewCount: number
//   location: string
//   country?: string
//   duration: string
//   groupSize?: string
//   language?: string[]
//   categories?: string[]
//   images: string[]
//   host: Host
//   isLive?: boolean
//   isFeatured?: boolean
// }

export interface Host {
  id: string
  firstName: string
  lastName: string
  avatar?: string
  email: string
  hostProfile?: {
    bio?: string
    location?: string
    languages: string[]
    specialties: string[]
    rating: number
    reviewCount: number
  }
}

export interface Tour {
  id: string
  hostId: string
  title: string
  description: string
  type: 'PHYSICAL' | 'VIRTUAL'
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'INACTIVE'
  price: number
  originalPrice?: number
  location: string
  country?: string
  duration: string
  groupSize?: string
  languages: string[]
  categories: string[]
  images: string[]
  isLive: boolean
  isFeatured: boolean
  rating: number
  reviewCount: number
  startDate?: string | Date
  endDate?: string | Date
  coverageAreas?: string[]
  amenities?: string[]
  giveFacilitatorAccess: boolean
  createdAt: string | Date
  updatedAt: string | Date

  // Relations
  host: Host
  itinerary?: ItineraryDay[]
  accommodation?: Accommodation
}

export interface ItineraryDay {
  id: string
  dayNumber: number
  todo: string
  hotelLocation: string
  description: string
  arrivalTime: string
  pickupTime: string
  inclusive?: string
  exclusive?: string
}

export interface Accommodation {
  id: string
  hotelName: string
  hotelLocation: string
  description: string
  arrivalTime: string
  pickupTime: string
  hotelImages: string[]
}

export interface Destination {
  id: string
  name: string
  country: string
  experienceCount: number
  image: string
  slug: string
}

// export interface Host {
//   id: string
//   name: string
//   avatar: string
//   rating: number
//   reviewCount: number
//   description: string
//   verified: boolean
//   responseTime: string
//   languages: string[]
// }

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  image: string
  description: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  comment: string
  location: string
  tourTitle: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  hours: string
}

export interface FilterOptions {
  priceRange: [number, number]
  categories: string[]
  duration: string[]
  groupSize: string[]
  languages: string[]
}

export interface SearchFilters {
  query: string
  priceRange: [number, number]
  categories: string[]
  duration: string
  groupSize: string
  language: string
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  comment: string;
  image: string;
}

export interface Host {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  specialties: string[];
  image: string;
  isActive: boolean;
}


