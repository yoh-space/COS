import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { BookOpen, Users, GraduationCap, Microscope, FlaskConical, Award, Layers, Globe } from "lucide-react";
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = generatePageMetadata('background');

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BackgroundData {
  programs?: {
    msc: string;
    phd: string;
    undergraduate: string;
  };
  students?: {
    total: number;
    regular: { ug: number; msc: number; phd: number };
    summer: { ug: number; msc: number };
  };
  staff?: {
    total: number;
    professors: number;
    associateProfessors: number;
    assistantProfessors: number;
    lecturers: number;
  };
  development?: {
    phdStudyLeave: number;
    postdoc: number;
    techAssistants: number;
  };
  research?: {
    ongoingProjects: number;
    internalProjects: number;
    externalProjects: number;
    communityProjects: number;
    laboratory: string;
  };
  history?: {
    title: string;
    description: string[];
    programs: string;
  };
}

async function getBackgroundContent(): Promise<BackgroundData> {
  try {
    const backgroundContent = await prisma.backgroundContent.findFirst();
    
    if (backgroundContent && backgroundContent.content) {
      try {
        const parsed = JSON.parse(backgroundContent.content);
        return parsed;
      } catch (e) {
        console.error('Error parsing background content:', e);
      }
    }
  } catch (error) {
    console.error('Error fetching background content:', error);
  }

  // Return default data if database fetch fails
  return {
    history: {
      title: "History & Evolution",
      description: [
        "The College of Science at Bahir Dar University, originally a part of the former Faculty of Education, became an independent college in 2008 following the university's restructuring and the increased focus on the Science and Technology sectors.",
        "Today, the college offers high-quality education across seven programs: Biology, Chemistry, Mathematics, Physics, Industrial Chemistry, Statistics, and Data Science at the Undergraduate, Master's, and Doctorate levels."
      ],
      programs: "Biology, Chemistry, Mathematics, Physics, Industrial Chemistry, Statistics, and Data Science"
    },
    programs: {
      msc: "11 MSc Programs (29 Specializations)",
      phd: "9 PhD Programs (22 Specializations)",
      undergraduate: "7 Undergraduate Programs"
    },
    students: {
      total: 1151,
      regular: { ug: 659, msc: 50, phd: 91 },
      summer: { ug: 189, msc: 162 }
    },
    staff: {
      total: 174,
      professors: 11,
      associateProfessors: 44,
      assistantProfessors: 47,
      lecturers: 51
    },
    development: {
      phdStudyLeave: 18,
      postdoc: 9,
      techAssistants: 3
    },
    research: {
      ongoingProjects: 30,
      internalProjects: 17,
      externalProjects: 13,
      communityProjects: 20,
      laboratory: "Washera Geospace and Radar Science Laboratory"
    }
  };
}

const BackgroundPage = async () => {
  const data = await getBackgroundContent();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            name: 'About',
            item: `${BASE_URL}/about`,
          },
          {
            name: 'Background',
            item: `${BASE_URL}/about/background`,
          },
        ]}
      />
      <Breadcrumb
        pageName="Background"
        description="College of Science Basic Information"
      />

      <section className="pb-[120px] pt-[120px] bg-gray-50 dark:bg-black">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-10/12">
              {/* Introduction Section */}
              <div className="mb-12 rounded-lg bg-white px-8 py-12 shadow-sm border border-gray-100 dark:border-gray-800 dark:bg-gray-dark sm:p-[55px] lg:mb-10 lg:px-8 xl:p-[55px]">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-full md:w-full">
                    <div className="mb-3 inline-block rounded-md bg-blue-50 dark:bg-blue-950/30 px-4 py-1.5">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Our Story</span>
                    </div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                      {data.history?.title || "History & Evolution"}
                    </h2>
                    {data.history?.description?.map((paragraph, index) => (
                      <p key={index} className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                        {paragraph.includes('Biology') ? (
                          <>
                            {paragraph.split(':')[0]}: <strong className="text-gray-900 dark:text-white">{data.history?.programs}</strong> {paragraph.split('at the')[1] ? `at the${paragraph.split('at the')[1]}` : ''}
                          </>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Programs & Students Stats */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                <div className="group rounded-lg bg-white p-8 shadow-sm border border-gray-100 dark:border-gray-800 dark:bg-gray-dark hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300">
                  <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Academic Programs</h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      {data.programs?.msc || "11 MSc Programs (29 Specializations)"}
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      {data.programs?.phd || "9 PhD Programs (22 Specializations)"}
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      {data.programs?.undergraduate || "7 Undergraduate Programs"}
                    </li>
                  </ul>
                </div>

                <div className="group rounded-lg bg-white p-8 shadow-sm border border-gray-100 dark:border-gray-800 dark:bg-gray-dark hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300">
                  <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                    <Users size={24} />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Student Population</h3>
                  <p className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {data.students?.total?.toLocaleString() || "1,151"}
                  </p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Active Students</p>
                  <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
                    <p>Regular: {data.students?.regular.ug || 659} UG, {data.students?.regular.msc || 50} MSc, {data.students?.regular.phd || 91} PhD</p>
                    <p>Summer: {data.students?.summer.ug || 189} UG, {data.students?.summer.msc || 162} MSc</p>
                  </div>
                </div>

                <div className="group rounded-lg bg-white p-8 shadow-sm border border-gray-100 dark:border-gray-800 dark:bg-gray-dark hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300">
                  <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Staff Profile</h3>
                  <p className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {data.staff?.total || 174}
                  </p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Full-time Staff</p>
                  <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
                    <p>{data.staff?.professors || 11} Professors, {data.staff?.associateProfessors || 44} Assoc. Profs</p>
                    <p>{data.staff?.assistantProfessors || 47} Asst. Profs, {data.staff?.lecturers || 51} Lecturers</p>
                  </div>
                </div>
              </div>

              {/* Staff Development & Research */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-lg bg-white px-8 py-10 shadow-sm border border-gray-100 dark:border-gray-800 dark:bg-gray-dark">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-[44px] w-[44px] items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                      <Award size={22} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Staff Development</h3>
                  </div>
                  <p className="mb-6 text-base text-gray-600 dark:text-gray-300">
                    The college is committed to continuous professional development. Currently, we have:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-blue-950/20 dark:to-gray-900/20 p-5 rounded-lg border border-gray-100 dark:border-gray-800">
                      <span className="block text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {data.development?.phdStudyLeave || 18}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Instructors on PhD Study Leave</span>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-blue-950/20 dark:to-gray-900/20 p-5 rounded-lg border border-gray-100 dark:border-gray-800">
                      <span className="block text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {data.development?.postdoc || 9}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Postdoc Pursuits</span>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-blue-950/20 dark:to-gray-900/20 p-5 rounded-lg border border-gray-100 dark:border-gray-800">
                      <span className="block text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {data.development?.techAssistants || 3}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Tech Assistants on PhD Study</span>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-blue-950/20 dark:to-gray-900/20 p-5 rounded-lg border border-gray-100 dark:border-gray-800">
                      <span className="block text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">GTP</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Target Surpassed</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white px-8 py-10 shadow-sm border border-gray-100 dark:border-gray-800 dark:bg-gray-dark">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-[44px] w-[44px] items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                      <Microscope size={22} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Research & Community</h3>
                  </div>
                  <p className="mb-6 text-base text-gray-600 dark:text-gray-300">
                    Our faculty members are actively engaged in research and community service across various thematic areas.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/30">
                        <Layers className="text-blue-600 dark:text-blue-400" size={14} />
                      </div>
                      <span>
                        <strong className="text-gray-900 dark:text-white">{data.research?.ongoingProjects || 30}+</strong> Ongoing Research Projects ({data.research?.internalProjects || 17} Internal, {data.research?.externalProjects || 13} External)
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/30">
                        <Globe className="text-blue-600 dark:text-blue-400" size={14} />
                      </div>
                      <span>
                        <strong className="text-gray-900 dark:text-white">{data.research?.communityProjects || 20}+</strong> Community Service Projects
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/30">
                        <FlaskConical className="text-blue-600 dark:text-blue-400" size={14} />
                      </div>
                      <span>
                        Home to the <strong className="text-gray-900 dark:text-white">{data.research?.laboratory || "Washera Geospace and Radar Science Laboratory"}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BackgroundPage;
