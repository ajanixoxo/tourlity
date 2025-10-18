"use client"

import { useState } from "react"
import Button from "@/components/root/button"
import { Badge } from "@/components/ui/badge"
import {  Eye, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserVerificationModal } from "./user-verification-modal"
import { RequestEditsModal } from "./request-edits-modal"
import { RejectUserModal } from "./reject-user-modal"
import {
  //  UserRole,
    type User } from "@/types/admin"

interface UserVerificationTableProps {
  users: User[]
  onApprove: (userId: string) => void
  onReject: (userId: string, reason?: string) => void
  onRequestEdits: (userId: string, reason: string) => void
}

export function UserVerificationTable({ users, onApprove, onReject, onRequestEdits }: UserVerificationTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showRequestEdits, setShowRequestEdits] = useState<User | null>(null)
  const [showRejectModal, setShowRejectModal] = useState<User | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="!bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="!bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "rejected":
        return <Badge className="!bg-orange-100 text-orange-800 hover:bg-orange-100">Needs Edits</Badge>
      default:
        return <Badge className="!bg-orange-100 text-orange-800 hover:bg-orange-100" >{status}</Badge>
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-900">Name</th>
                <th className="text-left p-4 font-medium text-gray-900">Role</th>
                <th className="text-left p-4 font-medium text-gray-900">Joined Date</th>
                <th className="text-left p-4 font-medium text-gray-900">ID Type</th>
                <th className="text-left p-4 font-medium text-gray-900">Submitted Docs</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{user.firstName}</div>
                  </td>
                  <td className="p-4 text-gray-600">{user.role}</td>
                  <td className="p-4 text-gray-600">{user.createdAt.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">{user.idType}</td>
                  <td className="p-4">
                    <Button
                      variant="secondary"
                      className="!text-primary-color  hover:text-hover-color  border-none flex items-center"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="w-4 h-4 mr-1 !text-primary-color" />
                      View Files
                    </Button>
                  </td>
                  <td className="p-4">{getStatusBadge(user.status)}</td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="border-none" >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onApprove(user.id)}>Approve</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowRequestEdits(user)}>Request Edits</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowRejectModal(user)}>Reject</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <UserVerificationModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onApprove={() => {
            onApprove(selectedUser.id)
            setSelectedUser(null)
          }}
          onReject={(reason:string) => {
            onReject(selectedUser.id, reason)
            setSelectedUser(null)
          }}
          onRequestEdits={(reason) => {
            onRequestEdits(selectedUser.id, reason)
            setSelectedUser(null)
          }}
        />
      )}

      {showRequestEdits && (
        <RequestEditsModal
          onClose={() => setShowRequestEdits(null)}
          onSubmit={(reason) => {
            onRequestEdits(showRequestEdits.id, reason)
            setShowRequestEdits(null)
          }}
        />
      )}

      {showRejectModal && (
        <RejectUserModal
          onClose={() => setShowRejectModal(null)}
          onSubmit={(reason?:string) => {
            onReject(showRejectModal.id, reason)
            setShowRejectModal(null)
          }}
        />
      )}
    </>
  )
}