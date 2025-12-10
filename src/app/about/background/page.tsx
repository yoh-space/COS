"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { BookOpen, Users, GraduationCap, Microscope, FlaskConical, Award, Layers, Globe, TrendingUp, Sparkles } from "lucide-react";
import { prisma } from '@/lib/prisma';
import { useEffect, useState } from "react";

// export const metadata: Metadata = generatePageMetadata('background');

// Force dynamic rendering
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

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

const defaultData: BackgroundData = {
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

const BackgroundPage = () => {
  const [data, setData] = useState<BackgroundData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Fetch data from API
    fetch('/api/cms/background')
      .then(res => res.json())
      .then(result => {
        if (result && result.content) {
          try {
            const parsed = JSON.parse(result.content);
            setData(parsed);
          } catch (e) {
            console.error('Error parsing background content:', e);
          }
        }
      })
      .catch(error => console.error('Error fetching background content:', error));
  }, []);

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

      <section className="pb-[120px] pt-[120px] bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-dark/50">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-11/12">
              {/* Introduction Section */}
              <div className={`mb-12 rounded-lg bg-white px-8 py-12 shadow-three border-2 border-blue-100 dark:border-blue-900/30 dark:bg-gray-dark sm:p-[55px] lg:mb-10 lg:px-8 xl:p-[55px] hover:shadow-one transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-full md:w-full">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 px-5 py-2 border border-blue-200 dark:border-blue-800/30">
                      <Sparkles className="text-blue-600 dark:text-blue-400" size={18} />
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Our Story</span>
                    </div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                      {data.history?.title || "History & Evolution"}
                    </h2>
                    {data.history?.description?.map((paragraph, index) => (
                      <p key={index} className={`mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-300 transition-all duration-500 delay-${index * 100}`}>
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
                {/* Academic Programs Card */}
                <div className={`group rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three border-2 border-blue-200 dark:border-blue-800/30 hover:shadow-one hover:border-blue-300 dark:hover:border-blue-700/50 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <BookOpen size={32} />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Academic Programs</h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform duration-200">
                      <span className="h-2 w-2 rounded-full bg-blue-500 group-hover/item:scale-125 transition-transform"></span>
                      {data.programs?.msc || "11 MSc Programs (29 Specializations)"}
                    </li>
                    <li className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform duration-200">
                      <span className="h-2 w-2 rounded-full bg-blue-500 group-hover/item:scale-125 transition-transform"></span>
                      {data.programs?.phd || "9 PhD Programs (22 Specializations)"}
                    </li>
                    <li className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform duration-200">
                      <span className="h-2 w-2 rounded-full bg-blue-500 group-hover/item:scale-125 transition-transform"></span>
                      {data.programs?.undergraduate || "7 Undergraduate Programs"}
                    </li>
                  </ul>
                </div>

                {/* Student Population Card */}
                <div className={`group rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three border-2 border-green-200 dark:border-green-800/30 hover:shadow-one hover:border-green-300 dark:hover:border-green-700/50 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-green-600 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Users size={32} />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Student Population</h3>
                  <p className="mb-2 text-5xl font-bold text-green-600 dark:text-green-400 group-hover:scale-105 transition-transform duration-300">
                    {data.students?.total?.toLocaleString() || "1,151"}
                  </p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Active Students</p>
                  <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                    <p className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Regular: {data.students?.regular.ug || 659} UG, {data.students?.regular.msc || 50} MSc, {data.students?.regular.phd || 91} PhD</p>
                    <p className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Summer: {data.students?.summer.ug || 189} UG, {data.students?.summer.msc || 162} MSc</p>
                  </div>
                </div>

                {/* Staff Profile Card */}
                <div className={`group rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three border-2 border-blue-200 dark:border-blue-800/30 hover:shadow-one hover:border-blue-300 dark:hover:border-blue-700/50 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <GraduationCap size={32} />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Staff Profile</h3>
                  <p className="mb-2 text-5xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-300">
                    {data.staff?.total || 174}
                  </p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Full-time Staff</p>
                  <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                    <p className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{data.staff?.professors || 11} Professors, {data.staff?.associateProfessors || 44} Assoc. Profs</p>
                    <p className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{data.staff?.assistantProfessors || 47} Asst. Profs, {data.staff?.lecturers || 51} Lecturers</p>
                  </div>
                </div>
              </div>

              {/* Staff Development & Research */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-12">
                {/* Staff Development */}
                <div className={`rounded-lg bg-white px-8 py-10 shadow-three border-2 border-blue-100 dark:border-blue-900/30 dark:bg-gray-dark hover:shadow-one hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: '400ms' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:scale-110 transition-transform duration-300">
                      <Award size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Development</h3>
                  </div>
                  <p className="mb-6 text-base text-gray-600 dark:text-gray-300">
                    The college is committed to continuous professional development. Currently, we have:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: data.development?.phdStudyLeave || 18, label: "Instructors on PhD Study Leave", color: "blue" },
                      { value: data.development?.postdoc || 9, label: "Postdoc Pursuits", color: "green" },
                      { value: data.development?.techAssistants || 3, label: "Tech Assistants on PhD Study", color: "blue" },
                      { value: "GTP", label: "Target Surpassed", color: "green" }
                    ].map((item, index) => (
                      <div key={index} className={`group/card bg-gradient-to-br ${item.color === 'blue' ? 'from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10' : 'from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10'} p-5 rounded-lg border-2 ${item.color === 'blue' ? 'border-blue-200 dark:border-blue-800/30' : 'border-green-200 dark:border-green-800/30'} hover:shadow-md hover:scale-105 transition-all duration-300`}>
                        <span className={`block text-3xl font-bold ${item.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'} mb-2 group-hover/card:scale-110 transition-transform duration-300`}>
                          {item.value}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Research & Community */}
                <div className={`rounded-lg bg-white px-8 py-10 shadow-three border-2 border-green-100 dark:border-green-900/30 dark:bg-gray-dark hover:shadow-one hover:border-green-200 dark:hover:border-green-800/50 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: '500ms' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:scale-110 transition-transform duration-300">
                      <Microscope size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Research & Community</h3>
                  </div>
                  <p className="mb-6 text-base text-gray-600 dark:text-gray-300">
                    Our faculty members are actively engaged in research and community service across various thematic areas.
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: Layers, text: `${data.research?.ongoingProjects || 30}+ Ongoing Research Projects (${data.research?.internalProjects || 17} Internal, ${data.research?.externalProjects || 13} External)`, color: "blue" },
                      { icon: Globe, text: `${data.research?.communityProjects || 20}+ Community Service Projects`, color: "green" },
                      { icon: FlaskConical, text: `Home to the ${data.research?.laboratory || "Washera Geospace and Radar Science Laboratory"}`, color: "blue" }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 group/item hover:translate-x-2 transition-transform duration-300">
                          <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-md ${item.color === 'blue' ? 'bg-blue-50 dark:bg-blue-950/30' : 'bg-green-50 dark:bg-green-950/30'} group-hover/item:scale-110 transition-transform duration-300`}>
                            <Icon className={item.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'} size={16} />
                          </div>
                          <span className="flex-1">
                            <strong className="text-gray-900 dark:text-white">{item.text.split(':')[0]}</strong>{item.text.includes(':') ? `:${item.text.split(':').slice(1).join(':')}` : ''}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Excellence Highlights */}
              <div className={`rounded-lg bg-gradient-to-r from-blue-50 via-green-50 to-blue-50 dark:from-blue-900/10 dark:via-green-900/10 dark:to-blue-900/10 px-8 py-12 border-2 border-blue-200/50 dark:border-blue-800/30 shadow-three hover:shadow-one transition-all duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '600ms' }}>
                <div className="flex items-center gap-4 mb-8 justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-lg">
                    <TrendingUp size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Excellence & Impact</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: BookOpen, title: "Quality Education", value: "7", label: "Programs", color: "blue" },
                    { icon: Microscope, title: "Research", value: "30+", label: "Projects", color: "green" },
                    { icon: Users, title: "Community", value: "1,151", label: "Students", color: "blue" },
                    { icon: Award, title: "Excellence", value: "174", label: "Staff", color: "green" }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="bg-white dark:bg-dark p-6 rounded-lg shadow-sm text-center hover:shadow-md hover:scale-105 transition-all duration-300 group/stat">
                        <div className={`flex justify-center mb-4 group-hover/stat:scale-110 transition-transform duration-300`}>
                          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
                            <Icon size={24} />
                          </div>
                        </div>
                        <p className={`text-3xl font-bold mb-1 ${item.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`}>{item.value}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                      </div>
                    );
                  })}
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
