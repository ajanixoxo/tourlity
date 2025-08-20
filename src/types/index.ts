export interface Tour {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  location: string
  country: string
  duration: string
  groupSize: string
  language: string[]
  categories: string[]
  images: string
  host: Host
  isLive?: boolean
  isFeatured?: boolean
}

export interface Destination {
  id: string
  name: string
  country: string
  experienceCount: number
  image: string
  slug: string
}

export interface Host {
  id: string
  name: string
  avatar: string
  rating: number
  reviewCount: number
  description: string
  verified: boolean
  responseTime: string
  languages: string[]
}

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


