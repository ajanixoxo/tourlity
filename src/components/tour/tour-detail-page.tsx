"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Star, Users, Clock, Accessibility, AlertCircle, Info } from "lucide-react"
import Button from "../root/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface TourDetailPageProps {
  tourId: string
}

export function TourDetailPage({ tourId }: TourDetailPageProps) {
  const [expandedDay, setExpandedDay] = useState<string>("day-1")

  // Mock data - replace with actual API call
  const tour = {
    id: tourId,
    title: "Paris Rooftop Fashion Haul",
    price: 125,
    location: "Paris, France",
    image: "/paris-rooftop-fashion-tour.jpg",
    description:
      "Join an exclusive fashion experience on a chic Parisian rooftop, where stylist Chloé unveils the season's hottest trends in real time. From couture pieces to emerging local designers, get front-row insights into the looks redefining European street style. Ask questions, get styling tips, and shop limited pieces directly during the session — all while soaking in stunning rooftop views of the Eiffel Tower.",
    categories: ["Arts and Crafts", "Nature and Outdoors"],
    highlights:
      "Explore Paris's remarkable blend of elegance and history, where iconic landmarks stand alongside charming cafés and beautiful gardens. Begin your unforgettable adventure at the Eiffel Tower, the tallest. Explore Paris's remarkable blend of elegance and history, where iconic landmarks stand alongside charming cafés and beautiful gardens.",
    features: [
      {
        icon: "calendar",
        title: "Reserve Now and Pay Later",
        description: "Keep your travel plans flexible - book your spot and pay nothing today",
      },
      { icon: "users", title: "Group Tour", description: "Join a group and forge lifelong friendship" },
      { icon: "clock", title: "Duration 10 Hours", description: "Check availability to see starting time" },
      { icon: "accessibility", title: "Accessibility", description: "Wheelchair accessible" },
      { icon: "users", title: "Age Range", description: "12 to 99" },
      { icon: "car", title: "Transfer", description: "Included" },
      {
        icon: "alert",
        title: "Cancellation Policy",
        description: "Cancel up to 24 hours in advance for a full refund - This activity is non-refundable",
      },
      { icon: "bed", title: "Stay", description: "Included" },
      { icon: "phone", title: "Mobile Ticketing", description: "Use your phone or print your voucher" },
      { icon: "utensils", title: "Meals", description: "Breakfast included" },
      { icon: "user", title: "Instructor", description: "English" },
      { icon: "pet", title: "Pet", description: "Not allowed" },
    ],
    availableDates: [
      {
        date: "Mon, July 15",
        time: "11:00 AM - 1:00 PM",
        note: "Book For a Private group",
        price: 1050,
        originalPrice: 1050,
        discountPrice: 980,
      },
      {
        date: "Mon, July 18",
        time: "11:00 AM - 1:00 PM",
        note: "Book For a Private group",
        price: 1050,
        originalPrice: 1050,
        discountPrice: 980,
      },
      {
        date: "Mon, July 25",
        time: "11:00 AM - 1:00 PM",
        note: "Book For a Private group",
        price: 1050,
        originalPrice: 1050,
        discountPrice: 980,
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Introduction to Paris",
        description:
          "Welcome to Paris! Upon arrival at the airport, get driven to your hotel. First check-in, spend the day at your leisure, where you can relax or explore the city on your own.",
        activities: [
          "Welcome to Paris! Upon arrival at the airport, get driven to your hotel. First check-in, spend the day at your leisure, where you can relax or explore the city on your own.",
          "Arriving in Paris at 13:00",
          "Picking you up at 14:00",
          "Hotel check-in starts at 15:00",
        ],
        meals: ["Breakfast", "Dinner", "Lunch"],
        images: ["/paris-hotel-breakfast.jpg", "/paris-city-view.jpg"],
        notes: "Early check-in is allowed after 00:00",
        tip: "Today's schedule is free. You can use the hotels spa and pool",
      },
      {
        day: 2,
        title: "Arrival & Introduction to Paris",
      },
      {
        day: 3,
        title: "Arrival & Introduction to Paris",
      },
      {
        day: 4,
        title: "Arrival & Introduction to Paris",
      },
      {
        day: 5,
        title: "Arrival & Introduction to Paris",
      },
    ],
    inclusions: [
      "4 nights stay in Paris with breakfast",
      "Paris Hop-On Hop-Off Bus Tour - Paris Hop-On Hop-Off Tootbus Tour (24 hours) and ticket",
      "Disneyland Paris Tickets - 1 Day and 1 Park Tickets (Undated) and ticket",
      "Palace of Versailles And Gardens Full Access Tickets and ticket",
      "Eiffel Tower Second Floor Tickets and ticket",
      "Louvre Museum Tickets, Paris and ticket",
      "Airport transfer from Charles de Gaulle International Airport to Deluxe Hotel",
      "Daily Breakfast",
    ],
    exclusions: ["Expenses of a personal nature.", "Meals not mentioned in the itinerary or inclusions"],
    reviews: [
      {
        author: "Sarah Johnson",
        location: "Canada",
        rating: 5,
        text: '"Marco\'s pasta-making class was the highlight of our trip to Rome! His knowledge of Italian cuisine and warm personality made for an unforgettable experience. We not only learned how to make authentic pasta but also about the history and culture behind the dishes."',
        avatar: "/sarah-johnson-avatar.jpg",
      },
      {
        author: "David Chen",
        location: "United States",
        rating: 5,
        text: '"Akiko\'s tea ceremony was a serene and mindful experience that gave us a deep appreciation for Japanese traditions. Her attention to detail and willingness to answer all our questions made it educational and enjoyable. A truly authentic cultural immersion!"',
        avatar: "/david-chen-avatar.jpg",
      },
      {
        author: "Emma Rodriguez",
        location: "Australia",
        rating: 5,
        text: "\"Isabella's samba class was energetic, fun, and a perfect introduction to Brazilian culture! She was patient with beginners and made everyone feel comfortable. By the end, we were all dancing with confidence. Can't recommend this experience enough!\"",
        avatar: "/emma-rodriguez-avatar.jpg",
      },
    ],
  }

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Listing Moderation</span>
            <span>›</span>
            <span className="text-foreground font-medium">View Tour</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full overflow-hidden bg-muted">
        <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
          <MapPin className="h-4 w-4" />
          <span>{tour.location}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{tour.title}</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">{tour.description}</p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tour.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="stay">Stay</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Trip Highlights:</h3>
                  <p className="text-muted-foreground leading-relaxed">{tour.highlights}</p>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-4">
                <Accordion type="single" collapsible value={expandedDay} onValueChange={setExpandedDay}>
                  {tour.itinerary.map((item) => (
                    <AccordionItem key={`day-${item.day}`} value={`day-${item.day}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <Badge className="bg-coral-500 text-white">Day {item.day}</Badge>
                          <span className="font-semibold">{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          {item.description && <p className="text-muted-foreground">{item.description}</p>}

                          {item.activities && (
                            <div className="space-y-2">
                              {item.activities.map((activity, idx) => (
                                <div key={idx} className="flex gap-3">
                                  <div className="h-5 w-5 rounded-full bg-coral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-coral-500" />
                                  </div>
                                  <p className="text-sm text-muted-foreground">{activity}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {item.meals && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {item.meals.map((meal) => (
                                <Badge key={meal} variant="secondary">
                                  {meal}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {item.images && (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                              {item.images.map((img, idx) => (
                                <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                                  <Image
                                    src={img || "/placeholder.svg"}
                                    alt={`Day ${item.day} image ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {item.notes && (
                            <div className="flex gap-2 p-3 bg-blue-50 rounded-lg text-sm">
                              <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              <p className="text-blue-900">{item.notes}</p>
                            </div>
                          )}

                          {item.tip && (
                            <div className="flex gap-2 p-3 bg-amber-50 rounded-lg text-sm">
                              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <p className="text-amber-900">
                                <strong>Tip:</strong> {item.tip}
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="stay" className="text-muted-foreground">
                Stay information will be displayed here.
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 p-6 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">${tour.price}</span>
                <span className="text-muted-foreground">/ Person</span>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">Approve Tour</Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary">Request Edits</Button>
                  <Button variant="secondary">Reject Tour</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What's included in the package?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tour.features.map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-coral-100 flex items-center justify-center flex-shrink-0">
                  <div className="h-5 w-5 text-coral-600">
                    {feature.icon === "calendar" && <Clock />}
                    {feature.icon === "users" && <Users />}
                    {feature.icon === "clock" && <Clock />}
                    {feature.icon === "accessibility" && <Accessibility />}
                    {feature.icon === "alert" && <AlertCircle />}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Dates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Dates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tour.availableDates.map((dateOption, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg text-coral-600 mb-2">{dateOption.date}</h3>
                <p className="text-sm text-muted-foreground mb-3">{dateOption.time}</p>
                <p className="text-xs text-muted-foreground mb-4">{dateOption.note}</p>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">From ${dateOption.discountPrice}</span>
                    <span className="text-sm line-through text-muted-foreground">${dateOption.originalPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Inclusions</h3>
            <ul className="space-y-3">
              {tour.inclusions.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-coral-600">Exclusions</h3>
            <ul className="space-y-3">
              {tour.exclusions.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-red-600" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Verified Reviews ({tour.reviews.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tour.reviews.map((review, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{review.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
