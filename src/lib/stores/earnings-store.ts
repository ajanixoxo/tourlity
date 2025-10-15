import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { EarningsMetric, PayoutMethod, EarningsTransaction } from '@/types/earnings'

interface EarningsState {
  metrics: EarningsMetric[]
  payoutMethods: PayoutMethod[]
  transactions: EarningsTransaction[]
  hasData: boolean
  loading: boolean
  error: string | null
  fetchEarnings: () => Promise<void>
  reset: () => void
}

const initialState = {
  metrics: [],
  payoutMethods: [],
  transactions: [],
  hasData: false,
  loading: false,
  error: null
}

export const useEarningsStore = create<EarningsState>()(
  devtools((set) => ({
    ...initialState,
    fetchEarnings: async () => {
      set({ loading: true, error: null })
      try {
        // Fetch summary and history
        const [summaryRes, historyRes] = await Promise.all([
          fetch('/api/earnings/summary'),
          fetch('/api/earnings/history'),
        ])

        if (!summaryRes.ok || !historyRes.ok) {
          throw new Error('Failed to fetch earnings data')
        }
        const summaryData = await summaryRes.json()
        const historyData = await historyRes.json()
        // Map summary values to card metrics for FE, use icons matching component
        const summary = summaryData.summary || {}
        const metrics: EarningsMetric[] = [
          {
            title: 'Total Earnings',
            value: summary.totalEarnings != null ? summary.totalEarnings : '-',
            icon: 'dollar',
          },
          {
            title: 'Next Payout',
            value: summary.nextPayout != null ? summary.nextPayout : '-',
            icon: 'calendar',
          },
          {
            title: 'Total Tours Completed',
            value: summary.totalToursCompleted != null ? summary.totalToursCompleted : '-',
            icon: 'plane',
          },
        ]
        set({
          metrics,
          payoutMethods: [], // Stripe only, so no methods listed
          transactions: historyData.transactions || [],
          hasData:
            metrics.some((m) => m.value && m.value !== '-') ||
            (historyData.transactions?.length ?? 0) > 0,
          loading: false,
          error: null
        })
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Failed to fetch earnings',
          loading: false
        })
      }
    },
    reset: () => set({ ...initialState })
  }))
)
// Selectors for ergonomic usage
export const useEarningsMetrics = () => useEarningsStore((state) => state.metrics)
export const usePayoutMethods = () => useEarningsStore((state) => state.payoutMethods)
export const useEarningsTransactions = () => useEarningsStore((state) => state.transactions)
export const useEarningsLoading = () => useEarningsStore((state) => state.loading)
export const useEarningsError = () => useEarningsStore((state) => state.error)
export const useEarningsHasData = () => useEarningsStore((state) => state.hasData)
