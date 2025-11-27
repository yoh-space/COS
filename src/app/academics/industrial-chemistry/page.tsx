import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('industrial-chemistry');

const IndustrialChemistryPage = () => {
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
                        name: 'Industrial Chemistry',
                        item: `${BASE_URL}/academics/industrial-chemistry`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Department of Industrial Chemistry"
                description="Apply chemical principles to industrial processes and product development."
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
                                    Our Industrial Chemistry program bridges the gap between laboratory science and industrial application. Students learn to design, optimize, and manage chemical processes for large-scale production.
                                </p>
                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Key Focus Areas
                                </h3>
                                <ul className="mb-8 list-disc pl-5 text-body-color">
                                    <li className="mb-2">Process Engineering</li>
                                    <li className="mb-2">Quality Control and Assurance</li>
                                    <li className="mb-2">Environmental Safety</li>
                                    <li className="mb-2">Product Development</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default IndustrialChemistryPage;
