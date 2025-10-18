import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { PaymentSummary, Transaction } from '@/types/payment';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// API response types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface APITransaction {
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
}

interface PaymentStore {
  // State
  summary: PaymentSummary | null;
  transactions: Transaction[];
  pagination: PaginationInfo | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSummary: (summary: PaymentSummary) => void;
  setTransactions: (transactions: Transaction[], pagination: PaginationInfo) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  summary: null,
  transactions: [],
  pagination: null,
  isLoading: false,
  error: null,
};

export const usePaymentStore = create<PaymentStore>()(
  devtools(
    (set) => ({
      // Initial state
      ...initialState,

      // Actions
      setSummary: (summary) => set({ summary, error: null }),
      
      setTransactions: (transactions, pagination) => 
        set({ transactions, pagination, error: null }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'payment-store',
    }
  )
);

// Export types
export type { PaymentSummary, Transaction, PaginationInfo };