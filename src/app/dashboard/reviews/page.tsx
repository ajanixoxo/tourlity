/* eslint-disable react/no-unescaped-entities */
"use client"

import { Star } from "lucide-react"
import { reviews } from "@/data/tour-management-data"
import Image from "next/image"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
          <p className="mt-1 text-sm text-muted-foreground">See what guests are saying and respond</p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="mx-auto max-w-7xl bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-4 rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Host Info */}
              <div className="flex items-start gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={review.hostAvatar || "/placeholder.svg"}
                    alt={review.hostName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{review.hostName}</h3>
                  <p className="text-xs text-muted-foreground truncate">{review.hostRole}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm text-foreground leading-relaxed line-clamp-4">"{review.reviewText}"</p>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(review.rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-foreground">{review.rating}</span>
                <span className="text-xs text-muted-foreground">({review.reviewCount} Reviews)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
