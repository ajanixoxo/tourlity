import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const verifyResetOTPSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = verifyResetOTPSchema.parse(body);

    // Find the password reset OTP record
    const resetOTP = await prisma.passwordReset.findFirst({
      where: {
        email,
        token:otp,
      },
    });

    if (!resetOTP) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (resetOTP.expires < new Date()) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Optionally: check attempts and lock out if too many

    return NextResponse.json({ message: 'OTP verified' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}