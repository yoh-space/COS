"use client";
import NeuralNetworkHero from "@/components/ui/neural-network-hero";

const Hero = () => {
  return (
    <NeuralNetworkHero
      title="Innovative Digital Solutions for Your Business Growth"
      description="YoTech is a cutting-edge technology company dedicated to delivering innovative digital solutions that drive business growth and efficiency."
      badgeText="Digital Innovation"
      badgeLabel="YoTech"
      ctaButtons={[
        { text: "Get In Touch", href: "#contact", primary: true },
        { text: "Explore More", href: "#about" }
      ]}
      microDetails={["Cutting-edge tech", "Business growth", "Digital efficiency"]}
    />
  );
};

export default Hero;