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
            content: `# Breakthrough Research in Lake Tana Water Quality Analysis

The College of Science at Bahir Dar University has achieved a significant milestone in environmental research with the publication of comprehensive findings on Lake Tana's water quality and ecosystem health.

## Research Overview

A team of researchers from the Department of Chemistry and Biology conducted an extensive 18-month study analyzing various water quality parameters across different zones of Lake Tana. The research focused on:

- **Physical Parameters**: Temperature, turbidity, and conductivity measurements
- **Chemical Analysis**: pH levels, dissolved oxygen, nutrient concentrations (nitrogen and phosphorus)
- **Biological Indicators**: Phytoplankton diversity and abundance
- **Pollution Assessment**: Heavy metal concentrations and organic pollutants

## Key Findings

The study revealed several important insights:

1. **Seasonal Variations**: Significant fluctuations in water quality parameters were observed between wet and dry seasons, with nutrient levels peaking during the rainy season due to agricultural runoff.

2. **Spatial Distribution**: Water quality varied considerably across different zones of the lake, with areas near river inflows showing higher turbidity and nutrient concentrations.

3. **Ecosystem Health**: Despite some localized concerns, the overall ecosystem health of Lake Tana remains relatively stable, though continuous monitoring is recommended.

## Implications for Conservation

These findings have important implications for:

- **Policy Development**: Informing government policies on watershed management and agricultural practices
- **Community Awareness**: Educating local communities about sustainable fishing and farming practices
- **Future Research**: Establishing baseline data for long-term monitoring programs

## Collaborative Efforts

This research was conducted in collaboration with:

- Ministry of Water and Energy
- Amhara Regional Environmental Protection Authority
- International water quality research institutions
- Local fishing communities around Lake Tana

## Next Steps

The research team is now working on:

- Developing a real-time water quality monitoring system
- Creating predictive models for seasonal water quality changes
- Training local environmental officers in water quality assessment techniques

This groundbreaking research demonstrates the College of Science's commitment to addressing regional environmental challenges through rigorous scientific investigation.

---

*Published: November 2024*  
*Research Team: Dr. Meseret Abebe, Dr. Alemayehu Tadesse, and colleagues*`,
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
            content: `# College of Science Hosts International Mathematics Symposium

The College of Science successfully hosted the 5th East African Mathematics Research Symposium, bringing together over 200 mathematicians, researchers, and students from 15 African countries.

## Event Highlights

The three-day symposium, held from October 10-12, 2024, featured:

### Keynote Presentations

- **Prof. Abebe Gellaw** (MIT): "Applications of Topology in Data Science"
- **Dr. Fatima Hassan** (University of Nairobi): "Mathematical Modeling of Disease Spread in Urban Africa"
- **Prof. John Kamau** (University of Dar es Salaam): "Advances in Numerical Methods for Partial Differential Equations"

### Research Sessions

The symposium included 8 parallel sessions covering:

1. **Pure Mathematics**: Algebra, topology, and analysis
2. **Applied Mathematics**: Mathematical modeling and computational methods
3. **Statistics and Data Science**: Big data analytics and machine learning
4. **Mathematics Education**: Innovative teaching methodologies
5. **Optimization Theory**: Applications in engineering and economics
6. **Cryptography**: Mathematical foundations of cybersecurity
7. **Financial Mathematics**: Risk modeling and quantitative finance
8. **Biomathematics**: Modeling biological systems

## Student Participation

A special highlight was the strong participation of graduate students:

- 45 students presented their research in poster sessions
- 12 students delivered oral presentations
- Best Student Presentation Award won by Rahel Tefera (BDU) for her work on "Machine Learning Applications in Agricultural Yield Prediction"

## Collaborative Outcomes

The symposium resulted in several collaborative initiatives:

- Formation of the East African Mathematics Research Network
- Joint research proposals on climate modeling and public health
- Student exchange programs between participating universities
- Plans for a collaborative online mathematics journal

## Workshop Sessions

Pre-symposium workshops included:

- **LaTeX for Mathematical Writing** (50 participants)
- **Introduction to Python for Scientific Computing** (60 participants)
- **Research Methodology in Mathematics** (40 participants)

## Community Outreach

The event also featured:

- Public lecture on "The Beauty of Mathematics in Everyday Life"
- Mathematics competition for local high school students
- Career guidance session for undergraduate students

## Acknowledgments

The symposium was made possible through support from:

- African Mathematical Union
- International Mathematical Union
- Ministry of Education, Ethiopia
- Bahir Dar University
- Various international research foundations

## Looking Forward

Plans are already underway for the 6th symposium, scheduled for 2026 in Nairobi, Kenya. The organizing committee expressed gratitude to all participants and emphasized the importance of continued collaboration in advancing mathematical sciences across Africa.

---

*Published: October 2024*  
*Event Coordinator: Dr. Getachew Worku, Department of Mathematics*`,
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
            content: `# New Chemistry Lab Opens with State-of-the-Art Equipment

The College of Science celebrated the grand opening of its new Analytical Chemistry Laboratory, a state-of-the-art facility that will significantly enhance research capabilities and student training.

## Facility Overview

The new laboratory, spanning 500 square meters, features:

### Advanced Instrumentation

- **Gas Chromatography-Mass Spectrometry (GC-MS)**: For analyzing volatile organic compounds
- **High-Performance Liquid Chromatography (HPLC)**: For separating and analyzing complex mixtures
- **Atomic Absorption Spectrophotometer (AAS)**: For trace metal analysis
- **Fourier Transform Infrared Spectrometer (FTIR)**: For molecular structure determination
- **UV-Visible Spectrophotometer**: For quantitative analysis
- **pH Meters and Conductivity Meters**: For routine measurements

### Safety Features

The laboratory incorporates modern safety standards:

- Advanced fume hoods with digital airflow monitoring
- Emergency shower and eyewash stations
- Fire suppression system
- Chemical storage cabinets with temperature control
- Proper ventilation and air quality monitoring

## Research Applications

The new facility will support research in:

1. **Environmental Chemistry**
   - Water quality analysis
   - Soil contamination studies
   - Air pollution monitoring

2. **Pharmaceutical Analysis**
   - Drug quality control
   - Herbal medicine research
   - Bioavailability studies

3. **Food Chemistry**
   - Nutritional analysis
   - Contamination detection
   - Quality assurance

4. **Industrial Chemistry**
   - Process optimization
   - Product development
   - Quality control

## Educational Impact

### Undergraduate Programs

Students will benefit from:

- Hands-on training with modern instruments
- Real-world analytical problem-solving
- Industry-standard laboratory practices
- Research project opportunities

### Graduate Programs

The facility will enhance:

- MSc and PhD research capabilities
- Publication-quality data generation
- Collaborative research projects
- Industry partnerships

## Inauguration Ceremony

The opening ceremony, held on September 15, 2024, was attended by:

- **Dr. Seleshi Bekele**, Minister of Water and Energy
- **Prof. Baylie Damtie**, President of Bahir Dar University
- **Dr. Tigist Mekonnen**, Dean of College of Science
- Representatives from partner institutions and industries
- Faculty members and students

## Funding and Partnerships

The laboratory was established through:

- Ethiopian Ministry of Education grant
- World Bank Higher Education Quality Enhancement Project
- Partnerships with international universities
- Industry collaborations

Total investment: 15 million Ethiopian Birr

## Community Service

The laboratory will also serve the community by:

- Providing analytical services to local industries
- Conducting water quality testing for communities
- Offering training programs for industry professionals
- Supporting government agencies with technical analysis

## Training Programs

The department is launching:

- **Certificate Program**: Analytical Chemistry Techniques (3 months)
- **Short Courses**: Specific instrument training (1-2 weeks)
- **Industry Workshops**: Quality control and assurance (ongoing)

## Future Plans

The department plans to:

- Acquire additional specialized equipment
- Establish ISO/IEC 17025 accreditation
- Develop online training modules
- Create a regional analytical services network

## Student Testimonials

*"This laboratory puts us on par with international standards. I'm excited to conduct my thesis research using these advanced instruments."* - Sara Bekele, MSc Chemistry Student

*"The hands-on experience with modern equipment will make us more competitive in the job market."* - Daniel Girma, 4th Year Chemistry Student

## Research Priorities

Initial research focus areas include:

- Heavy metal contamination in Lake Tana basin
- Quality assessment of locally produced pharmaceuticals
- Analysis of traditional Ethiopian medicinal plants
- Environmental impact of industrial activities

This new facility represents a major step forward in the College of Science's mission to provide world-class education and conduct impactful research that addresses national and regional challenges.

---

*Published: September 2024*  
*Laboratory Director: Dr. Hanna Solomon, Department of Chemistry*`,
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
