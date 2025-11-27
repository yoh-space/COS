import { Metadata } from 'next';

// Base URL for the site
export const BASE_URL = 'https://www.yotech.space';

// Default metadata configuration
export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Yo-Tech | Innovative Digital Solutions, Web & App Development, Tech Services',
    template: '%s | Yo-Tech',
  },
  description: 'Yo-Tech delivers cutting-edge digital solutions, web and mobile app development, AI/ML services, cloud computing, blockchain, IoT, and tech consulting to empower your business growth. Trusted by startups and enterprises worldwide.',
  keywords: [
    'digital solutions', 'web development', 'mobile app development', 'AI', 'machine learning', 'deep learning',
    'cloud computing', 'AWS', 'Azure', 'Google Cloud', 'blockchain', 'smart contracts', 'IoT', 'Internet of Things',
    'tech consulting', 'software development', 'custom software', 'SaaS', 'enterprise solutions', 'startup solutions',
    'business growth', 'digital transformation', 'DevOps', 'CI/CD', 'microservices', 'API development',
    'full stack development', 'frontend development', 'backend development', 'React', 'Next.js', 'Node.js',
    'Python', 'Java', 'TypeScript', 'JavaScript', 'UI/UX design', 'responsive design', 'SEO optimization',
    'digital marketing', 'e-commerce solutions', 'mobile-first design', 'progressive web apps', 'PWA',
    'cybersecurity', 'data analytics', 'business intelligence', 'automation', 'RPA', 'chatbots',
    'virtual assistants', 'AR', 'VR', 'augmented reality', 'virtual reality', 'tech innovation',
    'agile development', 'scrum', 'product development', 'MVP development', 'prototype', 'scalable solutions',
    'performance optimization', 'Yo-Tech', 'YoTech', 'Addis Ababa', 'Ethiopia', 'African tech',
    'web development in Ethiopia', 'app development in Ethiopia', 'AI development in Ethiopia',
  ],
  authors: [{ name: 'Yo-Tech Team', url: BASE_URL }],
  creator: 'Yo-Tech',
  publisher: 'Yo-Tech',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Yo-Tech',
    title: 'Yo-Tech | Innovative Digital Solutions for Business Growth',
    description: 'Yo-Tech delivers cutting-edge digital solutions, web and mobile app development, AI/ML services, cloud computing, blockchain, IoT, and tech consulting to empower your business growth.',
    images: [
      {
        url: `${BASE_URL}/images/logo/yo-tech-logo.svg`,
        width: 1200,
        height: 630,
        alt: 'Yo-Tech Logo',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yo-Tech | Innovative Digital Solutions for Business Growth',
    description: 'Yo-Tech delivers cutting-edge digital solutions, web and mobile app development, AI/ML services, and tech consulting to empower your business growth.',
    creator: '@yotech',
    site: '@yotech',
    images: [`${BASE_URL}/images/logo/yo-tech-logo.svg`],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo/yo-tech-logo.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    'theme-color': '#4A6CF7',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'geo.region': 'ET',
    'geo.placename': 'Addis Ababa',
    'language': 'English',
    'coverage': 'Worldwide',
    'distribution': 'Global',
    'rating': 'General',
    'revisit-after': '7 days',
  },
};

// Page-specific metadata configurations
export const PAGE_METADATA = {
  home: {
    title: 'Innovative Digital Solutions, Web & App Development, Tech Services',
    description: 'Yo-Tech delivers cutting-edge digital solutions, web and mobile app development, AI/ML services, cloud computing, blockchain, IoT, and tech consulting to empower your business growth. Trusted by startups and enterprises worldwide.',
    keywords: 'digital solutions, web development, app development, AI, machine learning, cloud computing, blockchain, IoT, tech consulting, business growth, startup solutions, enterprise software, custom software development, SaaS, digital transformation, web development in Ethiopia, app development in Ethiopia',
    url: BASE_URL,
  },
  
  about: {
    title: 'About Yo-Tech | Meet Our Expert Team & Mission',
    description: 'Discover Yo-Tech\'s mission, values, and the passionate team of expert developers, designers, and consultants driving innovative digital solutions for business growth and digital transformation.',
    keywords: 'about Yo-Tech, YoTech team, company mission, tech company, software development company, digital agency, expert developers, tech consultants, innovation team, business growth experts, Ethiopian tech company',
    url: `${BASE_URL}/about`,
  },
  
  blog: {
    title: 'Tech Blog | Latest Insights on Web Development, AI, Cloud & More',
    description: 'Explore Yo-Tech\'s blog for expert insights, tutorials, and updates on web development, mobile apps, AI/ML, cloud computing, blockchain, IoT, and the latest technology trends.',
    keywords: 'tech blog, web development blog, AI tutorials, machine learning articles, cloud computing insights, blockchain news, IoT updates, programming tutorials, software development tips, tech trends, developer resources, coding tutorials',
    url: `${BASE_URL}/blog`,
  },
  
  contact: {
    title: 'Contact Yo-Tech | Get in Touch for Tech Solutions & Consulting',
    description: 'Contact Yo-Tech for inquiries, support, or to discuss your next digital project. Our expert team is ready to help you grow with innovative tech solutions and consulting services.',
    keywords: 'contact Yo-Tech, tech support, digital solutions inquiry, business consultation, web development services, app development quote, tech consulting, project inquiry, software development contact, get in touch',
    url: `${BASE_URL}/contact`,
  },
  
  pricing: {
    title: 'Pricing Plans | Affordable Tech Solutions for Every Business',
    description: 'Explore Yo-Tech\'s flexible pricing plans for web development, mobile apps, AI/ML services, and tech consulting. Find the perfect solution for startups, SMBs, and enterprises.',
    keywords: 'pricing plans, web development pricing, app development cost, tech consulting rates, affordable tech solutions, startup packages, enterprise solutions, custom software pricing, SaaS pricing, service packages',
    url: `${BASE_URL}/pricing`,
  },
};

// Helper function to generate page metadata
export function generatePageMetadata(page: keyof typeof PAGE_METADATA): Metadata {
  const pageData = PAGE_METADATA[page];
  
  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    alternates: {
      canonical: pageData.url,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: pageData.url,
      siteName: 'Yo-Tech',
      images: [
        {
          url: `${BASE_URL}/images/logo/yo-tech-logo.svg`,
          width: 1200,
          height: 630,
          alt: 'Yo-Tech Logo',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [`${BASE_URL}/images/logo/yo-tech-logo.svg`],
    },
  };
}

// Structured Data (JSON-LD) schemas
export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yo-Tech',
    alternateName: 'YoTech',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo/yo-tech-logo.svg`,
    description: 'Innovative digital solutions, web and mobile app development, AI/ML services, and tech consulting company.',
    email: 'yohansdam@gmail.com',
    telephone: '+251911701858',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
    sameAs: [
      'https://t.me/yon_fx',
      'https://www.facebook.com/yotech',
      'https://twitter.com/yotech',
      'https://www.linkedin.com/company/yotech',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+251911701858',
      contactType: 'Customer Service',
      email: 'yohansdam@gmail.com',
      availableLanguage: ['English'],
    },
  },
  
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yo-Tech',
    url: BASE_URL,
    description: 'Innovative digital solutions, web and mobile app development, AI/ML services, and tech consulting.',
    publisher: {
      '@type': 'Organization',
      name: 'Yo-Tech',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo/yo-tech-logo.svg`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BASE_URL,
    name: 'Yo-Tech',
    image: `${BASE_URL}/images/logo/yo-tech-logo.svg`,
    url: BASE_URL,
    telephone: '+251911701858',
    email: 'yohansdam@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '9.0320',
      longitude: '38.7469',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
  },
  
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  
  article: (article: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: string;
    url: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yo-Tech',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo/yo-tech-logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  }),
  
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Software Development',
    provider: {
      '@type': 'Organization',
      name: 'Yo-Tech',
      url: BASE_URL,
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Custom web application development using modern technologies',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description: 'Native and cross-platform mobile application development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI/ML Solutions',
            description: 'Artificial Intelligence and Machine Learning services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Computing',
            description: 'Cloud infrastructure and migration services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tech Consulting',
            description: 'Strategic technology consulting and digital transformation',
          },
        },
      ],
    },
  },
  
  faqPage: (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),
};
