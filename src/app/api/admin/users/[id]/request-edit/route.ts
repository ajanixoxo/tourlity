import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendRequestEditsEmail } from '@/lib/email'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { reason } = await request.json()

    if (!reason || !reason.trim()) {
      return NextResponse.json(
        { success: false, error: 'Reason is required' },
        { status: 400 }
      )
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        firstName: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user status to indicate edits are needed
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { 
        status: 'REJECTED', // or create a new status like 'NEEDS_EDITS'
        updatedAt: new Date()
      }
    })

    // Send request edits email
    try {
      await sendRequestEditsEmail(user.email, user.firstName, reason)
    } catch (emailError) {
      console.error('Failed to send request edits email:', emailError)
    }

    return NextResponse.json({
      success: true,
      data: updatedUser
    })

  } catch (error) {
    console.error('Error requesting edits:', error)
    
    return NextResponse.json(
      { success: false, error: 'Failed to request edits' },
      { status: 500 }
    )
  }
}