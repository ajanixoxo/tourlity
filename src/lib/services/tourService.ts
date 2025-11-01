import { prisma } from '@/lib/prisma';
import { ImageUploadService, UploadedImage } from './imageUploadService';
import { TourType, UserRole } from '@prisma/client';
import { TourCreationData, ValidatedItineraryDay } from '@/types/tour';

export class TourCreationError extends Error {
  constructor(message: string, public details?: string[]) {
    super(message);
    this.name = 'TourCreationError';
  }
}

export interface TourCreationResult {
  tourId: string;
  title: string;
  status: string;
  createdAt: Date;
}

export async function validateUserCanCreateTour(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true }
  });

  if (!user) {
    throw new TourCreationError('User not found');
  }

  if (user.role !== UserRole.HOST) {
    throw new TourCreationError('Only hosts can create tours');
  }
}

export async function createPhysicalTour(
  data: TourCreationData,
  tourImages: File[],
  hotelImages: File[],
  userId: string,
): Promise<TourCreationResult> {
  // Ensure user can create tour
  await validateUserCanCreateTour(userId);

  let uploadedTourImages: UploadedImage[] = [];
  let uploadedHotelImages: UploadedImage[] = [];

  try {
    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the tour first to get the ID
      const tour = await tx.tour.create({
        data: {
          hostId: userId,
          title: data.title,
          description: data.description,
          type: data.type as TourType,
          price: data.price,
          location: data.location,
          country: data.country,
          languages: data.languages,
          categories: data.categories,
          duration: data.duration,
          groupSize: data.groupSize,
          startDate: data.startDate,
          endDate: data.endDate,
          coverageAreas: data.coverageAreas,
          amenities: data.amenities,
          giveFacilitatorAccess: data.giveFacilitatorAccess,
            status: 'PENDING_APPROVAL',
          images: []
        }
      });

      // 2. Upload tour images (pass authToken here)
      uploadedTourImages = await ImageUploadService.uploadTourImages(
        tourImages,
        tour.id,
        'tour-images'
         // Pass the token
      );

      // 3. Upload hotel images if this is a physical tour (pass authToken here)
      if (data.type === TourType.PHYSICAL && hotelImages.length > 0) {
        uploadedHotelImages = await ImageUploadService.uploadTourImages(
          hotelImages,
          tour.id,
          'hotel-images'
           // Pass the token
        );
      }

      // 4. Update tour with image URLs
      await tx.tour.update({
        where: { id: tour.id },
        data: {
          images: uploadedTourImages.map(img => img.url)
        }
      });

      // 5. Create itinerary days
      if (data.type === TourType.PHYSICAL && data.itinerary?.length > 0) {
        await tx.itineraryDay.createMany({
          data: data.itinerary.map((day: ValidatedItineraryDay) => ({
            tourId: tour.id,
            dayNumber: day.dayNumber,
            todo: day.todo,
            hotelLocation: day.hotelLocation,
            description: day.description,
            arrivalTime: day.arrivalTime,
            pickupTime: day.pickupTime,
            inclusive: day.inclusive,
            exclusive: day.exclusive
          }))
        });
      }

      // 6. Create accommodation if provided
      if (data.type === TourType.PHYSICAL && data.accommodation) {
        await tx.accommodation.create({
          data: {
            tourId: tour.id,
            hotelName: data.accommodation.hotelName,
            hotelLocation: data.accommodation.hotelLocation,
            description: data.accommodation.description,
            arrivalTime: data.accommodation.arrivalTime,
            pickupTime: data.accommodation.pickupTime,
            hotelImages: uploadedHotelImages.map(img => img.url)
          }
        });
      }

      return {
        tourId: tour.id,
        title: tour.title,
        status: tour.status,
        createdAt: tour.createdAt
      };
    });

    return result;
  } catch (error) {
    // If anything fails, delete uploaded images (pass authToken here too)
    await Promise.all([
      ImageUploadService.deleteUploadedImages(uploadedTourImages),
      ImageUploadService.deleteUploadedImages(uploadedHotelImages)
    ]);

    throw new TourCreationError(
      'Failed to create tour',
      [error instanceof Error ? error.message : 'Unknown error']
    );
  }
}