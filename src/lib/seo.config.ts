import { Metadata } from 'next';

// Base URL for the site
export const BASE_URL = 'https://www.bdu.edu.et/cos';

// Default metadata configuration
export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Bahir Dar University College of Science | Excellence in Science Education',
    template: '%s | BDU College of Science',
  },
  description: 'Bahir Dar University College of Science offers world-class education and research in Chemistry, Physics, Mathematics, Biology, Statistics, and Industrial Chemistry. Wisdom at the source of Blue Nile.',
  keywords: [
    'Bahir Dar University', 'College of Science', 'BDU', 'Science Education', 'Research',
    'Chemistry', 'Physics', 'Mathematics', 'Biology', 'Statistics', 'Industrial Chemistry',
    'Ethiopia', 'Higher Education', 'Academic Excellence', 'Scientific Research',
    'Undergraduate Programs', 'Graduate Programs', 'PhD Programs', 'Masters Programs',
    'Natural Sciences', 'Applied Sciences', 'Laboratory Research', 'Academic Institution',
    'University in Ethiopia', 'Science Degrees', 'STEM Education', 'Research Publications',
    'Academic Programs', 'Student Admissions', 'Faculty', 'Bahir Dar', 'Blue Nile',
  ],
  authors: [{ name: 'Bahir Dar University College of Science', url: BASE_URL }],
  creator: 'Bahir Dar University',
  publisher: 'Bahir Dar University',
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
    siteName: 'BDU College of Science',
    title: 'Bahir Dar University College of Science | Excellence in Science Education',
    description: 'Leading institution for science education and research in Ethiopia. Offering undergraduate and graduate programs in natural sciences.',
    images: [
      {
        url: `${BASE_URL}/images/logo/cos-logo.jpg`,
        width: 1200,
        height: 630,
        alt: 'BDU College of Science Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahir Dar University College of Science',
    description: 'Excellence in Science Education & Research - Wisdom at the source of Blue Nile',
    creator: '@bdueduet',
    site: '@bdueduet',
    images: [`${BASE_URL}/images/logo/cos-logo.jpg`],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo/cos-logo.jpg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    'theme-color': '#003366',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'geo.region': 'ET-AM',
    'geo.placename': 'Bahir Dar',
    'language': 'English',
    'coverage': 'Ethiopia',
    'distribution': 'Global',
    'rating': 'General',
    'revisit-after': '7 days',
  },
};

// Page-specific metadata configurations
export const PAGE_METADATA = {
  home: {
    title: 'Excellence in Science Education & Research',
    description: 'Bahir Dar University College of Science offers world-class education in Chemistry, Physics, Mathematics, Biology, Statistics, and Industrial Chemistry. Wisdom at the source of Blue Nile.',
    keywords: 'Bahir Dar University, College of Science, BDU, Science Education, Research, Chemistry, Physics, Mathematics, Biology, Statistics, Ethiopia, Higher Education',
    url: BASE_URL,
  },

  about: {
    title: 'About College of Science | History, Mission & Vision',
    description: 'Learn about Bahir Dar University College of Science - our history, mission, vision, and commitment to excellence in science education and research in Ethiopia.',
    keywords: 'about BDU, College of Science history, mission and vision, academic excellence, science education Ethiopia, research institution, faculty, administration',
    url: `${BASE_URL}/about`,
  },

  blog: {
    title: 'Academic Programs & Departments | Latest Updates',
    description: 'Explore our academic programs in Chemistry, Industrial Chemistry, Mathematics, Physics, Statistics, and Biology. Stay updated with the latest news and research from our departments.',
    keywords: 'academic programs, departments, Chemistry, Physics, Mathematics, Biology, Statistics, Industrial Chemistry, undergraduate programs, graduate programs, research updates',
    url: `${BASE_URL}/blog`,
  },

  contact: {
    title: 'Contact Us | Admissions & Inquiries',
    description: 'Contact Bahir Dar University College of Science for admissions, research opportunities, and academic inquiries. We welcome prospective students and research collaborators.',
    keywords: 'contact BDU, admissions inquiry, research collaboration, academic information, student services, contact College of Science, Bahir Dar contact',
    url: `${BASE_URL}/contact`,
  },

  pricing: {
    title: 'Research & Publications | Scientific Excellence',
    description: 'Discover cutting-edge research and publications from Bahir Dar University College of Science. Explore our research centers, ongoing projects, and academic contributions.',
    keywords: 'research, publications, scientific research, academic papers, research centers, PhD research, masters research, laboratory research, scientific excellence',
    url: `${BASE_URL}/pricing`,
  },

  academics: {
    title: 'Academics | Departments & Programs',
    description: 'Explore our academic departments including Chemistry, Biology, Physics, Mathematics, Statistics, and Industrial Chemistry.',
    keywords: 'academics, departments, science programs, undergraduate, graduate, PhD',
    url: `${BASE_URL}/academics`,
  },

  research: {
    title: 'Research | Innovation & Discovery',
    description: 'Discover our cutting-edge research initiatives, publications, and scientific contributions.',
    keywords: 'research, science research, publications, innovation, discovery',
    url: `${BASE_URL}/research`,
  },

  services: {
    title: 'Community Engagement | Services & Outreach',
    description: 'Discover our community engagement activities, outreach programs, and collaborative initiatives bridging academia and society.',
    keywords: 'community services, outreach, science education, environmental projects, health programs, volunteerism',
    url: `${BASE_URL}/services`,
  },

  laboratories: {
    title: 'Research & Teaching Laboratories | State-of-the-Art Facilities',
    description: 'Explore our state-of-the-art research and teaching laboratories across Chemistry, Biology, Physics, Computer Science, and Industrial Chemistry departments.',
    keywords: 'laboratories, research labs, teaching labs, chemistry lab, biology lab, physics lab, computer lab, industrial chemistry, scientific equipment, research facilities',
    url: `${BASE_URL}/laboratories`,
  },

  publication: {
    title: 'Publications | Research Output',
    description: 'Browse our latest research publications and academic outputs.',
    keywords: 'publications, research papers, academic journals, science publications',
    url: `${BASE_URL}/publication`,
  },

  chemistry: {
    title: 'Department of Chemistry',
    description: 'Explore the fundamental properties of matter and chemical reactions at the Department of Chemistry.',
    keywords: 'chemistry, chemical science, matter, reactions',
    url: `${BASE_URL}/academics/chemistry`,
  },

  'industrial-chemistry': {
    title: 'Department of Industrial Chemistry',
    description: 'Apply chemical principles to industrial processes and product development.',
    keywords: 'industrial chemistry, chemical engineering, industrial processes',
    url: `${BASE_URL}/academics/industrial-chemistry`,
  },

  biology: {
    title: 'Department of Biology',
    description: 'Study living organisms, their structure, function, growth, and evolution.',
    keywords: 'biology, life sciences, organisms, evolution',
    url: `${BASE_URL}/academics/biology`,
  },

  physics: {
    title: 'Department of Physics',
    description: 'Investigate the nature of matter, energy, space, and time.',
    keywords: 'physics, matter, energy, space, time',
    url: `${BASE_URL}/academics/physics`,
  },

  mathematics: {
    title: 'Department of Mathematics',
    description: 'Engage with the abstract science of number, quantity, and space.',
    keywords: 'mathematics, math, numbers, logic',
    url: `${BASE_URL}/academics/mathematics`,
  },

  statistics: {
    title: 'Department of Statistics',
    description: 'Learn the science of collecting, analyzing, interpreting, and presenting data.',
    keywords: 'statistics, data analysis, probability, data science',
    url: `${BASE_URL}/academics/statistics`,
  },

  background: {
    title: 'Background | History & Context',
    description: 'Learn about the history and background of Bahir Dar University College of Science.',
    keywords: 'background, history, college history, BDU history',
    url: `${BASE_URL}/about/background`,
  },

  'vision-mission': {
    title: 'Vision & Mission',
    description: 'Our vision and mission statements guiding the College of Science towards excellence.',
    keywords: 'vision, mission, goals, strategic plan',
    url: `${BASE_URL}/about/vision-mission`,
  },

  administration: {
    title: 'Administration',
    description: 'Meet the administration team leading the College of Science.',
    keywords: 'administration, dean, leadership, management',
    url: `${BASE_URL}/about/administration`,
  },

  structure: {
    title: 'Organizational Structure',
    description: 'Understand the organizational structure of the College of Science.',
    keywords: 'structure, organization, organogram, hierarchy',
    url: `${BASE_URL}/about/structure`,
  },

  'deans-message': {
    title: "Dean's Message",
    description: "Read the message from the Dean of the College of Science.",
    keywords: "dean's message, welcome message, dean",
    url: `${BASE_URL}/about/deans-message`,
  },

  reports: {
    title: 'Reports & Documents',
    description: 'Access annual reports and official documents of the College of Science.',
    keywords: 'reports, documents, annual report, publications',
    url: `${BASE_URL}/about/reports`,
  },

  library: {
    title: 'Library Services | Resources & Facilities',
    description: 'Access our comprehensive library resources, digital collections, and modern study facilities at the College of Science Library.',
    keywords: 'library, library services, digital resources, study facilities, research support, e-journals, books, academic resources',
    url: `${BASE_URL}/services/library`,
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
      siteName: 'BDU College of Science',
      images: [
        {
          url: `${BASE_URL}/images/logo/cos-logo.jpg`,
          width: 1200,
          height: 630,
          alt: 'BDU College of Science Logo',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [`${BASE_URL}/images/logo/cos-logo.jpg`],
    },
  };
}

// Structured Data (JSON-LD) schemas
export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Bahir Dar University College of Science',
    alternateName: 'BDU College of Science',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo/cos-logo.jpg`,
    description: 'Leading institution for science education and research in Ethiopia.',
    email: 'bduinfo@bdu.edu.et',
    telephone: '+251 583 20 9653',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bahir Dar',
      addressRegion: 'Amhara',
      addressCountry: 'ET',
    },
    sameAs: [
      'https://www.facebook.com/bduethiopia',
      'http://www.twitter.com/bdueduet',
      'http://journals.bdu.edu.et/',
      'https://www.bdu.edu.et/cos/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+251 583 20 9653',
      contactType: 'Academic Services',
      email: 'bduinfo@bdu.edu.et',
      availableLanguage: ['English'],
    },
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BDU College of Science',
    url: BASE_URL,
    description: 'Excellence in science education and research at Bahir Dar University.',
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Bahir Dar University',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo/cos-logo.jpg`,
      },
    },
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': BASE_URL,
    name: 'Bahir Dar University College of Science',
    image: `${BASE_URL}/images/logo/cos-logo.jpg`,
    url: BASE_URL,
    telephone: '+251 583 20 9653',
    email: 'bduinfo@bdu.edu.et',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bahir Dar',
      addressRegion: 'Amhara',
      addressCountry: 'ET',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '11.5742',
      longitude: '37.3615',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
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
};
