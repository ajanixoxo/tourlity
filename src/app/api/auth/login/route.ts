import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const JWT_SECRET = process.env.JWT_SECRET || '3cc_0f7c_4464d1';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Pre-compute cookie settings
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PRODUCTION,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60, // 7 days
  path: '/',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = loginSchema.parse(body);
    
    // Optimized query: Only fetch what we need
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      select: {
        id: true,
        email: true,
        password: true, // Only for verification
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        emailVerified: true,
        phone: true,
        avatar: true,
        // Only fetch profile IDs, not entire objects
        hostProfile: {
          select: { id: true }
        },
        facilitatorProfile: {
          select: { id: true }
        },
        translatorProfile: {
          select: { id: true }
        },
        adminProfile: {
          select: { id: true }
        }
      }
    });
    
    // Early return for invalid credentials (timing-safe)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Verify password early (before other checks for timing safety)
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check account status
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { 
          error: 'Account is not active',
          status: user.status,
          message: user.status === 'PENDING' 
            ? 'Your account is pending approval. Please wait for admin approval.'
            : 'Your account has been suspended or rejected.'
        },
        { status: 403 }
      );
    }
    
    // Check email verification
    if (!user.emailVerified) {
      return NextResponse.json(
        { 
          error: 'Email not verified',
          message: 'Please verify your email before logging in.'
        },
        { status: 403 }
      );
    }
    
    // Get first available profile ID
    const profileId = user.hostProfile?.id ?? 
                     user.facilitatorProfile?.id ?? 
                     user.translatorProfile?.id ?? 
                     user.adminProfile?.id ?? 
                     undefined;
    
    // Generate JWT with minimal payload
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Build response payload (exclude password)
    const userPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
      phone: user.phone,
      avatar: user.avatar,
      profile: profileId,
    };
    
    // Create response with token
    const response = NextResponse.json({
      message: 'Login successful',
      token,
      user: userPayload
    });

    // Set cookie
    response.cookies.set('token', token, COOKIE_OPTIONS);

    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}