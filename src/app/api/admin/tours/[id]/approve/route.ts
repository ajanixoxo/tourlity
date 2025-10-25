import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerUser } from '@/lib/get-server-user';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getServerUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    // Check if tour exists and is in pending approval status
    const tour = await prisma.tour.findUnique({
      where: { id },
      select: { id: true, status: true, title: true }
    });

    if (!tour) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }

    if (tour.status !== 'PENDING_APPROVAL') {
      return NextResponse.json(
        { error: 'Tour is not in pending approval status' },
        { status: 400 }
      );
    }

    // Update tour status to APPROVED
    const updatedTour = await prisma.tour.update({
      where: { id },
      data: {
        status: 'ACTIVE',
        updatedAt: new Date()
      },
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
    });

    return NextResponse.json({
      success: true,
      message: 'Tour approved successfully',
      data: updatedTour
    });

  } catch (error) {
    console.error('Error approving tour:', error);
    return NextResponse.json(
      { error: 'Failed to approve tour' },
      { status: 500 }
    );
  }
}
