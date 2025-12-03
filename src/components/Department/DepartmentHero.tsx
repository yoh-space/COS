"use client";

interface DepartmentHeroProps {
    name: string;
    description?: string | null;
}

export default function DepartmentHero({ name, description }: DepartmentHeroProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-primary/20 dark:via-gray-dark dark:to-primary/10 pt-[120px] pb-[80px]">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
            </div>

            <div className="container relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-6 text-4xl font-bold leading-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
                        Department of {name}
                    </h1>
                    {description && (
                        <p className="mx-auto max-w-3xl text-lg text-body-color dark:text-body-color-dark sm:text-xl">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    className="w-full text-gray-50 dark:text-gray-900"
                    viewBox="0 0 1440 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 48h1440V0c-240 48-480 48-720 0S240 0 0 0v48z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </section>
    );
}
