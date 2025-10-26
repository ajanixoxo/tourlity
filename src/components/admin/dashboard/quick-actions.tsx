import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Users, MessageSquare, ArrowRight } from "lucide-react"

const iconMap = {
  plane: Plane,
  users: Users,
  message: MessageSquare
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  status?: "warning" | "info"
}

interface QuickActionsProps {
  actions: QuickAction[]
  hasData: boolean
  title?: string
}

export function QuickActions({ actions, hasData, title = "Quick Actions" }: QuickActionsProps) {
  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gray-400 rounded-full opacity-50"></div>
          </div>
          <p className="text-gray-500 text-center">You have no quick actions yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap] || Plane

          return (
            <div key={action.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                  {action.status === "warning" && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                  {action.status === "info" && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 mt-1" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}