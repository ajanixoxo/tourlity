// app/api/profile/route.ts (Refactored to use native JWT auth)
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import type { AuthUser } from '@/lib/auth-utils'
import { UserRole } from '@/types/admin'

// Helper function to get user from JWT token
function getUserFromToken(request: NextRequest): AuthUser | null {
  try {
    // Try to get JWT from Authorization header or cookies
    const authHeader = request.headers.get('authorization')
    const cookieToken = request.cookies.get('token')?.value
    const jwtToken = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : cookieToken

    if (!jwtToken) return null

    // Verify and decode JWT
    const decoded = jwt.verify(
      jwtToken, 
      process.env.JWT_SECRET || 'your_jwt_secret'
    ) as AuthUser

    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get current user from JWT token
    const currentUser = getUserFromToken(request)
    
    // Check if user is authenticated
    if (!currentUser?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user with profile data from database
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
        adminProfile: true,
        bookings: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user status is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { 
          error: 'Account not active',
          status: user.status,
          message: user.status === 'PENDING' 
            ? 'Your account is pending approval'
            : 'Your account has been suspended or rejected'
        },
        { status: 403 }
      )
    }

    // Return user data without password
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
        emailVerifiedAt: user.emailVerifiedAt,
        phone: user.phone,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Role-specific profile data
        profile: user.hostProfile || user.facilitatorProfile || user.translatorProfile || user.adminProfile,
        // Recent activity
        recentBookings: user.bookings,
        recentReviews: user.reviews,
      }
    })

  } catch (error) {
    console.error('Get profile error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
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

    // Check if user exists and is active
    const existingUser = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
        adminProfile: true,
      }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      phone, 
      profileData // For role-specific profile updates
    } = body

    // Basic validation
    if (firstName && (typeof firstName !== 'string' || firstName.trim().length === 0)) {
      return NextResponse.json(
        { error: 'First name must be a non-empty string' },
        { status: 400 }
      )
    }

    if (lastName && (typeof lastName !== 'string' || lastName.trim().length === 0)) {
      return NextResponse.json(
        { error: 'Last name must be a non-empty string' },
        { status: 400 }
      )
    }

    if (phone && (typeof phone !== 'string' || phone.trim().length === 0)) {
      return NextResponse.json(
        { error: 'Phone must be a non-empty string' },
        { status: 400 }
      )
    }

    // Start transaction for updating user and profile
     await prisma.$transaction(async (tx) => {
      // Update user basic info
      const updatedUser = await tx.user.update({
        where: { id: currentUser.id },
        data: {
          ...(firstName && { firstName: firstName.trim() }),
          ...(lastName && { lastName: lastName.trim() }),
          ...(phone && { phone: phone.trim() }),
          updatedAt: new Date(),
        },
      })
      // console.log(result)

      // Update role-specific profile if profileData is provided
      if (profileData && typeof profileData === 'object') {
        const { location, languages, bio, specialties } = profileData

        switch (existingUser.role) {
          case UserRole.HOST:
            if (existingUser.hostProfile) {
              await tx.hostProfile.update({
                where: { userId: currentUser.id },
                data: {
                  ...(location && { location: location.trim() }),
                  ...(languages && Array.isArray(languages) && { languages }),
                  ...(bio && { bio: bio.trim() }),
                  ...(specialties && Array.isArray(specialties) && { specialties }),
                  updatedAt: new Date(),
                }
              })
            } else {
              await tx.hostProfile.create({
                data: {
                  userId: currentUser.id,
                  location: location || '',
                  languages: languages || [],
                  bio: bio || '',
                  specialties: specialties || [],
                }
              })
            }
            break

          case UserRole.FACILITATOR:
            if (existingUser.facilitatorProfile) {
              await tx.facilitatorProfile.update({
                where: { userId: currentUser.id },
                data: {
                  ...(location && { location: location.trim() }),
                  ...(languages && Array.isArray(languages) && { languages }),
                  ...(bio && { bio: bio.trim() }),
                  ...(specialties && Array.isArray(specialties) && { specialties }),
                  updatedAt: new Date(),
                }
              })
            } else {
              await tx.facilitatorProfile.create({
                data: {
                  userId: currentUser.id,
                  location: location || '',
                  languages: languages || [],
                  bio: bio || '',
                  specialties: specialties || [],
                }
              })
            }
            break

          case UserRole.TRANSLATOR:
            if (existingUser.translatorProfile) {
              await tx.translatorProfile.update({
                where: { userId: currentUser.id },
                data: {
                  ...(location && { location: location.trim() }),
                  ...(languages && Array.isArray(languages) && { sourceLanguages: languages }),
                  ...(bio && { bio: bio.trim() }),
                  updatedAt: new Date(),
                }
              })
            } else {
              await tx.translatorProfile.create({
                data: {
                  userId: currentUser.id,
                  location: location || '',
                  sourceLanguages: languages || [],
                  targetLanguages: [],
                  bio: bio || '',
                }
              })
            }
            break
        }
      }

      return updatedUser
    })

    // Fetch updated user with profile data
    const finalUser = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
        adminProfile: true,
      }
    })

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: finalUser!.id,
        email: finalUser!.email,
        firstName: finalUser!.firstName,
        lastName: finalUser!.lastName,
        role: finalUser!.role,
        status: finalUser!.status,
        emailVerified: finalUser!.emailVerified,
        phone: finalUser!.phone,
        avatar: finalUser!.avatar,
        updatedAt: finalUser!.updatedAt,
        hostProfile: finalUser!.hostProfile,
        facilitatorProfile: finalUser!.facilitatorProfile,
        translatorProfile: finalUser!.translatorProfile,
        adminProfile: finalUser!.adminProfile,
      }
    })

  } catch (error) {
    console.error('Update profile error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Alternative approach using the auth utility function
// app/api/profile/route.ts (Alternative using auth-utils helper)
/*
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerUserFromRequest } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    // Use the helper function from auth-utils
    const currentUser = getServerUserFromRequest(request)
    
    if (!currentUser?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rest of the code remains the same...
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
        adminProfile: true,
        bookings: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
        emailVerifiedAt: user.emailVerifiedAt,
        phone: user.phone,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profile: user.hostProfile || user.facilitatorProfile || user.translatorProfile || user.adminProfile,
        recentBookings: user.bookings,
        recentReviews: user.reviews,
      }
    })

  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const currentUser = getServerUserFromRequest(request)
    
    if (!currentUser?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rest of the PUT logic remains the same...
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
*/

// Usage example in frontend
/*
// How to call this API from your frontend components
import { getCurrentUser } from '@/lib/auth-utils'

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }
    
    const data = await response.json()
    return data.user
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}

const updateUserProfile = async (profileData: {
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
}) => {
  try {
    const token = localStorage.getItem('token')
    
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to update profile')
    }
    
    const data = await response.json()
    return data.user
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}
*/