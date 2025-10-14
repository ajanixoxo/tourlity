import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/get-server-user';
import { UserProfile } from '@/lib/stores/auth-store';

export type ValidRoles = 'GUEST' | 'HOST' | 'FACILITATOR' | 'TRANSLATOR' | 'ADMIN';

export async function validateUser(
  request: NextRequest,
  allowedRoles: ValidRoles[]
): Promise<{ user: UserProfile | null; error: NextResponse | null }> {
  const user = await getServerUser();

  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    };
  }

  if (!allowedRoles.includes(user.role as ValidRoles)) {
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    };
  }

  return { user, error: null };
}

export function validateAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount);
}

export function validateCurrency(currency: string): boolean {
  const supportedCurrencies = ['USD', 'EUR', 'GBP', 'CAD'];
  return supportedCurrencies.includes(currency.toUpperCase());
}

export function handleError(error: unknown): NextResponse {
  console.error('Payment error:', error);
  
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
  
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}