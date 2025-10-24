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

    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || undefined;
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;
    const location = searchParams.get("location") || undefined;
    const language = searchParams.get("language") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: Prisma.TourWhereInput = {
      status: "ACTIVE",
      ...(q && {
        OR: [
          { title: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { location: { contains: q, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
      ...(type && { type }), // ✅ now type matches Prisma enum
      ...(category && { categories: { has: category } }),
      ...(language && { languages: { has: language } }),
      ...(location && {
        location: { contains: location, mode: Prisma.QueryMode.insensitive },
      }),
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
    });

    return NextResponse.json({ tours, total, hasMore: skip + tours.length < total });
  } catch (error) {
    console.error("❌ Error in GET /api/tours/explore:", error);
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 });
  }
}
