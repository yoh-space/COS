import Breadcrumb from "@/components/Common/Breadcrumb";
import AcademicPrograms from "@/components/AcademicPrograms";
import Features from "@/components/Features";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('pricing');

const AcademicProgramsPage = () => {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            name: 'Academic Programs',
            item: `${BASE_URL}/academic-programs`,
          },
        ]}
      />
      <Breadcrumb
        pageName="Academic Programs"
        description="Explore our comprehensive academic programs designed to prepare students for success in science and technology."
      />
      <Features />
      <AcademicPrograms />
    </>
  );
};

export default AcademicProgramsPage;
