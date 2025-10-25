"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Button from "@/components/root/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Tour {
  id: string
  title: string
  host: {
    firstName: string
    lastName: string
  }
}

interface RequestEditsModalProps {
  tour: Tour
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
}

export function RequestEditsModal({
  tour,
  isOpen,
  onClose,
  onConfirm
}: RequestEditsModalProps) {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!reason.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onConfirm(reason.trim())
      setReason("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setReason("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-blue-600">
              Request Tour Edits
            </DialogTitle>
            <Button variant="secondary"  onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Tour:</strong> {tour.title}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Host:</strong> {tour.host.firstName} {tour.host.lastName}
            </p>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Edit requests *
            </label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please specify what changes are needed. Be specific about what needs to be improved or corrected."
              rows={4}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              This feedback will be sent to the host via email notification.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              <strong>Note:</strong> The tour will be moved back to draft status so the host can make the requested changes.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!reason.trim() || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Sending..." : "Send Edit Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
