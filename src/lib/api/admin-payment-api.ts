import { useAdminPaymentStore } from '@/lib/stores/admin-payment-store';
import type { AdminPaymentMetrics, PayoutTransaction, RefundTransaction } from '@/types/admin-payment';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Transform API response to UI format
function transformPayoutTransaction(apiPayout: any): PayoutTransaction {
  return {
    id: apiPayout.id,
    name: apiPayout.name,
    role: apiPayout.role as "Host" | "Facilitator" | "Translator",
    amount: apiPayout.amount,
    date: apiPayout.date,
    status: apiPayout.status as "Paid" | "Pending"
  };
}

function transformRefundTransaction(apiRefund: any): RefundTransaction {
  return {
    id: apiRefund.id,
    guestName: apiRefund.guestName,
    tourName: apiRefund.tourName,
    amount: apiRefund.amount,
    dateAndTime: apiRefund.dateAndTime,
    reason: apiRefund.reason
  };
}

// Fetch payment metrics
export async function fetchAdminPaymentMetrics(startDate?: string, endDate?: string) {
  const { setMetrics, setLoading, setError } = useAdminPaymentStore.getState();
  
  try {
    setLoading('metrics', true);
    setError(null);
    
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await fetch(`/api/admin/payment-metrics?${params.toString()}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch payment metrics');
    }

    const data = await response.json();
    const metrics: AdminPaymentMetrics = {
      totalPayouts: data.metrics.totalPayouts,
      pendingRefunds: data.metrics.pendingRefunds,
      topEarner: data.metrics.topEarner,
      period: data.metrics.period
    };
    
    setMetrics(metrics);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to fetch payment metrics');
    console.error('Error fetching admin payment metrics:', error);
  } finally {
    setLoading('metrics', false);
  }
}

// Fetch payout history
export async function fetchAdminPayoutHistory(
  page: number = 1, 
  limit: number = 10,
  startDate?: string,
  endDate?: string,
  status?: string,
  search?: string
) {
  const { setPayoutHistory, setLoading, setError } = useAdminPaymentStore.getState();
  
  try {
    setLoading('payouts', true);
    setError(null);
    
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    
    const response = await fetch(`/api/admin/payout-history?${params.toString()}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch payout history');
    }

    const data = await response.json();
    const transformedPayouts = data.payouts.map(transformPayoutTransaction);
    const pagination: PaginationInfo = data.pagination;
    
    setPayoutHistory(transformedPayouts, pagination);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to fetch payout history');
    console.error('Error fetching admin payout history:', error);
  } finally {
    setLoading('payouts', false);
  }
}

// Fetch refund history
export async function fetchAdminRefundHistory(
  page: number = 1,
  limit: number = 10,
  startDate?: string,
  endDate?: string,
  search?: string
) {
  const { setRefundHistory, setLoading, setError } = useAdminPaymentStore.getState();
  
  try {
    setLoading('refunds', true);
    setError(null);
    
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (search) params.append('search', search);
    
    const response = await fetch(`/api/admin/refund-history?${params.toString()}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch refund history');
    }

    const data = await response.json();
    const transformedRefunds = data.refunds.map(transformRefundTransaction);
    const pagination: PaginationInfo = data.pagination;
    
    setRefundHistory(transformedRefunds, pagination);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to fetch refund history');
    console.error('Error fetching admin refund history:', error);
  } finally {
    setLoading('refunds', false);
  }
}

// Initialize all admin payment data
export async function initializeAdminPaymentData(
  pageSize: number = 10,
  startDate?: string,
  endDate?: string
) {
  const { loading } = useAdminPaymentStore.getState();
  
  // Prevent multiple simultaneous initializations
  if (loading.metrics || loading.payouts || loading.refunds) return;

  // Fetch all data in parallel
  await Promise.all([
    fetchAdminPaymentMetrics(startDate, endDate),
    fetchAdminPayoutHistory(1, pageSize, startDate, endDate),
    fetchAdminRefundHistory(1, pageSize, startDate, endDate)
  ]);
}

// Refresh admin payment data
export async function refreshAdminPaymentData(
  pageSize: number = 10,
  startDate?: string,
  endDate?: string
) {
  const { payoutPagination, refundPagination } = useAdminPaymentStore.getState();
  
  await Promise.all([
    fetchAdminPaymentMetrics(startDate, endDate),
    fetchAdminPayoutHistory(
      payoutPagination?.currentPage || 1,
      pageSize,
      startDate,
      endDate
    ),
    fetchAdminRefundHistory(
      refundPagination?.currentPage || 1,
      pageSize,
      startDate,
      endDate
    )
  ]);
}
