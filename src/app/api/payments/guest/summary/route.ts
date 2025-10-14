import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'GUEST') {
      return NextResponse.json({ error: 'Only guests can access this endpoint' }, { status: 403 });
    }

    // Get upcoming trips count (future confirmed bookings)
    const upcomingTrips = await prisma.booking.count({
      where: {
        guestId: user.id,
        status: 'CONFIRMED',
        scheduledDate: {
          gte: new Date() // Only future dates
        }
      }
    });

    // Get total spent from completed transactions
    const totalSpentResult = await prisma.platformTransaction.aggregate({
      where: {
        type: 'TOUR_PAYMENT',
        relatedUser: user.id, // Guest is the related user
      },
      _sum: {
        amount: true
      }
    });

    const totalSpent = totalSpentResult._sum.amount || 0;

    return NextResponse.json({
      summary: {
        upcomingTrips,
        totalSpent
      }
    });

  } catch (error) {
    console.error('Failed to fetch payment summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment summary' },
      { status: 500 }
    );
  }
}