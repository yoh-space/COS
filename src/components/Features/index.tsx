import SectionTitle from "../Common/SectionTitle";
import ServicesGlassCard from "@/components/ui/services-glass-card";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Our Services"
            paragraph="We offer a wide range of services to help your business grow and succeed."
            center
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
            {featuresData.map((feature) => (
              <ServicesGlassCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                paragraph={feature.paragraph}
              />
            ))}
          </div>


        </div>
      </section>
    </>
  );
};

export default Features;
