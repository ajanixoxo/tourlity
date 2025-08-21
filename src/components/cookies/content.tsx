import React from 'react'

function CookiesContent() {
  const cookiePolicy = [
    {
        step: "1",
        title: "What are Cookies?",
        description: "Cookies are small text files that are stored on your device (computer, tablet, mobile phone) when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.",
        details: []
    },
    {
        step: "2",
        title: "How We Use Cookies",
        description: "Tourlity uses cookies for several purposes, including:",
        details: [
            "Essential Cookies: These are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.",
            "Performance and Analytics Cookies: These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
            "Functionality Cookies: These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
            "Targeting/Advertising Cookies: These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. (Note: Specify if you use these)."
        ]
    },
    {
        step: "3",
        title: "Types of Cookies We Use",
        description: "We use different types of cookies on our website:",
        details: [
            "Session Cookies: These are temporary cookies that expire when you close your browser.",
            "Persistent Cookies: These remain on your device for a set period or until you delete them.",
            "First-party Cookies: These are set by the website you are visiting (Tourlity).",
            "Third-party Cookies: These are set by a domain other than the one you are visiting, such as for analytics or advertising."
        ]
    },
    {
        step: "4",
        title: "Managing Cookies",
        description: "You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by adjusting the settings in your browser. Most browsers allow you to:",
        details: [
            "See what cookies you've got and delete them on an individual basis.",
            "Block third-party cookies.",
            "Block cookies from particular sites.",
            "Block all cookies from being set.",
            "Delete all cookies when you close your browser."
        ]
    },
    {
        step: "5",
        title: "Changes to This Cookie Policy",
        description: "We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the 'Last Updated' date.",
        details: []
    },
];
    return (
        <div className="grid grid-cols-1 lg:px-16 gap-6 mb-16">
            {cookiePolicy.map((step, index) => (
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

export default CookiesContent