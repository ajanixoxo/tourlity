"use client"

import { useState, useMemo } from "react"
import ToursFilters from "./tours-filters"
import ToursGrid  from "./tours-grid"
import { tours } from "@/data/tours"
import type { SearchFilters } from "@/types"

export default function ToursFiltersAndGrid() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    priceRange: [0, 200],
    categories: [],
    duration: "",
    groupSize: "",
    language: "",
  })

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Search query filter
      if (
        filters.query &&
        !tour.title.toLowerCase().includes(filters.query.toLowerCase()) &&
        !tour.description.toLowerCase().includes(filters.query.toLowerCase()) &&
        !tour.location.toLowerCase().includes(filters.query.toLowerCase())
      ) {
        return false
      }

      // Price range filter
      if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) {
        return false
      }

      // Categories filter
      if (filters.categories.length > 0 && !filters.categories.some((cat) => tour.categories.includes(cat))) {
        return false
      }

      // Duration filter
      if (filters.duration && !tour.duration.toLowerCase().includes(filters.duration.toLowerCase())) {
        return false
      }

      // Group size filter
      if (filters.groupSize && !tour.groupSize.toLowerCase().includes(filters.groupSize.toLowerCase())) {
        return false
      }

      // Language filter
      if (
        filters.language &&
        !tour.language.some((lang) => lang.toLowerCase().includes(filters.language.toLowerCase()))
      ) {
        return false
      }

      return true
    })
  }, [filters])

  return (
    <section className="py-8  min-h-screen">
      <div className="mx-auto lg:px-4 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <ToursFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Tours Grid */}
          <div className="flex-1">
            <ToursGrid tours={filteredTours} />
          </div>
        </div>
      </div>
    </section>
  )
}
