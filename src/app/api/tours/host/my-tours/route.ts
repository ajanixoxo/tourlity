import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerUser } from "@/lib/get-server-user";
import { Prisma, TourStatus } from "@prisma/client";
export async function GET(req: Request) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = (searchParams.get("status") as unknown as TourStatus) || undefined;
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const where: Prisma.TourWhereInput = {
      hostId: user.id,
      ...(status && { status }),
      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } },
        ],
      }),
    };

    const [total, tours] = await Promise.all([
      prisma.tour.count({ where }),
      prisma.tour.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          host: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
              hostProfile: {
                select: {
                  rating: true,
                  reviewCount: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      tours,
      total,
      hasMore: skip + tours.length < total,
    });
  } catch (error) {
    console.error("Error in GET /api/tours/host/my-tours:", error);
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}