'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminBreadcrumb from '@/components/Admin/Breadcrumb';

export default function EditDepartmentPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [department, setDepartment] = useState({
        name: '',
        slug: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            fetchDepartment();
        }
    }, [id]);

    const fetchDepartment = async () => {
        try {
            const response = await fetch(`/api/departments?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setDepartment({
                    name: data.name || '',
                    slug: data.slug || '',
                    description: data.description || '',
                });
            }
        } catch (error) {
            console.error('Error fetching department:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('/api/departments', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...department }),
            });

            if (response.ok) {
                alert('Department updated successfully!');
                router.push('/admin/departments');
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to update'}`);
            }
        } catch (error) {
            console.error('Error saving department:', error);
            alert('Failed to save department');
        } finally {
            setSaving(false);
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

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
                    { label: "Edit Department" }
                ]}
                className="mb-4"
            />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Edit Department
                </h1>
                <p className="mt-2 text-body-color">
                    Update department information
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="rounded-sm bg-white px-8 py-8 shadow-three dark:bg-gray-dark">
                    {/* Name */}
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Department Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={department.name}
                            onChange={(e) => {
                                const newName = e.target.value;
                                setDepartment({
                                    ...department,
                                    name: newName,
                                    slug: generateSlug(newName)
                                });
                            }}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                            placeholder="e.g., Chemistry"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div className="mb-6">
                        <label
                            htmlFor="slug"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            URL Slug *
                        </label>
                        <input
                            type="text"
                            id="slug"
                            value={department.slug}
                            onChange={(e) => setDepartment({ ...department, slug: e.target.value })}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                            placeholder="e.g., chemistry"
                            required
                        />
                        <p className="mt-2 text-sm text-body-color">
                            This will be used in the URL: /academics/{department.slug}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={department.description}
                            onChange={(e) => setDepartment({ ...department, description: e.target.value })}
                            rows={6}
                            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                            placeholder="Enter department description..."
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/admin/departments')}
                            className="inline-flex items-center justify-center rounded-md border border-stroke px-8 py-3 text-base font-medium text-body-color hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-3"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
