"use client"

import { Search, Users, Package } from "lucide-react"
import Button from "@/components/root/button"

interface EmptyStateProps {
  title: string
  description: string
  icon?: "search" | "users" | "package"
  action?: {
    label: string
    onClick: () => void
  }
  hasButton?: boolean
}

export function EmptyState({ 
  title, 
  description, 
  icon = "search",
  action 
}: EmptyStateProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="w-12 h-12 text-gray-400" />
      case "package":
        return <Package className="w-12 h-12 text-gray-400" />
      default:
        return <Search className="w-12 h-12 text-gray-400" />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4">
        {getIcon()}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}