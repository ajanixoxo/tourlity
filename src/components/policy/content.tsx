import React from 'react'

function PolicyContent() {
    const privacyPolicy = [
        {
            step: "1",
            title: "Introduction",
            description: "TourBay ('we' or 'us' or 'our') respects the privacy and rights of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ('Service').",
            details: []
        },
        {
            step: "2",
            title: "Information We Collect",
            description: "We may collect personal information you provide to us directly, such as:",
            details: [
                "Personal Information: name, email address, phone number, billing information, and other contact information",
                "Host Information: if you are a host, information about your Tours, availability, pricing, and any verification documents you provide",
                "Booking Information: details of Tours you book or inquire about, including dates, number of guests, and special requests",
                "Communications: records of your interactions with us, including customer service inquiries, emails, and phone calls",
                "Usage Data: IP address, browser type, operating system, pages visited, time spent on pages, and other diagnostic data",
                "Cookies and Tracking Technologies: We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Take our Cookie Policy for more information"
            ]
        },
        {
            step: "3",
            title: "How We Use Your Information",
            description: "We use the information we collect for various purposes, including to:",
            details: [
                "Provide and maintain our Service",
                "Process your bookings and payments",
                "Facilitate communication between Hosts and Guests",
                "Send you updates, security alerts, and support messages",
                "Improve our Service and develop new features",
                "Send you updates, security alerts, and support messages"
            ]
        },
        {
            step: "4",
            title: "How We Share Your Information",
            description: "We may share your information in limited circumstances:",
            details: [
                "With Hosts and Guests: to facilitate bookings, we share relevant information between Hosts and Guests to facilitate the experience (e.g. Your name, basic contact, communication)",
                "With Service Providers: we may share your information with third-party service providers who perform services on your behalf, such as payment processing and customer support",
                "For Legal Requirements: we may disclose your information if required by law or if necessary to add enforce our policy, protect our or others' rights, property, or safety"
            ]
        },
        {
            step: "5",
            title: "Data Security",
            description: "We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.",
            details: []
        },
        {
            step: "6",
            title: "Your Data Rights",
            description: "Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.",
            details: []
        },
        {
            step: "7",
            title: "Children's Privacy",
            description: "Our Service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children.",
            details: []
        },
        {
            step: "8",
            title: "Changes to This Privacy Policy",
            description: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'last updated' date.",
            details: []
        },
    ];
    return (
        <div className="grid grid-cols-1 lg:px-16 gap-6 mb-16">
            {privacyPolicy.map((step, index) => (
                <div key={index} className="mt-6 w-[80%] box-color p-10 rounded-[18px] mx-auto">
                    <div className="w-12 h-12 bg-white text-primary-color rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                        {step.step}
                    </div>
                    <h3 className="text-lg font-inter font-semibold mb-3">{step.title}</h3>
                    <p className="description leading-relaxed mb-4">{step.description}</p>

                    {/* Render details list if it exists and has items */}
                    {step.details && step.details.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {step.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="description leading-relaxed text-sm">
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PolicyContent