import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || '3cc_0f7c_4464d1';

// Cache response for null user to avoid repeated processing
const NULL_USER_RESPONSE = NextResponse.json({ user: null }, { status: 200 });

export async function GET(request: NextRequest) {
  try {
    // Get JWT from cookie
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NULL_USER_RESPONSE;
    }

    // Verify JWT
    let payload: UserProfile | undefined;
    try {
      payload = jwt.verify(token, JWT_SECRET) as UserProfile;
    } catch {
      return NULL_USER_RESPONSE;
    }

    // Optimized DB query: only fetch fields we actually need
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        emailVerified: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        // Only fetch profile IDs, not entire profile objects
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

    if (!user) {
      return NULL_USER_RESPONSE;
    }

    // Build user profile efficiently
    const userProfile: UserProfile = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
      phone: user.phone ?? undefined,
      avatar: user.avatar ?? undefined,
      profile: user.hostProfile?.id ?? 
               user.facilitatorProfile?.id ?? 
               user.translatorProfile?.id ?? 
               user.adminProfile?.id ?? 
               undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(userProfile, { 
      status: 200,
      headers: {
        // Add cache headers if appropriate for your use case
        'Cache-Control': 'private, no-cache, must-revalidate',
      }
    });
  } catch {
    return NULL_USER_RESPONSE;
  }
}