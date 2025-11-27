import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('mathematics');

const MathematicsPage = () => {
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
                        name: 'Mathematics',
                        item: `${BASE_URL}/academics/mathematics`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Department of Mathematics"
                description="Engage with the abstract science of number, quantity, and space."
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
                                    The Department of Mathematics fosters analytical thinking and problem-solving skills. We offer courses in pure and applied mathematics, preparing students for diverse careers in academia, industry, and finance.
                                </p>
                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Areas of Study
                                </h3>
                                <ul className="mb-8 list-disc pl-5 text-body-color">
                                    <li className="mb-2">Algebra and Number Theory</li>
                                    <li className="mb-2">Analysis and Differential Equations</li>
                                    <li className="mb-2">Applied Mathematics</li>
                                    <li className="mb-2">Mathematical Modeling</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MathematicsPage;
