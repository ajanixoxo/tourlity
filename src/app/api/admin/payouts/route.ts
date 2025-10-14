import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const pendingPayouts = await prisma.payout.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            role: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(pendingPayouts);
  } catch (error) {
    console.error('Pending payouts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch pending payouts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { payoutId, action } = body;

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const payout = await prisma.payout.findUnique({
      where: { id: payoutId },
      include: { user: true }
    });

    if (!payout) {
      return NextResponse.json({ error: 'Payout not found' }, { status: 404 });
    }

    if (payout.status !== 'PENDING') {
      return NextResponse.json({ error: 'Payout already processed' }, { status: 400 });
    }

    if (action === 'approve') {
      // Update wallet balance
      await prisma.wallet.update({
        where: { userId: payout.userId },
        data: { balance: { decrement: payout.amount } }
      });

      // Update payout status
      await prisma.payout.update({
        where: { id: payoutId },
        data: { status: 'COMPLETED' }
      });

      // Update associated transaction
      await prisma.walletTransaction.updateMany({
        where: {
          walletId: payout.userId,
          type: 'WITHDRAWAL',
          status: 'PENDING'
        },
        data: { status: 'COMPLETED' }
      });
    } else {
      // Reject payout
      await prisma.payout.update({
        where: { id: payoutId },
        data: { status: 'FAILED' }
      });

      // Update associated transaction
      await prisma.walletTransaction.updateMany({
        where: {
          walletId: payout.userId,
          type: 'WITHDRAWAL',
          status: 'PENDING'
        },
        data: { status: 'FAILED' }
      });
    }

    return NextResponse.json({
      message: `Payout ${action}ed successfully`
    });
  } catch (error) {
    console.error('Payout processing error:', error);
    return NextResponse.json({ error: 'Failed to process payout' }, { status: 500 });
  }
}