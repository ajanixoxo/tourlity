import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tour = await prisma.tour.findUnique({
      where: {
        id: (await params).id,
      },
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            hostProfile: {
              select: {
                bio: true,
                location: true,
                languages: true,
                specialties: true,
                rating: true,
                reviewCount: true,
                responseTime: true,
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            reviewer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
        itinerary: {
          orderBy: {
            dayNumber: "asc",
          },
        },
        accommodation: true,
        _count: {
          select: {
            reviews: true,
            bookings: true,
          },
        },
      },
    });

    if (!tour) {
      return NextResponse.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tour);
  } catch (error) {
    console.error("Error in GET /api/tours/[id]:", error);
    return NextResponse.json(
      { error: "Failed to fetch tour details" },
      { status: 500 }
    );
  }
}