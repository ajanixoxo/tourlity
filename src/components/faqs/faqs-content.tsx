"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQsContent() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "What is Tourlity?",
      answer:
        "Tourlity is a platform that connects travelers with authentic local experiences around the world. Our passionate hosts offer unique tours, cultural activities, and adventures that showcase the true essence of their destinations.",
    },
    {
      id: "2",
      question: "How do I book a tour?",
      answer:
        "Booking a tour is simple! Browse our available experiences, select the one that interests you, choose your preferred date and time, and complete the secure payment process. You'll receive confirmation details and host contact information immediately.",
    },
    {
      id: "3",
      question: "Can I become a host on Tourlity?",
      answer:
        "We welcome passionate locals who want to share their culture and knowledge. Simply create a host profile, describe your unique experience, set your pricing, and start welcoming guests. Our team will review and approve your listing.",
    },
    {
      id: "4",
      question: "What types of tours are available?",
      answer:
        "We offer a wide variety of experiences including food tours, cultural walks, adventure activities, art workshops, nature excursions, and virtual experiences. Each tour is designed to provide authentic local insights and memorable interactions.",
    },
    {
      id: "5",
      question: "What if I need to cancel a booking?",
      answer:
        "Cancellation policies vary by host and experience. Most bookings can be cancelled up to 24-48 hours before the scheduled time for a full or partial refund. Check the specific cancellation policy on your booking confirmation.",
    },
    {
      id: "6",
      question: "How does pricing work?",
      answer:
        "Hosts set their own prices based on the value and uniqueness of their experiences. Prices typically include all activities, materials, and guidance mentioned in the experience description. Additional costs like meals or transportation are clearly noted.",
    },
  ]

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="py-16 ">
      <div className="lg:max-w-4xl mx-auto px-3 sm:px-3 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="stroke-color p-2 !border box-color rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full lg:px-6 py-4 text-left transition-colors flex items-center justify-between"
              >
                <h3 className="text[28px] lg:text-lg font-plus-jakarta font-semibold ">{faq.question}</h3>
                {openFAQ === faq.id ? (
                  <ChevronUp className="w-5 h-5 secondary-text-color" />
                ) : (
                  <ChevronDown className="w-5 h-5 secondary-text-color" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 py-4  ">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
