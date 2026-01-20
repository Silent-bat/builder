#!/usr/bin/env node

/**
 * Fix Page Types Script
 * Updates page types according to business rules:
 * - Only ONE LANDING page (for homepage)
 * - Multiple NORMAL pages (for /p/[slug] routes)
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixPageTypes() {
  console.log('🔍 Current page types:');
  
  const pages = await prisma.page.findMany({
    select: { id: true, slug: true, title: true, type: true, published: true },
    orderBy: { createdAt: 'asc' }
  });
  
  pages.forEach(page => {
    console.log(`   ${page.slug} (${page.type}) - ${page.title}`);
  });
  
  console.log('\n📝 Suggested changes:');
  console.log('   - Keep "home" as LANDING (homepage)');
  console.log('   - Change "shop" to NORMAL');
  console.log('   - Change "store" to NORMAL');
  
  console.log('\n⚠️  This will make:');
  console.log('   - Homepage (/) show "home" content');
  console.log('   - /p/shop show "shop" content');
  console.log('   - /p/store show "store" content');
  
  // Apply the changes:
  console.log('\n🔧 Applying changes...');
  
  // Get page IDs first
  const homePageId = await prisma.page.findFirst({ where: { slug: 'home' }, select: { id: true } });
  const shopPageId = await prisma.page.findFirst({ where: { slug: 'shop' }, select: { id: true } });
  const storePageId = await prisma.page.findFirst({ where: { slug: 'store' }, select: { id: true } });
  
  if (homePageId) {
    await prisma.page.update({
      where: { id: homePageId.id },
      data: { type: 'LANDING' }
    });
    console.log('   ✅ home → LANDING');
  }
  
  if (shopPageId) {
    await prisma.page.update({
      where: { id: shopPageId.id }, 
      data: { type: 'NORMAL' }
    });
    console.log('   ✅ shop → NORMAL');
  }
  
  if (storePageId) {
    await prisma.page.update({
      where: { id: storePageId.id },
      data: { type: 'NORMAL' }
    });
    console.log('   ✅ store → NORMAL');
  }
  
  console.log('\n✅ Page types updated successfully!');
  
  // Verify the changes
  console.log('\n🔍 Updated page types:');
  const updatedPages = await prisma.page.findMany({
    select: { slug: true, type: true, title: true },
    orderBy: { createdAt: 'asc' }
  });
  
  updatedPages.forEach(page => {
    console.log(`   ${page.slug} (${page.type}) - ${page.title}`);
  });
  
  console.log('\n🚀 To apply changes, uncomment the update code in this script and run again.');
}

async function main() {
  try {
    await fixPageTypes();
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();