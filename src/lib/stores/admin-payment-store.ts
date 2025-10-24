import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AdminPaymentMetrics, PayoutTransaction, RefundTransaction } from '@/types/admin-payment';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface AdminPaymentState {
  // State
  metrics: AdminPaymentMetrics | null;
  payoutHistory: PayoutTransaction[];
  refundHistory: RefundTransaction[];
  payoutPagination: PaginationInfo | null;
  refundPagination: PaginationInfo | null;
  loading: {
    metrics: boolean;
    payouts: boolean;
    refunds: boolean;
  };
  error: string | null;

  // Actions
  setMetrics: (metrics: AdminPaymentMetrics) => void;
  setPayoutHistory: (payouts: PayoutTransaction[], pagination: PaginationInfo) => void;
  setRefundHistory: (refunds: RefundTransaction[], pagination: PaginationInfo) => void;
  setLoading: (key: keyof AdminPaymentState['loading'], loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  metrics: null,
  payoutHistory: [],
  refundHistory: [],
  payoutPagination: null,
  refundPagination: null,
  loading: {
    metrics: false,
    payouts: false,
    refunds: false
  },
  error: null
};

export const useAdminPaymentStore = create<AdminPaymentState>()(
  devtools(
    (set) => ({
      // Initial state
      ...initialState,

      // Actions
      setMetrics: (metrics) => set({ metrics, error: null }),
      
      setPayoutHistory: (payouts, pagination) => 
        set({ payoutHistory: payouts, payoutPagination: pagination, error: null }),
      
      setRefundHistory: (refunds, pagination) => 
        set({ refundHistory: refunds, refundPagination: pagination, error: null }),
      
      setLoading: (key, loading) => 
        set((state) => ({ 
          loading: { ...state.loading, [key]: loading } 
        })),
      
      setError: (error) => set({ error }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'admin-payment-store',
    }
  )
);

// Selectors for ergonomic usage
export const useAdminPaymentMetrics = () => useAdminPaymentStore((state) => state.metrics);
export const useAdminPayoutHistory = () => useAdminPaymentStore((state) => state.payoutHistory);
export const useAdminRefundHistory = () => useAdminPaymentStore((state) => state.refundHistory);
export const useAdminPayoutPagination = () => useAdminPaymentStore((state) => state.payoutPagination);
export const useAdminRefundPagination = () => useAdminPaymentStore((state) => state.refundPagination);
export const useAdminPaymentLoading = () => useAdminPaymentStore((state) => state.loading);
export const useAdminPaymentError = () => useAdminPaymentStore((state) => state.error);
