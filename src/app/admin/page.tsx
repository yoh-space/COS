'use client';

import Link from 'next/link';
import {
    BookOpen,
    Users,
    FileText,
    GraduationCap,
    MessageSquare,
    Target,
    Building2,
    UserCog,
    Shield,
} from 'lucide-react';

export default function AdminDashboard() {
    const sections = [
        {
            title: 'Content Management',
            items: [
                {
                    name: 'Dean&apos;s Message',
                    href: '/admin/dean-message',
                    icon: MessageSquare,
                    description: 'Edit the message from the Dean',
                },
                {
                    name: 'Vision & Mission',
                    href: '/admin/vision-mission',
                    icon: Target,
                    description: 'Update vision and mission statements',
                },
                {
                    name: 'Blog Posts',
                    href: '/admin/blog',
                    icon: FileText,
                    description: 'Manage blog posts and news',
                },
            ],
        },
        {
            title: 'Academic Management',
            items: [
                {
                    name: 'Departments',
                    href: '/admin/departments',
                    icon: GraduationCap,
                    description: 'Manage academic departments',
                },
                {
                    name: 'Staff Members',
                    href: '/admin/staff',
                    icon: Users,
                    description: 'Manage faculty and staff',
                },
                {
                    name: 'Administrators',
                    href: '/admin/administrators',
                    icon: Shield,
                    description: 'Manage college administrators',
                },
            ],
        },
        {
            title: 'System Management',
            items: [
                {
                    name: 'Users & Roles',
                    href: '/admin/users',
                    icon: UserCog,
                    description: 'Manage user accounts and permissions',
                },
            ],
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Admin Dashboard
                </h1>
                <p className="mt-2 text-body-color">
                    Manage all content for the College of Science website
                </p>
            </div>

            <div className="space-y-8">
                {sections.map((section) => (
                    <div key={section.title}>
                        <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
                            {section.title}
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group rounded-sm bg-white px-6 py-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-all"
                                    >
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-chart-1 group-hover:bg-primary group-hover:text-white transition-all">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-body-color">
                                            {item.description}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
