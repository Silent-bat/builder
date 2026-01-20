# 🚀 Deploy to Production - Complete Guide

## 🎯 Quick Fix for Your Current Issue

Your production app can't connect because **environment variables are set for localhost**. Here's the immediate fix:

### Step 1: Update Production Environment Variables

In your hosting platform (Vercel/Netlify/Railway/etc.), update these variables:

```env
# ❌ WRONG (current setup)
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# ✅ CORRECT (replace with your actual domain)
BETTER_AUTH_URL="https://your-actual-domain.com"
NEXT_PUBLIC_BETTER_AUTH_URL="https://your-actual-domain.com"
```

### Step 2: Verify Database Connection

Your Neon database URL looks correct:
```env
DATABASE_URL="postgresql://neondb_owner:npg_80ioSUARCPcW@ep-soft-mountain-ahtax08k-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

But make sure:
- Your production server's IP is whitelisted in Neon dashboard
- The database has tables (run migrations if needed)

### Step 3: Run Database Migrations

If your production database is empty, run:

```bash
npx prisma migrate deploy
# or
npx prisma db push
```

### Step 4: Redeploy

After updating environment variables, trigger a new deployment.

---

## 📋 Complete Production Deployment Checklist

### Before Deployment

- [ ] **Run environment check locally**
  ```bash
  npm run env:check
  ```

- [ ] **Test database connection**
  ```bash
  npm run db:test
  ```

- [ ] **Run full check**
  ```bash
  npm run production:check
  ```

### Environment Variables Setup

#### Platform-Specific Instructions

<details>
<summary><b>Vercel</b></summary>

1. Go to your project → Settings → Environment Variables
2. Add/update these variables:

```env
# Required
DATABASE_URL=postgresql://...your-neon-url...
BETTER_AUTH_SECRET=your-secret-min-32-chars
BETTER_AUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-app.vercel.app

# Optional but recommended
ADMIN_EMAIL=admin@example.com
RESEND_API_KEY=re_...
STRIPE_SECRET_KEY=sk_live_...
UPLOADTHING_SECRET=sk_live_...
```

3. Select "Production" environment
4. Click "Save"
5. Redeploy your app

**Important:** Do NOT set `SKIP_ENV_VALIDATION=true` in production!

</details>

<details>
<summary><b>Netlify</b></summary>

1. Go to Site Settings → Environment Variables
2. Add the same variables as above
3. Click "Save"
4. Trigger new deployment

</details>

<details>
<summary><b>Railway</b></summary>

1. Go to your project → Variables tab
2. Add the same variables as above
3. Railway will auto-redeploy

</details>

<details>
<summary><b>Docker/VPS</b></summary>

Create a `.env.production` file:

```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=https://your-domain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.com
NODE_ENV=production
```

Then run:
```bash
docker-compose up -d
# or
NODE_ENV=production npm start
```

</details>

### Database Setup

1. **Ensure Neon database is accessible**
   - Go to Neon dashboard
   - Check IP allowlist (or disable if using Vercel)
   - Verify database is active

2. **Run migrations on production database**
   ```bash
   # Set DATABASE_URL to production
   export DATABASE_URL="your-production-database-url"
   
   # Run migrations
   npx prisma migrate deploy
   
   # Or push schema directly
   npx prisma db push --accept-data-loss
   ```

3. **Seed initial data (optional)**
   ```bash
   npm run db:seed
   ```

### Post-Deployment Verification

After deployment, verify:

1. **Homepage loads**
   - Visit `https://your-domain.com`

2. **Published pages work**
   - Visit `https://your-domain.com/p/home`
   - Check all published page slugs

3. **Authentication works**
   - Visit `https://your-domain.com/auth/sign-in`
   - Try logging in

4. **Admin panel accessible**
   - Visit `https://your-domain.com/admin`
   - Check pages management

### Troubleshooting

#### Issue: "Can't reach database"
**Solution:**
- Check Neon IP allowlist
- Verify DATABASE_URL is correct
- Check Neon database status

#### Issue: "Table does not exist"
**Solution:**
```bash
npx prisma migrate deploy
```

#### Issue: "Authentication fails"
**Solution:**
- Verify BETTER_AUTH_URL matches your domain
- Check BETTER_AUTH_SECRET is set
- Ensure both server and client URLs match

#### Issue: "Landing pages don't display"
**Solution:**
- Verify pages are published in admin panel
- Check database has page data
- Run: `npm run db:test` to verify

#### Issue: "Environment variable not found"
**Solution:**
- Don't use `SKIP_ENV_VALIDATION=true` in production
- Set all required variables in hosting platform
- Redeploy after setting variables

---

## 🔒 Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore`
   - Use platform's environment variables

2. **Use strong secrets**
   ```bash
   # Generate a strong BETTER_AUTH_SECRET
   openssl rand -base64 48
   ```

3. **Enable SSL for database**
   - Already enabled with `sslmode=require`

4. **Use production API keys**
   - Stripe: Use `sk_live_...` not `sk_test_...`
   - All services: Use production keys

5. **Rotate secrets regularly**
   - Especially if exposed in git history

---

## 🧪 Testing Your Deployment

### Local Testing with Production Database

```bash
# Temporarily use production DATABASE_URL
export DATABASE_URL="your-production-url"
npm run db:test
```

### Run All Checks

```bash
# Check environment variables
npm run env:check

# Test database connection
npm run db:test

# Run both
npm run production:check
```

---

## 📞 Getting Help

If issues persist:

1. **Check production logs**
   - Vercel: Deployment logs + Runtime logs
   - Check for specific error messages

2. **Check Neon database logs**
   - Look for connection attempts
   - Verify queries are reaching database

3. **Test locally with production env**
   ```bash
   # Copy production .env values
   NODE_ENV=production npm run dev
   ```

---

## ✅ Success Checklist

Your deployment is successful when:

- [ ] `npm run env:check` passes ✅
- [ ] `npm run db:test` shows all tables ✅
- [ ] Homepage loads without errors
- [ ] `/p/[slug]` pages display correctly
- [ ] Login works at `/auth/sign-in`
- [ ] Admin panel accessible
- [ ] No database connection errors in logs

---

## 🎉 You're Ready!

With these fixes, your production app should:
- ✅ Connect to database successfully
- ✅ Allow users to login
- ✅ Display landing pages
- ✅ Work reliably in production

**Remember:** The main issue was `BETTER_AUTH_URL` pointing to localhost instead of your production domain!
