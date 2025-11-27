import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('biology');

const BiologyPage = () => {
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
                        name: 'Biology',
                        item: `${BASE_URL}/academics/biology`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Department of Biology"
                description="Study living organisms, their structure, function, growth, and evolution."
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
                                    The Department of Biology offers a diverse curriculum exploring the complexities of life. From molecular biology to ecology, our programs prepare students for careers in research, healthcare, and conservation.
                                </p>
                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Research Interests
                                </h3>
                                <ul className="mb-8 list-disc pl-5 text-body-color">
                                    <li className="mb-2">Microbiology and Biotechnology</li>
                                    <li className="mb-2">Botanical Sciences</li>
                                    <li className="mb-2">Zoology and Animal Sciences</li>
                                    <li className="mb-2">Ecology and Environmental Biology</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BiologyPage;
