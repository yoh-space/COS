import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedResources() {
  console.log('Seeding resources...');

  // Seed Publications
  const publications = [
    {
      title: 'Ethiopian Journal of Science and Technology (EJST)',
      category: 'ejst',
      description: 'A key platform for research dissemination within the college',
      content: `A key platform for research dissemination within the college is the Ethiopian Journal of Science and Technology (EJST), a peer-reviewed journal hosted by Bahir Dar University. EJST provides an avenue for publishing high quality research in science, engineering, and technology, offering a regional and international forum for scholars to share their findings.

The journal plays a crucial role in promoting local research while ensuring that scientific contributions from Ethiopian and African researchers are recognized globally. Additionally, EJST supports early career researchers by providing opportunities to publish their work in a reputable academic outlet.`,
      externalUrl: 'https://www.ajol.info/index.php/ejst',
      status: 'published',
      publishedAt: new Date(),
    },
    {
      title: 'Conferences & Symposia',
      category: 'dissemination',
      description: 'Annual research conferences and international participation',
      content: 'Annual research conferences hosted by the college provide a platform for faculty, postgraduate students, and invited researchers to present their latest discoveries. Participation in international scientific conferences enhances research visibility and fosters global partnerships.',
      status: 'published',
      publishedAt: new Date(),
    },
    {
      title: 'Peer-Reviewed Journals',
      category: 'dissemination',
      description: 'International publications across various disciplines',
      content: 'Faculty members and researchers actively publish in internationally recognized peer-reviewed journals across various disciplines including space physics, environmental science, biotechnology, chemistry, mathematics, and applied sciences.',
      status: 'published',
      publishedAt: new Date(),
    },
    {
      title: 'Workshops & Training',
      category: 'dissemination',
      description: 'Knowledge exchange and interdisciplinary collaboration',
      content: 'The college actively organizes workshops and training sessions to facilitate knowledge exchange and interdisciplinary collaboration, bringing together researchers, students, and industry professionals.',
      status: 'published',
      publishedAt: new Date(),
    },
    {
      title: 'Science Communication',
      category: 'dissemination',
      description: 'Public engagement and outreach',
      content: 'Science communication initiatives including public lectures, media engagements, and popular science articles help bridge the gap between academic research and the general public, making science accessible to all.',
      status: 'published',
      publishedAt: new Date(),
    },
  ];

  for (const pub of publications) {
    const existing = await prisma.publication.findFirst({
      where: {
        title: pub.title,
        category: pub.category,
      },
    });

    if (existing) {
      await prisma.publication.update({
        where: { id: existing.id },
        data: pub,
      });
      console.log(`✓ Updated publication: ${pub.title}`);
    } else {
      await prisma.publication.create({ data: pub });
      console.log(`✓ Created publication: ${pub.title}`);
    }
  }

  // Seed Research Activities
  const researchActivities = [
    {
      title: 'Thematic Research Areas',
      category: 'thematic',
      description: 'Core research focus areas across departments',
      content: 'The college focuses on several thematic research areas including space physics, environmental science, biotechnology, chemistry, mathematics, and applied sciences, fostering interdisciplinary collaboration and innovation.',
      status: 'published',
    },
    {
      title: 'Collaborative Research Projects',
      category: 'collaborative',
      description: 'Partnerships with global institutions',
      content: 'The college engages in collaborative research projects with international universities and research institutions, enhancing research capacity and contributing to global scientific advancement.',
      status: 'published',
    },
    {
      title: 'Annual Research Conference',
      category: 'conference',
      description: 'Annual scientific conference and symposium',
      content: 'The college hosts an annual research conference that brings together faculty, students, and invited researchers to present their latest findings and foster academic discourse.',
      status: 'published',
    },
  ];

  for (const activity of researchActivities) {
    const existing = await prisma.researchActivity.findFirst({
      where: {
        title: activity.title,
        category: activity.category,
      },
    });

    if (existing) {
      await prisma.researchActivity.update({
        where: { id: existing.id },
        data: activity,
      });
      console.log(`✓ Updated research activity: ${activity.title}`);
    } else {
      await prisma.researchActivity.create({ data: activity });
      console.log(`✓ Created research activity: ${activity.title}`);
    }
  }

  // Seed Reports
  const reports = [
    {
      title: 'Annual Report 2024',
      year: 2024,
      type: 'annual',
      description: 'College of Science annual performance report for 2024',
      status: 'published',
      publishedAt: new Date(),
    },
    {
      title: 'Annual Report 2023',
      year: 2023,
      type: 'annual',
      description: 'College of Science annual performance report for 2023',
      status: 'published',
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: 'Annual Report 2022',
      year: 2022,
      type: 'annual',
      description: 'College of Science annual performance report for 2022',
      status: 'published',
      publishedAt: new Date('2023-01-15'),
    },
    {
      title: 'Strategic Plan 2025-2030',
      year: 2025,
      type: 'strategic',
      description: 'Five-year strategic plan outlining goals and objectives for the College of Science',
      status: 'published',
      publishedAt: new Date(),
    },
  ];

  for (const report of reports) {
    const existing = await prisma.report.findFirst({
      where: {
        title: report.title,
        year: report.year,
      },
    });

    if (existing) {
      await prisma.report.update({
        where: { id: existing.id },
        data: report,
      });
      console.log(`✓ Updated report: ${report.title}`);
    } else {
      await prisma.report.create({ data: report });
      console.log(`✓ Created report: ${report.title}`);
    }
  }

  console.log('Resources seeded successfully!');
}

// Allow running this script directly
if (require.main === module) {
  seedResources()
    .catch((e) => {
      console.error('Error seeding resources:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
