import type { PaymentData } from "@/types/payment"

export const paymentDataWithTransactions: PaymentData = {
    summary: {
        upcomingTrips: 2,
        totalSpent: 1248,
        nextTripDays: 5,
    },
    paymentMethods: [
        {
            id: "1",
            type: "visa",
            last4: "4025",
            expiryDate: "09/2028",
            isDefault: true,
            imgSrc: "/images/visa-payment.png",
        },
        {
            id: "2",
            type: "mastercard",
            last4: "7891",
            expiryDate: "05/2027",
            isDefault: false,
            imgSrc: "/images/mastercard-payment.png",
        },
        {
            id: "3",
            type: "paypal",
            email: "emily.johnson@example.com",
            isDefault: false,
            imgSrc: "/images/paypal-payment.png",
        },
    ],
    transactions: [
        {
            id: "1",
            date: "Jul 01, 2025 9:00 am",
            experience: "Historical District Tour",
            host: "Michael Stevens",
            amount: 89,
            paymentMethod: "Visa •••• 4025",
            status: "completed",
        },
        {
            id: "2",
            date: "Jun 28, 2025 9:00 am",
            experience: "Street Food Safari",
            host: "Sophia Rodriguez",
            amount: 65,
            paymentMethod: "Mastercard •••• 7891",
            status: "completed",
        },
        {
            id: "3",
            date: "Jun 25, 2025 2:00 pm",
            experience: "Art Gallery Walk",
            host: "David Kim",
            amount: 45,
            paymentMethod: "PayPal",
            status: "pending",
        },
    ],
    exchangeRates: [
        { currency: "EUR", rate: 0.92 },
        { currency: "GBP", rate: 0.78 },
        { currency: "CAD", rate: 1.35 },
    ],
    hasData: true,
}

export const paymentDataEmpty: PaymentData = {
    summary: {
        upcomingTrips: 0,
        totalSpent: 0,
        nextTripDays: 5,
    },
    paymentMethods: [],
    transactions: [],
    exchangeRates: [
        { currency: "EUR", rate: 0.92 },
        { currency: "GBP", rate: 0.78 },
        { currency: "CAD", rate: 1.35 },
    ],
    hasData: false,
}
