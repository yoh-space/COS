import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('research');

const ResearchPage = () => {
    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        name: 'Research',
                        item: `${BASE_URL}/research`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Research"
                description="Discover our cutting-edge research initiatives, publications, and scientific contributions."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Research Overview
                                </h2>
                                <p className="mb-12 text-base font-medium text-body-color">
                                    The College of Science is at the forefront of scientific research in Ethiopia. Our faculty and students are engaged in diverse research projects addressing local and global challenges.
                                </p>

                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Key Research Areas
                                </h3>
                                <ul className="mb-10 list-disc pl-5 text-body-color">
                                    <li className="mb-2">Environmental Science and Sustainability</li>
                                    <li className="mb-2">Material Science and Nanotechnology</li>
                                    <li className="mb-2">Biotechnology and Health Sciences</li>
                                    <li className="mb-2">Mathematical Modeling and Data Analysis</li>
                                </ul>

                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Recent Publications
                                </h3>
                                <p className="text-base font-medium text-body-color">
                                    (List of recent publications will be displayed here)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResearchPage;
