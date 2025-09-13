// api/users/[id]/status/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendApprovalEmail, sendRejectionEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status, reason } = await request.json() // Add reason to destructuring

    // Validate status
    const validStatuses = ['PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Update user status
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date()
      },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
        adminProfile: true,
      }
    })

    // Send email notification based on status

    try {
      if (status === 'ACTIVE') {
        await sendApprovalEmail(updatedUser.email, updatedUser.firstName, true)
      } else if (status === 'REJECTED') {
        await sendRejectionEmail(updatedUser.email, updatedUser.firstName, reason)
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json({
      success: true,
      data: updatedUser
    })

  } catch (error) {
    console.error('Error updating user status:', error)

    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update user status' },
      { status: 500 }
    )
  }
}