import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('📝 Seeding Blog Posts...\n');

    // Find or create a default user for blog posts
    let author = await prisma.user.findFirst({
        where: {
            email: {
                contains: '@'
            }
        }
    });

    if (!author) {
        console.log('⚠️  No user found. Creating a default author...');
        author = await prisma.user.create({
            data: {
                clerkId: 'seed_author_' + Date.now(),
                email: 'admin@bdu.edu.et',
                firstName: 'College',
                lastName: 'Administrator',
            }
        });
        console.log(`✓ Created author: ${author.email}\n`);
    } else {
        console.log(`✓ Using existing author: ${author.email}\n`);
    }

    const blogPosts = [
        {
            title: 'Breakthrough Research in Lake Tana Water Quality Analysis',
            slug: 'lake-tana-water-quality-research-2024',
            excerpt: 'College of Science researchers publish groundbreaking findings on Lake Tana ecosystem health and water quality parameters.',
            content: JSON.stringify([
                { type: "heading", text: "Breakthrough Research in Lake Tana Water Quality Analysis", level: 1 },
                { type: "paragraph", text: "The College of Science at Bahir Dar University has achieved a significant milestone in environmental research with the publication of comprehensive findings on Lake Tana's water quality and ecosystem health." },
                { type: "heading", text: "Research Overview", level: 2 },
                { type: "paragraph", text: "A team of researchers from the Department of Chemistry and Biology conducted an extensive 18-month study analyzing various water quality parameters across different zones of Lake Tana. The research focused on:" },
                { type: "bulletine", items: ["Physical Parameters: Temperature, turbidity, and conductivity measurements", "Chemical Analysis: pH levels, dissolved oxygen, nutrient concentrations (nitrogen and phosphorus)", "Biological Indicators: Phytoplankton diversity and abundance", "Pollution Assessment: Heavy metal concentrations and organic pollutants"] },
                { type: "heading", text: "Key Findings", level: 2 },
                { type: "paragraph", text: "The study revealed several important insights:" },
                { type: "orderedList", items: ["Seasonal Variations: Significant fluctuations in water quality parameters were observed between wet and dry seasons, with nutrient levels peaking during the rainy season due to agricultural runoff.", "Spatial Distribution: Water quality varied considerably across different zones of the lake, with areas near river inflows showing higher turbidity and nutrient concentrations.", "Ecosystem Health: Despite some localized concerns, the overall ecosystem health of Lake Tana remains relatively stable, though continuous monitoring is recommended."] },
                { type: "heading", text: "Implications for Conservation", level: 2 },
                { type: "paragraph", text: "These findings have important implications for policy development, community awareness, and future research in watershed management and sustainable practices." },
                { type: "divider" },
                { type: "paragraph", text: "Published: November 2024 | Research Team: Dr. Meseret Abebe, Dr. Alemayehu Tadesse, and colleagues" }
            ]),
            featuredImage: '/images/blog/lake-tana-research.jpg',
            status: 'published',
            publishedAt: new Date('2024-11-15'),
            seoTitle: 'Lake Tana Water Quality Research | Bahir Dar University College of Science',
            seoDescription: 'Groundbreaking research on Lake Tana water quality and ecosystem health by BDU College of Science researchers.',
            seoKeywords: 'Lake Tana, water quality, environmental research, Bahir Dar University, ecosystem health',
        },
        {
            title: 'College of Science Hosts International Mathematics Symposium',
            slug: 'international-mathematics-symposium-2024',
            excerpt: 'Over 200 mathematicians from across Africa gathered at BDU for the 5th East African Mathematics Research Symposium.',
            content: JSON.stringify([
                { type: "heading", text: "College of Science Hosts International Mathematics Symposium", level: 1 },
                { type: "paragraph", text: "The College of Science successfully hosted the 5th East African Mathematics Research Symposium, bringing together over 200 mathematicians, researchers, and students from 15 African countries." },
                { type: "heading", text: "Event Highlights", level: 2 },
                { type: "paragraph", text: "The three-day symposium, held from October 10-12, 2024, featured keynote presentations from distinguished speakers and 8 parallel research sessions." },
                { type: "heading", text: "Keynote Presentations", level: 3 },
                { type: "bulletine", items: ["Prof. Abebe Gellaw (MIT): Applications of Topology in Data Science", "Dr. Fatima Hassan (University of Nairobi): Mathematical Modeling of Disease Spread in Urban Africa", "Prof. John Kamau (University of Dar es Salaam): Advances in Numerical Methods for Partial Differential Equations"] },
                { type: "heading", text: "Research Sessions", level: 3 },
                { type: "orderedList", items: ["Pure Mathematics: Algebra, topology, and analysis", "Applied Mathematics: Mathematical modeling and computational methods", "Statistics and Data Science: Big data analytics and machine learning", "Mathematics Education: Innovative teaching methodologies", "Optimization Theory: Applications in engineering and economics", "Cryptography: Mathematical foundations of cybersecurity", "Financial Mathematics: Risk modeling and quantitative finance", "Biomathematics: Modeling biological systems"] },
                { type: "heading", text: "Student Participation", level: 2 },
                { type: "paragraph", text: "A special highlight was the strong participation of graduate students with 45 poster presentations and 12 oral presentations. Best Student Presentation Award won by Rahel Tefera (BDU) for her work on Machine Learning Applications in Agricultural Yield Prediction." },
                { type: "heading", text: "Collaborative Outcomes", level: 2 },
                { type: "bulletine", items: ["Formation of the East African Mathematics Research Network", "Joint research proposals on climate modeling and public health", "Student exchange programs between participating universities", "Plans for a collaborative online mathematics journal"] },
                { type: "divider" },
                { type: "paragraph", text: "Published: October 2024 | Event Coordinator: Dr. Getachew Worku, Department of Mathematics" }
            ]),
            featuredImage: '/images/blog/math-symposium.jpg',
            status: 'published',
            publishedAt: new Date('2024-10-20'),
            seoTitle: 'International Mathematics Symposium at BDU | College of Science',
            seoDescription: '5th East African Mathematics Research Symposium hosted by Bahir Dar University College of Science with 200+ participants.',
            seoKeywords: 'mathematics symposium, East Africa, Bahir Dar University, mathematical research, academic conference',
        },
        {
            title: 'New Chemistry Lab Opens with State-of-the-Art Equipment',
            slug: 'new-chemistry-lab-opening-2024',
            excerpt: 'The College of Science inaugurates a modern analytical chemistry laboratory equipped with advanced instrumentation for research and teaching.',
            content: JSON.stringify([
                { type: "heading", text: "New Chemistry Lab Opens with State-of-the-Art Equipment", level: 1 },
                { type: "paragraph", text: "The College of Science celebrated the grand opening of its new Analytical Chemistry Laboratory, a state-of-the-art facility that will significantly enhance research capabilities and student training." },
                { type: "heading", text: "Facility Overview", level: 2 },
                { type: "paragraph", text: "The new laboratory, spanning 500 square meters, features advanced instrumentation and modern safety standards." },
                { type: "heading", text: "Advanced Instrumentation", level: 3 },
                { type: "bulletine", items: ["Gas Chromatography-Mass Spectrometry (GC-MS): For analyzing volatile organic compounds", "High-Performance Liquid Chromatography (HPLC): For separating and analyzing complex mixtures", "Atomic Absorption Spectrophotometer (AAS): For trace metal analysis", "Fourier Transform Infrared Spectrometer (FTIR): For molecular structure determination", "UV-Visible Spectrophotometer: For quantitative analysis"] },
                { type: "heading", text: "Research Applications", level: 2 },
                { type: "paragraph", text: "The new facility will support research in multiple areas:" },
                { type: "orderedList", items: ["Environmental Chemistry: Water quality analysis, soil contamination studies, air pollution monitoring", "Pharmaceutical Analysis: Drug quality control, herbal medicine research, bioavailability studies", "Food Chemistry: Nutritional analysis, contamination detection, quality assurance", "Industrial Chemistry: Process optimization, product development, quality control"] },
                { type: "heading", text: "Educational Impact", level: 2 },
                { type: "paragraph", text: "Students will benefit from hands-on training with modern instruments, real-world analytical problem-solving, and industry-standard laboratory practices." },
                { type: "heading", text: "Inauguration Ceremony", level: 2 },
                { type: "paragraph", text: "The opening ceremony, held on September 15, 2024, was attended by Dr. Seleshi Bekele (Minister of Water and Energy), Prof. Baylie Damtie (President of BDU), Dr. Tigist Mekonnen (Dean of College of Science), and representatives from partner institutions." },
                { type: "heading", text: "Funding and Investment", level: 2 },
                { type: "paragraph", text: "Total investment: 15 million Ethiopian Birr through Ethiopian Ministry of Education grant, World Bank Higher Education Quality Enhancement Project, and international partnerships." },
                { type: "divider" },
                { type: "paragraph", text: "Published: September 2024 | Laboratory Director: Dr. Hanna Solomon, Department of Chemistry" }
            ]),
            featuredImage: '/images/blog/chemistry-lab.jpg',
            status: 'published',
            publishedAt: new Date('2024-09-25'),
            seoTitle: 'New Analytical Chemistry Laboratory Opens at BDU | College of Science',
            seoDescription: 'State-of-the-art analytical chemistry laboratory with advanced instrumentation opens at Bahir Dar University College of Science.',
            seoKeywords: 'chemistry laboratory, analytical chemistry, Bahir Dar University, research facility, scientific equipment',
        },
    ];

    console.log('Creating blog posts...\n');

    for (const post of blogPosts) {
        const blogPost = await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {
                title: post.title,
                content: post.content,
                excerpt: post.excerpt,
                featuredImage: post.featuredImage,
                status: post.status,
                publishedAt: post.publishedAt,
                seoTitle: post.seoTitle,
                seoDescription: post.seoDescription,
                seoKeywords: post.seoKeywords,
            },
            create: {
                ...post,
                authorId: author.id,
            },
        });

        console.log(`✓ ${blogPost.title}`);
    }

    console.log('\n✅ Blog posts seeded successfully!');
    console.log(`\n📊 Summary: ${blogPosts.length} blog posts created`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding blog posts:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
