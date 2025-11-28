import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import AdministratorCard from "@/components/Administration/AdministratorCard";
import { administrators } from "@/data/administrators";

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
                        <div className="w-full px-4">
                            <div className="mb-12 text-center">
                                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                                    College Administration
                                </h2>
                                <p className="text-base font-medium text-body-color">
                                    The College of Science is led by a dedicated team of administrators committed to excellence in education, research, and community service.
                                </p>
                            </div>

                            {/* Render all administrators */}
                            {administrators.map((administrator) => (
                                <AdministratorCard
                                    key={administrator.id}
                                    administrator={administrator}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdministrationPage;

