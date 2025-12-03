"use client";

interface StaffMember {
    id: string;
    name: string;
    title: string;
    specialization: string;
    email: string;
    profileImage: string | null;
}

interface FacultyMembersProps {
    staffMembers: StaffMember[];
}

export default function FacultyMembers({ staffMembers }: FacultyMembersProps) {
    if (!staffMembers || staffMembers.length === 0) return null;

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-dark">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Faculty Members
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {staffMembers.map((staff) => (
                            <div
                                key={staff.id}
                                className="group overflow-hidden rounded-xl bg-gray-50 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                                    {staff.profileImage ? (
                                        <img
                                            src={staff.profileImage}
                                            alt={staff.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <svg
                                                className="h-24 w-24 text-primary/30"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <h3 className="mb-1 text-lg font-bold text-black dark:text-white">
                                        {staff.name}
                                    </h3>
                                    <p className="mb-2 text-sm font-semibold text-primary">
                                        {staff.title}
                                    </p>
                                    <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">
                                        {staff.specialization}
                                    </p>
                                    <a
                                        href={`mailto:${staff.email}`}
                                        className="inline-flex items-center text-xs text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                    >
                                        <svg
                                            className="mr-1 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {staff.email}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
