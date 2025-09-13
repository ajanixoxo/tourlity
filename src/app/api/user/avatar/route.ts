// app/api/user/avatar/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import type { AuthUser } from '@/lib/auth-utils'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
      process.env.JWT_SECRET || 'your_jwt_secret'
    ) as AuthUser

    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
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
      where: { id: currentUser.id }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (existingUser.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Account not active' },
        { status: 403 }
      )
    }

    // Get form data
    const formData = await request.formData()
    const file = formData.get('avatar') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 5MB allowed' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExtension = file.type.split('/')[1]
    const fileName = `${currentUser.id}-${Date.now()}.${fileExtension}`
    const filePath = `avatars/${fileName}`

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = new Uint8Array(arrayBuffer)

    // Delete old avatar if exists
    if (existingUser.avatar) {
      try {
        const oldFilePath = existingUser.avatar.split('/').pop()
        if (oldFilePath) {
          await supabase.storage
            .from('avatars')
            .remove([`avatars/${oldFilePath}`])
        }
      } catch (error) {
        console.log('Failed to delete old avatar:', error)
        // Continue with upload even if deletion fails
      }
    }

    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(uploadData.path)

    if (!urlData.publicUrl) {
      return NextResponse.json(
        { error: 'Failed to get public URL' },
        { status: 500 }
      )
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        avatar: urlData.publicUrl,
        updatedAt: new Date(),
      },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
        adminProfile: true,
      }
    })

    return NextResponse.json({
      message: 'Avatar updated successfully',
      avatar: urlData.publicUrl,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role,
        status: updatedUser.status,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        updatedAt: updatedUser.updatedAt,
        profile: updatedUser.hostProfile || updatedUser.facilitatorProfile || 
                updatedUser.translatorProfile || updatedUser.adminProfile,
      }
    })

  } catch (error) {
    console.error('Avatar upload error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get current user from JWT token
    const currentUser = getUserFromToken(request)
    
    if (!currentUser?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: currentUser.id }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!existingUser.avatar) {
      return NextResponse.json(
        { error: 'No avatar to delete' },
        { status: 400 }
      )
    }

    // Delete from Supabase storage
    try {
      const filePath = existingUser.avatar.split('/').pop()
      if (filePath) {
        await supabase.storage
          .from('avatars')
          .remove([`avatars/${filePath}`])
      }
    } catch (error) {
      console.log('Failed to delete from storage:', error)
      // Continue with database update even if file deletion fails
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        avatar: null,
        updatedAt: new Date(),
      }
    })

    return NextResponse.json({
      message: 'Avatar deleted successfully',
      user: {
        id: updatedUser.id,
        avatar: null,
        updatedAt: updatedUser.updatedAt,
      }
    })

  } catch (error) {
    console.error('Avatar delete error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}