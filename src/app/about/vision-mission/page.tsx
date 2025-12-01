import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { Eye, Target, Lightbulb, Rocket, Users, Award, TrendingUp, Globe } from "lucide-react";
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const metadata: Metadata = generatePageMetadata('vision-mission');

// Force dynamic rendering - no caching, always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getVisionMission() {
  const [vision, mission] = await Promise.all([
    prisma.visionMission.findFirst({
      where: { type: 'vision' },
    }),
    prisma.visionMission.findFirst({
      where: { type: 'mission' },
    }),
  ]);

  return { vision, mission };
}

export default async function VisionMissionPage() {
  const { vision, mission } = await getVisionMission();

  if (!vision || !mission) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: `${BASE_URL}/`,
          },
          {
            name: "About",
            item: `${BASE_URL}/about`,
          },
          {
            name: "Vision & Mission",
            item: `${BASE_URL}/about/vision-mission`,
          },
        ]}
      />
      <Breadcrumb
        pageName="Vision & Mission"
        description="Shaping the future of science education and research excellence."
      />

      {/* Vision Section */}
      <section className="relative overflow-hidden pb-16 pt-20 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900">
        <div className="container">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-dark p-8 md:p-12 lg:p-16 shadow-lg border border-gray-100 dark:border-gray-800">
              {/* Subtle decorative elements */}
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-50/40 dark:bg-blue-950/20 blur-3xl"></div>
              <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-green-50/40 dark:bg-green-950/20 blur-3xl"></div>

              <div className="relative z-10">
                {/* Vision Badge */}
                <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 px-6 py-3 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/30">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    Our Vision
                  </span>
                </div>

                {/* Vision Title */}
                <h2 className="mb-8 text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                  Vision of College of Science
                </h2>

                {/* Vision Content */}
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
                  <p className="pl-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300 md:text-xl">
                    {vision.content}
                  </p>
                </div>

                {/* Vision Highlights */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Lightbulb, label: "Innovation", color: "blue" },
                    { icon: Award, label: "Excellence", color: "green" },
                    { icon: Globe, label: "Global Impact", color: "blue" },
                    { icon: TrendingUp, label: "Growth", color: "green" }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    const isBlue = item.color === "blue";
                    return (
                      <div
                        key={index}
                        className="group flex items-center gap-3 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-dark p-4 border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isBlue ? 'bg-blue-500 dark:bg-blue-600' : 'bg-green-500 dark:bg-green-600'} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-20 pt-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="container">
          <div className="relative">
            {/* Mission Header */}
            <div className="mb-12 text-center">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 px-6 py-3 backdrop-blur-sm border border-green-200/50 dark:border-green-800/30">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 dark:bg-green-600">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  Our Mission
                </span>
              </div>

              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Mission of the College
              </h2>
            </div>

            {/* Mission Content Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-dark p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-800">
              {/* Subtle decorative elements */}
              <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-green-50/40 dark:bg-green-950/20 blur-3xl"></div>
              <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blue-50/40 dark:bg-blue-950/20 blur-3xl"></div>

              <div className="relative z-10">
                {/* Mission Statement */}
                <div className="mb-10">
                  <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
                    <p className="pl-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300 md:text-xl">
                      {mission.content}
                    </p>
                  </div>
                </div>

                {/* Mission Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Users,
                      title: "Community Focus",
                      description: "Serving students, faculty, and society",
                      color: "blue"
                    },
                    {
                      icon: Rocket,
                      title: "Research Excellence",
                      description: "Advancing scientific knowledge",
                      color: "green"
                    },
                    {
                      icon: Award,
                      title: "Quality Education",
                      description: "Nurturing future scientists",
                      color: "blue"
                    }
                  ].map((pillar, index) => {
                    const Icon = pillar.icon;
                    const isBlue = pillar.color === "blue";
                    return (
                      <div
                        key={index}
                        className="group rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-dark p-6 border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all duration-300"
                      >
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${isBlue ? 'bg-blue-500 dark:bg-blue-600' : 'bg-green-500 dark:bg-green-600'} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {pillar.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="inline-flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 px-8 py-6 border border-primary/20">
                <p className="text-base font-medium text-gray-700 dark:text-gray-300 max-w-2xl">
                  Together, we are committed to advancing science education, fostering innovation, and contributing to the development of our nation and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
