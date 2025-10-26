"use client"

import { useState, useEffect } from "react"
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

// Define the details type (merged from backend shape and UI needs)
interface ITourDetail {
  id: string
  title: string
  price: number
  location: string
  images: string[]
  description: string
  categories: string[]
  highlights?: string
  features?: { icon: string; title: string; description: string }[]
  availableDates?: Array<{ date: string; time: string; note: string; price: number; originalPrice: number; discountPrice: number }>
  itinerary?: any[]
  inclusions?: string[]
  exclusions?: string[]
  reviews?: Array<{ author: string; location: string; rating: number; text: string; avatar?: string }>
}

import { ReactElement } from 'react'

export function TourDetailPage({ tourId }: TourDetailPageProps): ReactElement {
  const [expandedDay, setExpandedDay] = useState<string>("day-1")
  const [tour, setTour] = useState<ITourDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTour() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/tours/${tourId}`)
        if (!res.ok) throw new Error("Failed to fetch tour data")
        const data = await res.json()

        // Transform and map backend API to frontend needed structure
        const mappedTour: ITourDetail = {
          id: data.id,
          title: data.title,
          price: data.price,
          location: data.location,
          images: data.images && data.images.length > 0 ? data.images : ["/placeholder.svg"],
          description: data.description,
          categories: data.categories || [],
          highlights: data.description, // using desc as highlight for demo
            features: [ // Demo (map real amenity/fields later)
            { icon: "calendar", title: "Reserve Now and Pay Later", description: "Keep your travel plans flexible - book now, pay later" },
            { icon: "users", title: "Group Tour", description: "Join a group and forge lifelong friendship" },
            { icon: "clock", title: `Duration ${data.duration ?? "N/A"}`, description: "Check availability to see starting time" },
          ],
          availableDates: [], // Placeholder; ideally, comes from backend (add real logic as API supports)
          itinerary: data.itinerary || [],
          inclusions: data.amenities || [],
          exclusions: [], // placeholder
          reviews: (data.reviews || []).map((review: any) => ({
            author: `${review.reviewer?.firstName ?? ""} ${review.reviewer?.lastName ?? ""}`.trim(),
            location: review.reviewer?.location ?? "",
            rating: review.rating,
            text: review.comment,
            avatar: review.reviewer?.avatar,
          })),
        }
        setTour(mappedTour)
      } catch (e: any) {
        setError(e.message ?? 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchTour()
  }, [tourId])

  if (loading) return <div className="p-8">Loading tour details...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>
  if (!tour) return <div className="p-8">No details found.</div>

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
        <Image src={tour.images[0] || "/placeholder.svg"} alt={tour.title} fill className="object-cover" priority />
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
                  {tour.itinerary?.map((item, idx) => (
                    <AccordionItem key={`day-${idx}`} value={`day-${idx}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <Badge className="bg-coral-500 text-white">Day {idx + 1}</Badge>
                          <span className="font-semibold">{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          {item.description && <p className="text-muted-foreground">{item.description}</p>}

                          {item.activities && (
                            <div className="space-y-2">
                              {item.activities.map((activity: string, idx: number) => (
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
                              {item.meals.map((meal: string) => (
                                <Badge key={meal} variant="secondary">
                                  {meal}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {item.images && (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                              {item.images.map((img: string, idx: number) => (
                                <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                                  <Image
                                    src={img || "/placeholder.svg"}
                                    alt={`Day ${idx + 1} image`}
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

              {/* <div className="space-y-3">
                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">Approve Tour</Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary">Request Edits</Button>
                  <Button variant="secondary">Reject Tour</Button>
                </div>
              </div> */}
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What's included in the package?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tour.features?.map((feature, idx) => (
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
            {tour.availableDates?.map((dateOption, idx) => (
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
              {tour.inclusions?.map((item, idx) => (
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
              {tour.exclusions?.map((item, idx) => (
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
          <h2 className="text-2xl font-bold mb-6">Verified Reviews ({tour.reviews?.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tour.reviews?.map((review, idx) => (
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
