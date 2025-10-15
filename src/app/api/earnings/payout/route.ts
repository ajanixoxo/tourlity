import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(request: NextRequest) {
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

    // Get request body
    const body = await request.json();
    const { amount, currency = 'USD', transactionIds } = body;

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!transactionIds || !Array.isArray(transactionIds) || transactionIds.length === 0) {
      return NextResponse.json({ error: 'No transactions selected' }, { status: 400 });
    }

    // Get user's wallet
    const wallet = await prisma.wallet.findUnique({
      where: { userId: payload.id }
    });

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    // Verify transactions belong to user and are available for payout
    const transactions = await prisma.walletTransaction.findMany({
      where: {
        id: { in: transactionIds },
        wallet: { userId: payload.id },
        type: 'EARNING',
        status: 'COMPLETED',
        payoutStatus: 'AVAILABLE'
      }
    });

    if (transactions.length !== transactionIds.length) {
      return NextResponse.json({ 
        error: 'One or more transactions are invalid or unavailable for payout' 
      }, { status: 400 });
    }

    // Calculate total amount from transactions
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.netAmount, 0);

    // Verify amount matches
    if (Math.abs(totalAmount - amount) > 0.01) { // Allow for small floating point differences
      return NextResponse.json({ 
        error: 'Requested amount does not match transaction total' 
      }, { status: 400 });
    }

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create payout record
      const payout = await tx.payout.create({
        data: {
          userId: payload.id,
          walletId: wallet.id,
          amount: totalAmount,
          currency,
          status: 'PENDING'
        }
      });

      // Update transactions
      await tx.walletTransaction.updateMany({
        where: {
          id: { in: transactionIds }
        },
        data: {
          payoutStatus: 'PENDING',
          payoutId: payout.id
        }
      });

      // Deduct from wallet balance
      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: {
            decrement: totalAmount
          }
        }
      });

      return payout;
    });

    return NextResponse.json({
      message: 'Payout request created successfully',
      payout: result
    });

  } catch (error) {
    console.error('Failed to create payout:', error);
    return NextResponse.json(
      { error: 'Failed to create payout' },
      { status: 500 }
    );
  }
}