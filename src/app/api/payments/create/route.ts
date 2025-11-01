import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import stripe from '@/lib/stripe';
import { calculatePlatformFee } from '@/lib/payment-utils';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || '3cc_0f7c_4464d1';

const createPaymentSchema = z.object({
  tourId: z.string().min(1, "Tour ID is required"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default('USD'),
});

export async function POST(request: NextRequest) {
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
      return NextResponse.json({ error: 'Only guests can make tour payments' }, { status: 403 });
    }

    // Validate request body
    const body = await request.json();
    const { tourId, amount, currency } = createPaymentSchema.parse(body);

    // Fetch tour details and validate
    const tour = await prisma.tour.findUnique({
      where: { id: tourId },
      select: {
        id: true,
        hostId: true,
        price: true,
        status: true,
        bookings: {
          where: {
            guestId: user.id,
            status: 'CONFIRMED'
          }
        }
      }
    });

    // Validate tour exists and is available
    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    if (tour.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Tour is not available for booking' }, { status: 400 });
    }

    // Check if user already has a confirmed booking
    if (tour.bookings.length > 0) {
      return NextResponse.json({ error: 'You already have a confirmed booking for this tour' }, { status: 400 });
    }

    // Validate amount matches tour price
    if (amount !== tour.price) {
      return NextResponse.json({
        error: 'Payment amount does not match tour price',
        expected: tour.price,
        received: amount
      }, { status: 400 });
    }

    // Calculate platform fee (10%)
    const platformFee = calculatePlatformFee(amount);
    const hostAmount = amount - platformFee;

    // Convert amount to cents (Stripe requires amounts in smallest currency unit)
    // If amount is in dollars (e.g., 2000 = $2000), convert to cents (200000)
    // If amount is already in cents, no conversion needed
    // We'll assume amount is in dollars and convert to cents
    const amountInCents = Math.round(amount * 100);

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        tourId,
        platformFee: platformFee.toString(),
        hostAmount: hostAmount.toString(),
        guestId: user.id,
        hostId: tour.hostId
      },
    });

    // Create platform transaction record
    const transaction = await prisma.platformTransaction.create({
      data: {
        type: 'TOUR_PAYMENT',
        amount,
        currency,
        status: 'PENDING', // Will be updated by webhook
        stripeRef: paymentIntent.id,
        relatedTour: tourId,
        relatedUser: user.id, // Guest user who made the payment
        description: `Tour payment for ${tourId} by ${user.id}`,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction.id,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}