import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('contact');

const ContactPage = () => {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            name: 'Contact',
            item: `${BASE_URL}/contact`,
          },
        ]}
      />
      <div className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="text-center">
                <h1 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                  Contact College of Science
                </h1>
                <p className="text-base text-body-color dark:text-body-color-dark max-w-2xl mx-auto">
                  We welcome inquiries from prospective students, researchers, and partners. Contact us for admissions, research collaborations, or general information about our programs.
                </p>

                {/* Improved Social Links */}
                <div className="flex flex-col items-center gap-6 mt-6 sm:flex-row sm:justify-center sm:gap-8">
                  {/* Phone */}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.7 1.06l1.1 2.2a2 2 0 01-.45 2.45l-.7.7a16.06 16.06 0 006.36 6.36l.7-.7a2 2 0 012.45-.45l2.2 1.1A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">+251 583 20 9653</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0zm-8 0v4m0-4V8" />
                    </svg>
                    <a href="mailto:bduinfo@bdu.edu.et" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition">
                      bduinfo@bdu.edu.et
                    </a>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Bahir Dar, Ethiopia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Breadcrumb
        pageName="Contact Us"
        description="Get in touch with Bahir Dar University College of Science for admissions, research opportunities, and academic inquiries."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
