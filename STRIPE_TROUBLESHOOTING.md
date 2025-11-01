# Stripe Payment Troubleshooting Guide

## Common Error: "Your payment method has been declined"

### ✅ Quick Fixes

#### 1. **Check if You're Using Test Keys**
Your Stripe keys MUST start with:
- `pk_test_...` (Publishable key)
- `sk_test_...` (Secret key)

If you see `pk_live_...` or `sk_live_...`, you're using LIVE keys and test cards won't work!

**Solution:**
1. Go to https://dashboard.stripe.com
2. Toggle to **Test mode** (top right)
3. Copy your test keys
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
5. Restart your dev server

#### 2. **Use Correct Test Card Number**
**Most Common Test Card (Always Works):**
- Card: `4242 4242 4242 4242`
- Expiry: `12/34` (any future date)
- CVV: `123` (any 3 digits)
- ZIP: `12345` (any 5 digits)

#### 3. **Check Amount Format**
The payment should work with any amount. Make sure:
- Tour price is a valid number (e.g., `2000` for $2000)
- No special characters or currency symbols
- Amount is greater than 0

#### 4. **Verify Environment Variables**
Check your `.env.local` file has:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
```

### 🔍 Debug Steps

#### Step 1: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any Stripe-related errors
4. Check the Network tab for failed API calls

#### Step 2: Check Server Logs
Look at your terminal where the dev server is running for:
- Payment creation errors
- Stripe API errors
- Database errors

#### Step 3: Check Stripe Dashboard
1. Go to https://dashboard.stripe.com/test/payments
2. Make sure you're in **Test mode**
3. Look for recent payment attempts
4. Click on failed payments to see error details

### 🐛 Common Issues & Solutions

#### Issue: "No such PaymentIntent"
**Cause:** Client secret expired or invalid
**Solution:** Try booking again - a new PaymentIntent will be created

#### Issue: "Amount must be at least $0.50"
**Cause:** Amount is too small or not in cents
**Solution:** Already fixed in code - amounts are now converted to cents

#### Issue: "Invalid API Key"
**Cause:** Wrong API key or keys from different Stripe accounts
**Solution:** 
- Make sure publishable and secret keys are from the same account
- Make sure both are test keys
- Restart dev server after updating `.env.local`

#### Issue: "Card was declined"
**Cause:** Using wrong test card or live keys
**Solution:**
- Use test card: `4242 4242 4242 4242`
- Verify you're using `pk_test_` and `sk_test_` keys

### ✅ Test Checklist

Before testing payments, verify:

- [ ] Using test Stripe keys (`pk_test_...`, `sk_test_...`)
- [ ] Using test card number (`4242 4242 4242 4242`)
- [ ] Expiry date is in the future
- [ ] CVV is 3 digits
- [ ] ZIP code is 5 digits
- [ ] Dev server restarted after changing `.env.local`
- [ ] Browser console shows no errors
- [ ] User is logged in as GUEST role

### 📞 Still Having Issues?

1. **Check Stripe Dashboard Logs:**
   - Go to https://dashboard.stripe.com/test/logs
   - Look for failed API requests
   - Check the error messages

2. **Verify Test Mode:**
   - Dashboard URL should show "Test mode" toggle
   - URL should contain "test" in the path

3. **Test with Stripe CLI (Advanced):**
   ```bash
   stripe listen --forward-to localhost:4033/api/webhooks/stripe
   ```

### 💡 Pro Tips

1. **Always use test mode for development**
2. **Keep test and live keys separate** - never mix them
3. **Use `4242 4242 4242 4242`** - it's the most reliable test card
4. **Check server logs** - they often reveal the exact issue
5. **Use Stripe Dashboard** - it shows detailed error messages

