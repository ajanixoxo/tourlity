"use client"

import { useState } from "react"
import Button from "@/components/root/button"
import { Textarea } from "@/components/ui/textarea"

interface RejectUserModalProps {
  onClose: () => void
  onSubmit: (reason?: string) => void
}

export function RejectUserModal({ onClose, onSubmit }: RejectUserModalProps) {
  const [reason, setReason] = useState("")

  const handleSubmit = () => {
    onSubmit(reason.trim() || undefined)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Reject User</h2>
        <p className="text-gray-600 mb-6">
          You can optionally provide a reason for rejection. This will be sent to the user via email.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason (Optional)
            </label>
            <Textarea
              placeholder="Enter rejection reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleSubmit}
          >
            Reject User
          </Button>
        </div>
      </div>
    </div>
  )
}