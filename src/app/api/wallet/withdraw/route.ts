import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

const withdrawalSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('USD'),
});

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'HOST' && user.role !== 'FACILITATOR' && user.role !== 'TRANSLATOR') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { amount, currency } = withdrawalSchema.parse(body);

    // Get user's wallet
    const wallet = await prisma.wallet.findUnique({
      where: { userId: user.id }
    });

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    if (wallet.balance < amount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Create withdrawal request (pending admin approval)
    const withdrawal = await prisma.payout.create({
      data: {
        userId: user.id,
        walletId: wallet.id,
        amount,
        currency,
        status: 'PENDING'
      }
    });

    // Create wallet transaction
    await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: 'WITHDRAWAL',
        amount,
        currency,
        status: 'PENDING'
      }
    });

    return NextResponse.json({
      message: 'Withdrawal request created successfully',
      withdrawal
    });
  } catch (error) {
    console.error('Withdrawal request error:', error);
    return NextResponse.json({ error: 'Failed to create withdrawal request' }, { status: 500 });
  }
}