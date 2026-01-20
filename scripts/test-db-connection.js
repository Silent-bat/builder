#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Tests if the database is reachable and properly configured
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function testConnection() {
  console.log('🔍 Testing Database Connection...\n');
  
  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing basic connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful!\n');

    // Test 2: Check if tables exist
    console.log('2️⃣ Checking database tables...');
    const tableCheck = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    if (tableCheck.length === 0) {
      console.log('⚠️  No tables found! You need to run migrations.');
      console.log('   Run: npx prisma migrate deploy');
      console.log('   Or: npx prisma db push\n');
      return false;
    }
    
    console.log(`✅ Found ${tableCheck.length} tables:`);
    tableCheck.forEach(row => console.log(`   - ${row.table_name}`));
    console.log('');

    // Test 3: Check critical tables
    console.log('3️⃣ Checking critical tables...');
    const criticalTables = ['user', 'session', 'page', 'page_component'];
    const tableNames = tableCheck.map(t => t.table_name);
    
    let missingTables = [];
    for (const table of criticalTables) {
      if (tableNames.includes(table)) {
        console.log(`   ✅ ${table}`);
      } else {
        console.log(`   ❌ ${table} - MISSING!`);
        missingTables.push(table);
      }
    }
    
    if (missingTables.length > 0) {
      console.log('\n⚠️  Missing critical tables! Run migrations:\n');
      console.log('   npx prisma migrate deploy\n');
      return false;
    }
    console.log('');

    // Test 4: Check if data exists
    console.log('4️⃣ Checking for existing data...');
    const userCount = await prisma.user.count();
    const pageCount = await prisma.page.count();
    
    console.log(`   Users: ${userCount}`);
    console.log(`   Pages: ${pageCount}`);
    
    if (userCount === 0) {
      console.log('   ℹ️  No users found. You may want to run seed script.');
    }
    if (pageCount === 0) {
      console.log('   ℹ️  No pages found. Create pages in admin panel.');
    }
    console.log('');

    // Test 5: Check published pages
    if (pageCount > 0) {
      console.log('5️⃣ Checking published pages...');
      const publishedPages = await prisma.page.findMany({
        where: { published: true },
        select: { slug: true, title: true },
      });
      
      if (publishedPages.length === 0) {
        console.log('   ⚠️  No published pages found!');
        console.log('   Publish pages in admin panel to make them visible.');
      } else {
        console.log(`   ✅ Found ${publishedPages.length} published page(s):`);
        publishedPages.forEach(page => {
          console.log(`      - /p/${page.slug} - ${page.title}`);
        });
      }
      console.log('');
    }

    console.log('✅ Database is properly configured!\n');
    console.log('📝 Summary:');
    console.log(`   - Database: Connected`);
    console.log(`   - Tables: ${tableCheck.length} found`);
    console.log(`   - Users: ${userCount}`);
    console.log(`   - Pages: ${pageCount} (${pageCount > 0 ? await prisma.page.count({ where: { published: true }}) : 0} published)`);
    console.log('');
    
    return true;

  } catch (error) {
    console.error('❌ Database Connection Error:\n');
    
    if (error.code === 'P1001') {
      console.error('   Unable to reach database server.');
      console.error('   - Check DATABASE_URL is correct');
      console.error('   - Verify network connectivity');
      console.error('   - Check firewall/IP whitelist settings\n');
    } else if (error.code === 'P1003') {
      console.error('   Database does not exist.');
      console.error('   - Verify DATABASE_URL points to correct database');
      console.error('   - Create database if it doesn\'t exist\n');
    } else if (error.code === 'P1017') {
      console.error('   Server closed connection.');
      console.error('   - Database server might be down');
      console.error('   - Check connection pool settings\n');
    } else {
      console.error(`   ${error.message}\n`);
    }
    
    console.error('Error details:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
