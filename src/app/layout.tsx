"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AdSenseComponent from "@/components/AdSense";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/index.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import { OrganizationJsonLd, LocalBusinessJsonLd, BreadcrumbJsonLd } from 'next-seo';
import { BASE_URL } from '@/lib/seo.config';

// Fallback font configuration to handle Google Fonts timeout during build
const fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* ✅ Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Google Fonts - Added for ESLint warning fix */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* ✅ Load Google AdSense Auto Ads (deferred) */}
        <AdSenseComponent pId="ca-pub-7604915619325589" />
      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black`} style={{ fontFamily }}>
        <ClerkProvider>
          <Providers>
            {/* ✅ Organization Structured Data using next-seo */}
            <OrganizationJsonLd
              type="Organization"
              name="Yo-Tech"
              url={BASE_URL}
              logo={`${BASE_URL}/images/logo/yo-tech-logo.svg`}
              sameAs={[
                'https://t.me/yon_fx',
                'https://www.facebook.com/yotech',
                'https://twitter.com/yotech',
                'https://www.linkedin.com/company/yotech',
              ]}
              address={{
                addressLocality: 'Addis Ababa',
                addressCountry: 'ET',
              }}
              contactPoint={{
                telephone: '+251911701858',
                contactType: 'Customer Service',
                email: 'yohansdam@gmail.com',
              }}
            />

            {/* ✅ Local Business Structured Data using next-seo */}
            <LocalBusinessJsonLd
              type="LocalBusiness"
              name="Yo-Tech"
              description="Innovative digital solutions, web and mobile app development, AI/ML services, and tech consulting company."
              url={BASE_URL}
              telephone="+251911701858"
              address={{
                streetAddress: '',
                addressLocality: 'Addis Ababa',
                addressRegion: 'Addis Ababa',
                postalCode: '',
                addressCountry: 'ET',
              }}
              geo={{
                latitude: 9.0320,
                longitude: 38.7469,
              }}
              image={`${BASE_URL}/images/logo/yo-tech-logo.svg`}
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
                  name: 'Blog',
                  item: `${BASE_URL}/blog`,
                },
                {
                  name: 'Contact',
                  item: `${BASE_URL}/contact`,
                },
              ]}
            />

            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
