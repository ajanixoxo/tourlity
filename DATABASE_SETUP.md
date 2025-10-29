# Database Setup Guide (Supabase + Prisma)

## Problem: Database Connection Issues

If you're seeing errors like:
```
Can't reach database server at `aws-1-eu-north-1.pooler.supabase.com:5432`
```

This means your database connection is timing out. Follow this guide to fix it.

## Solution Steps

### 1. Get Your Database URLs from Supabase

#### **Connection Pooling URL (for API routes)**
1. Go to your Supabase Dashboard
2. Navigate to: **Settings → Database**
3. Scroll to **Connection Pooling** section
4. Mode: Select **Transaction**
5. Copy the connection string (it looks like):
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-eu-north-1.pooler.supabase.com:5432/postgres
   ```

#### **Direct Connection URL (for migrations)**
1. Go to your Supabase Dashboard
2. Navigate to: **Settings → Database**
3. Scroll to **Connection String** section
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 2. Create/Update Your .env.local File

Create a `.env.local` file in your project root with these variables:

```bash
# Connection pooler URL (use this for API routes and serverless functions)
# CRITICAL: Add pgbouncer=true and connection_limit=1 to the URL
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-1-eu-north-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"

# Direct connection URL (use this for migrations only)
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# JWT Secret (use a strong random string)
JWT_SECRET="your-secret-key-here"

# Supabase Configuration (for storage, if needed)
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

NODE_ENV="development"
```

**IMPORTANT Notes:**
- Replace `[YOUR-PROJECT-REF]` with your actual Supabase project reference
- Replace `[YOUR-PASSWORD]` with your database password
- **MUST include** `?pgbouncer=true&connection_limit=1` at the end of DATABASE_URL
- The `connection_limit=1` prevents connection pool exhaustion

### 3. Update Prisma Schema (Already Done)

Your `prisma/schema.prisma` should now have:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 4. Regenerate Prisma Client

After updating your environment variables, run:

```bash
# Using bun
bun prisma generate

# Or using npm
npx prisma generate
```

### 5. Test Database Connection

```bash
# Using bun
bun prisma db pull

# Or using npm
npx prisma db pull
```

If this succeeds, your connection is working!

### 6. Run Migrations (if needed)

```bash
# Using bun
bun prisma migrate deploy

# Or using npm
npx prisma migrate deploy
```

## Common Issues & Solutions

### Issue 1: "Can't reach database server"
**Cause:** Wrong DATABASE_URL or missing pgbouncer parameter  
**Fix:** Make sure DATABASE_URL includes `?pgbouncer=true&connection_limit=1`

### Issue 2: "Prepared statement already exists"
**Cause:** Not using pgbouncer mode  
**Fix:** Ensure you're using the pooler URL with `?pgbouncer=true`

### Issue 3: "Too many connections"
**Cause:** Connection pool exhaustion  
**Fix:** Add `&connection_limit=1` to your DATABASE_URL

### Issue 4: Supabase Project Paused
**Cause:** Free tier projects auto-pause after 1 week of inactivity  
**Fix:** Go to Supabase Dashboard and click "Resume Project"

### Issue 5: Database still fails intermittently
**Cause:** Network timeouts or Supabase pooler issues  
**Solution:** Add timeout settings to your DATABASE_URL:

```bash
DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=1&pool_timeout=10&connect_timeout=10"
```

## Verification Checklist

- [ ] `.env.local` file exists in project root
- [ ] `DATABASE_URL` uses the pooler URL (contains `pooler.supabase.com`)
- [ ] `DATABASE_URL` includes `?pgbouncer=true&connection_limit=1`
- [ ] `DIRECT_URL` uses the direct connection URL (contains `db.xxxxx.supabase.co`)
- [ ] Ran `bun prisma generate`
- [ ] Supabase project is active (not paused)
- [ ] Can connect using `bun prisma db pull`

## Additional Performance Tips

1. **Always use connection pooling** for API routes
2. **Use DIRECT_URL only for migrations** - it bypasses the pooler
3. **Monitor your connection usage** in Supabase Dashboard → Database → Connections
4. **Upgrade Supabase plan** if you need more connections (free tier = 60 connections)

## Need Help?

If issues persist:
1. Check Supabase status page: https://status.supabase.com/
2. Verify your project isn't paused in Supabase Dashboard
3. Check connection count in Supabase Dashboard → Database → Connections
4. Review Prisma logs by adding to `src/lib/prisma.ts`:
   ```typescript
   log: ['query', 'error', 'warn']
   ```

