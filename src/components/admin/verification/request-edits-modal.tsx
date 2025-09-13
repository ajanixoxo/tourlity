"use client"

import { useState } from "react"
import Button from "@/components/root/button"
import { Textarea } from "@/components/ui/textarea"

interface RequestEditsModalProps {
  onClose: () => void
  onSubmit: (reason: string) => void
}

export function RequestEditsModal({ onClose, onSubmit }: RequestEditsModalProps) {
  const [reason, setReason] = useState("")

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Request Edits</h2>
        <p className="text-gray-600 mb-6">Please fill in the reason you requested for edit</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
            <Textarea
              placeholder="Enter Reason"
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
            className="bg-coral-500 hover:bg-coral-600 text-white"
            onClick={handleSubmit}
            disabled={!reason.trim()}
          >
            Request Edit
          </Button>
        </div>
      </div>
    </div>
  )
}