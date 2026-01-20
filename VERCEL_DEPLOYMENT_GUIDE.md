# 🚀 Vercel Deployment Guide - Fix Database Connection

## 🎯 Your Specific Issue

You're getting this error on Vercel:
```
Something went wrong!
An error occurred in the Server Components render.
Error ID: 2284707482
```

This is usually caused by:
1. ❌ Missing or incorrect environment variables
2. ❌ Database migrations not run on production
3. ❌ Prisma client not generated properly

---

## ✅ Step-by-Step Fix for Vercel

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Update these variables:

```env
# Database (CRITICAL)
DATABASE_URL="postgresql://neondb_owner:npg_80ioSUARCPcW@ep-soft-mountain-ahtax08k-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Auth URLs (CRITICAL - Replace with your Vercel URL)
BETTER_AUTH_SECRET="kJ8mN2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0bC"
BETTER_AUTH_URL="https://your-app.vercel.app"
NEXT_PUBLIC_BETTER_AUTH_URL="https://your-app.vercel.app"

# Optional
ADMIN_EMAIL="your-email@example.com"
```

**Important:** 
- Replace `https://your-app.vercel.app` with your actual Vercel URL
- Set these for **Production** environment
- Do NOT set `SKIP_ENV_VALIDATION=true`

### Step 2: Run Database Migrations

Option A - **Using Vercel CLI** (Recommended):

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations
npx prisma migrate deploy
```

Option B - **Manually Connect to Neon**:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="postgresql://neondb_owner:npg_80ioSUARCPcW@ep-soft-mountain-ahtax08k-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Run migrations
npx prisma migrate deploy

# Or push schema
npx prisma db push
```

### Step 3: Update vercel.json

I've created a `vercel.json` file that ensures Prisma is generated during build. Make sure it's committed:

```bash
git add vercel.json
git commit -m "Add Vercel configuration"
git push origin master
```

### Step 4: Redeploy

1. Go to your Vercel dashboard
2. Click **Deployments**
3. Click the **︙** menu on the latest deployment
4. Click **Redeploy**
5. Check the box "Use existing Build Cache" = **OFF** (force fresh build)

---

## 🔍 Check Vercel Build Logs

After redeploying, check the build logs for:

### ✅ Good Signs:
```
✓ Prisma schema loaded from prisma/schema.prisma
✓ Generated Prisma Client
✓ Compiled successfully
```

### ❌ Bad Signs:
```
✗ Prisma schema not found
✗ Environment variable not found
✗ Database connection failed
```

---

## 🧪 Verify After Deployment

1. **Check homepage**
   - Visit: `https://your-app.vercel.app`

2. **Check published pages**
   - Visit: `https://your-app.vercel.app/p/home`
   - Visit: `https://your-app.vercel.app/p/shop`

3. **Check login**
   - Visit: `https://your-app.vercel.app/auth/sign-in`
   - Try logging in

4. **Check Vercel Runtime Logs**
   - Go to Vercel dashboard → Your Project → Logs
   - Look for any database connection errors

---

## 🚨 Common Vercel-Specific Issues

### Issue: "Prisma Client not generated"

**Solution:**
```json
// vercel.json (already created)
{
  "buildCommand": "prisma generate && next build"
}
```

### Issue: "Can't resolve '@prisma/client'"

**Solution:**
```bash
# In your project
pnpm add -D prisma
pnpm add @prisma/client
git add package.json pnpm-lock.yaml
git commit -m "Update Prisma dependencies"
git push
```

### Issue: "Table does not exist"

**Solution:** Migrations weren't run on production database

```bash
# Pull production env vars
vercel env pull .env.production

# Run migrations
npx prisma migrate deploy
```

### Issue: "Authentication fails"

**Solution:** BETTER_AUTH_URL mismatch

```env
# Both must match your Vercel URL exactly
BETTER_AUTH_URL="https://your-actual-vercel-url.vercel.app"
NEXT_PUBLIC_BETTER_AUTH_URL="https://your-actual-vercel-url.vercel.app"
```

### Issue: "Database connection timeout"

**Solution:** Vercel IP needs to be whitelisted

1. Go to Neon dashboard
2. Go to your database settings
3. Under "IP Allowlist"
4. Add `0.0.0.0/0` (allows all IPs - Vercel uses dynamic IPs)
   - Or use Neon's connection pooler (already in your URL)

---

## 📞 Still Having Issues?

### 1. Check Vercel Runtime Logs

```
Vercel Dashboard → Your Project → Logs → Runtime Logs
```

Look for specific error messages

### 2. Enable Verbose Logging

Add to your environment variables:
```env
DEBUG=prisma:*
```

Then redeploy and check logs

### 3. Test Database Connection Directly

```bash
# Pull production env
vercel env pull .env.production

# Test connection
npm run db:test
```

### 4. Share Vercel Logs

Copy the error from Vercel logs and I can help diagnose!

---

## 🎉 Success Checklist

- [ ] Environment variables set in Vercel dashboard
- [ ] BETTER_AUTH_URL matches Vercel URL (no localhost!)
- [ ] Database migrations run successfully
- [ ] vercel.json committed and pushed
- [ ] Fresh deployment with no cache
- [ ] Can view published pages at `/p/home`
- [ ] Can login at `/auth/sign-in`
- [ ] No errors in Vercel runtime logs

Your app should now work in production! 🚀
