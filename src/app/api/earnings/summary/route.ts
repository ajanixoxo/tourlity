/* eslint-disable prefer-const */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || '3cc_0f7c_4464d1';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: UserProfile | undefined;
    try {
      payload = jwt.verify(token, JWT_SECRET) as UserProfile;
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        role: true,
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }
    if (!['HOST', 'FACILITATOR', 'TRANSLATOR'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized role' }, { status: 403 });
    }
    // Get profile based on role
    const profile = user.role === 'HOST' ? user.hostProfile :
      user.role === 'FACILITATOR' ? user.facilitatorProfile :
      user.translatorProfile;
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    // Get wallet information
    const wallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
      select: {
        balance: true,
        escrow: true,
      }
    });
    // Get total earnings (completed transactions)
    const earnings = await prisma.walletTransaction.aggregate({
      where: {
        wallet: { userId: user.id },
        type: 'EARNING',
        status: 'COMPLETED',
      },
      _sum: {
        netAmount: true,
      },
    });
    // Get total tours completed (bookings with status COMPLETED)
    let completedServiceWhere: Record<string, unknown> = { status: 'COMPLETED' };
    if (user.role === 'HOST') {
      completedServiceWhere.tour = { hostId: user.id };
    } else if (user.role === 'FACILITATOR') {
      completedServiceWhere.facilitatorId = user.id;
    } else if (user.role === 'TRANSLATOR') {
      completedServiceWhere.translatorId = user.id;
    }
    const totalToursCompleted = await prisma.booking.count({
      where: completedServiceWhere,
    });
    // Summary object for the FE metric cards only
    const summary = {
      totalEarnings: earnings._sum.netAmount || 0,
      nextPayout: wallet?.escrow || 0,
      totalToursCompleted,
    };
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Failed to fetch earnings summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch earnings summary' },
      { status: 500 }
    );
  }
}