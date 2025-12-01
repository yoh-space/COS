import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { Microscope, Users, Calendar, Target, Sparkles, Globe, TrendingUp, Heart, Lightbulb, FlaskConical, Leaf, Cpu, Apple, Shield } from "lucide-react";

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
                pageName="Research Activities"
                description="Impactful research addressing national and global scientific challenges through thematic approaches."
            />

            <section className="pb-[120px] pt-[80px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-10/12">

                            {/* Overview Section */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                        <Microscope size={28} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-black dark:text-white">
                                        Research Excellence
                                    </h2>
                                </div>

                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                                        The College of Science at Bahir Dar University is actively engaged in impactful research that addresses national and global scientific challenges. The college follows a thematic research approach, ensuring that research efforts are aligned with national development priorities and societal needs.
                                    </p>

                                    <p>
                                        By organizing research within focused thematic areas, the college fosters <strong>interdisciplinary collaboration</strong> among faculty, students, and external partners, leading to innovative solutions with real-world applications.
                                    </p>
                                </div>
                            </div>

                            {/* Thematic Research Areas */}
                            <div className="mb-10">
                                <h3 className="mb-8 text-2xl font-bold text-black dark:text-white text-center">
                                    Thematic Research Areas
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-300">
                                            <Sparkles size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Space Science
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Advanced research in space physics and atmospheric sciences
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:group-hover:bg-green-600 dark:group-hover:text-white transition-all duration-300">
                                            <Leaf size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Environmental Sustainability
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Climate change and environmental conservation research
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-300">
                                            <FlaskConical size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Biotechnology
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Innovative biotechnology applications and solutions
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:group-hover:bg-green-600 dark:group-hover:text-white transition-all duration-300">
                                            <Cpu size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Computational Mathematics
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Applied mathematics and computational modeling
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-300">
                                            <Lightbulb size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Material Science
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Advanced materials and renewable energy technologies
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:group-hover:bg-green-600 dark:group-hover:text-white transition-all duration-300">
                                            <Shield size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Health Sciences
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Communicable and non-communicable disease research
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-300">
                                            <Apple size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Food Science
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Food security and nutrition research
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:group-hover:bg-green-600 dark:group-hover:text-white transition-all duration-300">
                                            <Heart size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Conservation
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Biodiversity and ecosystem conservation
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-300">
                                            <TrendingUp size={24} />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            Renewable Energy
                                        </h4>
                                        <p className="text-sm text-body-color">
                                            Sustainable energy solutions and technologies
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Inclusivity & Support */}
                            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="rounded-sm bg-white px-8 py-10 shadow-three dark:bg-gray-dark hover:shadow-one transition-shadow duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                            <Users size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-black dark:text-white">
                                            Female Researchers
                                        </h3>
                                    </div>

                                    <p className="mb-4 text-base text-body-color leading-relaxed">
                                        Recognizing the importance of inclusivity in scientific advancement, the college actively encourages female participation in STEM fields through:
                                    </p>

                                    <ul className="space-y-2 text-sm text-body-color">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                            <span>Mentorship programs</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                            <span>Capacity-building workshops</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                            <span>Targeted research grants</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="rounded-sm bg-white px-8 py-10 shadow-three dark:bg-gray-dark hover:shadow-one transition-shadow duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                            <Target size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-black dark:text-white">
                                            Young Scientists
                                        </h3>
                                    </div>

                                    <p className="mb-4 text-base text-body-color leading-relaxed">
                                        Early-career researchers and postgraduate students benefit from comprehensive support:
                                    </p>

                                    <ul className="space-y-2 text-sm text-body-color">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                            <span>Financial support and grants</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                            <span>Technical training and mentorship</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                            <span>Research development opportunities</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Annual Conference Highlight */}
                            <div className="mb-10 rounded-sm bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 px-8 py-11 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 sm:p-[55px] lg:px-8 xl:p-[55px]">
                                <div className="flex flex-col md:flex-row items-start gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-green-600 text-white shadow-lg">
                                            <Calendar size={40} />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                            13th Annual Conference
                                        </div>
                                        <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                                            National Conference on Recent Trends in Scientific Research
                                        </h3>

                                        <div className="space-y-4 text-base leading-relaxed text-body-color">
                                            <p>
                                                To facilitate the dissemination of research findings and encourage academic dialogue, the college organizes the <strong>National Conference on Recent Trends in Scientific Research</strong>, an annual event that brings together scholars, industry experts, and policymakers.
                                            </p>

                                            <p>
                                                This year marks the <strong>13th Annual Conference</strong>, highlighting the sustained commitment of the college to advancing scientific research in Ethiopia. The conference serves as a platform for researchers to present their latest findings, exchange ideas, and foster collaborations that drive scientific innovation and practical applications.
                                            </p>
                                        </div>

                                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="bg-white dark:bg-dark p-4 rounded-md text-center">
                                                <p className="text-2xl font-bold text-primary mb-1">13th</p>
                                                <p className="text-xs text-body-color">Annual Edition</p>
                                            </div>
                                            <div className="bg-white dark:bg-dark p-4 rounded-md text-center">
                                                <p className="text-2xl font-bold text-primary mb-1">National</p>
                                                <p className="text-xs text-body-color">Scope & Impact</p>
                                            </div>
                                            <div className="bg-white dark:bg-dark p-4 rounded-md text-center">
                                                <p className="text-2xl font-bold text-primary mb-1">Multi</p>
                                                <p className="text-xs text-body-color">Stakeholder Event</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Research Dissemination & Collaboration */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <Globe size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                        Dissemination & Collaboration
                                    </h3>
                                </div>

                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    <p>
                                        Research outputs from the college are widely disseminated through <strong>peer-reviewed journals</strong>, including the Ethiopian Journal of Science and Technology (EJST), as well as through international and national conferences, workshops, and policy engagements.
                                    </p>

                                    <p>
                                        The college prioritizes <strong>applied and collaborative research</strong>, working closely with industries, government agencies, and international institutions to develop solutions that address critical societal challenges.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                        <div className="bg-gray-50 dark:bg-dark p-6 rounded-md text-center border-t-4 border-blue-500">
                                            <p className="font-bold text-black dark:text-white mb-2">Industries</p>
                                            <p className="text-sm text-body-color">
                                                Practical solutions development
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-dark p-6 rounded-md text-center border-t-4 border-green-500">
                                            <p className="font-bold text-black dark:text-white mb-2">Government</p>
                                            <p className="text-sm text-body-color">
                                                Policy-informed research
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-dark p-6 rounded-md text-center border-t-4 border-blue-500">
                                            <p className="font-bold text-black dark:text-white mb-2">International</p>
                                            <p className="text-sm text-body-color">
                                                Global partnerships
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Closing Statement */}
                            <div className="rounded-sm bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-900/10 px-8 py-8 border-l-4 border-green-500">
                                <p className="text-lg font-medium text-black dark:text-white leading-relaxed">
                                    By integrating thematic research, inclusivity, and knowledge dissemination, the College of Science at Bahir Dar University continues to be a leading center for scientific inquiry, innovation, and national development.
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
