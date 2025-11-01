export interface Booking {
  id: string;
  tourId: string | null;
  customTourId: string | null;
  guestId: string;
  status: string; // PENDING, CONFIRMED, CANCELLED, COMPLETED
  amount: number;
  currency: string;
  paymentStatus: string;
  paymentMethod: string | null;
  scheduledDate: string;
  participants: number;
  specialRequests: string | null;
  facilitatorId: string | null;
  translatorId: string | null;
  createdAt: string;
  updatedAt: string;
  tour?: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    country: string;
    images: string[];
    rating: number;
    reviewCount: number;
    type: string;
    startDate: string | null;
    endDate: string | null;
    duration: number;
    host?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatar: string | null;
      phone: string | null;
    };
  } | null;
  guest?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
    phone: string | null;
  };
}

export interface BookingsResponse {
  bookings: Booking[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface BookingFilters {
  page?: number;
  limit?: number;
  status?: string; // PENDING, CONFIRMED, CANCELLED, COMPLETED
}

export async function fetchBookings(filters: BookingFilters = {}): Promise<BookingsResponse> {
  const queryParams = new URLSearchParams();
  
  if (filters.page) queryParams.set('page', filters.page.toString());
  if (filters.limit) queryParams.set('limit', filters.limit.toString());
  if (filters.status) queryParams.set('status', filters.status);

  const response = await fetch(`/api/bookings?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch bookings' }));
    throw new Error(error.error || 'Failed to fetch bookings');
  }

  return response.json();
}

export async function fetchBookingById(bookingId: string): Promise<{ booking: Booking }> {
  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch booking' }));
    throw new Error(error.error || 'Failed to fetch booking');
  }

  return response.json();
}

