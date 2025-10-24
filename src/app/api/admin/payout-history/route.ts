import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

const ITEMS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE));
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build filters
    const where: any = {};

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

    // Add search filter
    if (search) {
      where.OR = [
        {
          user: {
            firstName: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          user: {
            lastName: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          user: {
            email: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      ];
    }

    // Get payouts with user information
    const payouts = await prisma.payout.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
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

    // Format payouts for admin view
    const formattedPayouts = payouts.map(payout => ({
      id: payout.id,
      name: `${payout.user.firstName} ${payout.user.lastName}`,
      role: payout.user.role === 'HOST' ? 'Host' : 
            payout.user.role === 'FACILITATOR' ? 'Facilitator' : 
            payout.user.role === 'TRANSLATOR' ? 'Translator' : 'User',
      amount: payout.amount,
      date: payout.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }),
      status: payout.status === 'PAID' ? 'Paid' : 
              payout.status === 'PENDING' ? 'Pending' : 
              payout.status === 'FAILED' ? 'Failed' : 'Unknown',
      email: payout.user.email,
      userId: payout.user.id
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
    console.error('Admin payout history fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch payout history' }, { status: 500 });
  }
}
