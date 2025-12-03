"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import ChatTrigger from "@/components/ui/ChatTrigger";
import SpotlightCursor from "@/components/SpotlightCursor";
import { InitialLoader, NavigationLoader } from "@/components/Loading";
import "../styles/index.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import { OrganizationJsonLd, LocalBusinessJsonLd, BreadcrumbJsonLd } from 'next-seo';
import { BASE_URL } from '@/lib/seo.config';
import { Suspense, useEffect } from "react";
import { suppressConsoleInProduction } from "@/lib/logger";

// Fallback font configuration to handle Google Fonts timeout during build
const fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Suppress console output in production for better performance
  useEffect(() => {
    suppressConsoleInProduction();
  }, []);

  return (
    <html suppressHydrationWarning lang="en">
      <head>
  {/* Performance-related external preconnects removed (no AdSense for this site) */}
      </head>
      <body className={`overflow-x-hidden bg-[#FCFCFC] dark:bg-black`} style={{ fontFamily }}>
        <ClerkProvider>
          <Providers>
            {/* ✅ Organization Structured Data using next-seo */}
            <OrganizationJsonLd
              type="Organization"
              name="Bahir Dar University College of Science"
              url={BASE_URL}
              logo={`${BASE_URL}/images/logo/cos-logo.jpg`}
              sameAs={[
                'https://www.facebook.com/bduethiopia',
                'http://www.twitter.com/bdueduet',
                'http://journals.bdu.edu.et/',
                'https://www.bdu.edu.et/cos/',
              ]}
              address={{
                addressLocality: 'Bahir Dar',
                addressCountry: 'ET',
              }}
              contactPoint={{
                telephone: '+251 583 20 9653',
                contactType: 'Academic Services',
                email: 'bduinfo@bdu.edu.et',
              }}
            />

            {/* ✅ Local Business Structured Data using next-seo */}
            <LocalBusinessJsonLd
              type="EducationalOrganization"
              name="Bahir Dar University College of Science"
              description="Leading institution for science education and research in Ethiopia. Offering undergraduate and graduate programs in Chemistry, Physics, Mathematics, Biology, Statistics, and Industrial Chemistry."
              url={BASE_URL}
              telephone="+251 583 20 9653"
              address={{
                streetAddress: 'Bahir Dar University',
                addressLocality: 'Bahir Dar',
                addressRegion: 'Amhara',
                postalCode: '',
                addressCountry: 'ET',
              }}
              geo={{
                latitude: 9.0320,
                longitude: 38.7469,
              }}
              image={`${BASE_URL}/images/logo/logo.jpeg`}
              priceRange="$$"
            />

            {/* ✅ Main Site Breadcrumb */}
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
                  name: 'Academics',
                  item: `${BASE_URL}/blog`,
                },
                {
                  name: 'Research',
                  item: `${BASE_URL}/pricing`,
                },
                {
                  name: 'Contact',
                  item: `${BASE_URL}/contact`,
                },
              ]}
            />

            <InitialLoader />
            <Suspense fallback={null}>
              <NavigationLoader />
            </Suspense>
            <SpotlightCursor />
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
            <ChatTrigger />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
