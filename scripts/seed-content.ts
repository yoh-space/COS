import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local if it exists, otherwise .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Vision & Mission...');

    // Seed Vision
    const vision = await prisma.visionMission.upsert({
        where: {
            id: 'vision-1' // Using a predictable ID
        },
        update: {
            type: 'vision',
            content: 'The college has the vision of becoming one of the best researches and teaching learning colleges in the university producing graduates that could be of a national model.',
        },
        create: {
            id: 'vision-1',
            type: 'vision',
            content: 'The college has the vision of becoming one of the best researches and teaching learning colleges in the university producing graduates that could be of a national model.',
        },
    });

    console.log('✓ Vision seeded');

    // Seed Mission
    const mission = await prisma.visionMission.upsert({
        where: {
            id: 'mission-1'
        },
        update: {
            type: 'mission',
            content: 'The college of science is committed in providing high quality research based teaching-learning in science and mathematics that promote the success of its students.',
        },
        create: {
            id: 'mission-1',
            type: 'mission',
            content: 'The college of science is committed in providing high quality research based teaching-learning in science and mathematics that promote the success of its students.',
        },
    });

    console.log('✓ Mission seeded');

    // Seed Dean's Message
    const deanMessage = await prisma.deanMessage.upsert({
        where: {
            id: 'dean-message-1'
        },
        update: {
            title: "Welcome to the College of Science",
            content: `Dear Students, Staff, and the Community of Bahir Dar University,

Welcome to the College of Science, a vibrant academic community committed to excellence in teaching, cutting-edge research, and impactful community engagement.

As one of the foundational pillars of Bahir Dar University, the College of Science is proud to nurture generations of scholars, researchers, and professionals who contribute to the scientific advancement and socio-economic development of our nation and beyond. Our commitment to academic excellence is reflected in our dynamic curricula, innovative pedagogical practices, and the dedication of our faculty to student-centered learning.

Research is at the heart of what we do. Our college hosts active research groups and centers engaged in addressing real-world problems in natural and computational sciences. We encourage interdisciplinary collaboration and foster an environment where curiosity, creativity, and scientific inquiry thrive. Our students are mentored to become not only consumers of knowledge but also producers of new ideas and solutions.

We also recognize our responsibility to society. Through various outreach and community engagement programs, the College of Science contributes to national development goals by applying scientific knowledge to improve lives, promote environmental sustainability, and support local innovation. We are deeply committed to making science accessible and relevant to the wider community.

To our students: You are the future of science. Embrace the opportunities, challenge yourselves, and strive for excellence.

To our dedicated staff: Thank you for your unwavering commitment to nurturing the next generation of scientists and leaders.

To our broader community: We value your support and collaboration as we continue to build a stronger, knowledge-based society.

Together, let us advance science for the benefit of all.`,
            status: 'published',
            publishedAt: new Date(),
        },
        create: {
            id: 'dean-message-1',
            title: "Welcome to the College of Science",
            content: `Dear Students, Staff, and the Community of Bahir Dar University,

Welcome to the College of Science, a vibrant academic community committed to excellence in teaching, cutting-edge research, and impactful community engagement.

As one of the foundational pillars of Bahir Dar University, the College of Science is proud to nurture generations of scholars, researchers, and professionals who contribute to the scientific advancement and socio-economic development of our nation and beyond. Our commitment to academic excellence is reflected in our dynamic curricula, innovative pedagogical practices, and the dedication of our faculty to student-centered learning.

Research is at the heart of what we do. Our college hosts active research groups and centers engaged in addressing real-world problems in natural and computational sciences. We encourage interdisciplinary collaboration and foster an environment where curiosity, creativity, and scientific inquiry thrive. Our students are mentored to become not only consumers of knowledge but also producers of new ideas and solutions.

We also recognize our responsibility to society. Through various outreach and community engagement programs, the College of Science contributes to national development goals by applying scientific knowledge to improve lives, promote environmental sustainability, and support local innovation. We are deeply committed to making science accessible and relevant to the wider community.

To our students: You are the future of science. Embrace the opportunities, challenge yourselves, and strive for excellence.

To our dedicated staff: Thank you for your unwavering commitment to nurturing the next generation of scientists and leaders.

To our broader community: We value your support and collaboration as we continue to build a stronger, knowledge-based society.

Together, let us advance science for the benefit of all.`,
            status: 'published',
            publishedAt: new Date(),
        },
    });

    console.log('✓ Dean\'s Message seeded');

    console.log('\nContent seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
