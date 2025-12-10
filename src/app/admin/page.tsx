'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Users,
    FileText,
    GraduationCap,
    MessageSquare,
    Target,
    UserCog,
    Shield,
    BookOpen,
    Library,
    Award,
} from 'lucide-react';

interface UserRole {
    name: string;
    permissions: string[];
}

interface User {
    roles: UserRole[];
}

export default function AdminDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/test-auth');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const hasPermission = (permission: string): boolean => {
        if (!user || !user.roles) return false;
        return user.roles.some(role => {
            if (!role.permissions || !Array.isArray(role.permissions)) return false;
            return role.permissions.includes(permission) || role.permissions.includes('*');
        });
    };

    const allSections = [
        {
            title: 'Content Management',
            items: [
                {
                    name: 'College Dean Message',
                    href: '/admin/dean-message',
                    icon: MessageSquare,
                    description: 'Edit the message from the Dean',
                    permission: 'dean_message:update',
                },
                {
                    name: 'Vision & Mission',
                    href: '/admin/vision-mission',
                    icon: Target,
                    description: 'Update vision and mission statements',
                    permission: 'vision_mission:update',
                },
                {
                    name: 'Blog Posts',
                    href: '/admin/blog',
                    icon: FileText,
                    description: 'Manage blog posts and news',
                    permission: 'blog:read',
                },
            ],
        },
        {
            title: 'Academic Management',
            items: [
                {
                    name: 'Academic Programs',
                    href: '/admin/academic-programs',
                    icon: BookOpen,
                    description: 'Manage degree programs and courses',
                    permission: 'academic_program:read',
                },
                {
                    name: 'Resources',
                    href: '/admin/resources',
                    icon: Library,
                    description: 'Manage publications, research & reports',
                    permission: 'resource:read',
                },
                {
                    name: 'Success Stories',
                    href: '/admin/success-stories',
                    icon: Award,
                    description: 'Manage alumni success stories',
                    permission: 'success_story:read',
                },
            ],
        },
        {
            title: 'Staff Management',
            items: [
                {
                    name: 'Departments',
                    href: '/admin/departments',
                    icon: GraduationCap,
                    description: 'Manage academic departments',
                    permission: 'department:read',
                },
                {
                    name: 'Staff Members',
                    href: '/admin/staff',
                    icon: Users,
                    description: 'Manage faculty and staff',
                    permission: 'staff:read',
                },
                {
                    name: 'Administrators',
                    href: '/admin/administrators',
                    icon: Shield,
                    description: 'Manage college administrators',
                    permission: 'admin_position:read',
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
                    permission: 'user:read',
                },
            ],
        },
    ];

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    // Filter sections based on user permissions
    const filteredSections = allSections
        .map(section => ({
            ...section,
            items: section.items.filter(item => hasPermission(item.permission))
        }))
        .filter(section => section.items.length > 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Admin Dashboard
                </h1>
                <p className="mt-2 text-body-color">
                    Manage content based on your assigned permissions
                </p>
            </div>

            {filteredSections.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                        No management sections available. Contact an administrator to assign you appropriate roles.
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {filteredSections.map((section) => (
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
                                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all">
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
            )}
        </div>
    );
}
