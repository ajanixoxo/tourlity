"use client"

import { useState } from "react"
import TourCard from "@/components/cards/tour-card"
import Button from "../root/button"
import type { Tour } from "@/types"

interface ToursGridProps {
  tours: Tour[]
}

export default function ToursGrid({ tours }: ToursGridProps) {
  const [visibleTours, setVisibleTours] = useState(6)

  const loadMoreTours = () => {
    setVisibleTours((prev) => Math.min(prev + 6, tours.length))
  }

  const displayedTours = tours.slice(0, visibleTours)
  const hasMoreTours = visibleTours < tours.length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Available Tours</h2>
        {/* <p className="text-gray-600">
          Showing {displayedTours.length} of {tours.length} tours
        </p> */}
        <div className=" lg:hidden flex justify-center !border-2 gap-2 rounded-[14px] p-2 items-center stroke-color ">
          <span className="muted-color font-normal">Filters</span>
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_11_5696)">
              <path d="M1.45898 7.00016C1.45898 4.3878 1.45898 3.08161 2.27054 2.27005C3.0821 1.4585 4.38828 1.4585 7.00065 1.4585C9.61302 1.4585 10.9192 1.4585 11.7308 2.27005C12.5423 3.08161 12.5423 4.3878 12.5423 7.00016C12.5423 9.61253 12.5423 10.9187 11.7308 11.7303C10.9192 12.5418 9.61302 12.5418 7.00065 12.5418C4.38828 12.5418 3.0821 12.5418 2.27054 11.7303C1.45898 10.9187 1.45898 9.61253 1.45898 7.00016Z" stroke="#9A9A9A" strokeLinejoin="round" />
              <path d="M4.95898 5.8335C4.47574 5.8335 4.08398 5.44175 4.08398 4.9585C4.08398 4.47525 4.47574 4.0835 4.95898 4.0835C5.44223 4.0835 5.83398 4.47525 5.83398 4.9585C5.83398 5.44175 5.44223 5.8335 4.95898 5.8335Z" stroke="#9A9A9A" />
              <path d="M9.04199 9.9165C9.52524 9.9165 9.91699 9.52475 9.91699 9.0415C9.91699 8.55825 9.52524 8.1665 9.04199 8.1665C8.55874 8.1665 8.16699 8.55825 8.16699 9.0415C8.16699 9.52475 8.55874 9.9165 9.04199 9.9165Z" stroke="#9A9A9A" />
              <path d="M5.83366 4.9585L9.91699 4.9585" stroke="#9A9A9A" strokeLinecap="round" />
              <path d="M8.16732 9.0415L4.08398 9.0415" stroke="#9A9A9A" strokeLinecap="round" />
            </g>
            <defs>
              <clipPath id="clip0_11_5696">
                <rect width={14} height={14} fill="white" />
              </clipPath>
            </defs>
          </svg>


        </div>
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tours found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {displayedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {hasMoreTours && (
            <div className="text-center">
              <Button onClick={loadMoreTours} className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3">
                Load More Tours
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
