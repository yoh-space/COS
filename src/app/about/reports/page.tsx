import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('reports');

const ReportsPage = () => {
    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        name: 'About',
                        item: `${BASE_URL}/about`,
                    },
                    {
                        name: 'Reports',
                        item: `${BASE_URL}/about/reports`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Reports & Documents"
                description="Access annual reports and official documents of the College of Science."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Annual Reports
                                </h2>
                                <ul className="mb-8 list-disc pl-5 text-body-color">
                                    <li className="mb-2">Annual Report 2024</li>
                                    <li className="mb-2">Annual Report 2023</li>
                                    <li className="mb-2">Annual Report 2022</li>
                                </ul>
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Strategic Plan
                                </h2>
                                <p className="text-base font-medium text-body-color">
                                    Our strategic plan outlines our goals and objectives for the next five years.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReportsPage;
