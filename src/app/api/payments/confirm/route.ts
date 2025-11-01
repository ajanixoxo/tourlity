import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';
import stripe from '@/lib/stripe';
import { sendBookingConfirmationEmailToGuest, sendBookingConfirmationEmailToHost } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (user.role !== 'GUEST') {
      return NextResponse.json(
        { error: 'Only guests can confirm payments' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { paymentIntentId, tourId } = body;

    if (!paymentIntentId || !tourId) {
      return NextResponse.json(
        { error: 'Missing paymentIntentId or tourId' },
        { status: 400 }
      );
    }

    // Verify payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: `Payment not successful. Status: ${paymentIntent.status}` },
        { status: 400 }
      );
    }

    // Check if payment intent belongs to this user
    const metadata = paymentIntent.metadata as {
      tourId?: string;
      hostId?: string;
      guestId?: string;
      hostAmount?: string;
      platformFee?: string;
    };

    if (metadata.guestId !== user.id) {
      return NextResponse.json(
        { error: 'Payment intent does not belong to this user' },
        { status: 403 }
      );
    }

    if (metadata.tourId !== tourId) {
      return NextResponse.json(
        { error: 'Tour ID mismatch' },
        { status: 400 }
      );
    }

    // Fetch user details BEFORE transaction (to avoid transaction timeout)
    const [guestUser, transaction, tour] = await Promise.all([
      prisma.user.findUnique({
        where: { id: user.id },
        select: { email: true, firstName: true, lastName: true }
      }),
      prisma.platformTransaction.findFirst({
        where: { stripeRef: paymentIntentId }
      }),
      prisma.tour.findUnique({
        where: { id: tourId },
        include: {
          host: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      })
    ]);

    if (!transaction) {
      return NextResponse.json(
        { error: `No transaction found for payment: ${paymentIntentId}` },
        { status: 404 }
      );
    }

    if (!tour) {
      return NextResponse.json(
        { error: `Tour not found: ${tourId}` },
        { status: 404 }
      );
    }

    if (tour.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: `Tour is not active: ${tourId}` },
        { status: 400 }
      );
    }

    if (!guestUser) {
      return NextResponse.json(
        { error: 'Guest user not found' },
        { status: 404 }
      );
    }

    // Check if booking already exists
    const existingBooking = await prisma.booking.findFirst({
      where: {
        tourId: tourId,
        guestId: user.id,
        status: 'CONFIRMED'
      }
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Booking already exists for this payment' },
        { status: 400 }
      );
    }

    const hostAmount = parseFloat(metadata.hostAmount || '0');

    // Process critical updates in a shorter transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update transaction status to SUCCESS
      const updatedTransaction = await tx.platformTransaction.update({
        where: { id: transaction.id },
        data: {
          status: 'SUCCESS',
          description: `Successful tour payment for ${tourId}`,
          relatedTour: tourId
        }
      });

      // 2. Create booking
      const booking = await tx.booking.create({
        data: {
          tourId: tourId,
          guestId: user.id,
          status: 'CONFIRMED',
          amount: paymentIntent.amount / 100, // Convert from cents to dollars
          currency: paymentIntent.currency.toUpperCase(),
          paymentStatus: 'PAID',
          paymentMethod: paymentIntent.payment_method_types[0] || 'card',
          scheduledDate: new Date(),
          participants: 1,
        }
      });

      // 3. Update host wallet escrow balance
      // Get or create wallet
      let wallet = await tx.wallet.findUnique({
        where: { userId: metadata.hostId as string }
      });

      if (!wallet) {
        wallet = await tx.wallet.create({
          data: {
            userId: metadata.hostId as string,
            balance: 0,
            escrow: hostAmount,
            currency: 'USD'
          }
        });
      } else {
        wallet = await tx.wallet.update({
          where: { id: wallet.id },
          data: {
            escrow: { increment: hostAmount }
          }
        });
      }

      // 4. Create wallet transaction record
      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'EARNING',
          amount: hostAmount,
          currency: 'USD',
          status: 'COMPLETED',
          reference: paymentIntentId,
          description: `Tour payment earnings for ${tourId}`
        }
      });

      return {
        booking,
        transaction: updatedTransaction
      };
    }, {
      timeout: 10000, // 10 second timeout
    });

    // Create notifications outside transaction (non-critical)
    const notificationData = {
      bookingId: result.booking.id,
      tourId: tourId,
      tourTitle: tour.title
    } as Record<string, string>;

    try {
      await Promise.all([
        prisma.notification.create({
          data: {
            userId: user.id,
            title: 'Booking Confirmed',
            message: `Your booking for ${tour.title} has been confirmed.`,
            type: 'BOOKING_CONFIRMATION',
            data: notificationData
          }
        }),
        prisma.notification.create({
          data: {
            userId: metadata.hostId as string,
            title: 'New Booking',
            message: `You have a new booking for ${tour.title}.`,
            type: 'NEW_BOOKING',
            data: {
              ...notificationData,
              guestId: user.id
            } as Record<string, string>
          }
        })
      ]);
    } catch (notificationError) {
      console.error('Error creating notifications:', notificationError);
      // Don't fail the request if notifications fail
    }

    // 5. Send confirmation emails (outside transaction, async)
    if (guestUser && tour.host) {
      const confirmationNumber = `TVR${result.booking.id.substring(0, 8).toUpperCase()}`;
      
      // Send emails asynchronously (don't wait for them)
      Promise.all([
        sendBookingConfirmationEmailToGuest(
          guestUser.email,
          `${guestUser.firstName} ${guestUser.lastName}`,
          tour.title,
          confirmationNumber,
          result.booking.scheduledDate.toISOString(),
          result.booking.scheduledDate.toISOString(), // TODO: Use actual end date from tour
          result.booking.amount,
          `${tour.host.firstName} ${tour.host.lastName}`
        ),
        sendBookingConfirmationEmailToHost(
          tour.host.email,
          `${tour.host.firstName} ${tour.host.lastName}`,
          tour.title,
          `${guestUser.firstName} ${guestUser.lastName}`,
          guestUser.email,
          confirmationNumber,
          result.booking.scheduledDate.toISOString(),
          result.booking.scheduledDate.toISOString(),
          result.booking.amount
        )
      ])
      .then(() => {
        console.log(`Successfully sent confirmation emails for booking: ${result.booking.id}`);
      })
      .catch((error) => {
        console.error('Error sending confirmation emails:', error);
        // Don't fail the request if emails fail
      });
    }

    console.log(`Successfully confirmed payment: ${paymentIntentId}, created booking: ${result.booking.id}`);

    return NextResponse.json({
      success: true,
      booking: {
        id: result.booking.id,
        tourId: result.booking.tourId,
        status: result.booking.status,
        amount: result.booking.amount,
        scheduledDate: result.booking.scheduledDate
      },
      transaction: {
        id: result.transaction.id,
        status: result.transaction.status
      }
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}

