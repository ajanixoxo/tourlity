import { Card } from "@/components/ui/card"
import type { EarningsMetric } from "@/types/earnings"
import MoneyBag from "./icons/MoneyBag"
import MoneyRing from "./icons/MoneyRing"
import Plane from "./icons/Plane"
const iconMap = {
  dollar: MoneyBag,
  calendar: MoneyRing,
  plane: Plane,
}

interface EarningsMetricsProps {
  metrics: EarningsMetric[]
}

export function EarningsMetrics({ metrics }: EarningsMetricsProps) {
  const borderColors = ["border-l-green-500", "border-l-orange-500", "border-l-blue-500"]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap] || MoneyBag

        return (
          <Card key={index} className={`p-6 border-l-4 ${borderColors[index % 3]}`}>
            <div className="flex  flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <div className="p-3 rounded-lg">
                  <Icon />
                </div>
              </div>
              <div className="flex items-center justify-between">

                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                {metric.subtitle && <p className="text-sm text-gray-500 mt-1">{metric.subtitle}</p>}
                {metric.change && (
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-sm font-medium ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                )}
              </div>

            </div>
          </Card>
        )
      })}
    </div>
  )
}
