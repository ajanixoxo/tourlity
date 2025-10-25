import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, TourType } from "@prisma/client"; // ✅ import your enum

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type") || undefined;
    const type = typeParam && Object.values(TourType).includes(typeParam as TourType)
      ? (typeParam as TourType)
      : undefined;
    // ✅ now `type` is properly validated as an enum value

    const query = searchParams.get("query") || "";
    const categories = searchParams.get("categories")?.split(',') || [];
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;
    const duration = searchParams.get("duration") || undefined;
    const groupSize = searchParams.get("groupSize") || undefined;
    const language = searchParams.get("language") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: Prisma.TourWhereInput = {
      status: "ACTIVE",
      ...(query && {
        OR: [
          { title: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: query, mode: Prisma.QueryMode.insensitive } },
          { location: { contains: query, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(type && { type }), // ✅ now type matches Prisma enum
      ...(categories.length > 0 && { categories: { hasEvery: categories } }),
      ...(language && { languages: { has: language } }),
      ...(duration && { duration }),
      ...(groupSize && { groupSize }),
      ...(minPrice || maxPrice
        ? {
          price: {
            ...(minPrice && { gte: minPrice }),
            ...(maxPrice && { lte: maxPrice }),
          },
        }
        : {}),
    };

    const total = await prisma.tour.count({ where });
    const tours = await prisma.tour.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            hostProfile: {
              select: {
                rating: true,
                reviewCount: true,
                verified: true,
                languages: true,
                location: true
              }
            }
          }
        }
      }
    });
    console.log("✅ Fetched tours:", tours);
    return NextResponse.json({ tours, total, hasMore: skip + tours.length < total });
  } catch (error) {
    console.error("❌ Error in GET /api/tours/explore:", error);
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 });
  }
}
