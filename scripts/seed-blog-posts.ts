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
            content: JSON.stringify({
                root: {
                    children: [
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 1,
                                    mode: "normal",
                                    style: "",
                                    text: "Breakthrough Research in Lake Tana Water Quality Analysis",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "heading",
                            version: 1,
                            tag: "h1"
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "The College of Science at Bahir Dar University has achieved a significant milestone in environmental research with the publication of comprehensive findings on Lake Tana's water quality and ecosystem health.",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 1,
                                    mode: "normal",
                                    style: "",
                                    text: "Research Overview",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "heading",
                            version: 1,
                            tag: "h2"
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "A team of researchers from the Department of Chemistry and Biology conducted an extensive 18-month study analyzing various water quality parameters across different zones of Lake Tana. The research focused on:",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Physical Parameters: Temperature, turbidity, and conductivity measurements",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 1
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Chemical Analysis: pH levels, dissolved oxygen, nutrient concentrations (nitrogen and phosphorus)",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 2
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Biological Indicators: Phytoplankton diversity and abundance",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 3
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Pollution Assessment: Heavy metal concentrations and organic pollutants",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 4
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "list",
                            version: 1,
                            listType: "bullet",
                            start: 1,
                            tag: "ul"
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 1,
                                    mode: "normal",
                                    style: "",
                                    text: "Key Findings",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "heading",
                            version: 1,
                            tag: "h2"
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "The study revealed several important insights:",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Seasonal Variations: Significant fluctuations in water quality parameters were observed between wet and dry seasons.",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 1
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Spatial Distribution: Water quality varied considerably across different zones of the lake.",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 2
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Ecosystem Health: Overall ecosystem health remains relatively stable, though continuous monitoring is recommended.",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 3
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "list",
                            version: 1,
                            listType: "number",
                            start: 1,
                            tag: "ol"
                        },
                        {
                            children: [],
                            direction: null,
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 2,
                                    mode: "normal",
                                    style: "",
                                    text: "Published: November 2024 | Research Team: Dr. Meseret Abebe, Dr. Alemayehu Tadesse",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        }
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "root",
                    version: 1
                }
            }),
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
            content: JSON.stringify({
                root: {
                    children: [
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 1,
                                    mode: "normal",
                                    style: "",
                                    text: "International Mathematics Symposium 2024",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "heading",
                            version: 1,
                            tag: "h1"
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "The College of Science successfully hosted the 5th East African Mathematics Research Symposium, bringing together over 200 mathematicians, researchers, and students from 15 African countries.",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 1,
                                    mode: "normal",
                                    style: "",
                                    text: "Event Highlights",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "heading",
                            version: 1,
                            tag: "h2"
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "The three-day symposium featured keynote presentations and 8 parallel research sessions covering pure mathematics, applied mathematics, statistics, and mathematics education.",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 1,
                                    mode: "normal",
                                    style: "",
                                    text: "Research Topics",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "heading",
                            version: 1,
                            tag: "h3"
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Topology and Data Science",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 1
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Mathematical Modeling of Disease Spread",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 2
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Numerical Methods and Computational Mathematics",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 3
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "list",
                            version: 1,
                            listType: "bullet",
                            start: 1,
                            tag: "ul"
                        },
                        {
                            children: [],
                            direction: null,
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 2,
                                    mode: "normal",
                                    style: "",
                                    text: "Published: October 2024 | Event Coordinator: Dr. Getachew Worku",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        }
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "root",
                    version: 1
                }
            }),
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
            content: JSON.stringify({
                root: {
                    children: [
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 1,
                                    mode: "normal",
                                    style: "",
                                    text: "New Chemistry Laboratory Opens",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "heading",
                            version: 1,
                            tag: "h1"
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "The College of Science celebrated the grand opening of its new Analytical Chemistry Laboratory, a state-of-the-art facility that will significantly enhance research capabilities and student training.",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 1,
                                    mode: "normal",
                                    style: "",
                                    text: "Advanced Instrumentation",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "heading",
                            version: 1,
                            tag: "h2"
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "The laboratory features:",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Gas Chromatography-Mass Spectrometry (GC-MS)",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 1
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "High-Performance Liquid Chromatography (HPLC)",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 2
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Atomic Absorption Spectrophotometer (AAS)",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 3
                                },
                                {
                                    children: [
                                        {
                                            detail: 0,
                                            format: 0,
                                            mode: "normal",
                                            style: "",
                                            text: "Fourier Transform Infrared Spectrometer (FTIR)",
                                            type: "text",
                                            version: 1
                                        }
                                    ],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "listitem",
                                    version: 1,
                                    value: 4
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "list",
                            version: 1,
                            listType: "bullet",
                            start: 1,
                            tag: "ul"
                        },
                        {
                            children: [],
                            direction: null,
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        },
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 2,
                                    mode: "normal",
                                    style: "",
                                    text: "Published: September 2024 | Laboratory Director: Dr. Hanna Solomon",
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        }
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "root",
                    version: 1
                }
            }),
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
