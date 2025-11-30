/**
 * Seed script for BackgroundContent
 * Run with: npx tsx prisma/seed-background.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialBackgroundContent = {
  history: {
    title: "History & Evolution",
    description: [
      "The College of Science at Bahir Dar University, originally a part of the former Faculty of Education, became an independent college in 2008 following the university's restructuring and the increased focus on the Science and Technology sectors.",
      "Today, the college offers high-quality education across seven programs at the Undergraduate, Master's, and Doctorate levels."
    ],
    programs: "Biology, Chemistry, Mathematics, Physics, Industrial Chemistry, Statistics, and Data Science"
  },
  programs: {
    msc: "11 MSc Programs (29 Specializations)",
    phd: "9 PhD Programs (22 Specializations)",
    undergraduate: "7 Undergraduate Programs"
  },
  students: {
    total: 1151,
    regular: { ug: 659, msc: 50, phd: 91 },
    summer: { ug: 189, msc: 162 }
  },
  staff: {
    total: 174,
    professors: 11,
    associateProfessors: 44,
    assistantProfessors: 47,
    lecturers: 51
  },
  development: {
    phdStudyLeave: 18,
    postdoc: 9,
    techAssistants: 3
  },
  research: {
    ongoingProjects: 30,
    internalProjects: 17,
    externalProjects: 13,
    communityProjects: 20,
    laboratory: "Washera Geospace and Radar Science Laboratory"
  }
};

async function main() {
  console.log('Starting background content seeding...');

  try {
    // Check if background content already exists
    const existingContent = await prisma.backgroundContent.findFirst();

    if (existingContent) {
      console.log('Background content already exists. Updating...');
      await prisma.backgroundContent.update({
        where: { id: existingContent.id },
        data: {
          content: JSON.stringify(initialBackgroundContent),
        },
      });
      console.log('Background content updated successfully!');
    } else {
      console.log('Creating new background content...');
      await prisma.backgroundContent.create({
        data: {
          content: JSON.stringify(initialBackgroundContent),
        },
      });
      console.log('Background content created successfully!');
    }

    // Update Admin role to include background permissions
    const adminRole = await prisma.role.findUnique({
      where: { name: 'Admin' },
    });

    if (adminRole) {
      const permissions = adminRole.permissions;
      const newPermissions = ['background:read', 'background:update', 'background:*'];
      
      const hasBackgroundPermissions = newPermissions.some(perm => 
        permissions.includes(perm)
      );

      if (!hasBackgroundPermissions) {
        console.log('Adding background permissions to Admin role...');
        await prisma.role.update({
          where: { name: 'Admin' },
          data: {
            permissions: [...permissions, ...newPermissions],
          },
        });
        console.log('Background permissions added to Admin role!');
      } else {
        console.log('Admin role already has background permissions.');
      }
    } else {
      console.log('Warning: Admin role not found. Please create it first.');
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
