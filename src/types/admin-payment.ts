export interface PayoutTransaction {
  id: string
  name: string
  role: "Host" | "Facilitator" | "Translator"
  amount: number
  date: string
  status: "Paid" | "Pending"
}

export interface RefundTransaction {
  id: string
  guestName: string
  tourName: string
  amount: number
  dateAndTime: string
  reason: string
}

export interface AdminPaymentMetrics {
  totalPayouts: number
  pendingRefunds: number
  topEarner: number
  period: string
}

export interface AdminPaymentData {
  metrics: AdminPaymentMetrics
  payoutHistory: PayoutTransaction[]
  refundHistory: RefundTransaction[]
  hasData: boolean
}
