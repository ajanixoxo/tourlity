import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerUser } from "@/lib/get-server-user"
const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
     const loggedUser = await getServerUser();
    
    if (!loggedUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const customTourId = (await params).id
    const body = await request.json()
    const { message, proposedPrice, status } = body

    // Validate required fields
    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      )
    }

    // Check if custom tour exists
    const customTour = await prisma.customTour.findUnique({
      where: { id: customTourId }
    })

    if (!customTour) {
      return NextResponse.json(
        { error: "Custom tour not found" },
        { status: 404 }
      )
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

    // Check if host has already responded
    const existingResponse = await prisma.customTourHostResponse.findUnique({
      where: {
        customTourId_hostId: {
          customTourId,
          hostId: loggedUser.id
        }
      }
    })

    if (existingResponse) {
      return NextResponse.json(
        { error: "Host has already responded to this custom tour" },
        { status: 400 }
      )
    }

    // Create host response
    const hostResponse = await prisma.customTourHostResponse.create({
      data: {
        customTourId,
        hostId: loggedUser.id,
        message,
        proposedPrice: proposedPrice ? parseFloat(proposedPrice) : null,
        status: status.toUpperCase()
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
                rating: true,
                reviewCount: true,
                location: true
              }
            }
          }
        }
      }
    })

    // Update custom tour status if host accepted
    if (status.toUpperCase() === "ACCEPTED") {
      await prisma.customTour.update({
        where: { id: customTourId },
        data: { status: "NEGOTIATING" }
      })
    }

    return NextResponse.json({
      success: true,
      data: hostResponse
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating host response:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const customTourId = (await params).id
    const body = await request.json()
    const { message, proposedPrice, status } = body

    // Validate required fields
    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      )
    }

    // Find existing response
    const existingResponse = await prisma.customTourHostResponse.findUnique({
      where: {
        customTourId_hostId: {
          customTourId,
          hostId: user.id
        }
      }
    })

    if (!existingResponse) {
      return NextResponse.json(
        { error: "Host response not found" },
        { status: 404 }
      )
    }

    // Update host response
    const hostResponse = await prisma.customTourHostResponse.update({
      where: {
        customTourId_hostId: {
          customTourId,
          hostId: user.id
        }
      },
      data: {
        message,
        proposedPrice: proposedPrice ? parseFloat(proposedPrice) : null,
        status: status.toUpperCase()
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
                rating: true,
                reviewCount: true,
                location: true
              }
            }
          }
        }
      }
    })

    // Update custom tour status based on response
    if (status.toUpperCase() === "ACCEPTED") {
      await prisma.customTour.update({
        where: { id: customTourId },
        data: { status: "NEGOTIATING" }
      })
    }

    return NextResponse.json({
      success: true,
      data: hostResponse
    })

  } catch (error) {
    console.error("Error updating host response:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
