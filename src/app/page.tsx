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
  title: "Bahir Dar University College of Science | Excellence in Science Education & Research",
  description: "Bahir Dar University College of Science offers world-class education in Chemistry, Physics, Mathematics, Biology, Statistics, and Industrial Chemistry. Wisdom at the source of Blue Nile.",
  keywords: [
    "Bahir Dar University",
    "College of Science",
    "BDU",
    "Science Education",
    "Research",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Biology",
    "Statistics",
    "Ethiopia"
  ],
  authors: [{ name: "Bahir Dar University College of Science" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.bdu.edu.et/cos/",
    title: "Bahir Dar University College of Science | Excellence in Science Education",
    description: "Leading institution for science education and research in Ethiopia. Offering undergraduate and graduate programs in natural sciences.",
    images: [
      {
        url: "https://www.bdu.edu.et/cos/sites/default/files/coslogo.jpg",
        width: 1200,
        height: 630,
        alt: "BDU College of Science Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bahir Dar University College of Science",
    description: "Excellence in Science Education & Research - Wisdom at the source of Blue Nile",
    images: ["https://www.bdu.edu.et/cos/sites/default/files/coslogo.jpg"]
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo/cos-logo.jpg"
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
