# Stripe Test Mode Guide

## How to Test Payments with Fake Cards

Your Stripe integration **automatically** supports test mode when you use test API keys. No code changes needed!

### ✅ Check if You're in Test Mode

**Test Mode Keys:**
- Publishable key starts with: `pk_test_...`
- Secret key starts with: `sk_test_...`

**Live Mode Keys:**
- Publishable key starts with: `pk_live_...`
- Secret key starts with: `sk_live_...`

### 🔑 Getting Test Keys from Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click on **Developers** → **API keys**
3. Make sure you're in **Test mode** (toggle in the top right)
4. Copy:
   - **Publishable key** → Use as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → Use as `STRIPE_SECRET_KEY`

### 💳 Test Card Numbers

Use these **fake credit cards** for testing (they won't charge real money):

#### ✅ Successful Payments

**Visa (Most Common):**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVV: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Mastercard:**
- Card Number: `5555 5555 5555 4444`
- Expiry: Any future date
- CVV: Any 3 digits

**American Express:**
- Card Number: `3782 822463 10005`
- Expiry: Any future date
- CVV: Any 4 digits

#### ❌ Declined Cards (Test Error Scenarios)

**Card Declined:**
- Card Number: `4000 0000 0000 0002`

**Insufficient Funds:**
- Card Number: `4000 0000 0000 9995`

**Lost Card:**
- Card Number: `4000 0000 0000 9987`

**Stolen Card:**
- Card Number: `4000 0000 0000 9979`

### 📝 Setup in Your .env.local

```env
# Test Mode Keys (from Stripe Dashboard in Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...

# Webhook Secret (for local testing, use Stripe CLI)
# See "Local Webhook Testing" section below
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 🧪 Testing the Payment Flow

1. **Use Test Card**: `4242 4242 4242 4242`
2. **Expiry Date**: Any future date (e.g., `12/34`)
3. **CVV**: Any 3 digits (e.g., `123`)
4. **Click "Pay Now"**
5. Payment should succeed instantly (no real money charged!)

### 📊 View Test Transactions

- Go to [Stripe Dashboard](https://dashboard.stripe.com/test/payments)
- Switch to **Test mode** (toggle in top right)
- You'll see all test payments here
- Transactions show as "Test" and won't appear in live mode

### 🔗 Local Webhook Testing

For webhook testing during development, use Stripe CLI:

1. **Install Stripe CLI**: https://stripe.com/docs/stripe-cli
2. **Login**: `stripe login`
3. **Forward webhooks**: `stripe listen --forward-to localhost:4033/api/webhooks/stripe`
4. **Copy the webhook secret** (starts with `whsec_`) and add to `.env.local`

### ⚠️ Important Notes

- **Test cards work ONLY with test keys** (`pk_test_`, `sk_test_`)
- **Never use test cards with live keys** - they will be declined
- **Test payments don't charge real money** - completely safe for testing
- **Switch to live keys only when ready for production**

### 🎯 Testing Different Scenarios

#### Test 3D Secure (Authentication Required)
- Card: `4000 0027 6000 3184`
- Will prompt for authentication modal

#### Test Processing Errors
- Use the declined card numbers above to test error handling

#### Test Different Countries
- Some cards can simulate different countries
- Check Stripe docs for specific card numbers

### 📚 Official Stripe Test Cards

Full list: https://stripe.com/docs/testing#cards

