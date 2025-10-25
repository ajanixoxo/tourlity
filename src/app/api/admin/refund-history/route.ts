import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

const ITEMS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE));
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search');

    // Build filters
    const where: any = {
      status: 'REFUNDED'
    };

    // Add date filter
    if (startDate && endDate) {
      where.updatedAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    // Add search filter
    if (search) {
      where.OR = [
        {
          guest: {
            firstName: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          guest: {
            lastName: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          tour: {
            title: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      ];
    }

    // Get refunded bookings with related information
    // Change this part of your query:
    const refunds = await prisma.booking.findMany({
      where,
      include: {
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        tour: {
          select: {
            id: true,
            title: true
          }
        },
        Payment: {  // Change from 'payment' to 'Payment' (capital P)
          select: {
            amount: true,
            currency: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    // Get total count for pagination
    const total = await prisma.booking.count({ where });

    // Format refunds for admin view
    // Format refunds for admin view
    const formattedRefunds = refunds.map(refund => ({
      id: refund.id,
      guestName: `${refund.guest.firstName} ${refund.guest.lastName}`,
      tourName: refund.tour?.title || 'N/A',  // Add optional chaining in case tour is null
      amount: refund.Payment?.[0]?.amount || 0,  // Get first payment's amount from the array
      dateAndTime: refund.updatedAt.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      reason: 'Guest Request',
      guestEmail: refund.guest.email,
      tourId: refund.tour?.id,
      guestId: refund.guest.id
    }));

    return NextResponse.json({
      refunds: formattedRefunds,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Admin refund history fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch refund history' }, { status: 500 });
  }
}
