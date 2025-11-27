import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageMetadata, BASE_URL } from '@/lib/seo.config';
import { BreadcrumbJsonLd } from 'next-seo';
import { Metadata } from "next";
import { BookOpen, Globe, Users, Megaphone, FileText, Lightbulb, TrendingUp, Award, ExternalLink } from "lucide-react";

export const metadata: Metadata = generatePageMetadata('publication');

const PublicationPage = () => {
    return (
        <>
            <BreadcrumbJsonLd
                items={[
                    {
                        name: 'Home',
                        item: `${BASE_URL}/`,
                    },
                    {
                        name: 'Publications',
                        item: `${BASE_URL}/publication`,
                    },
                ]}
            />
            <Breadcrumb
                pageName="Publication & Dissemination"
                description="Advancing scientific knowledge through high-quality research publications and effective dissemination."
            />

            <section className="pb-[120px] pt-[80px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-10/12">

                            {/* Overview Section */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary">
                                        <BookOpen size={28} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-black dark:text-white">
                                        Publication Excellence
                                    </h2>
                                </div>

                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                                        The College of Science at Bahir Dar University is committed to advancing scientific knowledge through high-quality research publications and effective dissemination of findings. Faculty members and researchers actively publish in internationally recognized peer-reviewed journals, contributing to the global scientific community.
                                    </p>

                                    <p>
                                        The research outputs span various disciplines, including <strong>space physics, environmental science, biotechnology, chemistry, mathematics, and applied sciences</strong>. By prioritizing rigorous research and publication, the college enhances its academic reputation and fosters collaborations with researchers worldwide.
                                    </p>
                                </div>
                            </div>

                            {/* EJST Journal Highlight */}
                            <div className="mb-10 rounded-sm bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 px-8 py-11 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 sm:p-[55px] lg:px-8 xl:p-[55px]">
                                <div className="flex flex-col md:flex-row items-start gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary text-white shadow-lg">
                                            <FileText size={40} />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                                            Ethiopian Journal of Science and Technology (EJST)
                                        </h3>
                                        <div className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary">
                                            Volume 18, Issue 2
                                        </div>

                                        <div className="space-y-4 text-base leading-relaxed text-body-color">
                                            <p>
                                                A key platform for research dissemination within the college is the <strong>Ethiopian Journal of Science and Technology (EJST)</strong>, a peer-reviewed journal hosted by Bahir Dar University. EJST provides an avenue for publishing high quality research in science, engineering, and technology, offering a regional and international forum for scholars to share their findings.
                                            </p>

                                            <p>
                                                The journal plays a crucial role in promoting local research while ensuring that scientific contributions from Ethiopian and African researchers are recognized globally. Additionally, EJST supports early career researchers by providing opportunities to publish their work in a reputable academic outlet.
                                            </p>
                                        </div>

                                        <a
                                            href="https://www.ajol.info/index.php/ejst"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Visit EJST Journal
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Dissemination Platforms */}
                            <div className="mb-10">
                                <h3 className="mb-8 text-2xl font-bold text-black dark:text-white text-center">
                                    Knowledge Dissemination Platforms
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Globe size={28} />
                                        </div>
                                        <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                                            Conferences & Symposia
                                        </h4>
                                        <p className="text-sm text-body-color leading-relaxed">
                                            Annual research conferences hosted by the college provide a platform for faculty, postgraduate students, and invited researchers to present their latest discoveries. Participation in international scientific conferences enhances research visibility and fosters global partnerships.
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <TrendingUp size={28} />
                                        </div>
                                        <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                                            Peer-Reviewed Journals
                                        </h4>
                                        <p className="text-sm text-body-color leading-relaxed">
                                            Faculty members and researchers actively publish in internationally recognized peer-reviewed journals across various disciplines including space physics, environmental science, biotechnology, chemistry, mathematics, and applied sciences.
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Lightbulb size={28} />
                                        </div>
                                        <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                                            Workshops & Training
                                        </h4>
                                        <p className="text-sm text-body-color leading-relaxed">
                                            The college actively organizes workshops and training sessions to facilitate knowledge exchange and interdisciplinary collaboration, bringing together researchers, students, and industry professionals.
                                        </p>
                                    </div>

                                    <div className="rounded-sm bg-white p-8 shadow-three dark:bg-gray-dark hover:shadow-one transition-all duration-300 group">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Megaphone size={28} />
                                        </div>
                                        <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
                                            Science Communication
                                        </h4>
                                        <p className="text-sm text-body-color leading-relaxed">
                                            Science communication initiatives including public lectures, media engagements, and popular science articles help bridge the gap between academic research and the general public, making science accessible to all.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Practical Applications */}
                            <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:px-8 xl:p-[55px] hover:shadow-one transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary">
                                        <Users size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                        Community Engagement & Impact
                                    </h3>
                                </div>

                                <div className="space-y-6 text-base leading-relaxed text-body-color">
                                    <p>
                                        The college emphasizes the practical application of research findings through <strong>policy briefs, technical reports, and community engagement activities</strong>. Researchers collaborate with policymakers, industries, and local communities to ensure that scientific advancements contribute to sustainable development and societal well-being.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                        <div className="bg-gray-50 dark:bg-dark p-6 rounded-md border-l-4 border-primary">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Award className="text-primary" size={20} />
                                                <span className="font-bold text-black dark:text-white">Policy Impact</span>
                                            </div>
                                            <p className="text-sm text-body-color">
                                                Collaboration with policymakers to inform evidence-based decisions
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-dark p-6 rounded-md border-l-4 border-primary">
                                            <div className="flex items-center gap-3 mb-2">
                                                <TrendingUp className="text-primary" size={20} />
                                                <span className="font-bold text-black dark:text-white">Industry Partnership</span>
                                            </div>
                                            <p className="text-sm text-body-color">
                                                Working with industries to develop practical solutions
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-dark p-6 rounded-md border-l-4 border-primary">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Users className="text-primary" size={20} />
                                                <span className="font-bold text-black dark:text-white">Local Communities</span>
                                            </div>
                                            <p className="text-sm text-body-color">
                                                Engaging communities for sustainable development
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Closing Statement */}
                            <div className="rounded-sm bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 px-8 py-8 border-l-4 border-primary">
                                <p className="text-lg font-medium text-black dark:text-white leading-relaxed">
                                    By fostering a strong research culture and prioritizing knowledge dissemination through platforms like the Ethiopian Journal of Science and Technology, the College of Science at Bahir Dar University continues to play a pivotal role in advancing scientific inquiry, addressing real-world challenges, and enhancing the impact of research at local, national, and international levels.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PublicationPage;
