"use client"
import Lottie from "lottie-react";
import SectionTitle from "../Common/SectionTitle";
import Learning from "../../../public/images/lottie/Learning.json";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <SectionTitle
              title="Research & Innovation"
              paragraph="Advancing scientific knowledge through cutting-edge research across chemistry, physics, biology, mathematics, and applied sciences."
              mb="44px"
            />
            <div
              className="relative mx-auto mb-12 aspect-25/24 max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Lottie animationData={Learning} />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Cutting-Edge Facilities
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  State-of-the-art laboratories equipped with modern instrumentation including GC-MS, ICP-OES, and advanced computing clusters for groundbreaking research.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  International Collaboration
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our faculty and students collaborate with leading universities and research institutions worldwide, contributing to global scientific advancement.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Impactful Publications
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Over 200+ annual publications in high-impact international journals, advancing knowledge in space science, environmental sustainability, and biotechnology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
