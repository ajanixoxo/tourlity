import type { EarningsData } from "@/types/earnings"

// Host Earnings Data
export const hostEarningsData: EarningsData = {
  metrics: [
    {
      title: "Total Earnings",
      value: "$245,000",
      change: "-0.5%",
      changeType: "negative",
      icon: "dollar",
    },
    {
      title: "Next Payout",
      value: "$245,000",
      subtitle: "July 9",
      icon: "calendar",
    },
    {
      title: "Total Tours Completed",
      value: 14,
      change: "+0.5%",
      changeType: "positive",
      icon: "plane",
    },
  ],
  payoutMethods: [
    {
      id: "1",
      type: "bank",
      name: "Direct Deposit",
      accountInfo: "Account ending in •••• 4789",
      isDefault: true,
    },
    {
      id: "2",
      type: "bank",
      name: "Direct Deposit",
      accountInfo: "Account ending in •••• 4789",
      isDefault: false,
    },
    {
      id: "3",
      type: "paypal",
      name: "PayPal",
      accountInfo: "emily.johnson@example.com",
      isDefault: false,
    },
  ],
  transactions: [
    {
      id: "1",
      tourName: "Lagos By Night",
      amount: 589.99,
      date: "Jun 28, 2025 9:00 am",
      status: "processing",
    },
    {
      id: "2",
      tourName: "Lagos By Night",
      amount: 589.99,
      date: "Jun 28, 2025 9:00 am",
      status: "paid",
    },
  ],
  hasData: true,
}

// Facilitator Earnings Data
export const facilitatorEarningsData: EarningsData = {
  metrics: [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+2.3%",
      changeType: "positive",
      icon: "dollar",
    },
    {
      title: "Next Payout",
      value: "$1,200",
      subtitle: "July 15",
      icon: "calendar",
    },
    {
      title: "Total Tours Completed",
      value: 28,
      change: "+5.2%",
      changeType: "positive",
      icon: "plane",
    },
  ],
  payoutMethods: [
    {
      id: "1",
      type: "paypal",
      name: "PayPal",
      accountInfo: "facilitator@example.com",
      isDefault: true,
    },
  ],
  transactions: [
    {
      id: "1",
      tourName: "Historical District Tour",
      amount: 125.0,
      date: "Jul 01, 2025 9:00 am",
      status: "paid",
    },
    {
      id: "2",
      tourName: "Museum Walking Tour",
      amount: 95.5,
      date: "Jun 30, 2025 2:00 pm",
      status: "processing",
    },
  ],
  hasData: true,
}

// Translator Earnings Data
export const translatorEarningsData: EarningsData = {
  metrics: [
    {
      title: "Total Earnings",
      value: "$8,750",
      change: "+1.8%",
      changeType: "positive",
      icon: "dollar",
    },
    {
      title: "Next Payout",
      value: "$650",
      subtitle: "July 12",
      icon: "calendar",
    },
    {
      title: "Total Tours Completed",
      value: 42,
      change: "+3.1%",
      changeType: "positive",
      icon: "plane",
    },
  ],
  payoutMethods: [
    {
      id: "1",
      type: "bank",
      name: "Direct Deposit",
      accountInfo: "Account ending in •••• 2156",
      isDefault: true,
    },
  ],
  transactions: [
    {
      id: "1",
      tourName: "Spanish Translation - City Tour",
      amount: 75.0,
      date: "Jul 02, 2025 10:00 am",
      status: "paid",
    },
    {
      id: "2",
      tourName: "French Translation - Art Gallery",
      amount: 85.0,
      date: "Jul 01, 2025 3:00 pm",
      status: "processing",
    },
  ],
  hasData: true,
}

// Empty Earnings Data
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
