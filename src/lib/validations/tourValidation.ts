import { z } from 'zod';
// ADD THESE TYPE DEFINITIONS HERE:
type ValidationSuccess = {
  success: true;
  data: z.infer<typeof tourCreationSchema> & {
    tourImages: File[];
    hotelImages: File[]
  };
};

type ValidationError = {
  success: false;
  errors: string[];
};

type ValidationResult = ValidationSuccess | ValidationError;
// Time format validation regex
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Basic info validation schema
export const tourBasicInfoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  type: z.enum(["PHYSICAL", "VIRTUAL"]),
  description: z.string().min(50, "Description must be at least 50 characters").max(1000),
  location: z.string().min(2, "Location is required"),
  country: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  duration: z.string(),
  groupSize: z.string().optional(),
  giveFacilitatorAccess: z.union([z.boolean(), z.string()]).transform(val =>
    typeof val === 'string' ? val === 'true' : val
  ),
  coverageAreas: z.array(z.string()).min(1, "At least one coverage area required"),
  amenities: z.array(z.string()).min(1, "At least one amenity required"),
  languages: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
});

// Itinerary day validation schema
export const itineraryDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  todo: z.string().min(5, "Activity description required"),
  hotelLocation: z.string().min(2, "Hotel location required"),
  description: z.string().min(20, "Day description required").max(1000),
  arrivalTime: z.string().regex(timeRegex, "Invalid time format (HH:MM)"),
  pickupTime: z.string().regex(timeRegex, "Invalid time format (HH:MM)"),
  inclusive: z.string().optional(),
  exclusive: z.string().optional()
});

// Accommodation validation schema
export const accommodationSchema = z.object({
  hotelName: z.string().min(2, "Hotel name required"),
  hotelLocation: z.string().min(2, "Hotel location required"),
  description: z.string().min(20, "Description required").max(1000),
  arrivalTime: z.string().regex(timeRegex, "Invalid time format (HH:MM)"),
  pickupTime: z.string().regex(timeRegex, "Invalid time format (HH:MM)")
});

// Helper function to validate date range
const validateDateRange = (data: z.infer<typeof tourBasicInfoSchema>) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  if (endDate <= startDate) {
    throw new Error("End date must be after start date");
  }
  return true;
};

// Helper function to validate itinerary days match date range
const validateItineraryDays = (
  data: z.infer<typeof tourBasicInfoSchema>,
  itinerary: z.infer<typeof itineraryDaySchema>[]
) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const daysDiff = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  if (itinerary.length !== daysDiff) {
    throw new Error(
      `Itinerary must have exactly ${daysDiff} days to match the date range`
    );
  }
  return true;
};

// File validation schema
export const fileValidationSchema = z.object({
  type: z.string().refine(
    (type) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(type),
    "Invalid file type. Only jpg, jpeg, png, gif, and webp are allowed"
  ),
  size: z.number().max(5 * 1024 * 1024, "File size must be less than 5MB")
});

// Complete tour creation validation schema
export const tourCreationSchema = tourBasicInfoSchema.extend({
  itinerary: z.array(itineraryDaySchema)
    .min(1, "At least one itinerary day required"),
  accommodation: accommodationSchema
}).refine(validateDateRange, {
  message: "End date must be after start date"
}).refine(
  (data) => {
    if (data.type === "PHYSICAL") {
      return data.itinerary.length > 0;
    }
    return true;
  },
  {
    message: "Physical tours must have an itinerary"
  }
).refine(
  (data) => {
    if (data.type === "VIRTUAL") {
      return !data.accommodation;
    }
    return true;
  },
  {
    message: "Virtual tours should not have accommodation details"
  }
);

// Function to validate the complete tour creation data
export async function validateTourCreationData(formData: FormData): Promise<ValidationResult> {
  try {
    // Parse and validate basic info
    const basicData = {
      title: formData.get('title'),
      type: formData.get('type'),
      description: formData.get('description'),
      location: formData.get('location'),
      country: formData.get('country'),
      price: parseFloat(formData.get('price') as string),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      duration: formData.get('duration') ,
      groupSize: formData.get('groupSize') || undefined,
      giveFacilitatorAccess: formData.get('giveFacilitatorAccess'),
      coverageAreas: JSON.parse(formData.get('coverageAreas') as string),
      amenities: JSON.parse(formData.get('amenities') as string),
      languages: JSON.parse(formData.get('languages') as string),
      categories: JSON.parse(formData.get('categories') as string),
    };

    // Parse and validate itinerary if present
    const itineraryStr = formData.get('itinerary');
    const itinerary = itineraryStr ? JSON.parse(itineraryStr as string) : [];

    // Parse and validate accommodation if present
    const accommodationStr = formData.get('accommodation');
    const accommodation = accommodationStr ? JSON.parse(accommodationStr as string) : null;

    // Validate files
    const tourImages = formData.getAll('tourImages') as File[];
    const hotelImages = formData.getAll('hotelImages') as File[];

    if (tourImages.length === 0) {
      throw new Error("At least one tour image is required");
    }

    // Validate each tour image
    for (const file of tourImages) {
      await fileValidationSchema.parseAsync({
        type: file.type,
        size: file.size
      });
    }

    // Validate each hotel image if present
    if (hotelImages.length > 0) {
      for (const file of hotelImages) {
        await fileValidationSchema.parseAsync({
          type: file.type,
          size: file.size
        });
      }
    }

    // Validate the complete data
    const validatedData = tourCreationSchema.parse({
      ...basicData,
      itinerary,
      accommodation
    });

    // Validate itinerary days match date range for physical tours
    if (validatedData.type === "PHYSICAL") {
      validateItineraryDays(validatedData, itinerary);
    }

    return {
      success: true,
      data: {
        ...validatedData,
        tourImages,
        hotelImages
      }
    };
  } catch (error) {
    return {
      success: false,
      errors: error instanceof Error ? [error.message] : ['Validation failed']
    };
  }
}