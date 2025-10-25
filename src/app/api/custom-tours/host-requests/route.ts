import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerUser } from "@/lib/get-server-user"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
  const loggedUser = await getServerUser();
    
    if (!loggedUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a host
    const user = await prisma.user.findUnique({
      where: { id: loggedUser.id },
      include: { hostProfile: true }
    })

    if (!user?.hostProfile) {
      return NextResponse.json(
        { error: "User is not a host" },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: "PENDING" // Only show pending requests to hosts
    }
    
    if (status && status !== "all") {
      where.status = status.toUpperCase()
    }

    // Get host's coverage areas from their profile
    const hostCoverageAreas = user.hostProfile.location ? [user.hostProfile.location] : []

    // Find custom tours that match host's coverage areas
    const customTours = await prisma.customTour.findMany({
      where: {
        ...where,
        OR: [
          // Match by coverage areas
          {
            coverageAreas: {
              hasSome: hostCoverageAreas
            }
          },
          // Match by location
          {
            location: {
              contains: user.hostProfile.location || "",
              mode: "insensitive"
            }
          }
        ]
      },
      include: {
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true
          }
        },
        hostResponses: {
          where: {
            hostId: loggedUser.id
          },
          include: {
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          }
        },
        _count: {
          select: {
            hostResponses: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      skip,
      take: limit
    })

    const total = await prisma.customTour.count({
      where: {
        ...where,
        OR: [
          {
            coverageAreas: {
              hasSome: hostCoverageAreas
            }
          },
          {
            location: {
              contains: user.hostProfile.location || "",
              mode: "insensitive"
            }
          }
        ]
      }
    })

    return NextResponse.json({
      success: true,
      data: customTours,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching host custom tour requests:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
