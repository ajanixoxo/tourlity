import { UserRole } from './admin';

export interface SettingsUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  hostProfile?: {
    bio?: string;
    location?: string;
    languages: string[];
    specialties: string[];
    rating: number;
    totalEarnings: number;
    certificationUrl?: string;
  };
  facilitatorProfile?: {
    bio?: string;
    location?: string;
    languages: string[];
    specialties: string[];
    certification?: string;
    rating: number;
    totalEarnings: number;
    certificationUrl?: string;
  };
  translatorProfile?: {
    bio?: string;
    location?: string;
    sourceLanguages: string[];
    targetLanguages: string[];
    certification?: string;
    rating: number;
    totalEarnings: number;
    certificationUrl?: string;
  };
}