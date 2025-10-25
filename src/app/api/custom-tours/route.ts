import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { getServerUser } from "@/lib/get-server-user"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
   const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json()
    const {
      title,
      description,
      tourType,
      location,
      country,
      budgetProposal,
      tourCategory,
      groupSize,
      preferredLanguages,
      startDate,
      endDate,
      accessibilityNotes,
      amenitiesNeeded,
      coverageAreas
    } = body

    // Validate required fields
    if (!title || !description || !tourType || !location || !budgetProposal || !tourCategory || !groupSize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create custom tour
    const customTour = await prisma.customTour.create({
      data: {
        guestId: user.id,
        title,
        description,
        tourType,
        location,
        country,
        budgetProposal: parseFloat(budgetProposal),
        tourCategory,
        groupSize: parseInt(groupSize),
        preferredLanguages: Array.isArray(preferredLanguages) ? preferredLanguages : [preferredLanguages],
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        accessibilityNotes,
        amenitiesNeeded: Array.isArray(amenitiesNeeded) ? amenitiesNeeded : [],
        coverageAreas: Array.isArray(coverageAreas) ? coverageAreas : [location],
        status: "PENDING"
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
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: customTour
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating custom tour:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (status && status !== "all") {
      where.status = status.toUpperCase()
    }

    // Get custom tours for the current user
    const customTours = await prisma.customTour.findMany({
      where: {
        guestId: user.id,
        ...where
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
                    location: true
                  }
                }
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
        guestId: user.id,
        ...where
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
    console.error("Error fetching custom tours:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
