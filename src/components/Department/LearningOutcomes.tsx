"use client";

import { useState } from "react";

interface LearningOutcomesProps {
    undergraduateOutcomes?: string;
    postgraduateObjectives?: string;
    postgraduateOutcomes?: string;
}

export default function LearningOutcomes({
    undergraduateOutcomes,
    postgraduateObjectives,
    postgraduateOutcomes,
}: LearningOutcomesProps) {
    const [activeLevel, setActiveLevel] = useState<'undergraduate' | 'postgraduate'>('undergraduate');

    if (!undergraduateOutcomes && !postgraduateObjectives && !postgraduateOutcomes) return null;

    const parseOutcomes = (content: string) => {
        return content.split('\n').filter(line => line.trim()).map(line => {
            // Remove common prefixes like PLO1:, ➢, •, etc.
            return line.trim().replace(/^(PLO\d+:|➢|•|-)\s*/, '');
        });
    };

    return (
        <section className="py-16 md:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Learning Outcomes
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
                    </div>

                    {/* Level Tabs */}
                    <div className="mb-8 flex justify-center gap-4">
                        {undergraduateOutcomes && (
                            <button
                                onClick={() => setActiveLevel('undergraduate')}
                                className={`rounded-full px-8 py-3 font-semibold transition-all duration-300 ${activeLevel === 'undergraduate'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-800 dark:text-body-color-dark dark:hover:bg-gray-700'
                                    }`}
                            >
                                Undergraduate
                            </button>
                        )}
                        {(postgraduateObjectives || postgraduateOutcomes) && (
                            <button
                                onClick={() => setActiveLevel('postgraduate')}
                                className={`rounded-full px-8 py-3 font-semibold transition-all duration-300 ${activeLevel === 'postgraduate'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-800 dark:text-body-color-dark dark:hover:bg-gray-700'
                                    }`}
                            >
                                Postgraduate
                            </button>
                        )}
                    </div>

                    {/* Content */}
                    {activeLevel === 'undergraduate' && undergraduateOutcomes && (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {parseOutcomes(undergraduateOutcomes).map((outcome, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-dark"
                                >
                                    <div className="absolute right-4 top-4 text-6xl font-bold text-primary/5">
                                        {index + 1}
                                    </div>
                                    <div className="relative">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                                            {index + 1}
                                        </div>
                                        <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                                            {outcome}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeLevel === 'postgraduate' && (
                        <div className="space-y-8">
                            {postgraduateObjectives && (
                                <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-dark">
                                    <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                                        Objectives
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {parseOutcomes(postgraduateObjectives).map((objective, index) => (
                                            <div key={index} className="flex items-start">
                                                <span className="mr-3 mt-1 text-primary">✓</span>
                                                <p className="text-base text-body-color dark:text-body-color-dark">
                                                    {objective}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {postgraduateOutcomes && (
                                <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-dark">
                                    <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                                        Learning Outcomes
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {parseOutcomes(postgraduateOutcomes).map((outcome, index) => (
                                            <div key={index} className="flex items-start">
                                                <span className="mr-3 mt-1 text-primary">✓</span>
                                                <p className="text-base text-body-color dark:text-body-color-dark">
                                                    {outcome}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
