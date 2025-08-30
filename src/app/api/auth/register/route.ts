import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { generateOTP, sendOTPEmail } from '@/lib/email'
import { parseMultipartFormData } from '@/lib/multipart-parser';
import { uploadCertification } from '@/lib/supabase-storage'

// Base validation schema for all users
const baseSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['GUEST', 'HOST', 'FACILITATOR', 'TRANSLATOR']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Guest-specific schema
const guestSchema = baseSchema.safeExtend({
  role: z.literal('GUEST'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  language: z.string().min(1, 'Language is required'),
  age: z.string().min(1, 'Age is required'),
  travelStyle: z.string().min(1, 'Travel style is required'),
  personalizedExperience: z.enum(['yes', 'no']),
  disability: z.enum(['yes', 'no']),
  disabilityType: z.string().optional(),
});

// Host-specific schema
const hostSchema = baseSchema.safeExtend({
  role: z.literal('HOST'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  contactPersonName: z.string().min(2, 'Contact person name must be at least 2 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  language: z.string().min(1, 'Language is required'),
  priceRange: z.string().min(1, 'Price range is required'),
  age: z.string().min(1, 'Age is required'),
  country: z.string().min(1, 'Country is required'),
  shortBio: z.string().min(1, 'Short bio is required'),
  experienceTitle: z.string().min(1, 'Experience title is required'),
  typeOfExperience: z.string().min(1, 'Type of experience is required'),
  availability: z.string().min(1, 'Availability is required'),
  hotelImages: z.any().optional(), // File upload
  certifications: z.any().optional(), // File upload
});

// Facilitator-specific schema
const facilitatorSchema = baseSchema.safeExtend({
  role: z.literal('FACILITATOR'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  language: z.string().min(1, 'Language is required'),
  shortBio: z.string().min(1, 'Short bio is required'),
  areasCountries: z.string().min(1, 'Areas/countries is required'),
  typesOfExperiences: z.array(z.string()).min(1, 'At least one experience type is required'),
  yearsOfExperience: z.string().min(1, 'Years of experience is required'),
  availability: z.string().min(1, 'Availability is required'),
  certifications: z.any().optional(), // File upload
});

// Translator-specific schema
const translatorSchema = baseSchema.safeExtend({
  role: z.literal('TRANSLATOR'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  language: z.string().min(1, 'Language is required'),
  shortBio: z.string().min(1, 'Short bio is required'),
  otherLanguages: z.array(z.string()).min(1, 'At least one other language is required'),
  translationStyle: z.string().min(1, 'Translation style is required'),
  yearsOfTranslationExperience: z.string().min(1, 'Years of translation experience is required'),
  availability: z.string().min(1, 'Availability is required'),
  languageCertifications: z.any().optional(), // File upload
});

// Union schema for all roles
const registerSchema = z.discriminatedUnion('role', [
  guestSchema,
  hostSchema,
  facilitatorSchema,
  translatorSchema,
]);



export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    let validatedData: z.infer<typeof registerSchema>
    let files: Record<string, File> = {}

    if (contentType?.includes('multipart/form-data')) {
      // Handle file uploads for host/facilitator/translator
      const formData = await request.formData() // Read once here
      const { data, files: parsedFiles } = parseMultipartFormData(formData)
      
      validatedData = registerSchema.parse(data)
      files = parsedFiles
    } else {
      // Handle JSON for guest registration
      const body = await request.json() // Read once here
      validatedData = registerSchema.parse(body)
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password and determine status
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)
    const userStatus = validatedData.role === 'GUEST' ? 'ACTIVE' : 'PENDING'

    // Extract name logic (your existing code)
    let firstName = '';
    let lastName = '';
    
    if (validatedData.role === 'GUEST') {
      const nameParts = validatedData.fullName?.split(' ') || ['', ''];
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    } else if (validatedData.role === 'HOST') {
      const nameParts = validatedData.contactPersonName?.split(' ') || ['', ''];
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    } else if (validatedData.role === 'FACILITATOR') {
      const nameParts = validatedData.fullName?.split(' ') || ['', ''];
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    } else if (validatedData.role === 'TRANSLATOR') {
      const nameParts = validatedData.fullName?.split(' ') || ['', ''];
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName,
        lastName,
        phone: validatedData.phoneNumber,
        role: validatedData.role,
        status: userStatus,
        emailVerified: false,
        emailVerifiedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    // Upload files and get URLs
    const uploadedFiles: { [key: string]: string } = {}
    
    for (const [fieldName, file] of Object.entries(files)) {
      const uploadedUrl = await uploadCertification(file, user.id, validatedData.role)
      if (uploadedUrl) {
        uploadedFiles[fieldName] = uploadedUrl
      }
    }

    // Create role-specific profiles with file URLs
    if (validatedData.role === 'HOST') {
      await prisma.hostProfile.create({
        data: {
          userId: user.id,
          bio: validatedData.shortBio,
          location: validatedData.country,
          languages: [validatedData.language],
          specialties: [validatedData.typeOfExperience],
          certificationUrl: uploadedFiles.certifications || null,
          hotelImageUrl: uploadedFiles.hotelImages || null,
        }
      })
    } else if (validatedData.role === 'FACILITATOR') {
      await prisma.facilitatorProfile.create({
        data: {
          userId: user.id,
          bio: validatedData.shortBio,
          location: validatedData.country,
          languages: [validatedData.language],
          specialties: validatedData.typesOfExperiences,
          certificationUrl: uploadedFiles.certifications || null,
        }
      })
    } else if (validatedData.role === 'TRANSLATOR') {
      await prisma.translatorProfile.create({
        data: {
          userId: user.id,
          bio: validatedData.shortBio,
          location: validatedData.country,
          sourceLanguages: [validatedData.language],
          targetLanguages: validatedData.otherLanguages,
          certificationUrl: uploadedFiles.languageCertifications || null,
        }
      })
    }

    // Keep your existing OTP logic
    const otp = generateOTP()
    const expires = new Date(Date.now() + 10 * 60 * 1000)
    
    await prisma.emailVerification.deleteMany({
      where: { email: validatedData.email }
    })
    
    await prisma.emailVerification.create({
      data: {
        email: validatedData.email,
        otp,
        expires,
      }
    })
    
    const userName = validatedData.role === 'HOST' 
      ? validatedData.contactPersonName 
      : validatedData.fullName || 'User'
    
    const emailSent = await sendOTPEmail(validatedData.email, otp, userName)
    
    if (!emailSent) {
      console.error('Failed to send OTP email to:', validatedData.email)
    }
    
    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
      }
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


// export async function POST(request: NextRequest) {
//   try {

//     const body = await request.json()
    
//     // Validate input
//     const validatedData = registerSchema.parse(body)
    
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email: validatedData.email }
//     })
    
//     if (existingUser) {
//       return NextResponse.json(
//         { error: 'User with this email already exists' },
//         { status: 400 }
//       )
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(validatedData.password, 12)
    
//     // Determine user status based on role
//     const userStatus = validatedData.role === 'GUEST' ? 'ACTIVE' : 'PENDING'
  
    
//     // Extract name based on role
//     let firstName = '';
//     let lastName = '';
    
//     if (validatedData.role === 'GUEST') {
//       const nameParts = validatedData.fullName?.split(' ') || ['', ''];
//       firstName = nameParts[0] || '';
//       lastName = nameParts.slice(1).join(' ') || '';
//     } else if (validatedData.role === 'HOST') {
//       const nameParts = validatedData.contactPersonName?.split(' ') || ['', ''];
//       firstName = nameParts[0] || '';
//       lastName = nameParts.slice(1).join(' ') || '';
//     } else if (validatedData.role === 'FACILITATOR') {
//       const nameParts = validatedData.fullName?.split(' ') || ['', ''];
//       firstName = nameParts[0] || '';
//       lastName = nameParts.slice(1).join(' ') || '';
//     } else if (validatedData.role === 'TRANSLATOR') {
//       const nameParts = validatedData.fullName?.split(' ') || ['', ''];
//       firstName = nameParts[0] || '';
//       lastName = nameParts.slice(1).join(' ') || '';
//     }

//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         email: validatedData.email,
//         password: hashedPassword,
//         firstName,
//         lastName,
//         phone: validatedData.phoneNumber,
//         role: validatedData.role,
//         status: userStatus,
//         emailVerified: false,
//         emailVerifiedAt: null,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     })
    
//     // Create role-specific profile with actual data
//     if (validatedData.role === 'HOST') {
//       await prisma.hostProfile.create({
//         data: {
//           userId: user.id,
//           bio: validatedData.shortBio,
//           location: validatedData.country,
//           languages: [validatedData.language],
//           specialties: [validatedData.typeOfExperience],
//           // TODO: Handle file uploads for hotelImages and certifications
//         }
//       })
//     } else if (validatedData.role === 'FACILITATOR') {
//       await prisma.facilitatorProfile.create({
//         data: {
//           userId: user.id,
//           bio: validatedData.shortBio,
//           location: validatedData.country,
//           languages: [validatedData.language],
//           specialties: validatedData.typesOfExperiences,
//           // TODO: Handle file upload for certifications
//         }
//       })
//     } else if (validatedData.role === 'TRANSLATOR') {
//       await prisma.translatorProfile.create({
//         data: {
//           userId: user.id,
//           bio: validatedData.shortBio,
//           location: validatedData.country,
//           sourceLanguages: [validatedData.language],
//           targetLanguages: validatedData.otherLanguages,
//           // TODO: Handle file upload for languageCertifications
//         }
//       })
//     }
    
//     // Send OTP email for all users
//     const otp = generateOTP()
//     const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    
//     // Delete any existing OTP for this email
//     await prisma.emailVerification.deleteMany({
//       where: { email: validatedData.email }
//     })
    
//     // Create new OTP record
//     await prisma.emailVerification.create({
//       data: {
//         email: validatedData.email,
//         otp,
//         expires,
//       }
//     })
    
//     // Send OTP email
//     const userName = validatedData.role === 'HOST' 
//       ? validatedData.contactPersonName 
//       : validatedData.fullName || 'User'
    
//     const emailSent = await sendOTPEmail(validatedData.email, otp, userName)
    
//     if (!emailSent) {
//       console.error('Failed to send OTP email to:', validatedData.email)
//     }
    
//     // Return success response
//     return NextResponse.json({
//       message: 'User registered successfully',
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         role: user.role,
//         status: user.status,
//         emailVerified: user.emailVerified,
//       }
//     }, { status: 201 })
    
//   } catch (error) {
//     console.error('Registration error:', error)
    
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: 'Validation failed', details: error.message },
//         { status: 400 }
//       )
//     }
    
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// } 
