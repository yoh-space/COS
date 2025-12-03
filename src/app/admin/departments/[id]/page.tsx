'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';
import GeneralTab from '@/components/Admin/Departments/GeneralTab';
import ContentTab from '@/components/Admin/Departments/ContentTab';
import ResearchTeamsTab from '@/components/Admin/Departments/ResearchTeamsTab';
import PublicationsTab from '@/components/Admin/Departments/PublicationsTab';
import EventsTab from '@/components/Admin/Departments/EventsTab';
import ResourcesTab from '@/components/Admin/Departments/ResourcesTab';

const TABS = [
    { id: 'general', label: 'General Info' },
    { id: 'content', label: 'Page Content' },
    { id: 'research', label: 'Research Teams' },
    { id: 'publications', label: 'Publications' },
    { id: 'events', label: 'Events' },
    { id: 'resources', label: 'Resources' },
];

export default function EditDepartmentPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(true);
    const [department, setDepartment] = useState({
        id: '',
        name: '',
        slug: '',
        description: '',
    });

    const fetchDepartment = useCallback(async () => {
        try {
            const response = await fetch(`/api/departments?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setDepartment({
                    id: data.id,
                    name: data.name || '',
                    slug: data.slug || '',
                    description: data.description || '',
                });
            } else {
                router.push('/admin/departments');
            }
        } catch (error) {
            console.error('Error fetching department:', error);
        } finally {
            setLoading(false);
        }
    }, [id, router]);

    useEffect(() => {
        if (id) {
            fetchDepartment();
        }
    }, [id, fetchDepartment]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-body-color">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <AdminBreadcrumb
                items={[
                    { label: "Departments", href: "/admin/departments" },
                    { label: department.name || "Edit Department" }
                ]}
                className="mb-4"
            />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    {department.name}
                </h1>
                <p className="mt-2 text-body-color">
                    Manage department information and content
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-8 flex flex-wrap border-b border-stroke dark:border-dark-3">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`border-b-2 px-6 py-3 text-base font-medium transition-colors hover:text-primary ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-body-color'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'general' && (
                    <GeneralTab
                        department={department}
                        onUpdate={fetchDepartment}
                    />
                )}
                {activeTab === 'content' && (
                    <ContentTab departmentId={id} />
                )}
                {activeTab === 'research' && (
                    <ResearchTeamsTab departmentId={id} />
                )}
                {activeTab === 'publications' && (
                    <PublicationsTab departmentId={id} />
                )}
                {activeTab === 'events' && (
                    <EventsTab departmentId={id} />
                )}
                {activeTab === 'resources' && (
                    <ResourcesTab departmentId={id} />
                )}
            </div>
        </div>
    );
}
