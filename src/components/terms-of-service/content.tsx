import React from 'react'

function TOS_Content() {
    const termsOfService = [
        {
            step: "1",
            title: "Acceptance of Terms",
            description: "By accessing and using TourBay's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our site.",
        },
        {
            step: "2",
            title: "User Accounts",
            description: "When creating an account, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
        },
        {
            step: "3",
            title: "Host Obligations",
            description: "Hosts are responsible for accurate and fair Tour listings, setting competitive prices by following responsible rental, and adhering to the 'Host as described. Hosts must comply with all applicable laws and regulations.",
        },
        {
            step: "4",
            title: "Guest Obligations",
            description: "Guests agree to respect hosts and their property if applicable, adhere to any rules set by the host for a Trip, and abide them statement by policies Tours.",
        },
        {
            step: "5",
            title: "Payments and Fees",
            description: "TourBay may charge fees for the use of its Service (eg. service fees for hosts and/or Guests). All applicable fees will be disclosed at the time of booking a listing. Host Payments are processed through the same payment processors.",
        },
        {
            step: "6",
            title: "Cancellations and Refunds",
            description: "Trip Organizer and Guests are able to request the Host to type. Trip will left are strictly subject that Trip listing. Hosts may refuse Cancellation for resulting consequences due to cost responsives for causing without outside of a the service fee refund policy if any.",
        },
        {
            step: "7",
            title: "Content and Conduct",
            description: "You are responsible for all content you post via the Service. You agree not to post content from a copyrighted, 'harmful' controversial, or otherwise objectionable. TourBay reserves the right to remove any content or terminate accounts for violations of these Terms.",
        },
        {
            step: "8",
            title: "Disclaimers",
            description: "The Service is provided 'as is' and 'as available' without any warranties of any kind. TourBay does not guarantee non-quality, safety, or integrity of Tours who using Tours.",
        },
        {
            step: "9",
            title: "Limitation of Liability",
            description: "TourBay's total liability regarding Tours. TourBay shall not be liable for any incidental, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.",
        },
        {
            step: "10",
            title: "Changes to Terms",
            description: "TourBay reserves the right to modify these Terms at any time. We will provide notice of any significant changes. Your continued use of the Service after such changes will constitute acceptance of the new Terms.",
        },
        {
            step: "11",
            title: "Governing Law",
            description: "These terms and conditions are governed and construed in accordance with the laws of Tour Jurisdiction, without regard to its conflict of law provisions.",
        },
    ];
    return (

        <div className="grid grid-cols-1 lg:px-16 gap-6 mb-16">
            {termsOfService.map((step, index) => (
                <div key={index} className="mt-6 w-[80%] box-color p-10 rounded-[18px]  mx-auto">
                    <div className="w-12 h-12 bg-white text-primary-color rounded-full flex items-center justify-center  mb-4 text-xl font-bold">
                        {step.step}
                    </div>
                    <h3 className="text-lg font-inter font-semibold mb-3">{step.title}</h3>
                    <p className="description leading-relaxed">{step.description}</p>
                </div>
            ))}
        </div>

    )
}

export default TOS_Content