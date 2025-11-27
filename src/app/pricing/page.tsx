import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('pricing');

const PricingPage = () => {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            name: 'Pricing',
            item: `${BASE_URL}/pricing`,
          },
        ]}
      />
      <Breadcrumb
        pageName="Services & Pricing"
        description="Choose a plan that fits your needs. Our flexible pricing options are designed to help your business grow."
      />
      <Features />
      <Pricing />
    </>
  );
};

export default PricingPage;
