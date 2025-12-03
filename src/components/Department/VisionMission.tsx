"use client";

interface VisionMissionProps {
    vision?: string;
    mission?: string;
}

export default function VisionMission({ vision, mission }: VisionMissionProps) {
    if (!vision && !mission) return null;

    return (
        <section className="py-16 md:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Vision & Mission
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {vision && (
                            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-primary/10 dark:to-primary/20">
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-300 group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                                        <svg
                                            className="h-8 w-8 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                                        Vision
                                    </h3>
                                    <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                                        {vision}
                                    </p>
                                </div>
                            </div>
                        )}

                        {mission && (
                            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-primary/10 dark:to-primary/20">
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-300 group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                                        <svg
                                            className="h-8 w-8 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                                        Mission
                                    </h3>
                                    <div className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                                        {mission.split('\n').map((line, index) => {
                                            const trimmedLine = line.trim();
                                            if (trimmedLine.startsWith('✓') || trimmedLine.startsWith('•')) {
                                                return (
                                                    <div key={index} className="mb-3 flex items-start">
                                                        <span className="mr-2 mt-1 text-primary">✓</span>
                                                        <span>{trimmedLine.replace(/^[✓•]\s*/, '')}</span>
                                                    </div>
                                                );
                                            }
                                            return trimmedLine ? <p key={index} className="mb-3">{trimmedLine}</p> : null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
