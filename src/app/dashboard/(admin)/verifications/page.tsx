/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import Button from "@/components/root/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { UserVerificationTable } from "@/components/admin/verification/user-verification-table"
import { EmptyState } from "@/components/admin/empty-state"
import { useDashboardStore } from "@/lib/stores/dashboard-store"

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState<"hosts" | "facilitators" | "translators">("hosts")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const {
    users,
    usersLoading,
    usersError,
    pagination,
    fetchUsers,
    updateUserStatus,
    clearUsersError
  } = useDashboardStore()

  // Fetch users when component mounts or filters change
  useEffect(() => {
    const params = {
      role: activeTab.slice(0, -1), // Remove 's' from plural
      search: searchQuery || undefined,
      page: currentPage,
      limit: 10
    }

    fetchUsers(params)
  }, [activeTab, searchQuery, currentPage])

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearUsersError()
  }, [])

  const handleApprove = async (userId: string) => {
    try {
      await updateUserStatus(userId, "ACTIVE")
    } catch (error) {
      console.error("Failed to approve user:", error)
    }
  }

  const handleReject = async (userId: string) => {
    try {
      await updateUserStatus(userId, "REJECTED")
    } catch (error) {
      console.error("Failed to reject user:", error)
    }
  }

  const handleRequestEdits = async (userId: string, reason: string) => {
    try {
      await updateUserStatus(userId, "PENDING")
      // You might want to send the reason to the API as well
    } catch (error) {
      console.error("Failed to request edits:", error)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1) // Reset to first page when searching
    const params = {
      role: activeTab.slice(0, -1),
      search: searchQuery || undefined,
      page: 1,
      limit: 10
    }
    fetchUsers(params, true) // Force refresh
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const tabs = [
    { id: "hosts", label: "Hosts" },
    { id: "facilitators", label: "Facilitators" },
    { id: "translators", label: "Translators" },
  ]

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
            onClick={() => fetchUsers({}, true)}
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
              onClick={() => {
                setActiveTab(tab.id as "hosts" | "facilitators" | "translators")
                setCurrentPage(1)
              }}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 w-64"
              disabled={usersLoading}
            />
          </div>
          <Button
            variant="secondary"
            className="flex justify-center items-center"
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
          {users.length > 0 ? (
            <UserVerificationTable
              users={users}
              onApprove={handleApprove}
              onReject={handleReject}
              onRequestEdits={handleRequestEdits}
            />
          ) : (
            <EmptyState
              title="No users found"
              description={`No ${activeTab} found matching your criteria.`}
            />
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                {pagination.total} users
              </p>
              <div className="flex border-2 items-center space-x-0">
                <Button
                  variant="secondary"
                  className="!rounded-[0px] !text-black border-r-0"
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                >
                  &lt;
                </Button>
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      className={
                        pagination.page === pageNum
                          ? "bg-coral-500 text-white !rounded-[0px] border-r-0"
                          : "!rounded-[0px] border-r-0 border-y-0 !text-black"
                      }
                      variant={pagination.page === pageNum ? "primary" : "secondary"}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                <Button
                  variant="secondary"
                  className="!rounded-[0px] border-y-0 !text-black"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
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