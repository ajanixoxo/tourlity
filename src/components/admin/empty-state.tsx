import type React from "react"
import Button from "@/components/root/button"
interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  hasButton?: boolean
}

export function EmptyState({ title, description, icon, hasButton = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {icon || (
        <div className="w-24 h-24 mb-4 opacity-50">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="ghost-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
            </defs>
            <path
              d="M100 40c-30 0-50 20-50 50v60c0 10 5 15 10 15s10-5 10-15v-10c5 5 15 5 20 0s15 0 20 0s15-5 20 0v10c0 10 5 15 10 15s10-5 10-15v-60c0-30-20-50-50-50z"
              fill="url(#ghost-gradient)"
            />
            <circle cx="85" cy="75" r="3" fill="white" />
            <circle cx="115" cy="75" r="3" fill="white" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 text-center max-w-sm">{description}</p>}
      {hasButton && (
        <Button variant="primary">Refresh</Button>
      )}
    </div>
  )
}
