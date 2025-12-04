"use client";

interface ResearchTeam {
    id: string;
    name: string;
    description: string | null;
    teamLeader: string | null;
    members: string[];
    researchArea: string | null;
}

interface ResearchTeamsProps {
    teams: ResearchTeam[];
}

export default function ResearchTeams({ teams }: ResearchTeamsProps) {
    if (!teams || teams.length === 0) return null;

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-dark">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Research Teams
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-green-600"></div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="group rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-gray-dark dark:to-gray-dark p-8 shadow-three dark:shadow-none border-2 border-green-200 dark:border-green-800/30 hover:shadow-one transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-black dark:text-white">
                                        {team.name}
                                    </h3>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {team.researchArea && (
                                    <div className="mb-4">
                                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                            {team.researchArea}
                                        </span>
                                    </div>
                                )}

                                {team.description && (
                                    <p className="mb-4 text-base text-body-color">
                                        {team.description}
                                    </p>
                                )}

                                {team.teamLeader && (
                                    <div className="mb-3">
                                        <span className="text-sm font-semibold text-black dark:text-white">
                                            Team Leader:
                                        </span>{' '}
                                        <span className="text-sm text-body-color">
                                            {team.teamLeader}
                                        </span>
                                    </div>
                                )}

                                {team.members && team.members.length > 0 && (
                                    <div>
                                        <span className="text-sm font-semibold text-black dark:text-white">
                                            Members:
                                        </span>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {team.members.map((member, index) => (
                                                <span
                                                    key={index}
                                                    className="rounded-full bg-white px-3 py-1 text-xs text-body-color dark:bg-dark dark:text-white"
                                                >
                                                    {member}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
