import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { BookOpen, Users, GraduationCap, Microscope, FlaskConical, Award, Briefcase, Layers, Globe } from "lucide-react";

export const metadata: Metadata = generatePageMetadata('background');

const BackgroundPage = () => {
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
                        name: 'Background',
                        item: `${BASE_URL}/about/background`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Background"
                description="College of Science Basic Information"
            />
            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-10/12">
                            {/* Introduction Section */}
                            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-10 lg:px-8 xl:p-[55px]">
                                <div className="flex flex-col md:flex-row items-start gap-8">
                                    <div className="w-full md:w-full">
                                        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                            History & Evolution
                                        </h2>
                                        <p className="mb-6 text-base leading-relaxed text-body-color">
                                            The College of Science at Bahir Dar University, originally a part of the former Faculty of Education, became an independent college in 2008 following the university’s restructuring and the increased focus on the Science and Technology sectors.
                                        </p>
                                        <p className="text-base leading-relaxed text-body-color">
                                            Today, the college offers high-quality education across seven programs: <strong>Biology, Chemistry, Mathematics, Physics, Industrial Chemistry, Statistics, and Data Science</strong> at the Undergraduate, Master’s, and Doctorate levels.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Programs & Students Stats */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                                <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-shadow duration-300">
                                    <div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                                        <BookOpen size={24} />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Academic Programs</h3>
                                    <ul className="space-y-2 text-sm text-body-color">
                                        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span>11 MSc Programs (29 Specializations)</li>
                                        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span>9 PhD Programs (22 Specializations)</li>
                                        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span>7 Undergraduate Programs</li>
                                    </ul>
                                </div>

                                <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-shadow duration-300">
                                    <div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                                        <Users size={24} color="dark:white" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Student Population</h3>
                                    <p className="mb-2 text-3xl font-bold text-primary">1,151</p>
                                    <p className="text-sm text-body-color mb-2">Active Students</p>
                                    <div className="text-xs text-body-color space-y-1">
                                        <p>Regular: 659 UG, 50 MSc, 91 PhD</p>
                                        <p>Summer: 189 UG, 162 MSc</p>
                                    </div>
                                </div>

                                <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-shadow duration-300">
                                    <div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                                        <GraduationCap size={24} />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Staff Profile</h3>
                                    <p className="mb-2 text-3xl font-bold text-primary">174</p>
                                    <p className="text-sm text-body-color mb-2">Full-time Staff</p>
                                    <div className="text-xs text-body-color space-y-1">
                                        <p>11 Professors, 44 Assoc. Profs</p>
                                        <p>47 Asst. Profs, 51 Lecturers</p>
                                    </div>
                                </div>
                            </div>

                            {/* Staff Development & Research */}
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                <div className="rounded-sm bg-white px-8 py-10 shadow-three dark:bg-gray-dark">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                                            <Award size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-black dark:text-white">Staff Development</h3>
                                    </div>
                                    <p className="mb-6 text-base text-body-color">
                                        The college is committed to continuous professional development. Currently, we have:
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 dark:bg-dark p-4 rounded-md">
                                            <span className="block text-2xl font-bold text-primary mb-1">18</span>
                                            <span className="text-xs text-body-color">Instructors on PhD Study Leave</span>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-dark p-4 rounded-md">
                                            <span className="block text-2xl font-bold text-primary mb-1">9</span>
                                            <span className="text-xs text-body-color">Postdoc Pursuits</span>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-dark p-4 rounded-md">
                                            <span className="block text-2xl font-bold text-primary mb-1">3</span>
                                            <span className="text-xs text-body-color">Tech Assistants on PhD Study</span>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-dark p-4 rounded-md">
                                            <span className="block text-2xl font-bold text-primary mb-1">GTP</span>
                                            <span className="text-xs text-body-color">Target Surpassed</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-sm bg-white px-8 py-10 shadow-three dark:bg-gray-dark">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                                            <Microscope size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold text-black dark:text-white">Research & Community</h3>
                                    </div>
                                    <p className="mb-6 text-base text-body-color">
                                        Our faculty members are actively engaged in research and community service across various thematic areas.
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 text-sm font-medium text-body-color">
                                            <Layers className="mt-1 text-primary" size={16} />
                                            <span><strong>30+</strong> Ongoing Research Projects (17 Internal, 13 External)</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm font-medium text-body-color">
                                            <Globe className="mt-1 text-primary" size={16} />
                                            <span><strong>20+</strong> Community Service Projects</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm font-medium text-body-color">
                                            <FlaskConical className="mt-1 text-primary" size={16} />
                                            <span>Home to the <strong>Washera Geospace and Radar Science Laboratory</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BackgroundPage;
