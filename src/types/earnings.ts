export interface EarningsMetric {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative"
  icon: string
  subtitle?: string
}

export interface PayoutMethod {
  id: string
  type: "bank" | "paypal"
  name: string
  accountInfo: string
  isDefault: boolean
}

export interface EarningsTransaction {
  id: string
  tourName: string
  amount: number
  date: string
  status: "paid" | "processing" | "pending"
}

export interface BankDetails {
  bankName: string
  country: string
  accountName: string
  accountNumber: string
}

export interface PayPalDetails {
  paypalId: string
}

export interface EarningsData {
  metrics: EarningsMetric[]
  payoutMethods: PayoutMethod[]
  transactions: EarningsTransaction[]
  hasData: boolean
}

export type SetupStep = "bank" | "paypal" | null
