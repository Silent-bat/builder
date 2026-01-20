#!/bin/bash

echo "🔍 Verifying Production Deployment..."
echo ""

PROD_URL="https://thenextbuilder.vercel.app"

echo "1️⃣ Testing Homepage..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL")
if [ "$STATUS" = "200" ]; then
  echo "   ✅ Homepage: OK ($STATUS)"
else
  echo "   ❌ Homepage: FAILED ($STATUS)"
fi
echo ""

echo "2️⃣ Testing Landing Pages..."
for page in home shop store; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/p/$page")
  if [ "$STATUS" = "200" ]; then
    echo "   ✅ /p/$page: OK ($STATUS)"
  else
    echo "   ❌ /p/$page: FAILED ($STATUS)"
  fi
done
echo ""

echo "3️⃣ Testing Auth Pages..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/auth/sign-in")
if [ "$STATUS" = "200" ]; then
  echo "   ✅ Sign-in page: OK ($STATUS)"
else
  echo "   ❌ Sign-in page: FAILED ($STATUS)"
fi
echo ""

echo "4️⃣ Testing Admin Panel..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/admin")
if [ "$STATUS" = "307" ] || [ "$STATUS" = "200" ]; then
  echo "   ✅ Admin panel: OK ($STATUS - redirect expected)"
else
  echo "   ❌ Admin panel: FAILED ($STATUS)"
fi
echo ""

echo "✅ Verification complete!"
echo ""
echo "If you see failures, make sure to:"
echo "1. Set environment variables in Vercel"
echo "2. Redeploy without cache"
echo "3. Wait 2-3 minutes for deployment to complete"
