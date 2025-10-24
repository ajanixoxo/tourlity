// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TourType, TourStatus, User } from '@prisma/client';
import { z } from 'zod';
import { tourCreationSchema, itineraryDaySchema, accommodationSchema } from '@/lib/validations/tourValidation';

export type ValidatedTourData = z.infer<typeof tourCreationSchema>;
export type ValidatedItineraryDay = z.infer<typeof itineraryDaySchema>;
export type ValidatedAccommodation = z.infer<typeof accommodationSchema>;

export interface TourCreationData extends ValidatedTourData {
  duration: string;
  groupSize: string;
  type: TourType;
}

export interface Host {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface Tour {
  id: string;
  hostId: string;
  title: string;
  description: string;
  type: TourType;
  status: TourStatus;
  price: number;
  originalPrice?: number;
  location: string;
  country?: string;
  duration: string;
  groupSize?: string;
  languages: string[];
  categories: string[];
  images: string[];
  isLive: boolean;
  isFeatured: boolean;
  maxVirtualSlots: number;
  currentVirtualSlots: number;
  maxInPersonSlots?: number;
  currentInPersonSlots: number;
  rating: number;
  reviewCount: number;
  startDate?: Date;
  endDate?: Date;
  coverageAreas: string[];
  amenities: string[];
  giveFacilitatorAccess: boolean;
  host: Host;
  createdAt: Date;
  updatedAt: Date;
}

export interface TourWithRelations extends Tour {
  itinerary?: ItineraryDay[];
  accommodation?: Accommodation;
  reviews?: TourReview[];
  _count?: {
    reviews: number;
    bookings: number;
  };
}

export interface ItineraryDay {
  id: string;
  tourId: string;
  dayNumber: number;
  todo: string;
  hotelLocation: string;
  description: string;
  arrivalTime: string;
  pickupTime: string;
  inclusive?: string;
  exclusive?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Accommodation {
  id: string;
  tourId: string;
  hotelName: string;
  hotelLocation: string;
  description: string;
  arrivalTime: string;
  pickupTime: string;
  hotelImages: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TourReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  reviewer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface SearchFilters {
  query: string;
  priceRange: [number, number];
  categories: string[];
  duration: string;
  groupSize: string;
  language: string;
}

export interface TourBooking {
  status: string;
  bookingDate: Date;
}

export interface UserTour extends Tour {
  bookingStatus: string;
  bookingDate: Date;
}