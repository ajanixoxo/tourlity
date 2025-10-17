/* eslint-disable react/no-unescaped-entities */
"use client"

import Button from "@/components/root/button"
import { MapPin, Calendar, Eye } from "lucide-react"
import { savedTours } from "@/data/tour-management-data"
import Image from "next/image"
import Link from "next/link"

export default function SavedToursPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">Saved Tours</h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Revisit the tours you loved. Book now before they fill up or compare dates that work for you.
          </p>
        </div>

        {/* Tours List */}
        <div className="space-y-4">
          {savedTours.map((tour) => (
            <div
              key={tour.id}
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md md:flex-row md:items-center"
            >
              {/* Tour Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-32 md:w-48 md:flex-shrink-0">
                <Image
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>

              {/* Tour Details */}
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-lg font-semibold text-foreground">{tour.title}</h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{tour.location}</span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{tour.dateTime}</span>
                </div>

                {/* Host and Translator */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={tour.host.avatar || "/placeholder.svg"}
                        alt={tour.host.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Host</p>
                      <p className="font-medium text-foreground">{tour.host.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={tour.translator.avatar || "/placeholder.svg"}
                        alt={tour.translator.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Translator</p>
                      <p className="font-medium text-foreground">{tour.translator.name}</p>
                    </div>
                  </div>
                  <div>
                  <Link
                  href={`/tours/${tour.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-color hover:underline"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Link>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 md:flex-shrink-0 md:items-end">
               
                <div className="flex gap-2">
                  <Button variant="secondary" >
                    Remove
                  </Button>
                  <Button >Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {savedTours.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">No saved tours yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Start exploring and save tours you're interested in</p>
              <Link href="/explore">
                <Button className="mt-4">Explore Tours</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
