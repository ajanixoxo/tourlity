import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Button from "../root/button"
import type { ActivityItem } from "@/data/dashboard"

interface RecentActivityProps {
  activities: ActivityItem[]
  hasData: boolean
}

export function RecentActivity({ activities, hasData }: RecentActivityProps) {
  if (!hasData) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="secondary" className="text-primary-color">
            View All
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gray-400 rounded-full opacity-50"></div>
          </div>
          <p className="text-gray-500 text-center">You have no activity yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="secondary"  className="text-primary-color">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 pb-2 border-b">
            <div>Tour Name</div>
            <div>Host</div>
            <div>Status</div>
            <div>Date and Time</div>
          </div>

          {activities.map((activity) => (
            <div key={activity.id} className="grid grid-cols-4 gap-4 text-sm py-3">
              <div className="font-medium text-gray-900">{activity.tourName}</div>
              <div className="text-gray-600">{activity.host || activity.guest}</div>
              <div>
                <Badge
                  variant={activity.status === "completed" ? "default" : "secondary"}
                  className={
                    activity.status === "completed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : activity.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </Badge>
              </div>
              <div className="text-gray-600">{activity.dateTime}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
