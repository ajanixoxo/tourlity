import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Get user count
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      message: 'Backend is working!',
      database: 'Connected',
      userCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Test API error:', error)
    
    return NextResponse.json({
      message: 'Backend error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 