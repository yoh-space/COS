import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('services');

const ServicesPage = () => {
    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        name: 'Services',
                        item: `${BASE_URL}/services`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Services"
                description="Explore our state-of-the-art laboratories and community service initiatives."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Our Services
                                </h2>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    The College of Science provides a range of services to the university community and the public. From advanced laboratory testing to educational outreach programs, we are committed to serving society through science.
                                </p>
                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Laboratories
                                </h3>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    Our laboratories are equipped with modern instrumentation for research and analysis. We offer testing services for water quality, soil analysis, and material characterization.
                                </p>
                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Community Engagement
                                </h3>
                                <p className="text-base font-medium text-body-color">
                                    We actively engage with the local community through science fairs, workshops for high school students, and collaborative projects with local industries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesPage;
