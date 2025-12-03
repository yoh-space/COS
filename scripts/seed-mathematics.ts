import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('🔢 Seeding Mathematics Department Data...\n');

    // Find the Mathematics department
    const mathDept = await prisma.department.findUnique({
        where: { slug: 'mathematics' }
    });

    if (!mathDept) {
        console.error('❌ Mathematics department not found. Please run seed-departments.ts first.');
        process.exit(1);
    }

    console.log(`✓ Found Mathematics Department (ID: ${mathDept.id})\n`);

    // 1. Seed Department Content
    console.log('📝 Seeding Department Content...');

    const contentSections = [
        {
            sectionType: 'background',
            title: 'Background',
            content: 'The Department of Mathematics at Bahir Dar University College of Science was established to provide quality education in mathematical sciences. Our department is committed to excellence in teaching, research, and service, preparing students for careers in academia, industry, and research institutions.',
        },
        {
            sectionType: 'vision',
            title: 'Vision',
            content: 'To be a center of excellence in mathematical sciences education and research, contributing to the advancement of knowledge and the development of Ethiopia and beyond.',
        },
        {
            sectionType: 'mission',
            title: 'Mission',
            content: 'To provide high-quality education in mathematics, conduct cutting-edge research, and serve the community through the application of mathematical principles to solve real-world problems.',
        },
        {
            sectionType: 'general_objectives',
            title: 'General Objectives',
            content: 'To develop mathematically literate graduates who can think critically, solve complex problems, and contribute to scientific and technological advancement. To foster a culture of research and innovation in mathematical sciences.',
        },
        {
            sectionType: 'undergraduate_outcomes',
            title: 'Undergraduate Learning Outcomes',
            content: 'Graduates will demonstrate proficiency in core mathematical concepts including calculus, algebra, analysis, and applied mathematics. They will develop strong analytical and problem-solving skills applicable to various fields.',
        },
    ];

    for (const section of contentSections) {
        await prisma.departmentContent.upsert({
            where: {
                departmentId_sectionType: {
                    departmentId: mathDept.id,
                    sectionType: section.sectionType,
                }
            },
            update: {
                title: section.title,
                content: section.content,
            },
            create: {
                departmentId: mathDept.id,
                sectionType: section.sectionType,
                title: section.title,
                content: section.content,
            },
        });
        console.log(`  ✓ ${section.title}`);
    }

    // 2. Seed Research Teams
    console.log('\n🔬 Seeding Research Teams...');

    const researchTeams = [
        {
            name: 'Applied Mathematics Research Group',
            description: 'Focuses on mathematical modeling, numerical analysis, and computational methods for solving real-world problems in engineering, physics, and biology.',
            teamLeader: 'Dr. Alemayehu Tadesse',
            members: ['Dr. Alemayehu Tadesse', 'Dr. Tigist Mekonnen', 'Mr. Dawit Haile', 'Ms. Sara Bekele'],
            researchArea: 'Applied Mathematics, Numerical Methods, Mathematical Modeling',
            status: 'active',
            displayOrder: 1,
        },
        {
            name: 'Pure Mathematics Research Team',
            description: 'Conducts research in abstract algebra, topology, real and complex analysis, and number theory.',
            teamLeader: 'Dr. Getachew Worku',
            members: ['Dr. Getachew Worku', 'Dr. Hanna Solomon', 'Mr. Yohannes Tesfaye'],
            researchArea: 'Abstract Algebra, Topology, Analysis',
            status: 'active',
            displayOrder: 2,
        },
        {
            name: 'Statistics and Data Science Group',
            description: 'Specializes in statistical modeling, data analysis, machine learning, and big data analytics.',
            teamLeader: 'Dr. Meseret Abebe',
            members: ['Dr. Meseret Abebe', 'Mr. Daniel Girma', 'Ms. Rahel Tefera', 'Mr. Biniam Assefa'],
            researchArea: 'Statistics, Data Science, Machine Learning',
            status: 'active',
            displayOrder: 3,
        },
        {
            name: 'Mathematical Education Research',
            description: 'Focuses on improving mathematics education through innovative teaching methods and curriculum development.',
            teamLeader: 'Dr. Fikirte Yohannes',
            members: ['Dr. Fikirte Yohannes', 'Ms. Bethlehem Negash', 'Mr. Samson Desta'],
            researchArea: 'Mathematics Education, Pedagogy',
            status: 'active',
            displayOrder: 4,
        },
    ];

    for (const team of researchTeams) {
        await prisma.researchTeam.create({
            data: {
                departmentId: mathDept.id,
                ...team,
            },
        });
        console.log(`  ✓ ${team.name}`);
    }

    // 3. Seed Publications
    console.log('\n📚 Seeding Publications...');

    const publications = [
        {
            title: 'Numerical Solutions of Partial Differential Equations Using Finite Element Methods',
            authors: ['Alemayehu Tadesse', 'Tigist Mekonnen'],
            year: 2024,
            publicationType: 'journal',
            venue: 'Ethiopian Journal of Science and Technology',
            doi: '10.1234/ejst.2024.001',
            abstract: 'This paper presents novel finite element methods for solving complex partial differential equations arising in fluid dynamics and heat transfer problems.',
            status: 'published',
        },
        {
            title: 'Applications of Group Theory in Cryptography',
            authors: ['Getachew Worku', 'Hanna Solomon'],
            year: 2024,
            publicationType: 'journal',
            venue: 'Journal of Mathematical Sciences',
            doi: '10.1234/jms.2024.045',
            abstract: 'An exploration of algebraic structures and their applications in modern cryptographic systems.',
            status: 'published',
        },
        {
            title: 'Machine Learning Approaches for Agricultural Yield Prediction in Ethiopia',
            authors: ['Meseret Abebe', 'Daniel Girma', 'Rahel Tefera'],
            year: 2023,
            publicationType: 'conference',
            venue: 'International Conference on Data Science and Applications',
            abstract: 'This study applies machine learning algorithms to predict crop yields using historical climate and soil data from Ethiopian agricultural regions.',
            status: 'published',
        },
        {
            title: 'Topological Properties of Metric Spaces',
            authors: ['Getachew Worku'],
            year: 2023,
            publicationType: 'journal',
            venue: 'African Journal of Mathematics',
            doi: '10.1234/ajm.2023.078',
            abstract: 'A comprehensive study of topological invariants and their properties in various metric spaces.',
            status: 'published',
        },
        {
            title: 'Statistical Analysis of Climate Change Impact on Lake Tana Basin',
            authors: ['Meseret Abebe', 'Biniam Assefa'],
            year: 2023,
            publicationType: 'journal',
            venue: 'Ethiopian Journal of Environmental Studies',
            doi: '10.1234/ejes.2023.012',
            abstract: 'A statistical investigation of climate change effects on water levels and quality in Lake Tana using time series analysis.',
            status: 'published',
        },
        {
            title: 'Innovative Teaching Methods in Undergraduate Mathematics Education',
            authors: ['Fikirte Yohannes', 'Bethlehem Negash'],
            year: 2024,
            publicationType: 'conference',
            venue: 'African Conference on Mathematics Education',
            abstract: 'This paper discusses the effectiveness of active learning strategies in improving student engagement and performance in undergraduate mathematics courses.',
            status: 'published',
        },
        {
            title: 'Mathematical Modeling of Disease Spread in Urban Areas',
            authors: ['Alemayehu Tadesse', 'Dawit Haile', 'Sara Bekele'],
            year: 2022,
            publicationType: 'journal',
            venue: 'Journal of Mathematical Biology',
            doi: '10.1234/jmb.2022.156',
            abstract: 'Development of compartmental models for predicting disease transmission dynamics in densely populated urban environments.',
            status: 'published',
        },
        {
            title: 'Optimization Techniques for Resource Allocation in Manufacturing',
            authors: ['Tigist Mekonnen', 'Dawit Haile'],
            year: 2023,
            publicationType: 'conference',
            venue: 'International Conference on Operations Research',
            abstract: 'Application of linear and nonlinear optimization methods to solve resource allocation problems in Ethiopian manufacturing industries.',
            status: 'published',
        },
    ];

    for (const pub of publications) {
        await prisma.departmentPublication.create({
            data: {
                departmentId: mathDept.id,
                ...pub,
            },
        });
        console.log(`  ✓ ${pub.title.substring(0, 60)}...`);
    }

    // 4. Seed Events
    console.log('\n📅 Seeding Events...');

    const events = [
        {
            title: 'PhD Defense: Advanced Topics in Functional Analysis',
            eventType: 'defense',
            description: 'PhD candidate Yohannes Tesfaye will defend his dissertation on "Spectral Theory of Unbounded Operators in Hilbert Spaces"',
            presenter: 'Yohannes Tesfaye',
            eventDate: new Date('2024-12-15T14:00:00'),
            location: 'Mathematics Department Seminar Room',
            imageUrl: '/images/events/phd-defense.jpg',
            status: 'published',
        },
        {
            title: 'Seminar: Applications of Topology in Data Analysis',
            eventType: 'seminar',
            description: 'Dr. Getachew Worku will present recent developments in topological data analysis and its applications in machine learning.',
            presenter: 'Dr. Getachew Worku',
            eventDate: new Date('2024-12-20T10:00:00'),
            location: 'College of Science Auditorium',
            imageUrl: '/images/events/topology-seminar.jpg',
            status: 'published',
        },
        {
            title: 'Workshop: Introduction to Python for Mathematical Computing',
            eventType: 'workshop',
            description: 'A hands-on workshop covering NumPy, SciPy, and Matplotlib for solving mathematical problems using Python.',
            presenter: 'Mr. Daniel Girma',
            eventDate: new Date('2025-01-10T09:00:00'),
            location: 'Computer Lab 2',
            imageUrl: '/images/events/python-workshop.jpg',
            status: 'published',
        },
        {
            title: 'Guest Lecture: Mathematical Modeling in Climate Science',
            eventType: 'guest_lecture',
            description: 'Distinguished Professor from MIT will discuss the role of mathematics in understanding and predicting climate change.',
            presenter: 'Prof. John Smith (MIT)',
            eventDate: new Date('2025-01-25T15:00:00'),
            location: 'Main Auditorium',
            imageUrl: '/images/events/climate-lecture.jpg',
            status: 'published',
        },
        {
            title: 'Mathematics Olympiad Preparation Camp',
            eventType: 'workshop',
            description: 'Intensive training program for high school students preparing for national and international mathematics competitions.',
            presenter: 'Mathematics Department Faculty',
            eventDate: new Date('2025-02-01T08:00:00'),
            location: 'Mathematics Department',
            imageUrl: '/images/events/math-camp.jpg',
            status: 'published',
        },
        {
            title: 'Conference: Ethiopian Mathematics Research Symposium 2025',
            eventType: 'conference',
            description: 'Annual symposium bringing together mathematicians from across Ethiopia to share research findings and collaborate on new projects.',
            presenter: 'Various Speakers',
            eventDate: new Date('2025-03-15T08:00:00'),
            location: 'Bahir Dar University Main Campus',
            imageUrl: '/images/events/math-symposium.jpg',
            status: 'published',
        },
        {
            title: 'Seminar: Recent Advances in Numerical Analysis',
            eventType: 'seminar',
            description: 'Dr. Alemayehu Tadesse presents new numerical methods for solving stiff differential equations.',
            presenter: 'Dr. Alemayehu Tadesse',
            eventDate: new Date('2024-11-30T14:00:00'),
            location: 'Mathematics Department Seminar Room',
            imageUrl: '/images/events/numerical-seminar.jpg',
            status: 'published',
        },
        {
            title: 'Workshop: LaTeX for Mathematical Writing',
            eventType: 'workshop',
            description: 'Learn to typeset mathematical documents, papers, and theses using LaTeX.',
            presenter: 'Ms. Sara Bekele',
            eventDate: new Date('2025-01-18T13:00:00'),
            location: 'Computer Lab 1',
            imageUrl: '/images/events/latex-workshop.jpg',
            status: 'published',
        },
    ];

    for (const event of events) {
        await prisma.departmentEvent.create({
            data: {
                departmentId: mathDept.id,
                ...event,
            },
        });
        console.log(`  ✓ ${event.title.substring(0, 50)}...`);
    }

    // 5. Seed Resources
    console.log('\n📁 Seeding Resources...');

    const resources = [
        {
            title: 'Mathematics Computer Lab',
            resourceType: 'lab_photo',
            description: 'State-of-the-art computer laboratory equipped with mathematical software including MATLAB, Mathematica, and R.',
            fileUrl: '/images/resources/math-computer-lab.jpg',
            thumbnailUrl: '/images/resources/thumbs/math-computer-lab-thumb.jpg',
            displayOrder: 1,
            status: 'published',
        },
        {
            title: 'Department Library and Study Area',
            resourceType: 'classroom_photo',
            description: 'Dedicated mathematics library with extensive collection of textbooks, journals, and reference materials.',
            fileUrl: '/images/resources/math-library.jpg',
            thumbnailUrl: '/images/resources/thumbs/math-library-thumb.jpg',
            displayOrder: 2,
            status: 'published',
        },
        {
            title: 'Seminar Room',
            resourceType: 'classroom_photo',
            description: 'Modern seminar room for presentations, defenses, and collaborative research discussions.',
            fileUrl: '/images/resources/seminar-room.jpg',
            thumbnailUrl: '/images/resources/thumbs/seminar-room-thumb.jpg',
            displayOrder: 3,
            status: 'published',
        },
        {
            title: 'High-Performance Computing Cluster',
            resourceType: 'equipment',
            description: 'Computing cluster for intensive numerical simulations and data analysis.',
            fileUrl: '/images/resources/hpc-cluster.jpg',
            thumbnailUrl: '/images/resources/thumbs/hpc-cluster-thumb.jpg',
            displayOrder: 4,
            status: 'published',
        },
        {
            title: 'Undergraduate Program Curriculum',
            resourceType: 'document',
            description: 'Complete curriculum for BSc in Mathematics program including course descriptions and prerequisites.',
            fileUrl: '/documents/math-undergrad-curriculum.pdf',
            displayOrder: 5,
            status: 'published',
        },
        {
            title: 'Graduate Program Handbook',
            resourceType: 'document',
            description: 'Comprehensive guide for MSc and PhD programs in Mathematics.',
            fileUrl: '/documents/math-graduate-handbook.pdf',
            displayOrder: 6,
            status: 'published',
        },
        {
            title: 'Research Opportunities Guide',
            resourceType: 'document',
            description: 'Information about research opportunities, funding, and collaboration possibilities.',
            fileUrl: '/documents/math-research-guide.pdf',
            displayOrder: 7,
            status: 'published',
        },
    ];

    for (const resource of resources) {
        await prisma.departmentResource.create({
            data: {
                departmentId: mathDept.id,
                ...resource,
            },
        });
        console.log(`  ✓ ${resource.title}`);
    }

    console.log('\n✅ Mathematics Department data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${contentSections.length} content sections`);
    console.log(`   - ${researchTeams.length} research teams`);
    console.log(`   - ${publications.length} publications`);
    console.log(`   - ${events.length} events`);
    console.log(`   - ${resources.length} resources`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
