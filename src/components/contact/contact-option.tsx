import { Phone, Mail, MapPin } from "lucide-react"
import Button from "../root/button"

export default function ContactOptions() {
  return (
    <section className="py-16 ">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Customer Support */}
          <div className="text-center box-color rounded-2xl px-5 py-3">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-primary-color" />
            </div>
            <h3 className="text-2xl font-bold  mb-4">Customer Support</h3>
            <p className="description max-w-xs mx-auto mb-6">Available 24/7 to assist you with any questions or concerns</p>
            <Button variant="primary" className="w-full">+1 (234) 567-890</Button>
          </div>

          {/* Email Us */}
          <div className="text-center box-color rounded-2xl px-5 py-3">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary-color" />
            </div>
            <h3 className="text-2xl font-bold  mb-4">Email Us</h3>
            <p className="description max-w-xs mx-auto mb-6">Send us a message and we&apos;ll respond within 24 hours</p>
            <Button variant="secondary" className="w-full">support@tourlity.com</Button>
          </div>

          {/* Visit Our Office */}
          <div className="text-center box-color rounded-2xl px-5 py-3">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-primary-color" />
            </div>
            <h3 className="text-2xl font-bold  mb-4">Visit Our Office</h3>
            <p className="description max-w-xs mx-auto mb-4">123 Travel Street, Suite 100 San Francisco, CA 94105</p>
            <Button variant="secondary" className=" w-full">Mon-Fri: 9:00 AM - 6:00 PM</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
