import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createPhysicalTour, TourCreationError } from '@/lib/services/tourService';
import { validateTourCreationData } from '@/lib/validations/tourValidation';
import { UserProfile } from '@/lib/stores/auth-store';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: UserProfile;
    try {
      payload = jwt.verify(token, JWT_SECRET) as UserProfile;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Parse and validate form data
    const formData = await request.formData();
    const validation = await validateTourCreationData(formData);

    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      }, { status: 400 });
    }

    // 3. Extract files from form data
    const tourImages = formData.getAll('tourImages') as File[];
    const hotelImages = formData.getAll('hotelImages') as File[];

    // 4. Create tour with all related data (pass the token)
    const result = await createPhysicalTour(
      {
        ...validation.data,
        groupSize: validation.data.groupSize ?? '', // Ensure groupSize is always a string
      },
      tourImages,
      hotelImages,
      payload.id,

    );

    // 5. Return success response
    return NextResponse.json({
      success: true,
      message: 'Tour created successfully',
      data: result
    }, { status: 201 });

  } catch (error) {
    console.error('Tour creation failed:', error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create tour',
      details: error instanceof TourCreationError ? error.details : undefined
    }, { status: 500 });
  }
}