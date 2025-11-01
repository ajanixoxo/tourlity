/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePaymentStore } from '@/lib/stores/payment-store';
import type { PaymentSummary, Transaction } from '@/types/payment';

// Transform API response to UI format
function transformTransaction(apiTx: any): Transaction {
  // Map status from API (SUCCESS, PENDING, FAILED) to UI format (completed, pending, failed)
  let status: 'completed' | 'pending' | 'failed' = 'pending';
  if (apiTx.status === 'SUCCESS') {
    status = 'completed';
  } else if (apiTx.status === 'FAILED') {
    status = 'failed';
  } else if (apiTx.status === 'PENDING') {
    status = 'pending';
  }

  return {
    id: apiTx.id,
    date: apiTx.date,
    experience: apiTx.experience?.title || 'Unknown Experience',
    host: apiTx.host?.name || 'Unknown Host',
    amount: apiTx.amount?.value || 0,
    paymentMethod: apiTx.paymentMethod || 'Stripe',
    status: status
  };
}

// Transform summary data
function transformSummary(apiSummary: any): PaymentSummary {
  return {
    upcomingTrips: apiSummary.upcomingTrips,
    totalSpent: apiSummary.totalSpent,
    nextTripDays: 0 // We'll implement this later
  };
}

// Fetch payment summary
export async function fetchPaymentSummary() {
  const { setSummary, setLoading, setError } = usePaymentStore.getState();
  
  try {
    setLoading(true);
    const response = await fetch('/api/payments/guest/summary');
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch payment summary');
    }

    const data = await response.json();
    setSummary(transformSummary(data.summary));
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to fetch payment summary');
    console.error('Error fetching payment summary:', error);
  } finally {
    setLoading(false);
  }
}

// Fetch transactions with pagination
export async function fetchTransactions(page: number = 1, pageSize: number = 10) {
  const { setTransactions, setLoading, setError } = usePaymentStore.getState();
  
  try {
    setLoading(true);
    const response = await fetch(`/api/payments/guest/transactions?page=${page}&pageSize=${pageSize}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch transactions');
    }

    const data = await response.json();
    const transformedTransactions = data.transactions.items.map(transformTransaction);
    setTransactions(transformedTransactions, data.transactions.pagination);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to fetch transactions');
    console.error('Error fetching transactions:', error);
  } finally {
    setLoading(false);
  }
}

// Initialize payment data
export async function initializePaymentData(pageSize: number = 10) {
  const { isLoading } = usePaymentStore.getState();
  
  // Prevent multiple simultaneous initializations
  if (isLoading) return;

  // Fetch both summary and transactions in parallel
  await Promise.all([
    fetchPaymentSummary(),
    fetchTransactions(1, pageSize)
  ]);
}

// Refresh payment data (e.g., after a new transaction)
export async function refreshPaymentData() {
  const { pagination } = usePaymentStore.getState();
  
  await Promise.all([
    fetchPaymentSummary(),
    fetchTransactions(
      pagination?.currentPage || 1,
      pagination?.itemsPerPage || 10
    )
  ]);
}