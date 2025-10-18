import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripe from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

// Define webhook event types for better type safety
type WebhookEventType = 
  | 'payment_intent.succeeded'
  | 'payment_intent.payment_failed'
  | 'payout.paid'
  | 'payout.failed';

// Define metadata interface for type safety
interface PaymentMetadata {
  tourId?: string;
  hostId?: string;
  hostAmount?: string;
  platformFee?: string;
  guestId?: string;
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    ) as Stripe.Event & { type: WebhookEventType };

    // Log incoming webhook event
    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata as PaymentMetadata;
        
        // Validate and extract required metadata
        const tourId = metadata.tourId;
        const hostId = metadata.hostId;
        const guestId = metadata.guestId;
        const hostAmount = metadata.hostAmount;

        if (!tourId || !hostId || !hostAmount || !guestId) {
          console.error('Missing required metadata in payment intent:', paymentIntent.id);
          return NextResponse.json(
            { error: 'Invalid payment metadata' },
            { status: 400 }
          );
        }

        // Start transaction to ensure data consistency
        await prisma.$transaction(async (tx) => {
          // Validate tour status and details
          const tour = await tx.tour.findUnique({
            where: { id: metadata.tourId },
            include: {
              bookings: {
                where: {
                  guestId: metadata.guestId,
                  status: 'CONFIRMED'
                }
              }
            }
          });

          if (!tour) {
            throw new Error(`Tour not found: ${metadata.tourId}`);
          }

          if (tour.status !== 'ACTIVE') {
            throw new Error(`Tour is not active: ${metadata.tourId}`);
          }

          // Check for existing bookings
          if (tour.bookings.length > 0) {
            throw new Error(`Guest already has a confirmed booking for tour: ${metadata.tourId}`);
          }

          // Validate payment amount
          const expectedAmount = tour.price;
          if (paymentIntent.amount !== Math.round(expectedAmount * 100)) { // Stripe amounts are in cents
            throw new Error(`Payment amount mismatch. Expected: ${expectedAmount}, Got: ${paymentIntent.amount / 100}`);
          }

          // Validate guest user
          const guest = await tx.user.findUnique({
            where: { id: metadata.guestId }
          });

          if (!guest) {
            throw new Error(`Guest user not found: ${metadata.guestId}`);
          }

          if (guest.role !== 'GUEST') {
            throw new Error(`Invalid user role for guest: ${metadata.guestId}`);
          }
          // Find the transaction
          const transaction = await tx.platformTransaction.findFirst({
            where: { stripeRef: paymentIntent.id }
          });

          if (!transaction) {
            throw new Error(`No transaction found for payment: ${paymentIntent.id}`);
          }

          // Create booking
          const booking = await tx.booking.create({
            data: {
              tourId: tourId,
              guestId: guestId,
              status: 'CONFIRMED',
              amount: paymentIntent.amount / 100, // Convert from cents to dollars
              currency: paymentIntent.currency.toUpperCase(),
              paymentStatus: 'PAID',
              paymentMethod: paymentIntent.payment_method_types[0] || 'card',
              scheduledDate: new Date(), // TODO: Get from metadata if available
              participants: 1, // TODO: Get from metadata if available
            }
          });

          // Update transaction with booking reference
          await tx.platformTransaction.update({
            where: { id: transaction.id },
            data: {
              type: 'TOUR_PAYMENT',
              description: `Successful tour payment for ${tourId}`,
              relatedTour: tourId
            }
          });

          // Create notifications
          const notificationData = {
            bookingId: booking.id,
            tourId: tourId,
            tourTitle: tour.title
          } as Record<string, string>;

          // Guest notification
          await tx.notification.create({
            data: {
              userId: guestId,
              title: 'Booking Confirmed',
              message: `Your booking for ${tour.title} has been confirmed.`,
              type: 'BOOKING_CONFIRMATION',
              data: notificationData
            }
          });

          // Host notification
          await tx.notification.create({
            data: {
              userId: hostId,
              title: 'New Booking',
              message: `You have a new booking for ${tour.title}.`,
              type: 'NEW_BOOKING',
              data: {
                ...notificationData,
                guestId
              } as Record<string, string>
            }
          });

          // Get or create wallet
          let wallet = await tx.wallet.findUnique({
            where: { userId: metadata.hostId }
          });

          if (!wallet) {
            wallet = await tx.wallet.create({
              data: {
                userId: metadata.hostId as string,
                balance: 0,
                escrow: Number(metadata.hostAmount),
                currency: 'USD'
              }
            });
          } else {
            wallet = await tx.wallet.update({
              where: { id: wallet.id },
              data: {
                escrow: { increment: Number(metadata.hostAmount) }
              }
            });
          }

          // Create wallet transaction record
          await tx.walletTransaction.create({
            data: {
              walletId: wallet.id,
              type: 'EARNING',
              amount: Number(metadata.hostAmount),
              currency: 'USD',
              status: 'COMPLETED',
              reference: paymentIntent.id,
              // relatedTour: metadata.tourId,
              description: `Tour payment earnings for ${metadata.tourId}`
            }
          });
        });

        console.log(`Successfully processed payment: ${paymentIntent.id}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        await prisma.$transaction(async (tx) => {
          // Find and update the transaction
          const transaction = await tx.platformTransaction.findFirst({
            where: { stripeRef: paymentIntent.id }
          });

          if (transaction) {
            await tx.platformTransaction.update({
              where: { id: transaction.id },
              data: {
                type: 'FAILED_PAYMENT',
                description: `Failed payment: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`
              }
            });
          }
        });

        console.log(`Payment failed for: ${paymentIntent.id}`);
        break;
      }

      case 'payout.paid': {
        const payout = event.data.object as Stripe.Payout;
        
        await prisma.$transaction(async (tx) => {
          const payoutRecord = await tx.payout.findFirst({
            where: { stripePayoutId: payout.id }
          });

          if (payoutRecord) {
            // Update payout status
            await tx.payout.update({
              where: { id: payoutRecord.id },
              data: { status: 'PAID' }
            });

            // Create wallet transaction record for the payout
            const wallet = await tx.wallet.findUnique({
              where: { userId: payoutRecord.userId }
            });

            if (wallet) {
              await tx.walletTransaction.create({
                data: {
                  walletId: wallet.id,
                  type: 'WITHDRAWAL',
                  amount: payoutRecord.amount,
                  currency: payoutRecord.currency,
                  status: 'COMPLETED',
                  reference: payout.id,
                  description: `Successful payout to host`
                }
              });
            }
          }
        });

        console.log(`Payout completed: ${payout.id}`);
        break;
      }

      case 'payout.failed': {
        const payout = event.data.object as Stripe.Payout;
        
        await prisma.$transaction(async (tx) => {
          const payoutRecord = await tx.payout.findFirst({
            where: { stripePayoutId: payout.id }
          });

          if (payoutRecord) {
            // Update payout status
            await tx.payout.update({
              where: { id: payoutRecord.id },
              data: {
                status: 'FAILED'
              }
            });

            // Restore the balance to the wallet
            const wallet = await tx.wallet.findUnique({
              where: { userId: payoutRecord.userId }
            });

            if (wallet) {
              await tx.wallet.update({
                where: { id: wallet.id },
                data: {
                  balance: { increment: payoutRecord.amount }
                }
              });

              // Record the failed withdrawal
              await tx.walletTransaction.create({
                data: {
                  walletId: wallet.id,
                  type: 'FAILED',
                  amount: payoutRecord.amount,
                  currency: payoutRecord.currency,
                  status: 'FAILED',
                  reference: payout.id,
                  description: `Failed payout - ${payout.failure_message || 'Unknown error'}`
                }
              });
            }
          }
        });

        console.log(`Payout failed: ${payout.id}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    
    // Handle specific error types
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: 'Stripe API Error', message: error.message },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      // Handle transaction or validation errors
      return NextResponse.json(
        { error: 'Processing Error', message: error.message },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}