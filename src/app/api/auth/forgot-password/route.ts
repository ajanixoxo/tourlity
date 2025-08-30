import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import {sendResetEmail} from '@/lib/email';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // For security, do not reveal if user exists
      return NextResponse.json({ message: 'If this email exists, a reset link has been sent.' });
    }

    // Generate a secure OTP or token
   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    // Delete any previous reset tokens for this email
    await prisma.passwordReset.deleteMany({ where: { email } });

    // Save new reset token
    await prisma.passwordReset.create({
      data: {
        email,
        token:otp,
        expires,
      },
    });

    // Send email with token (as link or code)
    await sendResetEmail(email, otp);

    return NextResponse.json({ message: 'If this email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
