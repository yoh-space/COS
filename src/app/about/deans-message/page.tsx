import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('deans-message');

const DeansMessagePage = () => {
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
                        name: "Dean's Message",
                        item: `${BASE_URL}/about/deans-message`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Dean's Message"
                description="Read the message from the Dean of the College of Science."
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-8/12">
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Welcome to the College of Science
                                </h2>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    It is my great pleasure to welcome you to the College of Science at Bahir Dar University. As Dean, I am proud to lead a community of scholars dedicated to advancing scientific knowledge and education.
                                </p>
                                <p className="mb-8 text-base font-medium text-body-color">
                                    Our college offers a vibrant academic environment where students are encouraged to explore, question, and discover. We are committed to providing our students with the skills and knowledge they need to succeed in their chosen fields and to make a positive impact on the world.
                                </p>
                                <p className="text-base font-medium text-body-color">
                                    I invite you to explore our website and learn more about our programs, research, and community.
                                </p>
                                <p className="mt-8 font-bold text-black dark:text-white">
                                    [Dean&apos;s Name]
                                    <br />
                                    Dean, College of Science
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DeansMessagePage;
