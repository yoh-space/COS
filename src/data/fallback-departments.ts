// Fallback data for departments when database is unavailable
export const fallbackDepartments = {
  'mathematics': {
    id: 'fallback-math',
    name: 'Mathematics',
    slug: 'mathematics',
    description: 'The Department of Mathematics offers comprehensive programs in pure and applied mathematics.',
    staffMembers: [],
    academicSections: [],
    departmentContents: [
      {
        id: 'fallback-math-bg',
        sectionType: 'background',
        content: 'The Department of Mathematics is committed to excellence in teaching and research. We offer undergraduate and graduate programs designed to prepare students for careers in academia, industry, and research.',
        displayOrder: 0,
        status: 'published'
      }
    ],
    researchTeams: [],
    departmentPublications: [],
    departmentEvents: [],
    departmentResources: []
  },
  'chemistry': {
    id: 'fallback-chem',
    name: 'Chemistry',
    slug: 'chemistry',
    description: 'The Department of Chemistry provides quality education in chemical sciences.',
    staffMembers: [],
    academicSections: [],
    departmentContents: [
      {
        id: 'fallback-chem-bg',
        sectionType: 'background',
        content: 'The Department of Chemistry offers comprehensive programs in analytical, organic, inorganic, and physical chemistry.',
        displayOrder: 0,
        status: 'published'
      }
    ],
    researchTeams: [],
    departmentPublications: [],
    departmentEvents: [],
    departmentResources: []
  },
  'physics': {
    id: 'fallback-phys',
    name: 'Physics',
    slug: 'physics',
    description: 'The Department of Physics explores the fundamental laws of nature.',
    staffMembers: [],
    academicSections: [],
    departmentContents: [
      {
        id: 'fallback-phys-bg',
        sectionType: 'background',
        content: 'The Department of Physics offers programs in theoretical and experimental physics.',
        displayOrder: 0,
        status: 'published'
      }
    ],
    researchTeams: [],
    departmentPublications: [],
    departmentEvents: [],
    departmentResources: []
  },
  'biology': {
    id: 'fallback-bio',
    name: 'Biology',
    slug: 'biology',
    description: 'The Department of Biology studies living organisms and life processes.',
    staffMembers: [],
    academicSections: [],
    departmentContents: [
      {
        id: 'fallback-bio-bg',
        sectionType: 'background',
        content: 'The Department of Biology offers comprehensive programs in life sciences.',
        displayOrder: 0,
        status: 'published'
      }
    ],
    researchTeams: [],
    departmentPublications: [],
    departmentEvents: [],
    departmentResources: []
  },
  'statistics': {
    id: 'fallback-stat',
    name: 'Statistics',
    slug: 'statistics',
    description: 'The Department of Statistics focuses on data analysis and statistical methods.',
    staffMembers: [],
    academicSections: [],
    departmentContents: [
      {
        id: 'fallback-stat-bg',
        sectionType: 'background',
        content: 'The Department of Statistics offers programs in statistical theory and applications.',
        displayOrder: 0,
        status: 'published'
      }
    ],
    researchTeams: [],
    departmentPublications: [],
    departmentEvents: [],
    departmentResources: []
  },
  'industrial-chemistry': {
    id: 'fallback-indchem',
    name: 'Industrial Chemistry',
    slug: 'industrial-chemistry',
    description: 'The Department of Industrial Chemistry bridges chemistry and industry.',
    staffMembers: [],
    academicSections: [],
    departmentContents: [
      {
        id: 'fallback-indchem-bg',
        sectionType: 'background',
        content: 'The Department of Industrial Chemistry focuses on applied chemistry for industrial applications.',
        displayOrder: 0,
        status: 'published'
      }
    ],
    researchTeams: [],
    departmentPublications: [],
    departmentEvents: [],
    departmentResources: []
  }
};

export type FallbackDepartment = typeof fallbackDepartments[keyof typeof fallbackDepartments];
