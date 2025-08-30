import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function GET(request: NextRequest) {
  try {
    // Get JWT from cookie
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    // Verify JWT
    let payload: UserProfile | undefined;
    try {
      payload = jwt.verify(token, JWT_SECRET) as UserProfile;
    } catch {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    // Fetch user from DB for up-to-date info
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        hostProfile: true,
        facilitatorProfile: true,
        translatorProfile: true,
        adminProfile: true,
      }
    });
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    // Return user profile (same as login)
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
      profile: (user.hostProfile?.id || user.facilitatorProfile?.id || user.translatorProfile?.id || user.adminProfile?.id) ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return NextResponse.json(userProfile, { status: 200 });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
