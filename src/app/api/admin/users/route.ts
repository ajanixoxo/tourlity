// api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build where clause with proper Prisma types
    const where: Prisma.UserWhereInput = {}
    
    if (role && role !== 'all') {
      where.role = role.toUpperCase() as Prisma.EnumUserRoleFilter
    }
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase() as Prisma.EnumUserStatusFilter
    }
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Fetch users with profiles
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          hostProfile: true,
          facilitatorProfile: true,
          translatorProfile: true,
          adminProfile: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where })
    ])
    console.log(users)

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }
      }
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}