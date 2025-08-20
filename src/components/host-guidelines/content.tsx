import React, { JSX } from "react";

export type CardData = {
    title: string;
    icon: JSX.Element;
    items: string[];
};

export const cardDetails: CardData[] = [
    {
        title: "Safety and Responsibility",
        icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9982 2C8.99043 2 7.04018 4.01899 4.73371 4.7549C3.79589 5.05413 3.32697 5.20374 3.1372 5.41465C2.94743 5.62556 2.89186 5.93375 2.78072 6.55013C1.59143 13.146 4.1909 19.244 10.3903 21.6175C11.0564 21.8725 11.3894 22 12.0015 22C12.6135 22 12.9466 21.8725 13.6126 21.6175C19.8116 19.2439 22.4086 13.146 21.219 6.55013C21.1078 5.93364 21.0522 5.6254 20.8624 5.41449C20.6726 5.20358 20.2037 5.05405 19.2659 4.75499C16.9585 4.01915 15.0061 2 11.9982 2Z" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 13C9 13 10 13 11 15C11 15 14.1765 10 17 9" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        ,
        items: [
            "Maintain current safety certifications and insurance",
            "Provide clear safety instructions and emergency procedures",
            "Regular equipment maintenance and safety checks",
        ],
    },
    {
        title: "Guest Experience",
        icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke="#F26457" strokeWidth="1.5" />
            <path d="M19.5183 3.43325L20.0462 4.49786C20.1182 4.64606 20.3102 4.78821 20.4722 4.81543L21.4291 4.97573C22.041 5.07856 22.185 5.52618 21.744 5.96775L21.0001 6.71781C20.8741 6.84484 20.8051 7.08982 20.8441 7.26524L21.0571 8.19375C21.2251 8.92869 20.8381 9.21299 20.1932 8.82889L19.2963 8.29356C19.1343 8.19677 18.8674 8.19677 18.7024 8.29356L17.8055 8.82889C17.1636 9.21299 16.7736 8.92567 16.9416 8.19375L17.1546 7.26524C17.1935 7.08982 17.1246 6.84484 16.9986 6.71781L16.2547 5.96775C15.8167 5.52618 15.9577 5.07856 16.5696 4.97573L17.5265 4.81543C17.6855 4.78821 17.8775 4.64606 17.9495 4.49786L18.4774 3.43325C18.7654 2.85558 19.2333 2.85558 19.5183 3.43325Z" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        ,
        items: [
            "Provide clear communication before and during the experience",
            "Create inclusive and welcoming environments",
            "Maintain professional standards throughout the experience",
        ],
    },
    {
        title: "Cancellation Policy",
        icon: <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9994 14L8 8M8.00064 14L14 8" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C16.5228 21 21 16.5228 21 11Z" stroke="#F26457" strokeWidth="1.5" />
        </svg>

        ,
        items: [
            "Provide transparent cancellation terms and conditions",
            "Offer flexible options for rescheduling or changing bookings",
            "Ensure fair and timely processing of refund requests",
        ],
    },
    {
        title: "Communication",
        icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="#F26457" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 7H12.8571C13.2612 7 13.4632 7 13.5888 7.12204C13.7143 7.24408 13.7143 7.4405 13.7143 7.83333C13.7143 8.61901 13.7143 9.01184 13.4632 9.25592C13.2723 9.44155 12.9929 9.486 12.5145 9.49665C12.2692 9.50211 12.1465 9.50484 12.0732 9.5777C12 9.65056 12 9.76704 12 10V11.1667C12 11.5595 12 11.7559 12.1255 11.878C12.2511 12 12.4531 12 12.8571 12H13.7143M18 7V9.5M18 9.5H16.5429C16.2196 9.5 16.058 9.5 15.9576 9.40237C15.8571 9.30474 15.8571 9.1476 15.8571 8.83333V7M18 9.5V12" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 4.30518C10.089 4.20518 10.1815 4.10717 10.2774 4.01129C12.9591 1.32957 17.307 1.32957 19.9887 4.01129C22.6704 6.693 22.6704 11.0409 19.9887 13.7226C19.8928 13.8185 19.7948 13.911 19.6948 14" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        ,
        items: [
            "Respond to guest inquiries promptly and professionally",
            "Maintain clear, respectful, and inclusive communication",
            "Share accurate meeting points, timing, and preparation details",
        ],
    },
];


const HostGuidelinesContent = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 px-16 ">
            {cardDetails.map((card, index) => (
                <div
                    key={index}
                    className=" p-6 rounded-xl  box-color"
                >
                    <div className="flex  flex-col items-start gap-3 mb-4">
                        <div className="bg-white p-4 rounded-full">{card.icon}</div>
                        <h2 className="text-[24px] font-plus-jakarta font-semibold">{card.title}</h2>
                    </div>
                    <ul className="space-y-2">
                        {card.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.2618 3.59937C13.1956 2.53312 12.6625 2 12 2C11.3375 2 10.8044 2.53312 9.73815 3.59937C9.09832 4.2392 8.46427 4.53626 7.55208 4.53626C6.7556 4.53626 5.62243 4.38178 5 5.00944C4.38249 5.63214 4.53628 6.76065 4.53628 7.55206C4.53628 8.46428 4.2392 9.09832 3.59935 9.73817C2.53312 10.8044 2.00001 11.3375 2 12C2.00002 12.6624 2.53314 13.1956 3.59938 14.2618C4.31616 14.9786 4.53628 15.4414 4.53628 16.4479C4.53628 17.2444 4.38181 18.3776 5.00949 19C5.63218 19.6175 6.76068 19.4637 7.55206 19.4637C8.52349 19.4637 8.99128 19.6537 9.68457 20.347C10.2749 20.9374 11.0663 22 12 22C12.9337 22 13.7251 20.9374 14.3154 20.347C15.0087 19.6537 15.4765 19.4637 16.4479 19.4637C17.2393 19.4637 18.3678 19.6175 18.9905 19M20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19M18.9905 19H19" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 10.3077C8 10.3077 10.25 10 12 14C12 14 17.0588 4 22 2" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>


                                <span className="text-sm secondary-text-color font-normal">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
};

export default HostGuidelinesContent;
