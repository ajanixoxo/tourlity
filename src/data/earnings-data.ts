import type { EarningsData } from "@/types/earnings"

export const emptyEarningsData: EarningsData = {
  metrics: [
    {
      title: "Total Earnings",
      value: 0,
      icon: "dollar",
    },
    {
      title: "Next Payout",
      value: 0,
      icon: "calendar",
    },
    {
      title: "Total Tours Completed",
      value: 0,
      icon: "plane",
    },
  ],
  payoutMethods: [],
  transactions: [],
  hasData: false,
}
