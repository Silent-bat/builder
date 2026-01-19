# 🔐 Authentication Setup Guide

## Issue: 401 Error After Successful Sign In

### What's Happening
- ✅ Sign up shows "success" toast
- ❌ Getting 401 Unauthorized errors in console
- ❌ Not getting redirected/authenticated properly

---

## 🔧 Troubleshooting Steps

### Step 1: Check Browser Console
Open browser DevTools (F12) and look for:
1. Cookie errors
2. CORS errors
3. Network requests failing
4. Session token issues

### Step 2: Verify Better Auth Setup

**Current Configuration:**
```env
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="[configured]"
```

**Check:**
- Are you accessing the site at exactly `http://localhost:3000`?
- Not `127.0.0.1:3000` or any other variant?
- URLs must match exactly!

### Step 3: Clear Browser Data

Sometimes cached cookies cause issues:
1. Open DevTools → Application tab
2. Clear all cookies for localhost
3. Clear Local Storage
4. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. Try signing in again

### Step 4: Verify Database Connection

Check if user was created:
```bash
# If you have psql access
psql $DATABASE_URL -c "SELECT email, name, role FROM user LIMIT 5;"
```

---

## ✅ **Working Sign Up Process**

### Recommended Credentials:
```
Email:    admin@example.com
Password: admin123
Name:     Admin User
```

### Steps:
1. **Go to:** http://localhost:3000/sign-up
2. **Fill in form** with above credentials
3. **Click "Sign Up"**
4. **Wait for success message**
5. **Should redirect to dashboard or sign-in**
6. **If redirected to sign-in, use same credentials**

---

## 🔍 **Common Issues & Solutions**

### Issue 1: Cookies Not Being Set
**Solution:**
- Make sure you're using exact URL: `http://localhost:3000`
- Check browser cookie settings
- Disable any cookie blockers
- Try in incognito mode

### Issue 2: CORS Errors
**Solution:**
- Better Auth should handle CORS automatically
- Verify BETTER_AUTH_URL matches your access URL
- Restart dev server

### Issue 3: Session Not Persisting
**Solution:**
- Clear all browser data for localhost
- Try different browser
- Check Network tab for session cookies

### Issue 4: PostgreSQL Connection
**Solution:**
- Verify DATABASE_URL is correct
- Check if Neon database is accessible
- Run: `npx prisma db push` to sync schema

---

## 🎯 **Alternative: Check Existing Users**

To see if users already exist in the database, you can:

1. Check through Prisma Studio:
   ```bash
   npx prisma studio
   ```
   Opens at: http://localhost:5555

2. Or query directly (if you have database access)

---

## 🚀 **Next Steps**

### If Sign Up Works:
1. Complete registration with `admin@example.com`
2. Sign in with your credentials
3. Access admin panel: http://localhost:3000/admin/pages
4. Start building your e-commerce store!

### If Still Getting 401:
1. Open browser console
2. Go to Network tab
3. Try signing in again
4. Look for failed requests
5. Check response details
6. Share the specific error message for more help

---

## 📞 **Debug Information to Check**

When you get the 401 error, check:

1. **Network Tab:**
   - Which endpoint returns 401?
   - Is it `/api/auth/*` or something else?
   - What's the request payload?

2. **Console Tab:**
   - Any JavaScript errors?
   - Cookie warnings?
   - CORS messages?

3. **Application Tab:**
   - Are cookies being set?
   - Look for `better-auth.session_token`
   - Check cookie domain and path

---

## 💡 **Quick Fix Attempts**

Try these in order:

1. **Hard Refresh**: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. **Clear Cookies**: DevTools → Application → Clear site data
3. **Incognito Mode**: Try signing up in incognito/private browsing
4. **Different Browser**: Try Chrome if using Firefox, or vice versa
5. **Restart Server**: Stop and restart `npm run dev`

---

**Most common fix: Clear all browser data for localhost and try again in incognito mode!**

Let me know which specific endpoint is giving the 401 error and I can investigate further.
