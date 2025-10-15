/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const ITEMS_PER_PAGE = 10;

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

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE));
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const status = searchParams.get('status');

    // Build filters
    const where = {
      userId: payload.id
    } as Record<string, any>;

    // Add date filter
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    // Add status filter if provided
    if (status) {
      where.status = status;
    }

    // Get payouts with their transactions
    const payouts = await prisma.payout.findMany({
      where,
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        stripePayoutId: true,
        transactions: {
          select: {
            id: true,
            amount: true,
            netAmount: true,
            platformFee: true,
            serviceType: true,
            booking: {
              select: {
                id: true,
                tour: {
                  select: {
                    title: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    // Get total count for pagination
    const total = await prisma.payout.count({ where });

    // Format payouts
    const formattedPayouts = payouts.map(payout => ({
      id: payout.id,
      date: payout.createdAt.toISOString(),
      amount: payout.amount,
      currency: payout.currency,
      status: payout.status,
      lastUpdated: payout.updatedAt.toISOString(),
      paymentReference: payout.stripePayoutId,
      transactions: payout.transactions.map(tx => ({
        id: tx.id,
        serviceName: tx.booking?.tour?.title || 'Unknown Service',
        serviceType: tx.serviceType || 'TOUR',
        amount: {
          total: tx.amount,
          platformFee: tx.platformFee,
          net: tx.netAmount
        }
      }))
    }));

    return NextResponse.json({
      payouts: formattedPayouts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Failed to fetch payout history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payout history' },
      { status: 500 }
    );
  }
}