import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerUser } from "@/lib/get-server-user"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin user
    const user = await getServerUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const tourId = (await params).id
    const { reason } = await request.json()

    // Check if tour exists
    const tour = await prisma.tour.findUnique({
      where: { id: tourId }
    })

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }

    // Update tour status
    const updatedTour = await prisma.tour.update({
      where: { id: tourId },
      data: {
        status: "REJECTED",
        // rejectionReason: reason,
        updatedAt: new Date()
      }
    })

    // Send notification to host (you can implement this later)
    // await notifyHost(tour.hostId, "Tour Rejected", `Your tour "${tour.title}" has been rejected. Reason: ${reason}`)

    return NextResponse.json({
      success: true,
      data: updatedTour
    })

  } catch (error) {
    console.error("Error rejecting tour:", error)
    return NextResponse.json(
      { error: "Failed to reject tour" },
      { status: 500 }
    )
  }
}