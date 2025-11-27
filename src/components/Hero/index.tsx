"use client";
import ImageGradientHero from "@/components/ui/image-gradient-hero";

const Hero = () => {
  return (
    <ImageGradientHero
      title="Excellence in Science Education & Research"
      description="Bahir Dar University College of Science - Advancing knowledge and innovation in natural sciences. Wisdom at the source of Blue Nile."
      badgeText="Academic Excellence"
      badgeLabel="BDU College of Science"
      ctaButtons={[
        { text: "Contact Us", href: "#contact", primary: true },
        { text: "Learn More", href: "#about" },
      ]}
      microDetails={[
        "World-class education",
        "Cutting-edge research",
        "Academic excellence",
      ]}
      backgroundImage="/images/hero/science-building.jpg"
    />
  );
};

export default Hero;