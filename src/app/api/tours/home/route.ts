import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tours = await prisma.tour.findMany({
      where: {
        status: "ACTIVE",
        isFeatured: true,
      },
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
        categories: true,
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
      orderBy: {
        rating: "desc",
      },
      take: 6,
    });

    return NextResponse.json(tours);
  } catch (error) {
    console.error("Error in GET /api/tours/home:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured tours" },
      { status: 500 }
    );
  }
}