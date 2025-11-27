import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import TeamSection from "@/components/Team/teamSection";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
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
        ]}
      />
      <Breadcrumb
        pageName="About us"
        description="Meet our team and learn more about our mission and values."
      />
      <TeamSection />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
