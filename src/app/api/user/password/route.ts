// app/api/user/password/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { AuthUser } from '@/lib/auth-utils'

// Helper function to get user from JWT token
function getUserFromToken(request: NextRequest): AuthUser | null {
  try {
    const authHeader = request.headers.get('authorization')
    const cookieToken = request.cookies.get('token')?.value
    const jwtToken = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : cookieToken

    if (!jwtToken) return null

    const decoded = jwt.verify(
      jwtToken, 
      process.env.JWT_SECRET || '3cc_0f7c_4464d1'
    ) as AuthUser

    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Password validation function
function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' }
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' }
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' }
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' }
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character' }
  }

  return { valid: true }
}

export async function PUT(request: NextRequest) {
  try {
    // Get current user from JWT token
    const currentUser = getUserFromToken(request)
    
    if (!currentUser?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await request.json()
    const { currentPassword, newPassword, confirmPassword } = body

    // Validate required fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: 'Current password, new password, and confirm password are required' },
        { status: 400 }
      )
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'New password and confirm password do not match' },
        { status: 400 }
      )
    }

    // Validate new password strength
    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      )
    }

    // Check if new password is different from current password
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'New password must be different from current password' },
        { status: 400 }
      )
    }

    // Get user from database
    const existingUser = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        email: true,
        password: true,
        status: true,
      }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user account is active
    if (existingUser.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Account not active' },
        { status: 403 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, existingUser.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const saltRounds = 12
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update password in database
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        password: hashedNewPassword,
        updatedAt: new Date(),
      }
    })

    // Log password change (for security auditing)
    console.log(`Password changed for user ${existingUser.email} (ID: ${currentUser.id}) at ${new Date().toISOString()}`)

    return NextResponse.json({
      message: 'Password changed successfully',
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Password change error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}