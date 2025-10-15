import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const ITEMS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    // Get JWT from cookie
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify JWT
    let payload: UserProfile;
    try {
      payload = jwt.verify(token, JWT_SECRET) as UserProfile;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Verify user exists and is a guest
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, role: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    if (user.role !== 'GUEST') {
      return NextResponse.json({ error: 'Only guests can access this endpoint' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || String(ITEMS_PER_PAGE));

    // Validate pagination parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: 'Invalid page number' }, { status: 400 });
    }

    if (isNaN(pageSize) || pageSize < 1 || pageSize > 50) {
      return NextResponse.json({ error: 'Invalid page size' }, { status: 400 });
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Get total count for pagination
    const totalItems = await prisma.platformTransaction.count({
      where: {
        type: 'TOUR_PAYMENT',
        relatedUser: user.id
      }
    });

    // Get transactions with related data
    const transactions = await prisma.$transaction(async (tx) => {
      const platformTransactions = await tx.platformTransaction.findMany({
        where: {
          type: 'TOUR_PAYMENT',
          relatedUser: user.id
        },
        select: {
          id: true,
          amount: true,
          currency: true,
          type: true,
          createdAt: true,
          relatedTour: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: pageSize
      });

      // Fetch tour details for each transaction
      const transactionsWithTours = await Promise.all(
        platformTransactions.map(async (transaction) => {
          if (!transaction.relatedTour) {
            return {
              ...transaction,
              tourDetails: null
            };
          }

          const tour = await tx.tour.findUnique({
            where: { id: transaction.relatedTour },
            select: {
              id: true,
              title: true,
              hostId: true,
              host: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          });

          return {
            ...transaction,
            tourDetails: tour
          };
        })
      );

      return transactionsWithTours;
    });

    // Format the response
    const formattedTransactions = transactions.map(transaction => ({
      id: transaction.id,
      date: transaction.createdAt.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      experience: {
        id: transaction.tourDetails?.id || '',
        title: transaction.tourDetails?.title || 'Deleted Tour'
      },
      host: transaction.tourDetails?.host ? {
        id: transaction.tourDetails.host.id,
        name: `${transaction.tourDetails.host.firstName} ${transaction.tourDetails.host.lastName}`
      } : {
        id: '',
        name: 'Unknown Host'
      },
      amount: {
        value: transaction.amount,
        currency: transaction.currency
      },
      paymentMethod: 'Stripe',
      status: transaction.type === 'TOUR_PAYMENT' ? 'COMPLETED' : 'FAILED'
    }));

    return NextResponse.json({
      transactions: {
        items: formattedTransactions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / pageSize),
          totalItems,
          itemsPerPage: pageSize
        }
      }
    });

  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}