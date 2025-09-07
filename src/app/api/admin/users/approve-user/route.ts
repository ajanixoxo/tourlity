import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendApprovalEmail } from '@/lib/email'
import { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth' // Adjust path to your auth config

// Validation schema for user approval
const approveUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  action: z.enum(['APPROVE', 'REJECT']),
  reason: z.string().optional(),
})

// Admin authentication and authorization check
async function validateAdminAccess(session: any): Promise<{
  isValid: boolean;
  adminId?: string;
  error?: string;
}> {
  try {
    // Check if session exists
    if (!session?.user?.email) {
      return {
        isValid: false,
        error: 'Authentication required. Please log in.'
      }
    }

    // Find the user in database
    const admin = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        adminProfile: {
          select: {
            permissions: true,
            department: true
          }
        }
      }
    })

    if (!admin) {
      return {
        isValid: false,
        error: 'User not found in system.'
      }
    }

    // Check if user has ADMIN role
    if (admin.role !== 'ADMIN') {
      return {
        isValid: false,
        error: 'Access denied. Admin privileges required.'
      }
    }

    // Check if admin account is active
    if (admin.status !== 'ACTIVE') {
      return {
        isValid: false,
        error: 'Admin account is inactive. Contact system administrator.'
      }
    }

    // Check if admin has USER_MANAGEMENT permission
    if (!admin.adminProfile?.permissions?.includes('USER_MANAGEMENT')) {
      return {
        isValid: false,
        error: 'Access denied. USER_MANAGEMENT permission required.'
      }
    }

    // Check if email is verified
    if (!admin.emailVerified) {
      return {
        isValid: false,
        error: 'Email verification required for admin actions.'
      }
    }

    return {
      isValid: true,
      adminId: admin.id
    }

  } catch (error) {
    console.error('Admin validation error:', error)
    return {
      isValid: false,
      error: 'Internal authentication error occurred.'
    }
  }
}

// Log admin actions for audit trail
async function logAdminAction(
  adminId: string,
  action: string,
  targetUserId: string,
  details: any
) {
  try {
    // You can store this in a separate admin_actions table or use notifications
    await prisma.notification.create({
      data: {
        userId: adminId,
        title: 'Admin Action Logged',
        message: `Admin action: ${action} performed on user ${targetUserId}`,
        type: 'ADMIN_ACTION',
        data: {
          action,
          targetUserId,
          timestamp: new Date().toISOString(),
          ...details
        }
      }
    })
  } catch (error) {
    console.error('Failed to log admin action:', error)
    // Don't fail the main operation if logging fails
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    
    // Validate admin access
    const adminValidation = await validateAdminAccess(session)
    if (!adminValidation.isValid) {
      return NextResponse.json(
        { 
          error: adminValidation.error,
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = approveUserSchema.parse(body)
    
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

    // Additional validation: Check if user role is approvable
    const approvableRoles = ['HOST', 'FACILITATOR', 'TRANSLATOR']
    if (!approvableRoles.includes(user.role)) {
      return NextResponse.json(
        { error: `Cannot approve/reject users with role: ${user.role}` },
        { status: 400 }
      )
    }

    // Prevent self-approval (if admin is also a user being approved)
    if (user.id === adminValidation.adminId) {
      return NextResponse.json(
        { error: 'Cannot approve/reject your own account' },
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
        updatedAt: new Date(), // Ensure updated timestamp
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
          approvedBy: adminValidation.adminId,
          timestamp: new Date().toISOString()
        }
      }
    })
    
    // Log admin action for audit trail
    await logAdminAction(
      adminValidation.adminId!,
      `USER_${validatedData.action}`,
      validatedData.userId,
      {
        userEmail: updatedUser.email,
        userRole: updatedUser.role,
        reason: validatedData.reason
      }
    )
    
    // Send approval/rejection email
    const userName = `${updatedUser.firstName} ${updatedUser.lastName}`.trim() || 'User'
    try {
      await sendApprovalEmail(
        updatedUser.email, 
        userName, 
        validatedData.action === 'APPROVE',
        validatedData.reason
      )
      console.log(`✅ ${validatedData.action} email sent to ${updatedUser.email}`)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the main operation if email fails
    }
    
    console.log(`✅ User ${validatedData.action.toLowerCase()}d by admin ${adminValidation.adminId}: ${updatedUser.email}`)
    
    return NextResponse.json({
      success: true,
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
        { 
          error: 'Validation failed', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error occurred' },
      { status: 500 }
    )
  }
}

// Get pending users for admin review
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    
    // Validate admin access
    const adminValidation = await validateAdminAccess(session)
    if (!adminValidation.isValid) {
      return NextResponse.json(
        { 
          error: adminValidation.error,
          code: 'UNAUTHORIZED' 
        },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') // Optional filter by role
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50) // Max 50 per page
    const skip = (page - 1) * limit
    
    const whereClause: Prisma.UserWhereInput = {
      status: 'PENDING',
      // Only show approvable roles
      role: {
        in: ['HOST', 'FACILITATOR', 'TRANSLATOR']
      }
    }
    
    // Filter by specific role if provided
    if (role && ['HOST', 'FACILITATOR', 'TRANSLATOR'].includes(role)) {
      whereClause.role = role as 'HOST' | 'FACILITATOR' | 'TRANSLATOR'
    }
    
    // Get pending users with pagination
    const [pendingUsers, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        include: {
          hostProfile: {
            select: {
              bio: true,
              location: true,
              languages: true,
              specialties: true,
              certificationUrl: true,
            }
          },
          facilitatorProfile: {
            select: {
              bio: true,
              location: true,
              languages: true,
              specialties: true,
              certificationUrl: true,
            }
          },
          translatorProfile: {
            select: {
              bio: true,
              location: true,
              sourceLanguages: true,
              targetLanguages: true,
              certificationUrl: true,
            }
          },
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.user.count({ where: whereClause })
    ])

    // Log admin access to pending users
    await logAdminAction(
      adminValidation.adminId!,
      'VIEW_PENDING_USERS',
      'SYSTEM',
      {
        roleFilter: role,
        page,
        userCount: pendingUsers.length
      }
    )
    
    return NextResponse.json({
      success: true,
      users: pendingUsers.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        profile: user.hostProfile || user.facilitatorProfile || user.translatorProfile,
      })),
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      }
    })
    
  } catch (error) {
    console.error('Get pending users error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error occurred' },
      { status: 500 }
    )
  }
}