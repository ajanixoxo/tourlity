import { Card } from "@/components/ui/card"
import { Plane, UserCheck, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { EmptyState } from "@/components/admin/empty-state"

const quickActions = [
  {
    title: "Tour",
    description: "Review Tour Listings",
    icon: Plane,
    href: "/admin/listings",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "Host",
    description: "Verify New Hosts",
    icon: UserCheck,
    href: "/admin/verification",
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
  },
  {
    title: "Supports",
    description: "Respond to Support Tickets",
    icon: MessageSquare,
    href: "/admin/support",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
]

export function QuickActions() {
  const hasActions = quickActions.length > 0

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>

      {hasActions ? (
        <div className="space-y-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${action.iconBg}`}>
                    <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{action.title}</p>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You have no quick action yet."
          description="Quick actions will appear here to help you manage the platform efficiently."
        />
      )}
    </Card>
  )
}
