import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { Eye, Target } from "lucide-react";
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const metadata: Metadata = generatePageMetadata('vision-mission');

// Revalidate on every request to show fresh data
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
      <section className="relative overflow-hidden pb-16 pt-20 bg-gray-50 dark:bg-black">
        <div className="container">
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900/20 p-12 shadow-sm border border-blue-100 dark:border-blue-900/30 md:p-16">
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-3 rounded-md bg-blue-100 dark:bg-blue-950/50 px-5 py-2.5 backdrop-blur-sm">
                  <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Our Vision
                  </span>
                </div>

                <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                  Vision of College of Science
                </h2>

                <p className="max-w-4xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
                  {vision.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-20 pt-8 bg-gray-50 dark:bg-black">
        <div className="container">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-3 rounded-md bg-blue-50 dark:bg-blue-950/30 px-5 py-2.5">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Our Mission
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Mission of the College
            </h2>

            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              {mission.content}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
