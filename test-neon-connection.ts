import 'dotenv/config';
import { neonApi } from './src/lib/neon-api';

async function testConnection() {
  console.log('🔍 Testing Neon Database Connection...\n');

  try {
    console.log('1️⃣ Testing Departments...');
    const departments = await neonApi.getDepartments();
    console.log(`✅ Found ${departments.length} departments`);
    if (departments.length > 0) {
      console.log(`   Sample: ${departments[0].name}`);
    }

    console.log('\n2️⃣ Testing Vision & Mission...');
    const visionMission = await neonApi.getVisionMission();
    console.log(`✅ Found ${visionMission.length} vision/mission records`);

    console.log('\n3️⃣ Testing Blog Posts...');
    const blogPosts = await neonApi.getBlogPosts(3);
    console.log(`✅ Found ${blogPosts.length} blog posts`);

    console.log('\n4️⃣ Testing Administrators...');
    const admins = await neonApi.getAdministrators();
    console.log(`✅ Found ${admins.length} administrators`);

    console.log('\n5️⃣ Testing Success Stories...');
    const stories = await neonApi.getSuccessStories();
    console.log(`✅ Found ${stories.length} success stories`);

    console.log('\n6️⃣ Testing Academic Programs...');
    const programs = await neonApi.getAcademicPrograms();
    console.log(`✅ Found ${programs.length} academic programs`);

    console.log('\n✅ All tests passed! Neon database integration is successful! 🎉');
  } catch (error) {
    console.error('\n❌ Connection test failed:', error);
    process.exit(1);
  }
}

testConnection();
