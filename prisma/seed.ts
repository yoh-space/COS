/**
 * Database seeding script
 * Run with: npx prisma db seed
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') });

import { prisma } from '../src/lib/prisma';
import { PERMISSIONS, ROLES } from '../src/lib/permissions';

// Random data generators
const firstNames = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa',
  'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer', 'Thomas', 'Linda',
  'Charles', 'Barbara', 'Daniel', 'Elizabeth', 'Matthew', 'Susan', 'Anthony', 'Jessica',
  'Mark', 'Karen', 'Donald', 'Nancy', 'Steven', 'Betty', 'Paul', 'Margaret',
  'Andrew', 'Sandra', 'Joshua', 'Ashley', 'Kenneth', 'Kimberly', 'Kevin', 'Donna',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris',
  'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright',
];

const titles = [
  'Professor', 'Associate Professor', 'Assistant Professor', 'Senior Lecturer',
  'Lecturer', 'Research Fellow', 'Lab Instructor', 'Department Head',
  'Program Coordinator', 'Teaching Assistant', 'Adjunct Professor',
];

const specializations = [
  'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Software Engineering',
  'Computer Networks', 'Cybersecurity', 'Database Systems', 'Web Development',
  'Mobile Development', 'Cloud Computing', 'Distributed Systems', 'Computer Graphics',
  'Human-Computer Interaction', 'Operating Systems', 'Algorithms', 'Theory of Computation',
  'Bioinformatics', 'Quantum Computing', 'Blockchain Technology', 'IoT Systems',
  'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry',
  'Biochemistry', 'Quantum Mechanics', 'Thermodynamics', 'Electromagnetism',
  'Particle Physics', 'Astrophysics', 'Algebra', 'Calculus', 'Statistics',
  'Number Theory', 'Topology', 'Differential Equations', 'Cell Biology',
  'Molecular Biology', 'Genetics', 'Ecology', 'Microbiology', 'Botany', 'Zoology',
];

const bioTemplates = [
  'Experienced educator with over {years} years in academia. Passionate about {field} and committed to student success.',
  'Research-focused professional specializing in {field}. Published numerous papers in leading journals.',
  'Dedicated to advancing knowledge in {field} through innovative teaching methods and cutting-edge research.',
  'Expert in {field} with a strong background in both theoretical and practical applications.',
  'Committed to fostering a collaborative learning environment while pursuing excellence in {field} research.',
];

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomStaffMember(departmentId: string, departmentName: string) {
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@college.edu`;
  const title = randomElement(titles);
  const specialization = randomElement(specializations);
  const years = Math.floor(Math.random() * 20) + 3;
  const bio = randomElement(bioTemplates)
    .replace('{years}', years.toString())
    .replace('{field}', specialization);

  // 30% chance of having social media links
  const hasSocial = Math.random() > 0.7;

  return {
    name,
    email,
    title,
    specialization,
    departmentId,
    bio,
    status: 'active',
    telegram: hasSocial ? `@${firstName.toLowerCase()}${lastName.toLowerCase()}` : null,
    twitter: hasSocial ? `@${firstName.toLowerCase()}${lastName.toLowerCase()}` : null,
    linkedin: hasSocial ? `${firstName.toLowerCase()}-${lastName.toLowerCase()}` : null,
    profileImage: null,
  };
}

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

  // Seed departments if they don't exist
  console.log('\nSeeding departments...');
  
  const departmentsToSeed = [
    {
      name: 'Computer Science',
      slug: 'computer-science',
      description: 'Department of Computer Science focuses on software development, algorithms, artificial intelligence, and computing systems.',
    },
    {
      name: 'Mathematics',
      slug: 'mathematics',
      description: 'Department of Mathematics covers pure and applied mathematics, statistics, and mathematical modeling.',
    },
    {
      name: 'Physics',
      slug: 'physics',
      description: 'Department of Physics explores fundamental laws of nature, from quantum mechanics to astrophysics.',
    },
    {
      name: 'Chemistry',
      slug: 'chemistry',
      description: 'Department of Chemistry studies matter, its properties, composition, and transformations.',
    },
    {
      name: 'Biology',
      slug: 'biology',
      description: 'Department of Biology investigates living organisms, from molecular biology to ecology.',
    },
  ];

  const departments = [];
  for (const deptData of departmentsToSeed) {
    const department = await prisma.department.upsert({
      where: { slug: deptData.slug },
      update: {
        name: deptData.name,
        description: deptData.description,
      },
      create: {
        name: deptData.name,
        slug: deptData.slug,
        description: deptData.description,
      },
    });
    departments.push(department);
    console.log(`✓ Created/Updated department: ${department.name}`);
  }

  // Seed staff members for each department
  console.log('\nSeeding staff members...');
  
  let totalStaffCreated = 0;
  for (const department of departments) {
    // Generate 5-10 random staff members per department
    const staffCount = Math.floor(Math.random() * 6) + 5;
    
    for (let i = 0; i < staffCount; i++) {
      const staffData = generateRandomStaffMember(department.id, department.name);
      
      try {
        // Check if staff member with this email already exists
        const existingStaff = await prisma.staffMember.findUnique({
          where: { email: staffData.email },
        });

        if (!existingStaff) {
          await prisma.staffMember.create({
            data: staffData,
          });
          totalStaffCreated++;
        }
      } catch (error) {
        // Skip if duplicate email (unlikely but possible with random generation)
        console.log(`  ⚠ Skipped duplicate: ${staffData.email}`);
      }
    }
    
    console.log(`✓ Created staff members for ${department.name}`);
  }

  console.log(`\n✓ Total staff members created: ${totalStaffCreated}`);
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
