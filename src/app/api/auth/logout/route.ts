/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'

// For JWT-based auth, logout is handled on the client by removing the token.
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // Clear the token cookie
  response.cookies.delete('token');
  
  return response;
}

export async function GET(request: NextRequest) {
  return POST(request);
}