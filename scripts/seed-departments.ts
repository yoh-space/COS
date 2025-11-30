import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local if it exists, otherwise .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient();

const departments = [
    {
        name: 'Chemistry',
        slug: 'chemistry',
        description: 'The Department of Chemistry offers comprehensive programs in chemical sciences, preparing students for careers in research, industry, and education.',
    },
    {
        name: 'Industrial Chemistry',
        slug: 'industrial-chemistry',
        description: 'The Department of Industrial Chemistry focuses on the application of chemical principles to industrial processes and manufacturing.',
    },
    {
        name: 'Biology',
        slug: 'biology',
        description: 'The Department of Biology provides in-depth study of living organisms, ecosystems, and biological processes.',
    },
    {
        name: 'Physics',
        slug: 'physics',
        description: 'The Department of Physics explores the fundamental principles governing matter, energy, and the physical universe.',
    },
    {
        name: 'Mathematics',
        slug: 'mathematics',
        description: 'The Department of Mathematics offers rigorous training in mathematical theory, analysis, and applications.',
    },
    {
        name: 'Statistics',
        slug: 'statistics',
        description: 'The Department of Statistics specializes in data analysis, probability theory, and statistical modeling.',
    },
];

async function main() {
    console.log('Seeding departments...');

    for (const dept of departments) {
        const department = await prisma.department.upsert({
            where: { slug: dept.slug },
            update: {
                name: dept.name,
                description: dept.description,
            },
            create: {
                name: dept.name,
                slug: dept.slug,
                description: dept.description,
            },
        });

        console.log(`✓ ${department.name} (${department.slug})`);
    }

    console.log('\nDepartments seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
