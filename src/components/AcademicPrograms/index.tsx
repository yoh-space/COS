"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import ProgramGlassCard from "@/components/ui/program-glass-card";

const AcademicPrograms = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const programs = [
    {
      packageName: "Undergraduate",
      price: "BSc",
      duration: "4 Years",
      bgColor: "bg-black text-white",
      subtitle: "Bachelor of Science programs across six departments.",
      features: [
        { text: "Chemistry", status: "active" as const },
        { text: "Industrial Chemistry", status: "active" as const },
        { text: "Biology", status: "active" as const },
        { text: "Physics", status: "active" as const },
        { text: "Mathematics", status: "active" as const },
        { text: "Statistics & Data Science", status: "active" as const },
        { text: "Laboratory Training", status: "active" as const },
        { text: "Research Projects", status: "active" as const },
        { text: "Industry Internships", status: "active" as const },
        { text: "Career Development", status: "active" as const },
        { text: "International Exchange", status: "active" as const },
        { text: "Advanced Certifications", status: "active" as const },
      ],
    },
    {
      packageName: "Graduate",
      price: "MSc",
      duration: "2 Years",
      bgColor: "bg-black text-white",
      subtitle: "Master of Science programs with research focus.",
      features: [
        { text: "Advanced Coursework", status: "active" as const },
        { text: "Thesis Research", status: "active" as const },
        { text: "Laboratory Access", status: "active" as const },
        { text: "Research Publications", status: "active" as const },
        { text: "Teaching Assistantships", status: "active" as const },
        { text: "Conference Presentations", status: "active" as const },
        { text: "Industry Collaboration", status: "active" as const },
        { text: "Specialized Training", status: "active" as const },
        { text: "International Conferences", status: "active" as const },
        { text: "Research Grants", status: "active" as const },
        { text: "Mentorship Programs", status: "active" as const },
        { text: "Career Placement", status: "active" as const },
      ],
    },
    {
      packageName: "Doctoral",
      price: "PhD",
      duration: "3-4 Years",
      bgColor: "bg-black text-white",
      subtitle: "Doctor of Philosophy programs for research excellence.",
      features: [
        { text: "Original Research", status: "active" as const },
        { text: "Dissertation Defense", status: "active" as const },
        { text: "Advanced Lab Facilities", status: "active" as const },
        { text: "International Publications", status: "active" as const },
        { text: "Conference Presentations", status: "active" as const },
        { text: "Research Funding", status: "active" as const },
        { text: "Teaching Experience", status: "active" as const },
        { text: "Collaborative Research", status: "active" as const },
        { text: "International Partnerships", status: "active" as const },
        { text: "Post-doctoral Opportunities", status: "active" as const },
        { text: "Academic Career Path", status: "active" as const },
        { text: "Industry Leadership Roles", status: "active" as const },
      ],
    },
  ];

  return (
    <section id="programs" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Academic Programs"
          paragraph="Explore our comprehensive science education programs designed to prepare the next generation of scientists, researchers, and innovators."
          center
          width="665px"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {programs.map((program, index) => (
            <ProgramGlassCard
              key={index}
              packageName={program.packageName}
              price={program.price}
              duration={program.duration}
              subtitle={program.subtitle}
              features={program.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;