import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('vision-mission');

const VisionMissionPage = () => {
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
                        name: 'Vision & Mission',
                        item: `${BASE_URL}/about/vision-mission`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Vision & Mission"
                description="Our vision and mission statements guiding the College of Science towards excellence."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Vision
                                </h2>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    To be a premier college of science in Africa, recognized for excellence in education, research, and community service.
                                </p>
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Mission
                                </h2>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    To provide high-quality education in the sciences, conduct cutting-edge research that addresses societal needs, and engage in community service to promote scientific literacy and development.
                                </p>
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Core Values
                                </h2>
                                <ul className="list-disc pl-5 text-body-color">
                                    <li className="mb-2">Excellence</li>
                                    <li className="mb-2">Integrity</li>
                                    <li className="mb-2">Innovation</li>
                                    <li className="mb-2">Collaboration</li>
                                    <li className="mb-2">Social Responsibility</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VisionMissionPage;
