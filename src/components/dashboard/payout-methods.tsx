"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import Button from "../root/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, CreditCard} from "lucide-react"
import type { PayoutMethod, SetupStep, BankDetails, PayPalDetails } from "@/types/earnings"

interface PayoutMethodsProps {
  payoutMethods: PayoutMethod[]
  hasData: boolean
}

export function PayoutMethods({ payoutMethods, hasData }: PayoutMethodsProps) {
  const [showCurrency, setShowCurrency] = useState(false)
  const [setupStep, setSetupStep] = useState<SetupStep>(null)
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: "",
    country: "",
    accountName: "",
    accountNumber: "",
  })
  const [paypalDetails, setPaypalDetails] = useState<PayPalDetails>({
    paypalId: "",
  })

  const exchangeRates = [
    { currency: "EUR", rate: 0.92 },
    { currency: "GBP", rate: 0.78 },
    { currency: "CAD", rate: 1.35 },
  ]

  if (setupStep === "bank") {
    return (
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>Earnings</span>
            <span>›</span>
            <span>Setup Bank Details</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Bank Information</h2>
          <p className="text-gray-600 mt-1">Fill in your bank details</p>
          <Button
            variant="secondary"
            className="text-coral-500 hover:text-coral-600 p-0 h-auto mt-2"
            onClick={() => setSetupStep("paypal")}
          >
            Use PayPal instead
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <div className="relative mt-1">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="bankName"
                  placeholder="e.g., HSBC UK"
                  className="pl-10"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={bankDetails.country}
                onValueChange={(value) => setBankDetails({ ...bankDetails, country: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Destination of your choice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="Blueberry Smith"
                className="mt-1"
                value={bankDetails.accountName}
                onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="e.g., 21"
                className="mt-1"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button variant="primary" onClick={() => setSetupStep(null)}>
            Cancel
          </Button>
          <Button className="bg-coral-500 hover:bg-coral-600 text-white">Confirm details</Button>
        </div>
      </Card>
    )
  }

  if (setupStep === "paypal") {
    return (
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>Earnings</span>
            <span>›</span>
            <span>Setup Bank Details</span>
            <span>›</span>
            <span>Setup Paypal Details</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Paypal Details</h2>
          <p className="text-gray-600 mt-1">Fill in your paypal details</p>
          <Button
            variant="secondary"
            className="text-coral-500 hover:text-coral-600 p-0 h-auto mt-2"
            onClick={() => setSetupStep("bank")}
          >
            Use Bank Instead
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="paypalId">Paypal ID</Label>
            <div className="relative mt-1">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="paypalId"
                placeholder="e.g., 0897 9078 6779 0957"
                className="pl-10"
                value={paypalDetails.paypalId}
                onChange={(e) => setPaypalDetails({ ...paypalDetails, paypalId: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Button variant="primary" onClick={() => setSetupStep(null)}>
            Cancel
          </Button>
          <Button className="bg-coral-500 hover:bg-coral-600 text-white">Confirm details</Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <div className="flex flex-row gap-2 mt-2 lg:mt-0">
            <Button
              variant="secondary"
              className="flex items-center !p-2"
              onClick={() => setShowCurrency(!showCurrency)}
            >
              Check Currency
              {/* {showCurrency ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />} */}
            </Button>
            <Button variant="primary" className="flex items-center gap-2 ">
              Add Payment
            </Button>
          </div>
        </div>

      </div>

      {/* Currency Preferences - Collapsible */}
      {showCurrency && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4">Currency Preferences</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="defaultCurrency">Default Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="gbp">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">This is the currency in which you&apos;ll be charged.</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Auto-convert to local currency</h4>
                <p className="text-sm text-gray-500">
                  When enabled, prices will be shown in the local currency of the experience location.
                </p>
              </div>
              <div className="w-12 h-6 bg-coral-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Current exchange rates (as of Jul 03, 2025):</h4>
              <div className="space-y-2">
                {exchangeRates.map((rate) => (
                  <div key={rate.currency} className="flex justify-between">
                    <span className="text-gray-600">1 USD</span>
                    <span className="font-medium">
                      {rate.rate} {rate.currency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      {!hasData ? (
        <div className="text-center flex flex-col items-center justify-center py-12">
          <div className="mx-auto">
            <svg width={280} height={280} viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M101.791 242.485C116.648 251.44 127.247 247.722 131.304 240.542C139.151 226.655 165.241 198.258 206.587 188.66C261.347 175.948 249.912 142.196 216.248 124.484C182.585 106.773 157.414 82.2651 161.224 55.6176C165.033 28.9702 127.288 19.7839 110.502 71.0447C99.6544 104.171 80.215 113.046 67.8188 115.179C56.1357 117.19 43.3558 119.713 37.1237 129.797C29.5615 142.033 32.2003 154.41 63.8617 162.9C108.729 174.93 68.491 222.413 101.791 242.485Z" fill="#3E3E3E" fillOpacity="0.1" />
              <path d="M63.1905 184.424C63.8193 184.064 70.9156 181.06 106.219 197.518C106.116 197.658 106.072 197.724 106.072 197.724C106.072 197.724 69.3711 210.084 62.1803 194.857C60.033 190.324 60.6483 187.203 63.1292 184.459L63.1905 184.424Z" fill="#A0A0A0" />
              <path d="M181.846 190.652C174.177 197.1 162.148 201.78 150.542 195.557C152.376 194.385 154.271 193.178 156.203 191.929C167.858 184.44 178.125 189.451 181.846 190.652Z" fill="#A0A0A0" />
              <path d="M195.585 111.349C203.421 176.6 184.798 188.443 182.725 190.242C182.125 190.763 181.882 190.725 180.974 190.491L180.959 190.5C177.118 189.482 167.858 184.44 156.203 191.928C154.271 193.176 152.376 194.384 150.542 195.555C138.652 203.096 129.05 208.411 122.133 205.326C116.265 202.333 110.975 199.743 106.218 197.518C70.9155 181.059 63.8192 184.064 63.1904 184.424C63.92 184.026 70.6124 180.317 79.6236 173.793C79.6543 173.775 79.685 173.758 79.6915 173.734C91.7363 165.005 107.867 151.249 119.461 133.554C127.354 121.521 135.076 91.0168 149.975 85.0315C180.594 73.6089 194.313 98.076 195.585 111.349Z" fill="#A0A0A0" />
              <path d="M161.728 110.204C162.679 107.694 162.586 105.333 161.521 104.93C160.456 104.526 158.823 106.234 157.872 108.744C156.922 111.254 157.015 113.615 158.079 114.018C159.144 114.421 160.778 112.714 161.728 110.204Z" fill="white" />
              <path d="M181.224 113.406C181.898 110.808 181.551 108.471 180.449 108.185C179.346 107.899 177.907 109.774 177.233 112.371C176.56 114.969 176.907 117.307 178.009 117.593C179.111 117.878 180.551 116.004 181.224 113.406Z" fill="white" />
              <path d="M169.357 122.944C169.197 122.944 169.042 122.89 168.918 122.789C168.794 122.689 168.708 122.549 168.674 122.393C168.549 121.828 167.994 120.156 167.113 119.908C166.233 119.659 164.506 120.624 163.807 121.13C163.657 121.239 163.47 121.284 163.286 121.254C163.103 121.225 162.939 121.124 162.83 120.974C162.721 120.823 162.676 120.636 162.706 120.452C162.735 120.269 162.836 120.105 162.986 119.996C163.262 119.797 165.728 118.062 167.493 118.56C169.335 119.08 169.975 121.788 170.041 122.095C170.064 122.198 170.063 122.304 170.039 122.405C170.015 122.507 169.968 122.602 169.902 122.684C169.837 122.765 169.754 122.831 169.659 122.876C169.565 122.921 169.461 122.945 169.357 122.944H169.357Z" fill="white" />
            </svg>


          </div>
          <p className="text-gray-500 text-lg mb-6">You have not added any payment method yet.</p>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {payoutMethods.map((method) => (
            <Card key={method.id} className="p-4 relative">
              {method.isDefault && (
                <span className="absolute top-2 right-2 bg-red-50 rounded-3xl text-xs  text-primary-color px-2 py-1 ">
                  Default
                </span>
              )}
              <div className="flex items-center gap-3 mb-3">
                {method.type === "bank" ? (
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 8.56907C2 7.37289 2.48238 6.63982 3.48063 6.08428L7.58987 3.79744C9.7431 2.59915 10.8197 2 12 2C13.1803 2 14.2569 2.59915 16.4101 3.79744L20.5194 6.08428C21.5176 6.63982 22 7.3729 22 8.56907C22 8.89343 22 9.05561 21.9646 9.18894C21.7785 9.88945 21.1437 10 20.5307 10H3.46928C2.85627 10 2.22152 9.88944 2.03542 9.18894C2 9.05561 2 8.89343 2 8.56907Z" stroke="#F26457" strokeWidth="1.5" />
                      <path d="M11.9959 7H12.0049" stroke="#F26457" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 10V18.5M8 10V18.5" stroke="#F26457" strokeWidth="1.5" />
                      <path d="M16 10V18.5M20 10V18.5" stroke="#F26457" strokeWidth="1.5" />
                      <path d="M19 18.5H5C3.34315 18.5 2 19.8431 2 21.5C2 21.7761 2.22386 22 2.5 22H21.5C21.7761 22 22 21.7761 22 21.5C22 19.8431 20.6569 18.5 19 18.5Z" stroke="#F26457" strokeWidth="1.5" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg width={54} height={42} viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M28.0292 10.8538C28.6513 11.9738 28.7846 13.4582 28.4291 15.3071C27.9492 17.7071 26.9182 19.476 25.3363 20.6138C23.9143 21.6271 22.0479 22.1338 19.7371 22.1338H19.0706C18.8039 22.1338 18.5729 22.2182 18.3773 22.3871C18.1818 22.556 18.0574 22.7738 18.0041 23.0404L17.0709 28.8804C17.0353 29.1293 16.9153 29.3427 16.7109 29.5204C16.5065 29.6982 16.2799 29.7871 16.031 29.7871H11.5517C11.3562 29.7871 11.1962 29.7116 11.0718 29.5604C10.9474 29.4093 10.903 29.236 10.9385 29.0404L11.1518 27.5471H13.1782L14.458 19.5204H16.2977C19.4261 19.5204 21.9901 18.7916 23.9898 17.3338C25.9895 15.876 27.3359 13.716 28.0292 10.8538ZM24.0831 4.08044C24.5808 4.64933 24.9097 5.276 25.0696 5.96044C25.2296 6.64489 25.2296 7.476 25.0696 8.45378L24.9896 8.93377C24.5097 11.4227 23.4877 13.2627 21.9235 14.4538C20.4126 15.6093 18.3418 16.1871 15.7111 16.1871H13.2048C12.796 16.1871 12.4227 16.3116 12.085 16.5604C11.7473 16.8093 11.5251 17.1293 11.4184 17.5204H11.3918L10.1386 25.3871H5.41937C5.36604 25.3871 5.34827 25.3604 5.36604 25.3071L8.83217 3.28044C8.88549 2.97822 9.02769 2.72489 9.25877 2.52044C9.48984 2.316 9.76535 2.21378 10.0853 2.21378H18.0574C20.9903 2.21378 22.9988 2.836 24.0831 4.08044Z" fill="#2563EB" />
                    </svg>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.accountInfo}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end text-sm">
                <button className="text-gray-600 hover:text-gray-800">Edit</button>
                <button className="text-gray-600 hover:text-gray-800">Remove</button>
                {!method.isDefault && <button className="text-coral-500 hover:text-coral-600">Set as Default</button>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  )
}
