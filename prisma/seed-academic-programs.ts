import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAcademicPrograms() {
  console.log('Seeding academic programs...');

  const programs = [
    {
      name: 'Undergraduate',
      level: 'BSc',
      duration: '4 Years',
      subtitle: 'Bachelor of Science programs across six departments.',
      description: 'Comprehensive undergraduate programs in Chemistry, Industrial Chemistry, Biology, Physics, Mathematics, and Statistics & Data Science.',
      features: [
        'Chemistry',
        'Industrial Chemistry',
        'Biology',
        'Physics',
        'Mathematics',
        'Statistics & Data Science',
        'Laboratory Training',
        'Research Projects',
        'Industry Internships',
        'Career Development',
        'International Exchange',
        'Advanced Certifications',
      ],
      status: 'active',
      displayOrder: 1,
    },
    {
      name: 'Graduate',
      level: 'MSc',
      duration: '2 Years',
      subtitle: 'Master of Science programs with research focus.',
      description: 'Advanced graduate programs emphasizing research, thesis work, and specialized training.',
      features: [
        'Advanced Coursework',
        'Thesis Research',
        'Laboratory Access',
        'Research Publications',
        'Teaching Assistantships',
        'Conference Presentations',
        'Industry Collaboration',
        'Specialized Training',
        'International Conferences',
        'Research Grants',
        'Mentorship Programs',
        'Career Placement',
      ],
      status: 'active',
      displayOrder: 2,
    },
    {
      name: 'Doctoral',
      level: 'PhD',
      duration: '3-4 Years',
      subtitle: 'Doctor of Philosophy programs for research excellence.',
      description: 'Doctoral programs focused on original research, dissertation work, and academic leadership.',
      features: [
        'Original Research',
        'Dissertation Defense',
        'Advanced Lab Facilities',
        'International Publications',
        'Conference Presentations',
        'Research Funding',
        'Teaching Experience',
        'Collaborative Research',
        'International Partnerships',
        'Post-doctoral Opportunities',
        'Academic Career Path',
        'Industry Leadership Roles',
      ],
      status: 'active',
      displayOrder: 3,
    },
  ];

  for (const program of programs) {
    const existing = await prisma.academicProgram.findFirst({
      where: {
        level: program.level,
        name: program.name,
      },
    });

    if (existing) {
      await prisma.academicProgram.update({
        where: { id: existing.id },
        data: program,
      });
      console.log(`✓ Updated academic program: ${program.name} (${program.level})`);
    } else {
      await prisma.academicProgram.create({
        data: program,
      });
      console.log(`✓ Created academic program: ${program.name} (${program.level})`);
    }
  }

  console.log('Academic programs seeded successfully!');
}

// Allow running this script directly
if (require.main === module) {
  seedAcademicPrograms()
    .catch((e) => {
      console.error('Error seeding academic programs:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
