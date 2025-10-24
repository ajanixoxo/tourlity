import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/get-server-user";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Verify user is authenticated and has access
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Only allow users to view their own tours
    if (user.id !== params.userId) {
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
    const total = await prisma.booking.count({
      where: {
        guestId: params.userId,
      },
    });

    // Get user's booked tours
    const bookings = await prisma.booking.findMany({
      where: {
        guestId: params.userId,
      },
      select: {
        tour: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            location: true,
            country: true,
            images: true,
            rating: true,
            reviewCount: true,
            type: true,
            startDate: true,
            endDate: true,
            duration: true,
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        status: true,
      
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    // Transform the data to include both tour and booking info
    const tours = bookings.map(booking => ({
      ...booking.tour,
      bookingStatus: booking.status,
      bookingDate: booking.tour.startDate,
    }));

    return NextResponse.json({
      tours,
      total,
      hasMore: skip + tours.length < total,
    });
  } catch (error) {
    console.error("Error in GET /api/tours/user/[userId]:", error);
    return NextResponse.json(
      { error: "Failed to fetch user tours" },
      { status: 500 }
    );
  }
}