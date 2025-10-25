"use client"

import { useState, useEffect } from "react"
import ToursFilters from "./tours-filters"
import ToursGrid from "./tours-grid"
import { useExploreTourStore } from "@/lib/stores/explore-tours-store"
import type { SearchFilters } from "@/types"
import type { Tour } from "@/types/tour"

export default function ToursFiltersAndGrid() {
  const { tours, isLoading, setFilters: setExploreFilters, fetchInitialTours } = useExploreTourStore()

  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    priceRange: [0, 900],
    categories: [],
    duration: "",
    groupSize: "",
    language: "",
  })

  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  // Fetch initial tours without any filters
  useEffect(() => {
    fetchInitialTours()
  }, [fetchInitialTours])

  // Only apply filters after user interaction
  useEffect(() => {
    if (!hasUserInteracted) return

    setExploreFilters({
      query: filters.query,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      categories: filters.categories,
      duration: filters.duration,
      groupSize: filters.groupSize,
      language: filters.language,
    })
  }, [filters, setExploreFilters, hasUserInteracted])

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setHasUserInteracted(true)
    setFilters(newFilters)
  }

  return (
    <section className="py-8 min-h-screen">
      <div className="mx-auto lg:px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block lg:w-80 shrink-0">
            <ToursFilters filters={filters} onFiltersChange={handleFiltersChange} />
          </div>

          {/* Tours Grid */}
          <div className="flex-1">
            <ToursGrid tours={tours} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </section>
  )
}
