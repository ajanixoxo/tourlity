import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    // Get tour with all related data for moderation
    const tour = await prisma.tour.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            role: true,
            status: true,
            // phoneNumber: true,
            // bio: true,
            // specialties: true,
            // rating: true,
            // reviewCount: true,
            createdAt: true
          }
        },
        itinerary: {
          orderBy: {
            dayNumber: 'asc'
          }
        },
        accommodation: true,
        bookings: {
          select: {
            id: true,
            status: true,
            amount: true,
            participants: true,
            scheduledDate: true,
            createdAt: true,
            guest: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10 // Limit to recent bookings
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            // guest: {
            //   select: {
            //     id: true,
            //     firstName: true,
            //     lastName: true,
            //     avatar: true
            //   }
            // }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5 // Limit to recent reviews
        },
        _count: {
          select: {
            bookings: true,
            reviews: true
          }
        }
      }
    });

    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: tour
    });

  } catch (error) {
    console.error('Error fetching tour details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tour details' },
      { status: 500 }
    );
  }
}
