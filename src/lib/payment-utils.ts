export const calculatePlatformFee = (amount: number) => {
  return Math.round(amount * 0.10); // 10% platform fee
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100); // Stripe amounts are in cents
};