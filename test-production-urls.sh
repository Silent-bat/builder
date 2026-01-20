#!/bin/bash

echo "🧪 Testing Production URLs: https://thenextbuilder.vercel.app"
echo "=================================================="
echo ""

# Test homepage
echo "1️⃣ Testing Homepage..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://thenextbuilder.vercel.app/")
if [ "$STATUS" = "200" ]; then
  echo "   ✅ Status: $STATUS"
else
  echo "   ❌ Status: $STATUS (Expected: 200)"
fi

# Test sign-in
echo ""
echo "2️⃣ Testing Sign-in Page..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://thenextbuilder.vercel.app/auth/sign-in")
if [ "$STATUS" = "200" ]; then
  echo "   ✅ Status: $STATUS"
else
  echo "   ❌ Status: $STATUS (Expected: 200)"
fi

# Test landing pages
echo ""
echo "3️⃣ Testing Landing Pages..."
for slug in home shop store; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://thenextbuilder.vercel.app/p/$slug")
  if [ "$STATUS" = "200" ]; then
    echo "   ✅ /p/$slug: $STATUS"
  else
    echo "   ❌ /p/$slug: $STATUS (Expected: 200)"
  fi
done

# Test API health
echo ""
echo "4️⃣ Testing API..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://thenextbuilder.vercel.app/api/auth/session")
echo "   Session endpoint: $STATUS"

echo ""
echo "=================================================="
echo "Test complete! If you see ❌, check Vercel environment variables."
echo ""
echo "Next steps:"
echo "1. Read CHECK_VERCEL_ENV.md for detailed troubleshooting"
echo "2. Verify all 4 environment variables are set in Vercel"
echo "3. Redeploy without cache after fixing env vars"
