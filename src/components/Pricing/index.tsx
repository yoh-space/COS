"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import PricingGlassCard from "@/components/ui/pricing-glass-card";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const packages = [
    {
      packageName: "Portfolio",
      price: "11,999",
      duration: "ETB",
      bgColor: "bg-black text-white",
      subtitle: "Perfect for personal portfolios and small projects.",
      features: [
        { text: "Domain name (1 Year)", status: "active" as const },
        { text: "Hosting (1 Year)", status: "active" as const },
        { text: "Strategy & Consulting", status: "active" as const },
        { text: "Creative Web Design", status: "active" as const },
        { text: "Responsive Website", status: "active" as const },
        { text: "User Experience", status: "active" as const },
        { text: "SEO", status: "active" as const },
        { text: "1 Month Maintenance", status: "active" as const },
        { text: "All free Plugins Installed", status: "inactive" as const },
        { text: "10 Post Featured Image", status: "inactive" as const },
        { text: "Web Page Advertisement", status: "inactive" as const },
        { text: "Installing Sub-domains", status: "inactive" as const },
        { text: "Fascinated Features", status: "inactive" as const },
        { text: "Marketing Features", status: "inactive" as const },
      ],
    },
    {
      packageName: "Blog",
      price: "19,999",
      duration: "ETB",
      bgColor: "bg-black text-white",
      subtitle: "Ideal for bloggers and content creators.",
      features: [
        { text: "Domain name (1 Year)", status: "active" as const },
        { text: "Hosting (1 Year)", status: "active" as const },
        { text: "Strategy & Consulting", status: "active" as const },
        { text: "Creative Web Design", status: "active" as const },
        { text: "Responsive Web Design", status: "active" as const },
        { text: "User Experience", status: "active" as const },
        { text: "SEO", status: "active" as const },
        { text: "2 Month Maintenance", status: "active" as const },
        { text: "All free Plugins Installed", status: "active" as const },
        { text: "5 Post Featured Image", status: "active" as const },
        { text: "Web Page Advertisement", status: "active" as const },
        { text: "Installing Sub-domains", status: "inactive" as const },
        { text: "Fascinated Features", status: "inactive" as const },
        { text: "Marketing Features", status: "inactive" as const },
      ],
    },
    {
      packageName: "Business",
      price: "24,999",
      duration: "ETB",
      bgColor: "bg-black text-white",
      subtitle: "For enterprises needing a robust and scalable website.",
      features: [
        { text: "Domain name (1 Year)", status: "active" as const },
        { text: "Hosting (1 Year)", status: "active" as const },
        { text: "Strategy & Consulting", status: "active" as const },
        { text: "Creative Web Design", status: "active" as const },
        { text: "Responsive Web Design", status: "active" as const },
        { text: "User Experience", status: "active" as const },
        { text: "SEO", status: "active" as const },
        { text: "3 Month Maintenance", status: "active" as const },
        { text: "All free Plugins Installed", status: "active" as const },
        { text: "10 Post Featured Image", status: "active" as const },
        { text: "Web Page Advertisement", status: "active" as const },
        { text: "Installing Sub-domain", status: "active" as const },
        { text: "Fascinated Features", status: "active" as const },
        { text: "Database Customization", status: "active" as const },
      ],
    },
  ];

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Service Packages"
          paragraph="Choose the package that suits your needs. Our comprehensive solutions include everything to get your project completed successfully."
          center
          width="665px"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <PricingGlassCard
              key={index}
              packageName={pkg.packageName}
              price={pkg.price}
              duration={pkg.duration}
              subtitle={pkg.subtitle}
              features={pkg.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;