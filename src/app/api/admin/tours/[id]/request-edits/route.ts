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
    const body = await request.json();
    const { reason } = body;

    if (!reason || reason.trim().length === 0) {
      return NextResponse.json(
        { error: 'Edit request reason is required' },
        { status: 400 }
      );
    }

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

    // Update tour status to DRAFT (so host can edit)
    const updatedTour = await prisma.tour.update({
      where: { id },
      data: {
        status: 'DRAFT',
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

    // TODO: Send notification to host about edit request with reason
    // This could be implemented with email service or in-app notifications

    return NextResponse.json({
      success: true,
      message: 'Edit request sent successfully',
      data: updatedTour
    });

  } catch (error) {
    console.error('Error requesting tour edits:', error);
    return NextResponse.json(
      { error: 'Failed to request tour edits' },
      { status: 500 }
    );
  }
}
