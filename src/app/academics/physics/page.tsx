import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata('physics');

const PhysicsPage = () => {
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
                        name: 'Physics',
                        item: `${BASE_URL}/academics/physics`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Department of Physics"
                description="Investigate the nature of matter, energy, space, and time."
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
                                    The Department of Physics provides a rigorous education in theoretical and experimental physics. Our faculty are engaged in cutting-edge research in areas such as condensed matter physics, optics, and astrophysics.
                                </p>
                                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                                    Laboratories & Facilities
                                </h3>
                                <ul className="mb-8 list-disc pl-5 text-body-color">
                                    <li className="mb-2">Advanced Optics Lab</li>
                                    <li className="mb-2">Electronics Lab</li>
                                    <li className="mb-2">Computational Physics Lab</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PhysicsPage;
