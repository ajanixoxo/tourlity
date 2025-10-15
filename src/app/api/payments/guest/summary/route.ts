import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

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