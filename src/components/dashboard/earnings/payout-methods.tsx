"use client"

import { Card } from "@/components/ui/card"
// import Button from "../../root/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Building2, CreditCard } from "lucide-react"
// import type { PayoutMethod, SetupStep, BankDetails, PayPalDetails } from "@/types/earnings"
// import PaymentMethodContent from "@/components/modals/card-payment"

// All payout method logic deprecated; we now only show Stripe as the payment method
// All forms and add/edit/remove buttons below are commented out/deleted for Stripe-only integration
// const [showCurrency, setShowCurrency] = useState(false)
// const [setupStep, setSetupStep] = useState<SetupStep>(null)
// const [bankDetails, setBankDetails] = useState<BankDetails>({ ... })
// const [paypalDetails, setPaypalDetails] = useState<PayPalDetails>({ ... })
// const [isPaymentMethodOpen, setIsPaymentMethoddOpen] = useState(false);

export function PayoutMethods() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Payout Method</h2>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          {/* Stripe Logo SVG icon */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#623CEA"/>
            <text x="7" y="22" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fill="#fff">stripe</text>
          </svg>
        </div>
            <div>
          <p className="font-medium text-gray-900">Stripe</p>
          <p className="text-sm text-gray-500">Payouts will be processed through your Stripe Account.</p>
        </div>
          </div>
      {/*
      // Deprecated: Currency, Add/Edit, and legacy methods UI and logic below...
      */}
    </Card>
  )
}
