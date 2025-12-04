"use client";

import { useState } from "react";

interface ObjectivesProps {
    generalObjectives?: string;
    specificObjectives?: string;
    professionalProfile?: string;
}

export default function Objectives({
    generalObjectives,
    specificObjectives,
    professionalProfile,
}: ObjectivesProps) {
    const [activeTab, setActiveTab] = useState<'general' | 'specific' | 'profile'>('general');

    if (!generalObjectives && !specificObjectives && !professionalProfile) return null;

    const parseObjectives = (content: string) => {
        return content.split('\n').filter(line => line.trim()).map(line => {
            // Remove common prefixes like PEO1:, ➢, •, etc.
            return line.trim().replace(/^(PEO\d+:|➢|•|-)\s*/, '');
        });
    };

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-dark">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Program Objectives
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-8 flex flex-wrap justify-center gap-4">
                        {generalObjectives && (
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${activeTab === 'general'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                    }`}
                            >
                                General Objectives
                            </button>
                        )}
                        {specificObjectives && (
                            <button
                                onClick={() => setActiveTab('specific')}
                                className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${activeTab === 'specific'
                                    ? 'bg-green-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                    }`}
                            >
                                Specific Objectives
                            </button>
                        )}
                        {professionalProfile && (
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${activeTab === 'profile'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-dark dark:text-white dark:hover:bg-gray-700'
                                    }`}
                            >
                                Professional Profile
                            </button>
                        )}
                    </div>

                    {/* Content */}
                    <div className="rounded-xl bg-gray-50 p-8 shadow-lg dark:bg-dark sm:p-12">
                        {activeTab === 'general' && generalObjectives && (
                            <div className="grid gap-4 md:grid-cols-2">
                                {parseObjectives(generalObjectives).map((objective, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-dark"
                                    >
                                        <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                            {index + 1}
                                        </div>
                                        <p className="text-base text-body-color">
                                            {objective}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'specific' && specificObjectives && (
                            <div className="grid gap-4 md:grid-cols-2">
                                {parseObjectives(specificObjectives).map((objective, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-dark"
                                    >
                                        <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                            {index + 1}
                                        </div>
                                        <p className="text-base text-body-color">
                                            {objective}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'profile' && professionalProfile && (
                            <div className="prose prose-lg max-w-none dark:prose-invert">
                                <p className="text-base leading-relaxed text-body-color">
                                    {professionalProfile}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
