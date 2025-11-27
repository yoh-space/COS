import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('administration');

const AdministrationPage = () => {
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
                        name: 'Administration',
                        item: `${BASE_URL}/about/administration`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Administration"
                description="Meet the administration team leading the College of Science."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    College Leadership
                                </h2>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    The College of Science is led by a dedicated team of administrators who are committed to the success of our students and faculty.
                                </p>
                                <div className="mb-8">
                                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Dean</h3>
                                    <p className="text-base font-medium text-body-color">[Dean&apos;s Name]</p>
                                </div>
                                <div className="mb-8">
                                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Vice Dean</h3>
                                    <p className="text-base font-medium text-body-color">[Vice Dean&apos;s Name]</p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Administrative Staff</h3>
                                    <p className="text-base font-medium text-body-color">
                                        Our administrative staff provides essential support for the daily operations of the college.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdministrationPage;
