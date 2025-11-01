/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || '3cc_0f7c_4464d1';
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

    // Get user to check role
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, role: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE));
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const status = searchParams.get('status');

    // For HOST users, return PlatformTransactions for their tours
    if (user.role === 'HOST') {
      // First, get all tour IDs for this host
      const hostTours = await prisma.tour.findMany({
        where: { hostId: user.id },
        select: { id: true }
      });
      const tourIds = hostTours.map(tour => tour.id);

      // Build where clause
      const where: any = {
        type: 'TOUR_PAYMENT',
        relatedTour: {
          in: tourIds
        }
      };

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

      // Get platform transactions for host's tours
      const transactions = await prisma.platformTransaction.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit
      });

      // Get total count for pagination
      const total = await prisma.platformTransaction.count({ where });

      // Fetch tour details for each transaction
      const tourIdsFromTransactions = transactions
        .map(tx => tx.relatedTour)
        .filter((id): id is string => id !== null);

      const tours = await prisma.tour.findMany({
        where: {
          id: { in: tourIdsFromTransactions }
        },
        select: {
          id: true,
          title: true
        }
      });

      // Create a map for quick lookup
      const tourMap = new Map(tours.map(tour => [tour.id, tour]));

      // Format transactions to match EarningsTransaction interface
      const formattedTransactions = transactions.map(tx => {
        // Map status: SUCCESS -> paid, PENDING -> pending, FAILED -> (exclude or show as failed)
        let transactionStatus: 'paid' | 'processing' | 'pending' = 'pending';
        if (tx.status === 'SUCCESS') {
          transactionStatus = 'paid';
        } else if (tx.status === 'PENDING') {
          transactionStatus = 'processing';
        } else {
          transactionStatus = 'pending';
        }

        const tour = tx.relatedTour ? tourMap.get(tx.relatedTour) : null;

        return {
          id: tx.id,
          tourName: tour?.title || 'Unknown Tour',
          amount: tx.amount,
          date: tx.createdAt.toISOString(),
          status: transactionStatus
        };
      });

      return NextResponse.json({
        transactions: formattedTransactions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    }

    // For other roles (FACILITATOR, TRANSLATOR), return payouts as before
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

    // For non-host roles, format payouts as transactions
    const formattedTransactions = formattedPayouts.flatMap(payout => 
      payout.transactions.map(tx => ({
        id: `${payout.id}-${tx.id}`,
        tourName: tx.serviceName,
        amount: tx.amount.net,
        date: payout.date,
        status: (() => {
          switch (payout.status) {
            case 'COMPLETED':
              return 'paid';
            case 'PENDING':
              return 'processing';
            case 'IN_PROGRESS':
              return 'pending';
            default:
              return payout.status?.toLowerCase?.() || 'unknown';
          }
        })() as 'paid' | 'processing' | 'pending' | string
      }))
    );

    return NextResponse.json({
      transactions: formattedTransactions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Failed to fetch earnings history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch earnings history' },
      { status: 500 }
    );
  }
}