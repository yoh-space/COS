import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamically import heavy components that are below the fold
const Blog = dynamic(() => import("@/components/Blog"), {
  loading: () => <div className="py-16 text-center">Loading blogs...</div>,
});

const Brands = dynamic(() => import("@/components/Brands"), {
  loading: () => <div className="py-16 text-center">Loading brands...</div>,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="py-16 text-center">Loading contact...</div>,
});

const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <div className="py-16 text-center">Loading pricing...</div>,
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="py-16 text-center">Loading testimonials...</div>,
});

export const metadata: Metadata = {
  title: "Yo-Tech | Innovative Digital Solutions, Web & App Development, Tech Services and Latest Blogs",
  description: "Yo-Tech delivers cutting-edge digital solutions, web and mobile app development, AI/ML services, and tech consulting to empower your business growth. Trusted by startups and enterprises.",
  keywords: [
    "digital solutions",
    "web development",
    "app development",
    "AI",
    "machine learning",
    "tech consulting",
    "business growth",
    "Yo-Tech"
  ],
  authors: [{ name: "Yo-Tech Team" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.yotech.space/",
    title: "Yo-Tech | Innovative Digital Solutions for Business Growth",
    description: "Yo-Tech delivers cutting-edge digital solutions, web and mobile app development, AI/ML services, and tech consulting to empower your business growth.",
    images: [
      {
        url: "https://www.yotech.space/images/logo/yo-tech-logo.svg",
        width: 1200,
        height: 630,
        alt: "Yo-Tech Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Yo-Tech | Innovative Digital Solutions for Business Growth",
    description: "Yo-Tech delivers cutting-edge digital solutions, web and mobile app development, AI/ML services, and tech consulting to empower your business growth.",
    images: ["https://www.yotech.space/images/logo/yo-tech-logo.svg"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo/yo-tech-logo.svg"
  }
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
