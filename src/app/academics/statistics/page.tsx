import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('statistics');

const StatisticsPage = () => {
    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        name: 'Academics',
                        item: `${BASE_URL}/academics`,
                    },
                    {
                        name: 'Statistics',
                        item: `${BASE_URL}/academics/statistics`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Department of Statistics"
                description="Learn the science of collecting, analyzing, interpreting, and presenting data."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    About the Department
                                </h2>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    In an increasingly data-driven world, the Department of Statistics equips students with the tools to extract meaningful insights from data. Our curriculum covers statistical theory, methodology, and applications.
                                </p>
                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Career Opportunities
                                </h3>
                                <ul className="mb-8 list-disc pl-5 text-body-color">
                                    <li className="mb-2">Data Scientist</li>
                                    <li className="mb-2">Biostatistician</li>
                                    <li className="mb-2">Market Researcher</li>
                                    <li className="mb-2">Actuary</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StatisticsPage;
