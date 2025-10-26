import { Card } from "@/components/ui/card"
import { Plane, Users, DollarSign, Calendar } from "lucide-react"

const iconMap = {
  plane: Plane,
  users: Users,
  dollar: DollarSign,
  calendar: Calendar
}

interface MetricsCardsProps {
  metrics: Array<{
    title: string
    value: string | number
    change: string
    changeType: "positive" | "negative"
    icon: string
  }>
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const borderColors = [
    "border-l-blue-500",
    "border-l-orange-500",
    "border-l-green-500",
    "border-l-purple-500"
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap] || Users
        return (
          <Card key={metric.title} className={`p-6 border-l-4 ${borderColors[index]}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <p className={`text-sm mt-1 flex items-center gap-1 ${
                  metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.changeType === "positive" ? "↗" : "↘"}
                  {metric.change}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Icon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}