import { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
    title: "Academic Structure | Bahir Dar University College of Science",
    description: "Learn about the Academic Council structure, membership, and responsibilities at Bahir Dar University College of Science",
};

const StructurePage = () => {
    const members = [
        { position: "The Dean", role: "Chairperson" },
        { position: "The Vice Dean", role: "Secretary" },
        { position: "Program Manager", role: "Member" },
        { position: "Coordinator of Customer Relations and Information Production Case Team", role: "Member" },
        { position: "Coordinator of Graduate Program, Research and Community Service", role: "Member" },
        { position: "All the department heads in the college", role: "Member" },
        { position: "One representative of the college staff", role: "Member" },
        { position: "One representative of students", role: "Member" },
    ];

    const responsibilities = [
        "Approve budget plan of the college.",
        "Allocate budget for course chairs in the college based on the standard formula.",
        "Approve strategic plan of the college.",
        "Conduct scheduled meetings and extraordinary meeting(s) if requested by one-third of the members of the college's council.",
        "Follow up issues that transcend the mandate of the Course Teams, Research Centers and Units representations.",
        "Ensure the quality of teaching-learning, research and community services based on established standards.",
        "Review the plans and reports of course teams, Research Centers and Units and Support offices.",
        "Review the plans of the college on the initiation/termination of new research units, programs, centers, institutes as per the established relevant regulations and practices.",
        "Based on the criteria set by the Senate and in accordance with the provisions of this Legislation shall prepare list of reputable professional journals and update such list annually.",
        "Decide on academic promotions up to the rank of lecturer and recommend applications to higher ranks to the Office of the Academic Affairs Vice President.",
    ];

    return (
        <>
            <Breadcrumb
                pageName="Academic Structure"
                description="Explore the Academic Council structure and governance of Bahir Dar University College of Science"
            />

            <section className="pb-16 pt-16 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24">
                <div className="container">
                    {/* Introduction */}
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Academic Council Structure
                        </h2>
                        <p className="text-base text-body-color dark:text-body-color-dark sm:text-lg">
                            The Academic Council serves as the primary governing body of the College of Science, ensuring excellence in education, research, and community service.
                        </p>
                    </div>

                    {/* Structure Image */}
                    <div className="mb-16">
                        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl shadow-lg">
                            <Image
                                src="/images/about/administration-structure.jpg"
                                alt="College Administration Structure"
                                width={1200}
                                height={800}
                                className="h-auto w-full object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Membership Section */}
                    <div className="mb-16">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-10 text-center">
                                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                    Membership
                                </h3>
                                <p className="text-base text-body-color dark:text-body-color-dark">
                                    The Academic Council of the college shall have the following members:
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                                {members.map((member, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-lg border border-stroke bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:border-strokedark dark:bg-gray-dark"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                        {index + 1}
                                                    </span>
                                                    <span className="inline-block rounded bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                        {member.role}
                                                    </span>
                                                </div>
                                                <h4 className="text-base font-semibold text-black dark:text-white">
                                                    {member.position}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Powers and Responsibilities Section */}
                    <div>
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-10 text-center">
                                <h3 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                                    Powers and Responsibilities
                                </h3>
                                <p className="text-base text-body-color dark:text-body-color-dark">
                                    The Academic Council of the college shall have the following powers and responsibilities:
                                </p>
                            </div>

                            <div className="space-y-4">
                                {responsibilities.map((responsibility, index) => (
                                    <div
                                        key={index}
                                        className="group flex gap-4 rounded-lg border border-stroke bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-strokedark dark:bg-gray-dark"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-500 text-white shadow-md">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                                                {responsibility}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16">
                        <div className="mx-auto max-w-3xl rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center dark:from-blue-900/20 dark:to-indigo-900/20">
                            <h4 className="mb-4 text-xl font-bold text-black dark:text-white">
                                Commitment to Excellence
                            </h4>
                            <p className="text-base text-body-color dark:text-body-color-dark">
                                The Academic Council ensures the College of Science maintains the highest standards in teaching, research, and community engagement, working collaboratively to advance our institution's mission and vision.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StructurePage;
