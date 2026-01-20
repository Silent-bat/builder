#!/usr/bin/env node

/**
 * Production Environment Variables Checker
 * Validates that all required environment variables are set correctly
 */

// Load .env file if it exists (optional, works without dotenv package)
try {
  const fs = require('fs');
  const path = require('path');
  const envPath = path.join(process.cwd(), '.env');
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=#]+)=(.*)$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
      }
    });
  }
} catch (error) {
  // Ignore errors, environment variables might be set via other means
}

const checks = {
  critical: [],
  warnings: [],
  info: [],
};

console.log('🔍 Checking Production Environment Variables...\n');

// Critical checks
console.log('1️⃣ Critical Variables:');

// DATABASE_URL
if (!process.env.DATABASE_URL) {
  checks.critical.push('❌ DATABASE_URL is not set');
} else if (process.env.DATABASE_URL.includes('localhost')) {
  checks.warnings.push('⚠️  DATABASE_URL contains localhost - should be production database');
} else if (!process.env.DATABASE_URL.includes('sslmode=require')) {
  checks.warnings.push('⚠️  DATABASE_URL missing sslmode=require (recommended for Neon)');
} else {
  console.log('   ✅ DATABASE_URL is set');
}

// BETTER_AUTH_SECRET
if (!process.env.BETTER_AUTH_SECRET) {
  checks.critical.push('❌ BETTER_AUTH_SECRET is not set');
} else if (process.env.BETTER_AUTH_SECRET.length < 32) {
  checks.critical.push('❌ BETTER_AUTH_SECRET must be at least 32 characters');
} else {
  console.log('   ✅ BETTER_AUTH_SECRET is set');
}

// BETTER_AUTH_URL
if (!process.env.BETTER_AUTH_URL) {
  checks.critical.push('❌ BETTER_AUTH_URL is not set');
} else if (process.env.BETTER_AUTH_URL.includes('localhost')) {
  checks.critical.push('❌ BETTER_AUTH_URL contains localhost - must be production URL!');
  console.log(`   ❌ BETTER_AUTH_URL: ${process.env.BETTER_AUTH_URL} (should be https://your-domain.com)`);
} else {
  console.log(`   ✅ BETTER_AUTH_URL: ${process.env.BETTER_AUTH_URL}`);
}

// NEXT_PUBLIC_BETTER_AUTH_URL
if (!process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
  checks.warnings.push('⚠️  NEXT_PUBLIC_BETTER_AUTH_URL is not set (client-side may fail)');
} else if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL.includes('localhost')) {
  checks.critical.push('❌ NEXT_PUBLIC_BETTER_AUTH_URL contains localhost - must be production URL!');
  console.log(`   ❌ NEXT_PUBLIC_BETTER_AUTH_URL: ${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}`);
} else {
  console.log(`   ✅ NEXT_PUBLIC_BETTER_AUTH_URL: ${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}`);
}

console.log('');

// Optional but recommended
console.log('2️⃣ Optional Variables:');

const optionalVars = [
  'ADMIN_EMAIL',
  'RESEND_API_KEY',
  'STRIPE_SECRET_KEY',
  'UPLOADTHING_SECRET',
];

optionalVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`   ✅ ${varName} is set`);
  } else {
    checks.info.push(`ℹ️  ${varName} is not set (optional)`);
  }
});

console.log('');

// Environment checks
console.log('3️⃣ Environment Configuration:');

if (process.env.SKIP_ENV_VALIDATION === 'true') {
  checks.warnings.push('⚠️  SKIP_ENV_VALIDATION=true (should be removed in production!)');
  console.log('   ⚠️  SKIP_ENV_VALIDATION is enabled (not recommended for production)');
} else {
  console.log('   ✅ Environment validation is enabled');
}

if (process.env.NODE_ENV === 'production') {
  console.log('   ✅ NODE_ENV=production');
} else {
  checks.warnings.push(`⚠️  NODE_ENV=${process.env.NODE_ENV || 'not set'} (should be production)`);
}

console.log('');

// Summary
console.log('📊 Summary:');
console.log('─'.repeat(50));

if (checks.critical.length > 0) {
  console.log('\n🚨 CRITICAL ISSUES (must fix):');
  checks.critical.forEach(msg => console.log(`   ${msg}`));
}

if (checks.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS (should fix):');
  checks.warnings.forEach(msg => console.log(`   ${msg}`));
}

if (checks.info.length > 0) {
  console.log('\nℹ️  INFO:');
  checks.info.forEach(msg => console.log(`   ${msg}`));
}

console.log('');

if (checks.critical.length === 0 && checks.warnings.length === 0) {
  console.log('✅ All environment variables are properly configured!\n');
  process.exit(0);
} else if (checks.critical.length > 0) {
  console.log('❌ Fix critical issues before deploying to production!\n');
  process.exit(1);
} else {
  console.log('⚠️  Please review warnings before deploying to production.\n');
  process.exit(0);
}
