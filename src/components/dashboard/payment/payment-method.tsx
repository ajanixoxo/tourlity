
"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PaymentMethod, ExchangeRate } from "@/types/payment"
import PaymentCardSVG from "./payment-card"
import PaymentMethodContent from "@/components/modals/card-payment"
interface PaymentMethodsProps {
    paymentMethods: PaymentMethod[]
    exchangeRates: ExchangeRate[]
    hasData: boolean
}

export function PaymentMethods({ paymentMethods, exchangeRates, hasData }: PaymentMethodsProps) {
    const [showCurrencyPrefs, setShowCurrencyPrefs] = useState(false)
    const [autoConvert, setAutoConvert] = useState(true)
    const [isPaymentMethodOpen, setIsPaymentMethoddOpen] = useState(false);

    // choose icon dynamically
    const getPaymentIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case "visa":
                return (
                    <div className=" bg-blue-100 rounded-3xl p-3 flex items-center justify-center">
                        <svg width={54} height={42} viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.32812 5.33268H31.6569V7.99935H2.32812V5.33268ZM2.32812 23.9993H31.6569V26.666H2.32812V23.9993ZM27.1509 19.8927L26.9109 18.7193H24.3247L23.8981 19.866L21.8184 19.8927L24.8046 12.746C24.9824 12.3371 25.2845 12.1327 25.7111 12.1327H27.3909L28.9906 19.8927H27.1509ZM24.9113 17.146H26.591L25.9511 14.2393L24.9113 17.146ZM11.5 12.1327H13.5797L10.3535 19.8927H8.22054C7.50954 17.1193 6.98518 15.066 6.64745 13.7327C6.5408 13.306 6.30973 13.0349 5.95423 12.9193C5.59873 12.8038 5.01215 12.6127 4.1945 12.346V12.1327H7.52731C8.11389 12.1327 8.4605 12.4171 8.56715 12.986L9.39369 17.386L11.5 12.1327ZM16.4593 12.1327L14.8062 19.8927H12.8065L14.4596 12.1327H16.4593ZM20.5119 11.9993C20.7786 11.9993 21.0896 12.0349 21.4451 12.106C21.7651 12.1771 22.0406 12.2571 22.2717 12.346L21.9251 13.9727C21.3207 13.7238 20.7964 13.5993 20.352 13.5993C19.9787 13.5993 19.6721 13.666 19.4321 13.7993C19.1922 13.9327 19.0722 14.0838 19.0722 14.2527C19.0722 14.4216 19.1699 14.586 19.3655 14.746C19.4899 14.8349 19.7299 14.9771 20.0854 15.1727C20.3875 15.3505 20.6275 15.4927 20.8052 15.5993C21.2496 15.8838 21.5607 16.186 21.7384 16.506C21.8629 16.7549 21.9162 17.066 21.8984 17.4393C21.8984 17.8838 21.7695 18.3016 21.5118 18.6927C21.2541 19.0838 20.8852 19.3949 20.4053 19.626C19.8543 19.8749 19.2144 19.9993 18.4856 19.9993C17.9701 19.9993 17.5702 19.9727 17.2858 19.9193C17.0014 19.866 16.637 19.7593 16.1926 19.5993L16.5659 17.9193C17.0103 18.1149 17.3613 18.2438 17.6191 18.306C17.8768 18.3682 18.1834 18.3993 18.5389 18.3993C18.8944 18.3993 19.1966 18.3327 19.4454 18.1993C19.6943 18.066 19.8187 17.8838 19.8187 17.6527C19.8187 17.4749 19.7565 17.3282 19.6321 17.2127C19.5077 17.0971 19.2499 16.9238 18.8589 16.6927H18.8322C18.2812 16.3905 17.8813 16.1238 17.6324 15.8927C17.2236 15.4838 17.0192 15.0216 17.0192 14.506C17.0192 13.7593 17.3436 13.1549 17.9923 12.6927C18.6411 12.2305 19.481 11.9993 20.5119 11.9993Z" fill="#1D4ED8" />
                        </svg>


                    </div>
                )
            case "mastercard":
                return (
                    <div className=" bg-green-100 rounded-3xl p-3 flex items-center justify-center">
                        <svg width={52} height={40} viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.7" clipPath="url(#clip0_3900_82151)">
                                <path d="M12.3359 2.95703H20.398V16.9137H12.3359V2.95703Z" fill="#FF6610" />
                                <path d="M12.8464 9.93563C12.8464 7.09995 14.2284 4.58474 16.3526 2.95725C14.7915 1.77366 12.8208 1.05859 10.6709 1.05859C5.57758 1.05859 1.45703 5.02854 1.45703 9.93563C1.45703 14.8426 5.57758 18.8127 10.6708 18.8127C12.8207 18.8127 14.7914 18.0976 16.3526 16.9139C14.2284 15.3111 12.8464 12.7713 12.8464 9.93563Z" fill="#FFBB0B" />
                                <path d="M31.2745 9.93563C31.2745 14.8426 27.1539 18.8127 22.0607 18.8127C19.9108 18.8127 17.9401 18.0976 16.3789 16.9139C18.5288 15.2865 19.8853 12.7713 19.8853 9.93563C19.8853 7.09995 18.5031 4.58474 16.3789 2.95725C17.94 1.77366 19.9108 1.05859 22.0607 1.05859C27.1539 1.05859 31.2745 5.05326 31.2745 9.93563Z" fill="#FF0000" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3900_82151">
                                    <rect width={31} height={19} fill="white" transform="translate(0.5 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>


                    </div>
                )
            case "paypal":
                return (
                    <div className=" bg-blue-100 rounded-3xl p-3 flex items-center justify-center">
                        <svg width={54} height={42} viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.0292 10.8538C28.6513 11.9738 28.7846 13.4582 28.4291 15.3071C27.9492 17.7071 26.9182 19.476 25.3363 20.6138C23.9143 21.6271 22.0479 22.1338 19.7371 22.1338H19.0706C18.8039 22.1338 18.5729 22.2182 18.3773 22.3871C18.1818 22.556 18.0574 22.7738 18.0041 23.0404L17.0709 28.8804C17.0353 29.1293 16.9153 29.3427 16.7109 29.5204C16.5065 29.6982 16.2799 29.7871 16.031 29.7871H11.5517C11.3562 29.7871 11.1962 29.7116 11.0718 29.5604C10.9474 29.4093 10.903 29.236 10.9385 29.0404L11.1518 27.5471H13.1782L14.458 19.5204H16.2977C19.4261 19.5204 21.9901 18.7916 23.9898 17.3338C25.9895 15.876 27.3359 13.716 28.0292 10.8538ZM24.0831 4.08044C24.5808 4.64933 24.9097 5.276 25.0696 5.96044C25.2296 6.64489 25.2296 7.476 25.0696 8.45378L24.9896 8.93377C24.5097 11.4227 23.4877 13.2627 21.9235 14.4538C20.4126 15.6093 18.3418 16.1871 15.7111 16.1871H13.2048C12.796 16.1871 12.4227 16.3116 12.085 16.5604C11.7473 16.8093 11.5251 17.1293 11.4184 17.5204H11.3918L10.1386 25.3871H5.41937C5.36604 25.3871 5.34827 25.3604 5.36604 25.3071L8.83217 3.28044C8.88549 2.97822 9.02769 2.72489 9.25877 2.52044C9.48984 2.316 9.76535 2.21378 10.0853 2.21378H18.0574C20.9903 2.21378 22.9988 2.836 24.0831 4.08044Z" fill="#2563EB" />
                        </svg>


                    </div>
                )
            default:
                return (
                    <div className="w-8 h-5 bg-gray-300 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-gray-600" />
                    </div>
                )
        }
    }


    if (!hasData) {
        return (
            <div className="space-y-6">
                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-6">
                        <PaymentCardSVG />
                    </div>
                    <p className="text-gray-500 text-lg mb-6">
                        You haven&lsquo;t saved any payment method yet.
                    </p>
                    <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                        Add a Payment Method
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 bg-white p-4 rounded-3xl shadow">
            {/* Payment Methods Header */}
            {/* <div className="flex flex-col lg:flex-row items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 text-left">Payment Methods</h2>
                <div className="flex  items-center gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => setShowCurrencyPrefs(!showCurrencyPrefs)}
                        className="text-gray-600 border-gray-300  whitespace-nowrap shrink-0 min-w-max"
                    >
                        Check Currency
                    </Button>
                    <Button className="bg-coral-500 hover:bg-coral-600 whitespace-nowrap shrink-0 min-w-max text-white">
                        Add Payment Method
                    </Button>
                </div>
            </div> */}
            <div className="flex flex-col gap-2 lg:flex-row items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900 text-left">Payment Methods</h2>

                <div className="flex flex-col lg:flex-row items-center gap-3">

                    <div className="flex flex-row gap-2">
                        <Button variant="primary" className="flex items-center !p-2"
                            onClick={() => setShowCurrencyPrefs(!showCurrencyPrefs)}>

                            Check Currency
                        </Button>
                        <Button
                            variant="secondary"
                            className="flex items-center gap-2"
                            onClick={() => {
                                setIsPaymentMethoddOpen(true);
                            }} >
                            Add Payment
                        </Button>
                    </div>

                </div>

            </div>

            {isPaymentMethodOpen && (
                <PaymentMethodContent onClose={() => setIsPaymentMethoddOpen(false)} />
            )}
            {/* Currency Preferences (Collapsible) */}
            {showCurrencyPrefs && (
                <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                        <CardTitle className="text-lg">Currency Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Default Currency
                            </label>
                            <Select defaultValue="usd">
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usd">🇺🇸 USD - US Dollar</SelectItem>
                                    <SelectItem value="eur">🇪🇺 EUR - Euro</SelectItem>
                                    <SelectItem value="gbp">🇬🇧 GBP - British Pound</SelectItem>
                                    <SelectItem value="cad">🇨🇦 CAD - Canadian Dollar</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-gray-500 mt-1">
                                This is the currency in which you&apos;ll be charged.
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    Auto-convert to local currency
                                </h3>
                                <p className="text-sm text-gray-500">
                                    When enabled, prices will be shown in the local currency of
                                    the experience location.
                                </p>
                            </div>
                            <Switch checked={autoConvert} onCheckedChange={setAutoConvert} />
                        </div>

                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-3">
                                Current exchange rates (as of Jul 03, 2025):
                            </h4>
                            <div className="space-y-2">
                                {exchangeRates.map((rate) => (
                                    <div
                                        key={rate.currency}
                                        className="flex justify-between text-sm"
                                    >
                                        <span className="text-gray-600">1 USD</span>
                                        <span className="font-medium">
                                            {rate.rate} {rate.currency}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Payment Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                    <Card
                        key={method.id}
                        className="p-1 lg:p-4 !shadow-none flex justify-around items-center"
                    >
                        <div className="flex items-center mb-3">
                            {getPaymentIcon(method.type)}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium capitalize">{method.type}</span>
                                {method.last4 && (
                                    <span className="text-gray-600">•••• {method.last4}</span>
                                )}
                                {method.isDefault && (
                                    <Badge variant="secondary" className="text-coral-600 bg-coral-50">
                                        Default
                                    </Badge>
                                )}
                            </div>

                            {method.expiryDate && (
                                <p className="text-sm text-gray-500">
                                    Expires {method.expiryDate}
                                </p>
                            )}

                            {method.email && (
                                <p className="text-sm text-gray-500">{method.email}</p>
                            )}

                            <div className="flex items-center gap-3 pt-2">
                                <button className="text-sm text-gray-600 hover:text-gray-900">
                                    Edit
                                </button>
                                <button className="text-sm text-gray-600 hover:text-gray-900">
                                    Remove
                                </button>
                                {!method.isDefault && (
                                    <button className="text-sm text-coral-600 hover:text-coral-700">
                                        Set as Default
                                    </button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
