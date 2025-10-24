import { UserRole } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  hostProfile?: HostProfile;
}

export interface HostProfile {
  bio?: string;
  location?: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviewCount: number;
  responseTime?: string;
}