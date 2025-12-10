import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedManagementRoles() {
  console.log('Seeding management roles...');

  const roles = [
    {
      name: 'Resource_Manager',
      description: 'Manages academic resources, publications, and research materials',
      permissions: [
        'resource:*',
        'publication:*',
        'research:*',
        'report:*',
        'academic_program:read',
        'department:read',
      ],
    },
    {
      name: 'Staff_Manager',
      description: 'Manages staff members, departments, and administrative positions',
      permissions: [
        'staff:*',
        'department:*',
        'admin_position:*',
        'user:read',
        'user:update',
      ],
    },
    {
      name: 'Content_Manager',
      description: 'Manages website content, blogs, and success stories',
      permissions: [
        'blog:*',
        'success_story:*',
        'dean_message:*',
        'vision_mission:*',
        'background:*',
        'service:*',
        'media:*',
      ],
    },
    {
      name: 'Academic_Manager',
      description: 'Manages academic programs, sections, and educational content',
      permissions: [
        'academic_program:*',
        'academic_section:*',
        'department:read',
        'staff:read',
      ],
    },
  ];

  for (const roleData of roles) {
    try {
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
    } catch (error) {
      console.error(`✗ Error creating role ${roleData.name}:`, error);
    }
  }

  console.log('Management roles seeding completed!');
}

seedManagementRoles()
  .catch((e) => {
    console.error('Error seeding management roles:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
