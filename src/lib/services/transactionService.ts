export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string; // PENDING, SUCCESS, FAILED
  stripeRef: string | null;
  relatedUser: string | null;
  relatedTour: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  tour?: {
    id: string;
    title: string;
    hostId: string;
    host?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatar: string | null;
    };
  } | null;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
    role: string;
  } | null;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  status?: string; // PENDING, SUCCESS, FAILED
  type?: string; // TOUR_PAYMENT, etc.
}

export async function fetchTransactions(filters: TransactionFilters = {}): Promise<TransactionsResponse> {
  const queryParams = new URLSearchParams();
  
  if (filters.page) queryParams.set('page', filters.page.toString());
  if (filters.limit) queryParams.set('limit', filters.limit.toString());
  if (filters.status) queryParams.set('status', filters.status);
  if (filters.type) queryParams.set('type', filters.type);

  const response = await fetch(`/api/transactions?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch transactions' }));
    throw new Error(error.error || 'Failed to fetch transactions');
  }

  return response.json();
}

// Guest-specific transaction endpoint (with formatted response)
export interface GuestTransaction {
  id: string;
  date: string;
  experience: {
    id: string;
    title: string;
  };
  host: {
    id: string;
    name: string;
  };
  amount: {
    value: number;
    currency: string;
  };
  paymentMethod: string;
  status: string;
  stripeRef: string | null;
}

export interface GuestTransactionsResponse {
  transactions: {
    items: GuestTransaction[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export async function fetchGuestTransactions(
  page: number = 1,
  pageSize: number = 10
): Promise<GuestTransactionsResponse> {
  const queryParams = new URLSearchParams();
  queryParams.set('page', page.toString());
  queryParams.set('pageSize', pageSize.toString());

  const response = await fetch(`/api/payments/guest/transactions?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch transactions' }));
    throw new Error(error.error || 'Failed to fetch transactions');
  }

  return response.json();
}

