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

    // Get available transactions
    const transactions = await prisma.walletTransaction.findMany({
      where: {
        wallet: {
          userId: currentUser.id
        },
        type: 'EARNING',
        status: 'COMPLETED',
        payoutStatus: 'AVAILABLE'
      },
      select: {
        id: true,
        createdAt: true,
        amount: true,
        netAmount: true,
        platformFee: true,
        currency: true,
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
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    // Get total count for pagination
    const total = await prisma.walletTransaction.count({
      where: {
        wallet: {
          userId: currentUser.id
        },
        type: 'EARNING',
        status: 'COMPLETED',
        payoutStatus: 'AVAILABLE'
      }
    });

    // Calculate totals
    const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const totalNetAmount = transactions.reduce((sum, tx) => sum + tx.netAmount, 0);
    const totalPlatformFees = transactions.reduce((sum, tx) => sum + tx.platformFee, 0);

    // Format transactions
    const formattedTransactions = transactions.map(tx => ({
      id: tx.id,
      date: tx.createdAt.toISOString(),
      serviceType: tx.serviceType || 'TOUR',
      serviceName: tx.booking?.tour?.title || 'Unknown Service',
      amount: {
        total: tx.amount,
        platformFee: tx.platformFee,
        net: tx.netAmount,
        currency: tx.currency
      }
    }));

    return NextResponse.json({
      transactions: formattedTransactions,
      totals: {
        gross: totalAmount,
        platformFees: totalPlatformFees,
        net: totalNetAmount,
        currency: transactions[0]?.currency || 'USD'
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Failed to fetch available transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available transactions' },
      { status: 500 }
    );
  }
}