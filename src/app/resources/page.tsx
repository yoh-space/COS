import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from "@/lib/seo.config";
import { BreadcrumbJsonLd } from "next-seo";
import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Microscope,
  FileText,
  FolderOpen,
  ArrowRight,
  Sparkles,
  Users,
  Globe,
} from "lucide-react";
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: "Resources | BDU College of Science",
  description: "Access publications, research activities, reports, and documentation from the College of Science at Bahir Dar University.",
};

export const dynamic = 'force-dynamic';

async function getResourceCounts() {
  try {
    const [publicationsCount, researchCount, reportsCount] = await Promise.all([
      prisma.publication.count({ where: { status: 'published' } }),
      prisma.researchActivity.count({ where: { status: 'published' } }),
      prisma.report.count({ where: { status: 'published' } }),
    ]);
    return { publicationsCount, researchCount, reportsCount };
  } catch (error) {
    console.error('Failed to fetch resource counts:', error);
    return { publicationsCount: 0, researchCount: 0, reportsCount: 0 };
  }
}

const highlights = [
  {
    icon: Sparkles,
    title: "Research Excellence",
    description: "Leading scientific research in Ethiopia",
    color: "blue",
  },
  {
    icon: Users,
    title: "Collaborative Work",
    description: "Partnerships with global institutions",
    color: "green",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Contributing to scientific advancement",
    color: "blue",
  },
];

const ResourcesPage = async () => {
  const { publicationsCount, researchCount, reportsCount } = await getResourceCounts();
  
  const resourceSections = [
    {
      title: "Publications",
      description:
        "Access research publications, journal articles, and academic papers from our faculty and researchers.",
      href: "/resources/publication",
      icon: BookOpen,
      color: "blue",
      stats: publicationsCount > 0 ? `${publicationsCount} Publications` : "Publications",
      features: [
        "Peer-reviewed journals",
        "Conference proceedings",
        "EJST publications",
      ],
    },
    {
      title: "Research Activities",
      description:
        "Explore ongoing research projects, thematic areas, and collaborative initiatives across departments.",
      href: "/resources/research",
      icon: Microscope,
      color: "green",
      stats: researchCount > 0 ? `${researchCount} Projects` : "Research Projects",
      features: [
        "Thematic research",
        "Collaborative projects",
        "Annual conferences",
      ],
    },
    {
      title: "Reports & Documents",
      description:
        "Download annual reports, strategic plans, and official documents of the College of Science.",
      href: "/resources/reports",
      icon: FileText,
      color: "blue",
      stats: reportsCount > 0 ? `${reportsCount} Reports` : "Reports",
      features: ["Strategic plans", "Performance reports", "Policy documents"],
    },
    {
      title: "Documentation",
      description:
        "Access guidelines, procedures, and academic documentation for students and faculty.",
      href: "/resources/documentations",
      icon: FolderOpen,
      color: "green",
      stats: "Guidelines",
      features: ["Academic policies", "Procedures", "Forms & templates"],
    },
  ];
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Resources", item: `${BASE_URL}/resources` },
        ]}
      />
      <Breadcrumb
        pageName="Resources"
        description="Access publications, research activities, reports, and documentation from the College of Science."
      />

      <section className="pb-[120px] pt-[80px]">
        <div className="container">
          {/* Highlights Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                const isBlue = item.color === "blue";
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-lg ${
                        isBlue
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-body-color">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceSections.map((section, index) => {
              const Icon = section.icon;
              const isBlue = section.color === "blue";
              return (
                <Link
                  key={index}
                  href={section.href}
                  className="group rounded-xl bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 ${
                        isBlue
                          ? "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white"
                          : "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:group-hover:bg-green-600 dark:group-hover:text-white"
                      }`}
                    >
                      <Icon size={32} />
                    </div>
                    <span
                      className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                        isBlue
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {section.stats}
                    </span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {section.title}
                  </h3>

                  <p className="mb-6 text-body-color leading-relaxed">
                    {section.description}
                  </p>

                  <ul className="mb-6 space-y-2">
                    {section.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-body-color"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isBlue ? "bg-blue-500" : "bg-green-500"
                          }`}
                        ></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 ${
                      isBlue
                        ? "text-blue-600 group-hover:text-blue-700 dark:text-blue-400"
                        : "text-green-600 group-hover:text-green-700 dark:text-green-400"
                    }`}
                  >
                    Explore {section.title}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-12 text-center text-white">
            <h3 className="mb-4 text-2xl md:text-3xl font-bold">
              Need Specific Resources?
            </h3>
            <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
              Contact our research office for access to specific publications,
              research data, or collaboration opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourcesPage;
