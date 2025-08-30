import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendOTPEmail } from '@/lib/email'

// Validation schema for email verification
const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = verifyEmailSchema.parse(body)
    
    // Find the email verification record
    const emailVerification = await prisma.emailVerification.findFirst({
      where: { 
        email: validatedData.email,
        otp: validatedData.otp
      }
    })
    
    if (!emailVerification) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }
    
    // Check if OTP has expired
    if (emailVerification.expires < new Date()) {
      return NextResponse.json(
        { error: 'OTP has expired' },
        { status: 400 }
      )
    }
    
    // Check if too many attempts
    if (emailVerification.attempts >= 3) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Please request a new OTP.' },
        { status: 400 }
      )
    }
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Update user email verification status
    await prisma.user.update({
      where: { email: validatedData.email },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),  
      }
    })
    
    // Delete the OTP record
    await prisma.emailVerification.delete({
      where: { id: emailVerification.id }
    })
    
    return NextResponse.json({
      message: 'Email verified successfully',
      user: {
        id: user.id,
        email: user.email,
        emailVerified: true,
      }
    })
    
  } catch (error) {
    console.error('Email verification error:', error)
    
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

// Request email verification (send OTP)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      )
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    
    // Delete any existing OTP for this email
    await prisma.emailVerification.deleteMany({
      where: { email }
    })
    
    // Create new OTP record
    await prisma.emailVerification.create({
      data: {
        email,
        otp,
        expires,
      }
    })
    
    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp, user.firstName || 'User')
    
    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      message: 'OTP sent successfully',
      // In development, return the OTP for testing
      otp: process.env.NODE_ENV === 'development' ? otp : undefined,
    })
    
  } catch (error) {
    console.error('Request email verification error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 