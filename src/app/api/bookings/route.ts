import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // PENDING, CONFIRMED, CANCELLED, COMPLETED
    const role = user.role;

    const skip = (page - 1) * limit;

    // Build where clause based on user role
    const where: any = {};

    if (role === 'GUEST') {
      where.guestId = user.id;
    } else if (role === 'HOST') {
      // Host sees bookings for their tours
      where.tour = {
        hostId: user.id
      };
    } else if (role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    // ADMIN can see all bookings (no where clause filter)

    // Add status filter if provided
    if (status) {
      where.status = status;
    }

    // Get total count
    const total = await prisma.booking.count({ where });

    // Get bookings with related data
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        tour: {
          include: {
            host: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatar: true,
                phone: true
              }
            }
          }
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            phone: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });

    return NextResponse.json({
      bookings,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

