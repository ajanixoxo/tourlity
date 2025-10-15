import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

const ITEMS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getServerUser();
    if (!currentUser) {
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
      wallet: {
        userId: currentUser.id
      },
      type: 'EARNING'
    } as any;

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

    // Get wallet transactions
    const transactions = await prisma.walletTransaction.findMany({
      where,
      select: {
        id: true,
        createdAt: true,
        amount: true,
        netAmount: true,
        platformFee: true,
        currency: true,
        status: true,
        payoutStatus: true,
        payoutId: true,
        serviceType: true,
        booking: {
          select: {
            id: true,
            tour: {
              select: {
                title: true,
                type: true,
                hostId: true,
                host: {
                  select: {
                    firstName: true,
                    lastName: true
                  }
                }
              }
            },
            guest: {
              select: {
                id: true,
                firstName: true,
                lastName: true
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
    const total = await prisma.walletTransaction.count({ where });

    // Format transactions
    const formattedTransactions = transactions.map(tx => ({
      id: tx.id,
      date: tx.createdAt.toISOString(),
      serviceType: tx.serviceType || 'TOUR',
      serviceName: tx.booking?.tour?.title || 'Unknown Service',
      client: tx.booking?.guest ? {
        id: tx.booking.guest.id,
        name: `${tx.booking.guest.firstName} ${tx.booking.guest.lastName}`
      } : null,
      amount: {
        total: tx.amount,
        platformFee: tx.platformFee,
        net: tx.netAmount,
        currency: tx.currency
      },
      status: tx.status,
      payoutStatus: tx.payoutStatus,
      payoutId: tx.payoutId
    }));

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
    console.error('Failed to fetch earnings transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch earnings transactions' },
      { status: 500 }
    );
  }
}