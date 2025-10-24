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

    // Get date range from query params (default to current month)
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const now = new Date();
    const monthStart = startDate ? new Date(startDate) : new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = endDate ? new Date(endDate) : new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Get total payouts (completed payouts)
    const totalPayouts = await prisma.payout.aggregate({
      where: {
        status: 'PAID',
        createdAt: {
          gte: monthStart,
          lte: monthEnd
        }
      },
      _sum: {
        amount: true
      }
    });

    // Get pending refunds (bookings with refund status)
    const pendingRefunds = await prisma.booking.count({
      where: {
        status: 'REFUNDED',
        updatedAt: {
          gte: monthStart,
          lte: monthEnd
        }
      }
    });

    // Get top earner (user with highest total earnings)
    const topEarner = await prisma.walletTransaction.aggregate({
      where: {
        type: 'EARNING',
        status: 'COMPLETED',
        createdAt: {
          gte: monthStart,
          lte: monthEnd
        }
      },
      _sum: {
        netAmount: true
      }
    });

    // Get top earner user details
    const topEarnerUser = await prisma.walletTransaction.findFirst({
      where: {
        type: 'EARNING',
        status: 'COMPLETED',
        createdAt: {
          gte: monthStart,
          lte: monthEnd
        }
      },
      orderBy: {
        netAmount: 'desc'
      },
      select: {
        wallet: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    const metrics = {
      totalPayouts: totalPayouts._sum.amount || 0,
      pendingRefunds,
      topEarner: topEarner._sum.netAmount || 0,
      topEarnerName: topEarnerUser ? 
        `${topEarnerUser.wallet.user.firstName} ${topEarnerUser.wallet.user.lastName}` : 
        'No earnings yet',
      period: startDate && endDate ? 'Custom Period' : 'This Month'
    };

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Admin payment metrics fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch payment metrics' }, { status: 500 });
  }
}
