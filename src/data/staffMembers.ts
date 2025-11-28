import { StaffMember, Department, DepartmentSlug } from "@/types/staff";

export const departments: Department[] = [
  {
    name: "Chemistry",
    slug: "chemistry",
    description: "The Chemistry Department offers comprehensive programs in organic, inorganic, physical, and analytical chemistry with state-of-the-art laboratory facilities.",
  },
  {
    name: "Industrial Chemistry",
    slug: "industrial-chemistry",
    description: "The Industrial Chemistry Department focuses on applied chemistry, chemical engineering, and industrial processes with practical industry experience.",
  },
  {
    name: "Biology",
    slug: "biology",
    description: "The Biology Department covers molecular biology, genetics, ecology, and microbiology with modern research laboratories and field study opportunities.",
  },
  {
    name: "Physics",
    slug: "physics",
    description: "The Physics Department offers programs in classical mechanics, quantum mechanics, thermodynamics, and modern physics with advanced experimental facilities.",
  },
  {
    name: "Mathematics",
    slug: "mathematics",
    description: "The Mathematics Department provides rigorous training in pure and applied mathematics, statistics, and computational methods.",
  },
  {
    name: "Statistics",
    slug: "statistics",
    description: "The Statistics Department specializes in statistical theory, data analysis, probability, and computational statistics with applications across disciplines.",
  },
];

export const staffMembers: StaffMember[] = [
  // Chemistry Department (12 members)
  {
    id: "chem-001",
    name: "Dr. Abebe Tekle",
    title: "Professor",
    specialization: "Organic Chemistry",
    email: "abebe.tekle@college.edu",
    department: "chemistry",
    social: {
      telegram: "https://t.me/abebetekle",
      linkedin: "https://linkedin.com/in/abebetekle",
    },
  },
  {
    id: "chem-002",
    name: "Dr. Marta Assefa",
    title: "Associate Professor",
    specialization: "Analytical Chemistry",
    email: "marta.assefa@college.edu",
    department: "chemistry",
    social: {
      linkedin: "https://linkedin.com/in/martaassefa",
    },
  },
  {
    id: "chem-003",
    name: "Dr. Yohannes Hailu",
    title: "Assistant Professor",
    specialization: "Physical Chemistry",
    email: "yohannes.hailu@college.edu",
    department: "chemistry",
  },
  {
    id: "chem-004",
    name: "Dr. Selam Getnet",
    title: "Lecturer",
    specialization: "Inorganic Chemistry",
    email: "selam.getnet@college.edu",
    department: "chemistry",
    social: {
      telegram: "https://t.me/selamgetnet",
    },
  },
  {
    id: "chem-005",
    name: "Dr. Tadesse Wolde",
    title: "Assistant Professor",
    specialization: "Biochemistry",
    email: "tadesse.wolde@college.edu",
    department: "chemistry",
  },
  {
    id: "chem-006",
    name: "Dr. Almaz Kebede",
    title: "Lecturer",
    specialization: "Environmental Chemistry",
    email: "almaz.kebede@college.edu",
    department: "chemistry",
    social: {
      linkedin: "https://linkedin.com/in/almazkebede",
    },
  },
  {
    id: "chem-007",
    name: "Dr. Girma Tesfaye",
    title: "Senior Lecturer",
    specialization: "Polymer Chemistry",
    email: "girma.tesfaye@college.edu",
    department: "chemistry",
  },
  {
    id: "chem-008",
    name: "Dr. Hiwot Mengistu",
    title: "Assistant Professor",
    specialization: "Spectroscopy",
    email: "hiwot.mengistu@college.edu",
    department: "chemistry",
    social: {
      telegram: "https://t.me/hiwotmengistu",
    },
  },
  {
    id: "chem-009",
    name: "Dr. Kedir Ahmed",
    title: "Lecturer",
    specialization: "Organic Synthesis",
    email: "kedir.ahmed@college.edu",
    department: "chemistry",
  },
  {
    id: "chem-010",
    name: "Dr. Liya Desta",
    title: "Assistant Professor",
    specialization: "Chromatography",
    email: "liya.desta@college.edu",
    department: "chemistry",
    social: {
      linkedin: "https://linkedin.com/in/liyadesta",
    },
  },
  {
    id: "chem-011",
    name: "Dr. Mesfin Abebe",
    title: "Senior Lecturer",
    specialization: "Reaction Kinetics",
    email: "mesfin.abebe@college.edu",
    department: "chemistry",
  },
  {
    id: "chem-012",
    name: "Dr. Netsanet Gebre",
    title: "Lecturer",
    specialization: "Quantum Chemistry",
    email: "netsanet.gebre@college.edu",
    department: "chemistry",
    social: {
      telegram: "https://t.me/netsanetgebre",
    },
  },

  // Industrial Chemistry Department (11 members)
  {
    id: "indchem-001",
    name: "Dr. Omer Hassan",
    title: "Professor",
    specialization: "Chemical Engineering",
    email: "omer.hassan@college.edu",
    department: "industrial-chemistry",
    social: {
      linkedin: "https://linkedin.com/in/omerhassan",
    },
  },
  {
    id: "indchem-002",
    name: "Dr. Paulos Tekle",
    title: "Associate Professor",
    specialization: "Process Engineering",
    email: "paulos.tekle@college.edu",
    department: "industrial-chemistry",
  },
  {
    id: "indchem-003",
    name: "Dr. Rahel Assefa",
    title: "Assistant Professor",
    specialization: "Industrial Catalysis",
    email: "rahel.assefa@college.edu",
    department: "industrial-chemistry",
    social: {
      telegram: "https://t.me/rahelassefa",
    },
  },
  {
    id: "indchem-004",
    name: "Dr. Samson Bekele",
    title: "Lecturer",
    specialization: "Petroleum Chemistry",
    email: "samson.bekele@college.edu",
    department: "industrial-chemistry",
  },
  {
    id: "indchem-005",
    name: "Dr. Tigist Hailu",
    title: "Assistant Professor",
    specialization: "Polymer Processing",
    email: "tigist.hailu@college.edu",
    department: "industrial-chemistry",
    social: {
      linkedin: "https://linkedin.com/in/tigisthailu",
    },
  },
  {
    id: "indchem-006",
    name: "Dr. Ulfat Yusuf",
    title: "Senior Lecturer",
    specialization: "Waste Management",
    email: "ulfat.yusuf@college.edu",
    department: "industrial-chemistry",
  },
  {
    id: "indchem-007",
    name: "Dr. Valeska Molla",
    title: "Lecturer",
    specialization: "Pharmaceutical Chemistry",
    email: "valeska.molla@college.edu",
    department: "industrial-chemistry",
    social: {
      telegram: "https://t.me/valeskamolla",
    },
  },
  {
    id: "indchem-008",
    name: "Dr. Wondwossen Taye",
    title: "Assistant Professor",
    specialization: "Food Chemistry",
    email: "wondwossen.taye@college.edu",
    department: "industrial-chemistry",
  },
  {
    id: "indchem-009",
    name: "Dr. Yodit Kebede",
    title: "Lecturer",
    specialization: "Cosmetic Chemistry",
    email: "yodit.kebede@college.edu",
    department: "industrial-chemistry",
    social: {
      linkedin: "https://linkedin.com/in/yoditkebede",
    },
  },
  {
    id: "indchem-010",
    name: "Dr. Zewdu Abate",
    title: "Senior Lecturer",
    specialization: "Fermentation Technology",
    email: "zewdu.abate@college.edu",
    department: "industrial-chemistry",
  },
  {
    id: "indchem-011",
    name: "Dr. Abreham Desta",
    title: "Assistant Professor",
    specialization: "Bioprocess Engineering",
    email: "abreham.desta@college.edu",
    department: "industrial-chemistry",
    social: {
      telegram: "https://t.me/abrehambdesta",
    },
  },

  // Biology Department (12 members)
  {
    id: "bio-001",
    name: "Dr. Belay Tekle",
    title: "Professor",
    specialization: "Molecular Biology",
    email: "belay.tekle@college.edu",
    department: "biology",
    social: {
      linkedin: "https://linkedin.com/in/belaytekle",
    },
  },
  {
    id: "bio-002",
    name: "Dr. Chaltu Assefa",
    title: "Associate Professor",
    specialization: "Genetics",
    email: "chaltu.assefa@college.edu",
    department: "biology",
  },
  {
    id: "bio-003",
    name: "Dr. Dawit Hailu",
    title: "Assistant Professor",
    specialization: "Microbiology",
    email: "dawit.hailu@college.edu",
    department: "biology",
    social: {
      telegram: "https://t.me/dawithailu",
    },
  },
  {
    id: "bio-004",
    name: "Dr. Emebet Getnet",
    title: "Lecturer",
    specialization: "Ecology",
    email: "emebet.getnet@college.edu",
    department: "biology",
  },
  {
    id: "bio-005",
    name: "Dr. Fentahun Wolde",
    title: "Assistant Professor",
    specialization: "Cell Biology",
    email: "fentahun.wolde@college.edu",
    department: "biology",
    social: {
      linkedin: "https://linkedin.com/in/fentahunwolde",
    },
  },
  {
    id: "bio-006",
    name: "Dr. Genet Kebede",
    title: "Senior Lecturer",
    specialization: "Botany",
    email: "genet.kebede@college.edu",
    department: "biology",
  },
  {
    id: "bio-007",
    name: "Dr. Henok Tesfaye",
    title: "Lecturer",
    specialization: "Zoology",
    email: "henok.tesfaye@college.edu",
    department: "biology",
    social: {
      telegram: "https://t.me/henoktesfaye",
    },
  },
  {
    id: "bio-008",
    name: "Dr. Ina Mengistu",
    title: "Assistant Professor",
    specialization: "Parasitology",
    email: "ina.mengistu@college.edu",
    department: "biology",
  },
  {
    id: "bio-009",
    name: "Dr. Jemila Ahmed",
    title: "Lecturer",
    specialization: "Immunology",
    email: "jemila.ahmed@college.edu",
    department: "biology",
    social: {
      linkedin: "https://linkedin.com/in/jemilaahmed",
    },
  },
  {
    id: "bio-010",
    name: "Dr. Kassahun Abebe",
    title: "Senior Lecturer",
    specialization: "Evolutionary Biology",
    email: "kassahun.abebe@college.edu",
    department: "biology",
  },
  {
    id: "bio-011",
    name: "Dr. Letemariam Desta",
    title: "Assistant Professor",
    specialization: "Developmental Biology",
    email: "letemariam.desta@college.edu",
    department: "biology",
    social: {
      telegram: "https://t.me/letemariamdesta",
    },
  },
  {
    id: "bio-012",
    name: "Dr. Mulu Gebre",
    title: "Lecturer",
    specialization: "Bioinformatics",
    email: "mulu.gebre@college.edu",
    department: "biology",
  },

  // Physics Department (11 members)
  {
    id: "phys-001",
    name: "Dr. Negash Tekle",
    title: "Professor",
    specialization: "Quantum Mechanics",
    email: "negash.tekle@college.edu",
    department: "physics",
    social: {
      linkedin: "https://linkedin.com/in/negashtekle",
    },
  },
  {
    id: "phys-002",
    name: "Dr. Osman Hassan",
    title: "Associate Professor",
    specialization: "Thermodynamics",
    email: "osman.hassan@college.edu",
    department: "physics",
  },
  {
    id: "phys-003",
    name: "Dr. Purity Assefa",
    title: "Assistant Professor",
    specialization: "Optics",
    email: "purity.assefa@college.edu",
    department: "physics",
    social: {
      telegram: "https://t.me/purityassefa",
    },
  },
  {
    id: "phys-004",
    name: "Dr. Qadri Hailu",
    title: "Lecturer",
    specialization: "Electromagnetism",
    email: "qadri.hailu@college.edu",
    department: "physics",
  },
  {
    id: "phys-005",
    name: "Dr. Roza Getnet",
    title: "Assistant Professor",
    specialization: "Relativity",
    email: "roza.getnet@college.edu",
    department: "physics",
    social: {
      linkedin: "https://linkedin.com/in/rozagetnet",
    },
  },
  {
    id: "phys-006",
    name: "Dr. Saba Wolde",
    title: "Senior Lecturer",
    specialization: "Astrophysics",
    email: "saba.wolde@college.edu",
    department: "physics",
  },
  {
    id: "phys-007",
    name: "Dr. Tewodros Kebede",
    title: "Lecturer",
    specialization: "Nuclear Physics",
    email: "tewodros.kebede@college.edu",
    department: "physics",
    social: {
      telegram: "https://t.me/tewodroskebed",
    },
  },
  {
    id: "phys-008",
    name: "Dr. Ufuk Tesfaye",
    title: "Assistant Professor",
    specialization: "Solid State Physics",
    email: "ufuk.tesfaye@college.edu",
    department: "physics",
  },
  {
    id: "phys-009",
    name: "Dr. Veronica Mengistu",
    title: "Lecturer",
    specialization: "Particle Physics",
    email: "veronica.mengistu@college.edu",
    department: "physics",
    social: {
      linkedin: "https://linkedin.com/in/veronicamengistu",
    },
  },
  {
    id: "phys-010",
    name: "Dr. Wuletaw Ahmed",
    title: "Senior Lecturer",
    specialization: "Plasma Physics",
    email: "wuletaw.ahmed@college.edu",
    department: "physics",
  },
  {
    id: "phys-011",
    name: "Dr. Xenia Abebe",
    title: "Assistant Professor",
    specialization: "Condensed Matter Physics",
    email: "xenia.abebe@college.edu",
    department: "physics",
    social: {
      telegram: "https://t.me/xeniaabebe",
    },
  },

  // Mathematics Department (12 members)
  {
    id: "math-001",
    name: "Dr. Yohannes Tekle",
    title: "Professor",
    specialization: "Abstract Algebra",
    email: "yohannes.tekle@college.edu",
    department: "mathematics",
    social: {
      linkedin: "https://linkedin.com/in/yohannestekel",
    },
  },
  {
    id: "math-002",
    name: "Dr. Zainab Hassan",
    title: "Associate Professor",
    specialization: "Real Analysis",
    email: "zainab.hassan@college.edu",
    department: "mathematics",
  },
  {
    id: "math-003",
    name: "Dr. Abeba Assefa",
    title: "Assistant Professor",
    specialization: "Complex Analysis",
    email: "abeba.assefa@college.edu",
    department: "mathematics",
    social: {
      telegram: "https://t.me/abebaassefa",
    },
  },
  {
    id: "math-004",
    name: "Dr. Berhanu Hailu",
    title: "Lecturer",
    specialization: "Topology",
    email: "berhanu.hailu@college.edu",
    department: "mathematics",
  },
  {
    id: "math-005",
    name: "Dr. Chalachew Getnet",
    title: "Assistant Professor",
    specialization: "Differential Equations",
    email: "chalachew.getnet@college.edu",
    department: "mathematics",
    social: {
      linkedin: "https://linkedin.com/in/chalachewgetnet",
    },
  },
  {
    id: "math-006",
    name: "Dr. Dereje Wolde",
    title: "Senior Lecturer",
    specialization: "Numerical Analysis",
    email: "dereje.wolde@college.edu",
    department: "mathematics",
  },
  {
    id: "math-007",
    name: "Dr. Emebet Kebede",
    title: "Lecturer",
    specialization: "Linear Algebra",
    email: "emebet.kebede@college.edu",
    department: "mathematics",
    social: {
      telegram: "https://t.me/emebetkebed",
    },
  },
  {
    id: "math-008",
    name: "Dr. Fasil Tesfaye",
    title: "Assistant Professor",
    specialization: "Functional Analysis",
    email: "fasil.tesfaye@college.edu",
    department: "mathematics",
  },
  {
    id: "math-009",
    name: "Dr. Gizaw Mengistu",
    title: "Lecturer",
    specialization: "Discrete Mathematics",
    email: "gizaw.mengistu@college.edu",
    department: "mathematics",
    social: {
      linkedin: "https://linkedin.com/in/gizawmengistu",
    },
  },
  {
    id: "math-010",
    name: "Dr. Habiba Ahmed",
    title: "Senior Lecturer",
    specialization: "Graph Theory",
    email: "habiba.ahmed@college.edu",
    department: "mathematics",
  },
  {
    id: "math-011",
    name: "Dr. Ibrahim Abebe",
    title: "Assistant Professor",
    specialization: "Combinatorics",
    email: "ibrahim.abebe@college.edu",
    department: "mathematics",
    social: {
      telegram: "https://t.me/ibrahimabebe",
    },
  },
  {
    id: "math-012",
    name: "Dr. Jemila Desta",
    title: "Lecturer",
    specialization: "Mathematical Logic",
    email: "jemila.desta@college.edu",
    department: "mathematics",
  },

  // Statistics Department (12 members)
  {
    id: "stat-001",
    name: "Dr. Kassahun Tekle",
    title: "Professor",
    specialization: "Probability Theory",
    email: "kassahun.tekle@college.edu",
    department: "statistics",
    social: {
      linkedin: "https://linkedin.com/in/kassahunte",
    },
  },
  {
    id: "stat-002",
    name: "Dr. Letemariam Hassan",
    title: "Associate Professor",
    specialization: "Statistical Inference",
    email: "letemariam.hassan@college.edu",
    department: "statistics",
  },
  {
    id: "stat-003",
    name: "Dr. Marta Assefa",
    title: "Assistant Professor",
    specialization: "Regression Analysis",
    email: "marta.assefa@college.edu",
    department: "statistics",
    social: {
      telegram: "https://t.me/martaassefa",
    },
  },
  {
    id: "stat-004",
    name: "Dr. Negash Hailu",
    title: "Lecturer",
    specialization: "Time Series Analysis",
    email: "negash.hailu@college.edu",
    department: "statistics",
  },
  {
    id: "stat-005",
    name: "Dr. Osman Getnet",
    title: "Assistant Professor",
    specialization: "Multivariate Analysis",
    email: "osman.getnet@college.edu",
    department: "statistics",
    social: {
      linkedin: "https://linkedin.com/in/osmangnet",
    },
  },
  {
    id: "stat-006",
    name: "Dr. Purity Wolde",
    title: "Senior Lecturer",
    specialization: "Bayesian Statistics",
    email: "purity.wolde@college.edu",
    department: "statistics",
  },
  {
    id: "stat-007",
    name: "Dr. Qadri Kebede",
    title: "Lecturer",
    specialization: "Experimental Design",
    email: "qadri.kebede@college.edu",
    department: "statistics",
    social: {
      telegram: "https://t.me/qadrikebed",
    },
  },
  {
    id: "stat-008",
    name: "Dr. Roza Tesfaye",
    title: "Assistant Professor",
    specialization: "Sampling Methods",
    email: "roza.tesfaye@college.edu",
    department: "statistics",
  },
  {
    id: "stat-009",
    name: "Dr. Saba Mengistu",
    title: "Lecturer",
    specialization: "Nonparametric Statistics",
    email: "saba.mengistu@college.edu",
    department: "statistics",
    social: {
      linkedin: "https://linkedin.com/in/sabamengistu",
    },
  },
  {
    id: "stat-010",
    name: "Dr. Tewodros Ahmed",
    title: "Senior Lecturer",
    specialization: "Categorical Data Analysis",
    email: "tewodros.ahmed@college.edu",
    department: "statistics",
  },
  {
    id: "stat-011",
    name: "Dr. Ufuk Abebe",
    title: "Assistant Professor",
    specialization: "Survival Analysis",
    email: "ufuk.abebe@college.edu",
    department: "statistics",
    social: {
      telegram: "https://t.me/ufukabebe",
    },
  },
  {
    id: "stat-012",
    name: "Dr. Veronica Desta",
    title: "Lecturer",
    specialization: "Statistical Computing",
    email: "veronica.desta@college.edu",
    department: "statistics",
  },
];

/**
 * Get all staff members for a specific department
 * @param slug - The department slug
 * @returns Array of staff members in the department
 */
export const getStaffByDepartment = (slug: DepartmentSlug): StaffMember[] => {
  return staffMembers.filter((member) => member.department === slug);
};

/**
 * Get department information by slug
 * @param slug - The department slug
 * @returns Department object or undefined if not found
 */
export const getDepartmentBySlug = (
  slug: string
): Department | undefined => {
  return departments.find((dept) => dept.slug === slug);
};
