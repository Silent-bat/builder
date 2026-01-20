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
  
  // Uncomment these lines to apply the changes:
  /*
  await prisma.page.update({
    where: { slug: 'home' },
    data: { type: 'LANDING' }
  });
  
  await prisma.page.update({
    where: { slug: 'shop' }, 
    data: { type: 'NORMAL' }
  });
  
  await prisma.page.update({
    where: { slug: 'store' },
    data: { type: 'NORMAL' }
  });
  
  console.log('✅ Page types updated successfully!');
  */
  
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