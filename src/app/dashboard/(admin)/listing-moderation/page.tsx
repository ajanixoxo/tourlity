/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {TourModerationTable} from "@/components/admin/moderation/tour-moderation-table"
import { EmptyState } from "@/components/admin/empty-state"
import { useDashboardStore } from "@/lib/stores/dashboard-store"
import SuccessModal from "@/components/modals/success-modal"
import { set } from "zod"

export default function TourListingModeration() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [localSearchQuery, setLocalSearchQuery] = useState("") // For immediate UI updates
  const [isApproved, setIsApproved] = useState(true) // null = all, true = approved, false = rejected

  const {
    tours,
    toursLoading,
    toursError,
    toursPagination,
    fetchTours,
    approveTour,
    rejectTour,
    requestTourEdits,
    clearToursError
  } = useDashboardStore()

  // Fetch tours when component mounts or when search/page changes
  useEffect(() => {
    const params = {
      search: searchQuery || undefined,
      page: currentPage,
      limit: 6 // 6 tours per page
    }

    fetchTours(params)
  }, [searchQuery, currentPage])

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearToursError()
  }, [])

  const handleApprove = async (tourId: string) => {
    try {
      await approveTour(tourId)
      setIsApproved(true)
      // Refresh the current page after action
      fetchTours({ search: searchQuery || undefined, page: currentPage, limit: 6 })
    } catch (error) {
      console.error("Failed to approve tour:", error)
    }
  }

  const handleReject = async (tourId: string, reason?: string) => {
    try {
      await rejectTour(tourId, reason)
      // Refresh the current page after action
      fetchTours({ search: searchQuery || undefined, page: currentPage, limit: 6 })
    } catch (error) {
      console.error("Failed to reject tour:", error)
    }
  }

  const handleRequestEdits = async (tourId: string, reason: string) => {
    try {
      await requestTourEdits(tourId, reason)
      // Refresh the current page after action
      fetchTours({ search: searchQuery || undefined, page: currentPage, limit: 6 })
    } catch (error) {
      console.error("Failed to request edits:", error)
    }
  }

  const handleSearch = () => {
    // This will trigger the useEffect to fetch from API
    setSearchQuery(localSearchQuery)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Calculate pagination details from backend response
  const totalPages = toursPagination?.totalPages || 1
  const totalTours = toursPagination?.total || 0
  const startIndex = ((currentPage - 1) * 6) + 1
  const endIndex = Math.min(currentPage * 6, totalTours)

  console.log("tours from moderation", tours)
  
  if (toursError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tour Listing Moderation</h1>
          <p className="text-gray-600 mt-1">Approve or reject submitted tour listings</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error: {toursError}</p>
          <Button
            onClick={() => fetchTours({ page: 1, limit: 6 }, true)}
            className="mt-2"
            variant="primary"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Tour Listing Moderation</h1>
        <p className="text-gray-600 mt-1">Approve or reject submitted tour listings</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="secondary" className="flex justify-center items-center !bg-white">
          Filters
          <Filter className="w-4 h-4 ml-2" />
        </Button>

        <div className="flex items-center space-x-3 flex-1 justify-end">
          <div className="relative bg-white flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for tours, hosts or location..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 w-full"
              disabled={toursLoading}
            />
          </div>
          <Button
            variant="secondary"
            className="flex justify-center items-center"
            onClick={handleSearch}
            disabled={toursLoading}
          >
            {toursLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {toursLoading && (
        <div className="flex justify-center py-8">
          <div className="text-gray-600">Loading tours...</div>
        </div>
      )}

<SuccessModal isOpen={isApproved} onClose={() => setIsApproved(false)} title={"Tour Succesfully Approved"} image={"/images/success-icon.png"} buttonText={"Procced"} onButtonClick={() => {setIsApproved(false)}}/>
      {/* Content */}
      {!toursLoading && (
        <>
          {tours && tours.length > 0 ? (
            <TourModerationTable
              tours={tours}
              onApprove={handleApprove}
              onReject={handleReject}
              onRequestEdits={handleRequestEdits}
            />
          ) : (
            <EmptyState
              title="No tours found"
              description="No tour listings found matching your criteria."
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIndex} to {endIndex} of {totalTours} tours
              </p>
              <div className="flex border-2 items-center space-x-0">
                <Button
                  variant="secondary"
                  className="!rounded-[0px] !text-black border-r-0"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      className={
                        currentPage === pageNum
                          ? "bg-coral-500 text-white !rounded-[0px] border-r-0"
                          : "!rounded-[0px] border-r-0 border-y-0 !text-black"
                      }
                      variant={currentPage === pageNum ? "primary" : "secondary"}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                <Button
                  variant="secondary"
                  className="!rounded-[0px] border-y-0 !text-black"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &gt;
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}