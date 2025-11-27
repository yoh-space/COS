import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('structure');

const StructurePage = () => {
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
                        name: 'Structure',
                        item: `${BASE_URL}/about/structure`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Organizational Structure"
                description="Understand the organizational structure of the College of Science."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Organogram
                                </h2>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    The College of Science is organized into several departments and administrative units. The Dean oversees the overall operation of the college, supported by Vice Deans and Department Heads.
                                </p>
                                <p className="text-base font-medium text-body-color">
                                    (An image or diagram of the organizational structure will be displayed here)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StructurePage;
