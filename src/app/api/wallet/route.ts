/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

// Only hosts can access their wallet
export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'HOST' && user.role !== 'FACILITATOR' && user.role !== 'TRANSLATOR') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    return NextResponse.json(wallet);
  } catch (error) {
    console.error('Wallet fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch wallet' }, { status: 500 });
  }
}