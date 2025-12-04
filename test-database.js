const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testDatabase() {
  console.log('🔍 Testing Neon Database Connection...\n');

  try {
    // Test connection
    console.log('1️⃣ Testing connection...');
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Connection successful!\n');

    // Count departments
    console.log('2️⃣ Counting departments...');
    const deptCount = await prisma.department.count();
    console.log(`✅ Found ${deptCount} departments\n`);

    // List departments
    console.log('3️⃣ Listing departments...');
    const departments = await prisma.department.findMany({
      select: { name: true, slug: true }
    });
    departments.forEach(dept => {
      console.log(`   - ${dept.name} (${dept.slug})`);
    });
    console.log('');

    // Count other data
    console.log('4️⃣ Counting other data...');
    const adminCount = await prisma.administrator.count();
    const storyCount = await prisma.successStory.count();
    const blogCount = await prisma.blogPost.count();
    const programCount = await prisma.academicProgram.count();
    
    console.log(`   - Administrators: ${adminCount}`);
    console.log(`   - Success Stories: ${storyCount}`);
    console.log(`   - Blog Posts: ${blogCount}`);
    console.log(`   - Academic Programs: ${programCount}`);
    console.log('');

    console.log('🎉 All tests passed! Database is working correctly.\n');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
