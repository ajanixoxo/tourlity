import { DollarSign, Users, Calendar, Star } from "lucide-react"
import Button from "../root/button"

export function BecomeHostContent() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Extra Income",
      description: "Set your own prices and earn money sharing what you're passionate about.",
    },
    {
      icon: Users,
      title: "Meet Amazing People",
      description: "Connect with travelers from around the world and share cultural exchanges.",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Host when it works for you. You're in complete control of your availability.",
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Receive reviews and build a strong profile that attracts more guests.",
    },
  ]

  const steps = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Tell us about yourself, your expertise, and what makes your experience unique.",
    },
    {
      step: "2",
      title: "Design Your Experience",
      description: "Describe your tour, set your price, upload photos, and define what guests will learn.",
    },
    {
      step: "3",
      title: "Get Approved",
      description: "Our team reviews your experience to ensure it meets our quality standards.",
    },
    {
      step: "4",
      title: "Welcome Guests",
      description: "Start hosting and sharing your passion with travelers from around the world.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Benefits */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Become a Host?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join thousands of passionate locals who are already sharing their culture and earning income through
            Tourlity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-coral-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Getting started as a host is simple and straightforward</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-coral-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Hosting?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of passionate hosts and start sharing your unique experiences with the world.
          </p>
          <Button variant="secondary">
            Create Your Host Profile
          </Button>
        </div>
      </div>
    </section>
  )
}
