import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "../root/button"
import { Star } from "lucide-react"
import type { ReviewHighlight } from "@/data/dashboard"

interface ReviewHighlightsProps {
  reviews: ReviewHighlight[]
  hasData: boolean
}

export function ReviewHighlights({ reviews, hasData }: ReviewHighlightsProps) {
  if (!hasData) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Review Highlights</CardTitle>
          <Button variant="secondary"  className="text-primary-color">
            View All
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gray-400 rounded-full opacity-50"></div>
          </div>
          <p className="text-gray-500 text-center">You have no reviews yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Review Highlights</CardTitle>
        <Button variant="secondary"  className="text-primary-color">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
            {review.guestName && <p className="text-xs text-gray-500">- {review.guestName}</p>}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
