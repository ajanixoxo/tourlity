import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || '3cc_0f7c_4464d1';

export async function GET(request: NextRequest) {
  try {
    // Get JWT from cookie
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify JWT
    let payload: UserProfile;
    try {
      payload = jwt.verify(token, JWT_SECRET) as UserProfile;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Verify user exists and is a guest
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, role: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    if (user.role !== 'GUEST') {
      return NextResponse.json({ error: 'Only guests can access this endpoint' }, { status: 403 });
    }

    // Get start of today for date comparison (to include today's bookings)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Get all CONFIRMED bookings to check what we have
    const allConfirmedBookings = await prisma.booking.findMany({
      where: {
        guestId: user.id,
        status: 'CONFIRMED'
      },
      select: {
        id: true,
        scheduledDate: true,
        status: true,
        tourId: true,
        createdAt: true
      }
    });

    // For upcoming trips, include:
    // 1. Bookings with scheduledDate >= today (future tours)
    // 2. Bookings created today (just booked, scheduledDate might be today)
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    // Get upcoming trips (confirmed bookings from today onwards OR created today)
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        guestId: user.id,
        status: 'CONFIRMED',
        OR: [
          {
            scheduledDate: {
              gte: todayStart // Scheduled for today or future
            }
          },
          {
            // Include bookings created today (even if scheduledDate is in the past)
            createdAt: {
              gte: todayStart,
              lte: todayEnd
            }
          }
        ]
      },
      orderBy: {
        scheduledDate: 'asc' // Order by closest date first
      },
      take: 1 // Get the next upcoming trip for days calculation
    });

    const upcomingTrips = await prisma.booking.count({
      where: {
        guestId: user.id,
        status: 'CONFIRMED',
        OR: [
          {
            scheduledDate: {
              gte: todayStart // Scheduled for today or future
            }
          },
          {
            // Include bookings created today
            createdAt: {
              gte: todayStart,
              lte: todayEnd
            }
          }
        ]
      }
    });

    // Debug logging
    console.log(`[Payment Summary] User ${user.id}:`, {
      totalConfirmedBookings: allConfirmedBookings.length,
      upcomingTrips,
      allBookings: allConfirmedBookings.map(b => ({
        id: b.id.substring(0, 8),
        scheduledDate: b.scheduledDate.toISOString(),
        createdAt: b.createdAt.toISOString(),
        isToday: b.createdAt >= todayStart && b.createdAt <= todayEnd,
        isFuture: b.scheduledDate >= todayStart
      })),
      todayStart: todayStart.toISOString()
    });

    // Calculate days until next trip
    let nextTripDays = 0;
    if (upcomingBookings.length > 0 && upcomingBookings[0].scheduledDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset to start of day
      const nextTripDate = new Date(upcomingBookings[0].scheduledDate);
      nextTripDate.setHours(0, 0, 0, 0); // Reset to start of day
      const diffTime = nextTripDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      nextTripDays = diffDays > 0 ? diffDays : 0;
    }

    // Get total spent from SUCCESSFUL transactions only
    const totalSpentResult = await prisma.platformTransaction.aggregate({
      where: {
        type: 'TOUR_PAYMENT',
        relatedUser: user.id, // Guest is the related user
        status: 'SUCCESS' // Only count successful transactions
      },
      _sum: {
        amount: true
      }
    });

    const totalSpent = totalSpentResult._sum.amount || 0;

    return NextResponse.json({
      summary: {
        upcomingTrips,
        totalSpent,
        nextTripDays
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