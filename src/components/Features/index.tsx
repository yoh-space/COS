import SectionTitle from "../Common/SectionTitle";
import ServicesGlassCard from "@/components/ui/services-glass-card";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Why Choose College of Science"
            paragraph="Discover what makes Bahir Dar University College of Science a leading institution for science education and research excellence in Ethiopia."
            center
          />

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
