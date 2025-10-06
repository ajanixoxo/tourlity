import type { AdminPaymentData } from "@/types/admin-payment"

export const adminPaymentDataWithTransactions: AdminPaymentData = {
  metrics: {
    totalPayouts: 300,
    pendingRefunds: 8,
    topEarner: 24,
    period: "This Month",
  },
  payoutHistory: [
    {
      id: "1",
      name: "Wade Warren",
      role: "Host",
      amount: 589.99,
      date: "Jul 01, 2025",
      status: "Paid",
    },
    {
      id: "2",
      name: "Marvin McKinney",
      role: "Facilitator",
      amount: 589.99,
      date: "Jul 01, 2025",
      status: "Pending",
    },
    {
      id: "3",
      name: "Ralph Edwards",
      role: "Host",
      amount: 589.99,
      date: "Jul 01, 2025",
      status: "Paid",
    },
    {
      id: "4",
      name: "Jerome Bell",
      role: "Facilitator",
      amount: 589.99,
      date: "Jul 01, 2025",
      status: "Pending",
    },
    {
      id: "5",
      name: "Savannah Nguyen",
      role: "Host",
      amount: 589.99,
      date: "Jul 01, 2025",
      status: "Paid",
    },
  ],
  refundHistory: [
    {
      id: "1",
      guestName: "Courtney Henry",
      tourName: "Culture Walk",
      amount: 589.99,
      dateAndTime: "Jun 28, 2025 9:00 am",
      reason: "Host No-Show",
    },
    {
      id: "2",
      guestName: "Jane Cooper",
      tourName: "Culture Walk",
      amount: 589.99,
      dateAndTime: "Jun 28, 2025 9:00 am",
      reason: "Cancelled same-day",
    },
    {
      id: "3",
      guestName: "Wade Warren",
      tourName: "Culture Walk",
      amount: 450.54,
      dateAndTime: "Jul 01, 2025 9:00 am",
      reason: "Host No-Show",
    },
    {
      id: "4",
      guestName: "Albert Flores",
      tourName: "Culture Walk",
      amount: 406.27,
      dateAndTime: "Jun 20, 2025 9:00 am",
      reason: "Host No-Show",
    },
    {
      id: "5",
      guestName: "Brooklyn Simmons",
      tourName: "Culture Walk",
      amount: 589.99,
      dateAndTime: "Jun 28, 2025 9:00 am",
      reason: "Host No-Show",
    },
  ],
  hasData: true,
}

export const adminPaymentDataEmpty: AdminPaymentData = {
  metrics: {
    totalPayouts: 0,
    pendingRefunds: 0,
    topEarner: 0,
    period: "This Month",
  },
  payoutHistory: [],
  refundHistory: [],
  hasData: false,
}
