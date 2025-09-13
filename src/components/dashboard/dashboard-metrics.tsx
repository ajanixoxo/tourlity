import { Card } from "@/components/ui/card"
import { Plane, DollarSign, Star, Eye, Calendar, Languages, FileText, CheckSquare, MessageSquare } from "lucide-react"
import type { DashboardMetric } from "@/data/dashboard"

const iconMap = {
  plane: Plane,
  dollar: DollarSign,
  star: Star,
  eye: Eye,
  calendar: Calendar,
  languages: Languages,
  file: FileText,
  checklist: CheckSquare,
  message: MessageSquare,
}

interface DashboardMetricsProps {
  metrics: DashboardMetric[]
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap] || Plane
        const borderColors = ["border-l-blue-500", "border-l-orange-500", "border-l-green-500", "border-l-purple-500"]

        return (
          <Card key={index} className={`p-6 border-l-4 ${borderColors[index % 4]}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
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
