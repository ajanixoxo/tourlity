# Tourlity Backend Setup Guide

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Custom implementation with bcryptjs
- **Validation**: Zod

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tourlity_db"

# Supabase (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email (for OTP verification)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# Stripe (Test Mode - for development)
# Get test keys from: https://dashboard.stripe.com/test/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Use Stripe CLI for local testing
```

### 2. Install Dependencies
```bash
bun add bcryptjs zod @types/bcryptjs
```

### 3. Database Setup
1. Set up your Supabase project
2. Get your database connection string
3. Run Prisma migrations:
```bash
bunx prisma generate
bunx prisma db push
```

### 4. Start Development Server
```bash
bun dev
```

## API Endpoints for Postman Testing

### Base URL
```
http://localhost:3000/api
```

### 1. Test API
**GET** `/test`
- **Purpose**: Test if backend is working
- **Response**: Database connection status and user count

### 2. User Registration
**POST** `/auth/register`
- **Purpose**: Register new users with role-specific fields
- **Roles**: `GUEST`, `HOST`, `FACILITATOR`, `TRANSLATOR`

#### Guest Registration
```json
{
  "email": "guest@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "GUEST",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "country": "US",
  "language": "en",
  "age": "25",
  "travelStyle": "solo",
  "personalizedExperience": "yes",
  "disability": "no"
}
```

#### Host Registration
```json
{
  "email": "host@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "HOST",
  "businessName": "Blueberry Smith",
  "contactPersonName": "John Smith",
  "phoneNumber": "+1234567890",
  "language": "en",
  "priceRange": "100-200",
  "age": "30",
  "country": "US",
  "shortBio": "Experienced tour guide with 5 years in the industry",
  "experienceTitle": "cooking-class",
  "typeOfExperience": "food",
  "availability": "Weekends"
}
```

#### Facilitator Registration
```json
{
  "email": "facilitator@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "FACILITATOR",
  "fullName": "Jane Smith",
  "phoneNumber": "+1234567890",
  "country": "US",
  "language": "en",
  "shortBio": "Professional facilitator with expertise in cultural experiences",
  "areasCountries": "dubai-usa-france",
  "typesOfExperiences": ["events", "cultural", "food"],
  "yearsOfExperience": "5 years",
  "availability": "Weekdays"
}
```

#### Translator Registration
```json
{
  "email": "translator@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "TRANSLATOR",
  "fullName": "Maria Garcia",
  "phoneNumber": "+1234567890",
  "country": "US",
  "language": "en",
  "shortBio": "Certified translator with 8 years of experience",
  "otherLanguages": ["spanish", "french"],
  "translationStyle": "simultaneous",
  "yearsOfTranslationExperience": "8 years",
  "availability": "Flexible"
}
```

- **Notes**: 
  - GUEST users are automatically activated
  - Other roles require admin approval
  - File uploads (certifications, images) are handled separately

### 3. User Login
**POST** `/auth/login`
- **Purpose**: Authenticate users
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 4. Email Verification
**PUT** `/auth/verify-email`
- **Purpose**: Request 6-digit OTP
- **Body**:
```json
{
  "email": "user@example.com"
}
```

**POST** `/auth/verify-email`
- **Purpose**: Verify email with 6-digit OTP
- **Body**:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

### 5. Admin User Approval
**GET** `/admin/approve-user`
- **Purpose**: Get list of pending users
- **Query Parameters**:
  - `role` (optional): Filter by role

**POST** `/admin/approve-user`
- **Purpose**: Approve or reject pending users
- **Body**:
```json
{
  "userId": "user_id",
  "action": "APPROVE",
  "reason": "Optional reason for rejection"
}
```

## Postman Collection

### Test Flow
1. **Test Backend**: `GET /test`
2. **Register Guest**: `POST /auth/register` (role: GUEST)
3. **Login Guest**: `POST /auth/login`
4. **Register Host**: `POST /auth/register` (role: HOST)
5. **Get Pending Users**: `GET /admin/approve-user`
6. **Approve Host**: `POST /admin/approve-user`
7. **Login Host**: `POST /auth/login`

### Sample Requests

#### Register a Guest User
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "guest@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "GUEST",
  "fullName": "Jane Smith",
  "phoneNumber": "+1234567890",
  "country": "US",
  "language": "en",
  "age": "25",
  "travelStyle": "solo",
  "personalizedExperience": "yes",
  "disability": "no"
}
```

#### Register a Host User
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "host@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "HOST",
  "businessName": "Blueberry Smith",
  "contactPersonName": "Mike Johnson",
  "phoneNumber": "+1234567890",
  "language": "en",
  "priceRange": "100-200",
  "age": "30",
  "country": "US",
  "shortBio": "Experienced tour guide with 5 years in the industry",
  "experienceTitle": "cooking-class",
  "typeOfExperience": "food",
  "availability": "Weekends"
}
```

#### Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "guest@example.com",
  "password": "password123"
}
```

#### Get Pending Users
```http
GET http://localhost:3000/api/admin/approve-user
```

#### Approve User
```http
POST http://localhost:3000/api/admin/approve-user
Content-Type: application/json

{
  "userId": "user_id_here",
  "action": "APPROVE"
}
```

## Database Schema Overview

### Core Models
- **User**: Base user model with role-based profiles
- **HostProfile**: Host-specific data (subscription, earnings, etc.)
- **FacilitatorProfile**: Facilitator-specific data (certifications, etc.)
- **TranslatorProfile**: Translator-specific data (languages, etc.)
- **Tour**: Tour listings with virtual/in-person options
- **Booking**: Tour bookings with payment status
- **Review**: User reviews and ratings
- **Message**: In-app messaging system
- **Notification**: User notifications

### User Roles & Status
- **Roles**: GUEST, HOST, FACILITATOR, TRANSLATOR, ADMIN
- **Status**: PENDING, ACTIVE, SUSPENDED, REJECTED

## Next Steps
1. Set up Supabase project and get connection string
2. Install missing dependencies
3. Run database migrations
4. Test APIs with Postman
5. Implement email service for OTP
6. Add authentication middleware
7. Build frontend forms

## Troubleshooting

### Common Issues
1. **Database Connection**: Check DATABASE_URL in .env.local
2. **Missing Dependencies**: Run `bun install`
3. **Prisma Issues**: Run `bunx prisma generate`
4. **Port Conflicts**: Change port in package.json scripts

### Error Responses
All APIs return consistent error formats:
```json
{
  "error": "Error message",
  "details": "Additional details if available"
}
``` 