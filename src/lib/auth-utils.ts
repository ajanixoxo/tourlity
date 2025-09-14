// Unified dashboard route for all roles
export function getDashboardRoute(role: string): string {
  return `/dashboard?role=${role && typeof role === 'string' ? role.toLowerCase() : ''}`;
}
// Returns the dashboard route for a given user role
import type { RegistrationFormData } from '@/components/forms/registration-form';
import { toast } from 'react-toastify';

// API base URL
const API_BASE = '/api'

// Registration function
export const registerUser = async (formData: RegistrationFormData | FormData) => {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error(data.error)
      throw new Error(data.error || 'Registration failed')
      
    }

    return data
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

export const registerUserWithFiles = async (formData: globalThis.FormData) => {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      body: formData, // FormData is valid for fetch body
    });

    const data = await response.json();
    if (!response.ok) {
       toast.error(data.error)
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// OTP verification function
export const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await fetch(`${API_BASE}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'OTP verification failed')
    }

    return data
  } catch (error) {
    console.error('OTP verification error:', error)
    throw error
  }
}


export const forgotPassword = async (email: string,) => {
  try {
    const response = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Email verification failed')
    }

    return data
  } catch (error) {
    console.error('Email verification error:', error)
    throw error
  }
}

export const verifyForgotOTP = async (email:string, otp: string,) => {
  try {
    const response = await fetch(`${API_BASE}/auth/verify-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, otp }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'OTP verification failed')
    }

    return data
  } catch (error) {
    console.error('OTP verification error:', error)
    throw error
  }
}

export const resetPassword = async (email:string, otp: string, newPassword:string) => {
  try {
    const response = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, otp , newPassword}),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Unable to Create new Password')
    }

    return data
  } catch (error) {
    console.error('Password creation error:', error)
    throw error
  }
}

// Native JWT-based login function
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) { 
      console.log("login data ", data)
      throw new Error(data.error || 'Login failed');
     
    }
    
    // Store JWT in localStorage for client-side access
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    // Force a page refresh to trigger middleware redirect
    // This ensures the middleware can read the cookie that was just set
    window.location.href = getDashboardRoute(data.user.role);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout function (removes JWT)
export const logoutUser = async () => {
  // Clear localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Call logout API to clear server-side cookie
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Logout API call failed:', error);
  }
  
  // Redirect to sign-up page
  window.location.href = '/sign-up';
};

// Get current user from JWT (if needed)
export interface AuthUser {
  id: string;
  email: string;
  role: 'GUEST' | 'HOST' | 'FACILITATOR' | 'TRANSLATOR' | 'ADMIN';
  status?: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  emailVerified?: boolean;
  emailVerifiedAt?: string;
}


export const getCurrentUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null; // Server-side guard
  
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token) return null;
  
  try {
    // Try to get user data from localStorage first (faster)
    if (userStr) {
      return JSON.parse(userStr) as AuthUser;
    }
    
    // Fallback to decoding JWT
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload as AuthUser;
  } catch {
    // Clear invalid data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
};
