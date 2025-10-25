
import { TourDetailPage } from "@/components/tour/tour-detail-page"

export default async function TourPage({ params }: { params: Promise<{ id: string }> }) {
  return (
   
      <main>
        <TourDetailPage tourId={(await params).id} />
      </main>
   
  )
}
