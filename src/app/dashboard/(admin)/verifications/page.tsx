/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useMemo } from "react"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { UserVerificationTable } from "@/components/admin/verification/user-verification-table"
import { EmptyState } from "@/components/admin/empty-state"
import { useDashboardStore } from "@/lib/stores/dashboard-store"

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState<"all" | "hosts" | "facilitators" | "translators">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [localSearchQuery, setLocalSearchQuery] = useState("") // For immediate UI updates

  const {
    users,
    usersLoading,
    usersError,
    pagination,
    fetchUsers,
    updateUserStatus,
    updateUserStatusWithReason,
    requestUserEdits,
    clearUsersError
  } = useDashboardStore()

  // Fetch all users only once when component mounts or when search changes
  useEffect(() => {
    const params = {
      role: "all", // Always fetch all users
      search: searchQuery || undefined,
      page: 1, // Always start from page 1 for new searches
      limit: 1000 // Fetch more users to handle client-side filtering
    }

    fetchUsers(params)
    setCurrentPage(1) // Reset pagination when fetching new data
  }, [searchQuery]) // Only depend on searchQuery, not activeTab

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearUsersError()
  }, [])

  // Filter users based on active tab and search query
  const filteredUsers = useMemo(() => {
    let filtered = users

    // Filter by role (tab)
    if (activeTab !== "all") {
      const roleToFilter = activeTab.slice(0, -1).toLowerCase() // Remove 's' and lowercase
      filtered = filtered.filter(user => 
        user.role.toLowerCase() === roleToFilter
      )
    }

    // Filter by local search (real-time search in UI)
    if (localSearchQuery.trim()) {
      const searchTerm = localSearchQuery.toLowerCase()
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName?.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      )
    }

    return filtered
  }, [users, activeTab, localSearchQuery])

  // Pagination logic for filtered users
  const itemsPerPage = 10
  const totalFilteredPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  const handleApprove = async (userId: string) => {
    try {
      await updateUserStatus(userId, "ACTIVE")
    } catch (error) {
      console.error("Failed to approve user:", error)
    }
  }

  const handleReject = async (userId: string, reason?: string) => {
  try {
    await updateUserStatusWithReason(userId, "REJECTED", reason)
  } catch (error) {
    console.error("Failed to reject user:", error)
  }
}

const handleRequestEdits = async (userId: string, reason: string) => {
  try {
    await requestUserEdits(userId, reason)
  } catch (error) {
    console.error("Failed to request edits:", error)
  }
}

  const handleSearch = () => {
    // This will trigger the useEffect to fetch from API
    setSearchQuery(localSearchQuery)
    setCurrentPage(1)
  }

  const handleTabChange = (tabId: "all" | "hosts" | "facilitators" | "translators") => {
    setActiveTab(tabId)
    setCurrentPage(1) // Reset to first page when changing tabs
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const tabs = [
    { id: "all", label: "All" },
    { id: "hosts", label: "Hosts" },
    { id: "facilitators", label: "Facilitators" },
    { id: "translators", label: "Translators" },
  ]

  console.log("users from verification", users)
  console.log("filtered users", filteredUsers)
  
  if (usersError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Verification & Approval</h1>
          <p className="text-gray-600 mt-1">Review and approve new Hosts, Facilitators, and Translators.</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">Error: {usersError}</p>
          <Button
            onClick={() => fetchUsers({ role: "all", limit: 1000 }, true)}
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
        <h1 className="text-2xl font-semibold text-gray-900">User Verification & Approval</h1>
        <p className="text-gray-600 mt-1">Review and approve new Hosts, Facilitators, and Translators.</p>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "primary" : "secondary"}
              className={`text-sm ${activeTab === tab.id ? "" : "!text-black"}`}
              onClick={() => handleTabChange(tab.id as "all" | "hosts" | "facilitators" | "translators")}
              disabled={usersLoading}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="flex justify-center items-center !bg-white">
            Filters
            <Filter className="w-4 h-4 mr-2" />
          </Button>
          <div className="relative bg-white">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Find by name, email, or region"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 w-64"
              disabled={usersLoading}
            />
          </div>
          <Button
            variant="secondary"
            className="hidden lg:flex justify-center items-center"
            onClick={handleSearch}
            disabled={usersLoading}
          >
            {usersLoading ? "Searching..." : "Search User"}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {usersLoading && (
        <div className="flex justify-center py-8">
          <div className="text-gray-600">Loading users...</div>
        </div>
      )}

      {/* Content */}
      {!usersLoading && (
        <>
          {paginatedUsers.length > 0 ? (
            <UserVerificationTable
              users={paginatedUsers}
              onApprove={handleApprove}
              onReject={handleReject}
              onRequestEdits={handleRequestEdits}
            />
          ) : (
            <EmptyState
              title="No users found"
              description={`No ${activeTab === "all" ? "users" : activeTab} found matching your criteria.`}
            />
          )}

          {/* Pagination */}
          {totalFilteredPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
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
                {Array.from({ length: Math.min(5, totalFilteredPages) }, (_, i) => {
                  const pageNum = i + 1
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
                  disabled={currentPage >= totalFilteredPages}
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