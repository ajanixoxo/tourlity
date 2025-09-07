import { Card } from "@/components/ui/card"
import { Plane, Users, UserCheck, DollarSign } from "lucide-react"
import { adminAnalytics } from "@/data/admin-data"

const metrics = [
  {
    title: "Ongoing Tours",
    value: adminAnalytics.ongoingTours.count,
    change: adminAnalytics.ongoingTours.change,
    icon: Plane,
    color: "border-l-blue-500",
    iconColor: "text-blue-500",
  },
  {
    title: "Active Users",
    value: adminAnalytics.activeUsers.count,
    change: adminAnalytics.activeUsers.change,
    icon: Users,
    color: "border-l-orange-500",
    iconColor: "text-orange-500",
  },
  {
    title: "Hosts Verified",
    value: adminAnalytics.hostsVerified.count,
    change: adminAnalytics.hostsVerified.change,
    icon: UserCheck,
    color: "border-l-green-500",
    iconColor: "text-green-500",
  },
  {
    title: "Total Payouts",
    value: `$${adminAnalytics.totalPayouts.amount}`,
    change: adminAnalytics.totalPayouts.period,
    icon: DollarSign,
    color: "border-l-purple-500",
    iconColor: "text-purple-500",
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className={`p-6 border-l-4 ${metric.color}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                {metric.title === "Total Payouts" ? (
                  <span className="text-gray-500">{metric.change}</span>
                ) : (
                  <>
                    <span>↗</span>
                    {metric.change}
                  </>
                )}
              </p>
            </div>
            <div className={`p-3 rounded-lg`}>
              <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
