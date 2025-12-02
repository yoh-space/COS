import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const successStoriesData = [
  {
    title: 'From Chemistry Student to Research Scientist',
    studentName: 'Dr. Alemayehu Tadesse',
    graduationYear: 2018,
    degree: 'BSc Chemistry',
    currentPosition: 'Senior Research Scientist',
    company: 'Ethiopian Institute of Agricultural Research',
    story: 'After graduating with a BSc in Chemistry from BDU College of Science, I pursued advanced research in agricultural chemistry. Today, I lead a team developing sustainable fertilizers that have improved crop yields for thousands of Ethiopian farmers. The solid foundation I received at BDU, particularly in analytical chemistry and research methodology, has been instrumental in my career success.',
    achievements: [
      'Published 15 peer-reviewed papers in international journals',
      'Led 3 major research projects worth $2M+',
      'Received National Science Award 2023',
      'Developed 2 patented fertilizer formulations'
    ],
    status: 'published',
    featured: true,
    displayOrder: 1,
  },
  {
    title: 'Mathematics Graduate Becomes Tech Entrepreneur',
    studentName: 'Hanan Mohammed',
    graduationYear: 2019,
    degree: 'BSc Mathematics',
    currentPosition: 'CEO & Founder',
    company: 'EduTech Solutions Ethiopia',
    story: 'My mathematics background from BDU gave me the analytical skills to identify gaps in educational technology. I founded EduTech Solutions, which now serves over 50,000 students across Ethiopia with innovative learning platforms. The problem-solving skills and logical thinking I developed during my mathematics studies have been crucial in building scalable technology solutions.',
    achievements: [
      'Founded successful EdTech startup valued at $5M',
      'Served 50,000+ students across Ethiopia',
      'Featured in Forbes Africa 30 Under 30',
      'Raised $2M in Series A funding'
    ],
    status: 'published',
    featured: true,
    displayOrder: 2,
  },
  {
    title: 'Physics Graduate Advances Renewable Energy',
    studentName: 'Dawit Bekele',
    graduationYear: 2017,
    degree: 'MSc Physics',
    currentPosition: 'Renewable Energy Engineer',
    company: 'Ethiopian Electric Power',
    story: 'The solid foundation in physics I received at BDU enabled me to specialize in renewable energy systems. I now work on large-scale solar and wind projects that are transforming Ethiopia\'s energy landscape. My understanding of electromagnetic theory and thermodynamics from BDU has been essential in optimizing renewable energy installations.',
    achievements: [
      'Designed 5 major solar installations (200MW total)',
      'Contributed to Ethiopia\'s renewable energy capacity',
      'International Energy Conference keynote speaker',
      'Published research on solar efficiency optimization'
    ],
    status: 'published',
    featured: true,
    displayOrder: 3,
  },
  {
    title: 'Biology Graduate Leads Conservation Efforts',
    studentName: 'Dr. Meron Getachew',
    graduationYear: 2016,
    degree: 'MSc Biology',
    currentPosition: 'Conservation Biologist',
    company: 'Ethiopian Wildlife Conservation Authority',
    story: 'My biology education at BDU sparked my passion for wildlife conservation. I now lead conservation programs protecting endangered species in Ethiopian national parks. The field research experience and ecological knowledge I gained at BDU prepared me to tackle complex conservation challenges and work with local communities.',
    achievements: [
      'Led conservation of 3 endangered species',
      'Established 2 new protected areas',
      'Trained 100+ local conservation officers',
      'Published 12 papers on Ethiopian biodiversity'
    ],
    status: 'published',
    featured: false,
    displayOrder: 4,
  },
  {
    title: 'Statistics Graduate Transforms Healthcare Data',
    studentName: 'Yohannes Assefa',
    graduationYear: 2020,
    degree: 'BSc Statistics',
    currentPosition: 'Senior Data Scientist',
    company: 'Ethiopian Ministry of Health',
    story: 'The statistical analysis skills I learned at BDU have been instrumental in improving healthcare outcomes across Ethiopia. I now analyze health data to inform policy decisions and optimize resource allocation. The rigorous training in statistical methods and data interpretation at BDU prepared me to handle complex healthcare datasets.',
    achievements: [
      'Developed national health monitoring system',
      'Improved disease outbreak prediction by 40%',
      'Trained 200+ healthcare data analysts',
      'Contributed to 5 major health policy reforms'
    ],
    status: 'published',
    featured: false,
    displayOrder: 5,
  },
  {
    title: 'Industrial Chemistry Graduate Innovates Manufacturing',
    studentName: 'Tigist Hailu',
    graduationYear: 2019,
    degree: 'BSc Industrial Chemistry',
    currentPosition: 'Process Development Manager',
    company: 'Dangote Cement Ethiopia',
    story: 'My industrial chemistry background from BDU equipped me with the knowledge to optimize manufacturing processes. I now lead process improvements that have increased production efficiency by 25% while reducing environmental impact. The practical laboratory experience and chemical engineering principles I learned at BDU have been invaluable in my industrial career.',
    achievements: [
      'Increased production efficiency by 25%',
      'Reduced manufacturing waste by 30%',
      'Led team of 50+ engineers and technicians',
      'Implemented 3 major process innovations'
    ],
    status: 'published',
    featured: false,
    displayOrder: 6,
  },
];

async function seedSuccessStories() {
  console.log('🌱 Seeding success stories...');

  try {
    // Clear existing success stories
    await prisma.successStory.deleteMany();
    console.log('✅ Cleared existing success stories');

    // Create success stories
    for (const storyData of successStoriesData) {
      await prisma.successStory.create({
        data: storyData,
      });
    }

    console.log(`✅ Created ${successStoriesData.length} success stories`);
    console.log('🎉 Success stories seeding completed!');

  } catch (error) {
    console.error('❌ Error seeding success stories:', error);
    throw error;
  }
}

export default seedSuccessStories;

// Run directly if this file is executed
if (require.main === module) {
  seedSuccessStories()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}