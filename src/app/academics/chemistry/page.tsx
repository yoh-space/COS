import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('chemistry');

const ChemistryPage = () => {
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
                        name: 'Chemistry',
                        item: `${BASE_URL}/academics/chemistry`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Department of Chemistry"
                description="Explore the fundamental properties of matter and chemical reactions."
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
                                    The Department of Chemistry at Bahir Dar University is dedicated to excellence in teaching and research. We offer comprehensive programs that cover all major areas of chemistry, including organic, inorganic, physical, and analytical chemistry.
                                </p>
                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Academic Programs
                                </h3>
                                <ul className="mb-8 list-disc pl-5 text-body-color">
                                    <li className="mb-2">B.Sc. in Chemistry</li>
                                    <li className="mb-2">M.Sc. in Chemistry (various specializations)</li>
                                    <li className="mb-2">PhD in Chemistry</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChemistryPage;
