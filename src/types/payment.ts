export interface PaymentMethod {
  id: string
  type: "visa" | "mastercard" | "paypal"
  last4?: string
  email?: string
  expiryDate?: string
  isDefault: boolean
  imgSrc: string
}

export interface Transaction {
  id: string
  date: string
  experience: string
  host: string
  amount: number
  paymentMethod: string
  status: "completed" | "pending" | "failed"
}

export interface PaymentSummary {
  upcomingTrips: number
  totalSpent: number
  nextTripDays: number
}

export interface ExchangeRate {
  currency: string
  rate: number
}

export interface PaymentData {
  summary: PaymentSummary
  paymentMethods: PaymentMethod[]
  transactions: Transaction[]
  exchangeRates: ExchangeRate[]
  hasData: boolean
}
