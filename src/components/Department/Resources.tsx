"use client";

import { useState, useMemo } from "react";

interface Resource {
    id: string;
    title: string;
    resourceType: string;
    description: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
}

interface ResourcesProps {
    resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
    const [selectedType, setSelectedType] = useState<string | 'all'>('all');

    // Get unique resource types
    const resourceTypes = useMemo(() => {
        if (!resources || resources.length === 0) return [];
        const uniqueTypes = [...new Set(resources.map(r => r.resourceType))];
        return uniqueTypes;
    }, [resources]);

    // Filter resources
    const filteredResources = useMemo(() => {
        if (!resources || resources.length === 0) return [];
        if (selectedType === 'all') return resources;
        return resources.filter(resource => resource.resourceType === selectedType);
    }, [resources, selectedType]);

    if (!resources || resources.length === 0) return null;

    const getResourceTypeLabel = (type: string) => {
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <section className="py-16 md:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
                            Resources & Facilities
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
                    </div>

                    {/* Resource Type Filters */}
                    <div className="mb-8 flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedType('all')}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${selectedType === 'all'
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-800 dark:text-body-color-dark'
                                }`}
                        >
                            All Resources
                        </button>
                        {resourceTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${selectedType === type
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-800 dark:text-body-color-dark'
                                    }`}
                            >
                                {getResourceTypeLabel(type)}
                            </button>
                        ))}
                    </div>

                    {/* Resources Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredResources.map((resource) => (
                            <div
                                key={resource.id}
                                className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-dark"
                            >
                                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    {resource.thumbnailUrl || resource.fileUrl ? (
                                        <img
                                            src={resource.thumbnailUrl || resource.fileUrl}
                                            alt={resource.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <svg
                                                className="h-16 w-16 text-gray-300 dark:text-gray-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm dark:bg-gray-dark/90">
                                            {getResourceTypeLabel(resource.resourceType)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                                        {resource.title}
                                    </h3>
                                    {resource.description && (
                                        <p className="mb-4 text-sm text-body-color dark:text-body-color-dark line-clamp-2">
                                            {resource.description}
                                        </p>
                                    )}
                                    <a
                                        href={resource.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                                    >
                                        View Resource
                                        <svg
                                            className="ml-1 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredResources.length === 0 && (
                        <div className="rounded-xl bg-white p-12 text-center shadow-lg dark:bg-gray-dark">
                            <p className="text-body-color dark:text-body-color-dark">
                                No resources found for the selected type.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
