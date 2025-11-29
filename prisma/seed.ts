/**
 * Database seeding script
 * Run with: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import { PERMISSIONS, ROLES } from '../src/lib/permissions';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Seed roles with their permissions
  const rolesToSeed = [
    {
      name: ROLES.ADMIN,
      description: 'Full system access with all permissions',
      permissions: [PERMISSIONS.ALL],
    },
    {
      name: ROLES.EDITOR,
      description: 'Can create, edit, and publish blog posts',
      permissions: [
        PERMISSIONS.BLOG_CREATE,
        PERMISSIONS.BLOG_READ,
        PERMISSIONS.BLOG_UPDATE,
        PERMISSIONS.BLOG_DELETE,
        PERMISSIONS.BLOG_PUBLISH,
        PERMISSIONS.MEDIA_UPLOAD,
        PERMISSIONS.MEDIA_READ,
      ],
    },
    {
      name: ROLES.DEPARTMENT_LEAD,
      description: 'Can manage content for their assigned department',
      permissions: [
        PERMISSIONS.STAFF_READ,
        PERMISSIONS.STAFF_UPDATE,
        PERMISSIONS.DEPARTMENT_READ,
        PERMISSIONS.BLOG_READ,
      ],
    },
    {
      name: ROLES.REGISTRAR,
      description: 'Can manage staff members and departments',
      permissions: [
        PERMISSIONS.STAFF_ALL,
        PERMISSIONS.DEPARTMENT_READ,
        PERMISSIONS.DEPARTMENT_UPDATE,
        PERMISSIONS.MEDIA_UPLOAD,
        PERMISSIONS.MEDIA_READ,
      ],
    },
    {
      name: ROLES.RESEARCH_LEAD,
      description: 'Can manage research resources and publications',
      permissions: [
        PERMISSIONS.RESOURCE_ALL,
        PERMISSIONS.MEDIA_UPLOAD,
        PERMISSIONS.MEDIA_READ,
      ],
    },
    {
      name: ROLES.FACULTY_MEMBER,
      description: 'Read-only access to content',
      permissions: [
        PERMISSIONS.BLOG_READ,
        PERMISSIONS.RESOURCE_READ,
        PERMISSIONS.STAFF_READ,
        PERMISSIONS.DEPARTMENT_READ,
      ],
    },
  ];

  console.log('Seeding roles...');
  
  for (const roleData of rolesToSeed) {
    const role = await prisma.role.upsert({
      where: { name: roleData.name },
      update: {
        description: roleData.description,
        permissions: roleData.permissions,
      },
      create: {
        name: roleData.name,
        description: roleData.description,
        permissions: roleData.permissions,
      },
    });
    console.log(`✓ Created/Updated role: ${role.name}`);
  }

  console.log('\nDatabase seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
