"use client"

import type React from "react"

import { useState } from "react"
import Button from "../root/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  const messageLength = formData.message.length
  const maxLength = 500

  return (
    <section className="py-16 ">
      <div className="max-w-3xl mx-auto px-2 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
          <p className="description">Whether you&apos;re here to explore or host, we&apos;d love to hear from you.</p>
        </div>

        <form onSubmit={handleSubmit} className="box-color rounded-2xl p-4 lg:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="fullName" className="text-[20px] font-semibold  mb-2 block">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Sarah Aso"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full stroke-color shadow-none py-5"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-[20px] font-semibold  mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full stroke-color shadow-none py-5"
              />
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="subject" className="text-[20px] font-semibold  mb-2 block">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Regarding my booking..."
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full stroke-color shadow-none py-5"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="message" className="text-[20px] font-semibold  mb-2 block">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full min-h-[120px] resize-none stroke-color shadow-none py-5" 
              maxLength={maxLength}
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs muted-color">
                {messageLength}/{maxLength} characters
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-coral-500 hover:bg-coral-600 text-white py-3"
          >
            {isSubmitting ? "Sending Message..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  )
}
