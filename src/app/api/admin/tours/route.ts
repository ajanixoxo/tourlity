import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

const ITEMS_PER_PAGE = 6;

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get pagination and filter parameters
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE))));
    const search = searchParams.get('search')?.trim();
    const status = searchParams.get('status');

    // Build where clause
    const where: any = {};

    // Only add status filter if explicitly provided
    if (status) {
      where.status = status;
    }

    // Add search filter - optimized with proper indexing consideration
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          location: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          host: {
            OR: [
              {
                firstName: {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              {
                lastName: {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              {
                email: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            ]
          }
        }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get tours with host information
    const [tours, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        select: {
          id: true,
          title: true,
          location: true,
          price: true,
          duration: true,
          // maxGroupSize: true,
          // difficulty: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          type:true,
          host: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true,
              status: true
            }
          },
          itinerary: {
            select: {
              id: true,
              dayNumber: true,
              todo: true,
              description: true,
              // activities: true
            },
            orderBy: {
              dayNumber: 'asc'
            }
          },
          accommodation: {
            select: {
              id: true,
              hotelName: true,
              // type: true,
              description: true,
              // amenities: true
            }
          },
          _count: {
            select: {
              bookings: true,
              reviews: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.tour.count({ where })
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      success: true,
      data: {
        tours,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore
        }
      }
    });

  } catch (error) {
    console.error('Error fetching tours for moderation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}