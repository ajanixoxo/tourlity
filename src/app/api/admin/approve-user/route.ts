import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendApprovalEmail } from '@/lib/email'
import { Prisma } from '@prisma/client'

// Validation schema for user approval
const approveUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  action: z.enum(['APPROVE', 'REJECT']),
  reason: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = approveUserSchema.parse(body)
    
    // TODO: Add admin authentication check
    // For now, we'll proceed without auth check for testing
    
    // Find the user to approve/reject
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Check if user is in pending status
    if (user.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'User is not in pending status' },
        { status: 400 }
      )
    }
    
    // Update user status
    const newStatus = validatedData.action === 'APPROVE' ? 'ACTIVE' : 'REJECTED'
    
    const updatedUser = await prisma.user.update({
      where: { id: validatedData.userId },
      data: {
        status: newStatus,
        emailVerified: validatedData.action === 'APPROVE' ? true : false,
        emailVerifiedAt: validatedData.action === 'APPROVE' ? new Date() : null,
      },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
      }
    })
    
    // Create notification for the user
    await prisma.notification.create({
      data: {
        userId: validatedData.userId,
        title: validatedData.action === 'APPROVE' ? 'Account Approved' : 'Account Rejected',
        message: validatedData.action === 'APPROVE' 
          ? 'Your account has been approved! You can now start using Tourlity.'
          : `Your account has been rejected. ${validatedData.reason || 'Please contact support for more information.'}`,
        type: 'APPROVAL',
        data: {
          action: validatedData.action,
          reason: validatedData.reason,
        }
      }
    })
    
    // Send approval/rejection email
    const userName = updatedUser.firstName || 'User'
    await sendApprovalEmail(
      updatedUser.email, 
      userName, 
      validatedData.action === 'APPROVE',
      validatedData.reason
    )
    
    return NextResponse.json({
      message: `User ${validatedData.action.toLowerCase()}d successfully`,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role,
        status: updatedUser.status,
        emailVerified: updatedUser.emailVerified,
      }
    })
    
  } catch (error) {
    console.error('User approval error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get pending users for admin review
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') // Optional filter by role
    
    const whereClause: Prisma.UserWhereInput = {
      status: 'PENDING',
    }
    
    if (role) {
      whereClause.role = role as 'GUEST' | 'HOST' | 'FACILITATOR' | 'TRANSLATOR'
    }
    
    const pendingUsers = await prisma.user.findMany({
      where: whereClause,
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({
      users: pendingUsers.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        profile: user.hostProfile || user.facilitatorProfile || user.translatorProfile,
      }))
    })
    
  } catch (error) {
    console.error('Get pending users error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 