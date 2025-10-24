import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/get-server-user";

export async function GET(
  req: Request,
  { params }: { params: { hostId: string } }
) {
  try {
    // Verify user is authenticated
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Only allow hosts to view their own tours or admin to view any host's tours
    if (user.id !== params.hostId && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get total count
    const total = await prisma.tour.count({
      where: {
        hostId: params.hostId,
      },
    });

    // Get host's tours
    const tours = await prisma.tour.findMany({
      where: {
        hostId: params.hostId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        originalPrice: true,
        location: true,
        country: true,
        images: true,
        rating: true,
        reviewCount: true,
        type: true,
        status: true,
        isLive: true,
        maxVirtualSlots: true,
        currentVirtualSlots: true,
        maxInPersonSlots: true,
        currentInPersonSlots: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      tours,
      total,
      hasMore: skip + tours.length < total,
    });
  } catch (error) {
    console.error("Error in GET /api/tours/host/[hostId]:", error);
    return NextResponse.json(
      { error: "Failed to fetch host tours" },
      { status: 500 }
    );
  }
}