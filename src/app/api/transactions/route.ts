import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // PENDING, SUCCESS, FAILED
    const type = searchParams.get('type'); // TOUR_PAYMENT, etc.

    const skip = (page - 1) * limit;

    // Build where clause based on user role
    const where: any = {};

    if (user.role === 'GUEST') {
      // Guest sees their own transactions
      where.relatedUser = user.id;
    } else if (user.role === 'HOST') {
      // Host sees transactions for their tours
      where.relatedTour = {
        hostId: user.id
      };
    }
    // ADMIN can see all transactions (no filter)

    // Add status filter if provided
    if (status) {
      where.status = status;
    }

    // Add type filter if provided
    if (type) {
      where.type = type;
    }

    // Get total count
    const total = await prisma.platformTransaction.count({ where });

    // Get transactions with related data
    const transactions = await prisma.platformTransaction.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });

    // Fetch related tour and user details
    const transactionsWithDetails = await Promise.all(
      transactions.map(async (transaction) => {
        const details: any = {
          ...transaction
        };

        // Fetch tour details if relatedTour exists
        if (transaction.relatedTour) {
          const tour = await prisma.tour.findUnique({
            where: { id: transaction.relatedTour },
            select: {
              id: true,
              title: true,
              hostId: true,
              host: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  avatar: true
                }
              }
            }
          });
          details.tour = tour;
        }

        // Fetch related user details if relatedUser exists
        if (transaction.relatedUser) {
          const relatedUser = await prisma.user.findUnique({
            where: { id: transaction.relatedUser },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true
            }
          });
          details.user = relatedUser;
        }

        return details;
      })
    );

    return NextResponse.json({
      transactions: transactionsWithDetails,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
