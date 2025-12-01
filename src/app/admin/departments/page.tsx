'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Department {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    _count: {
        staffMembers: number;
        academicSections: number;
    };
}

export default function DepartmentsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await fetch('/api/departments');
            if (response.ok) {
                const data = await response.json();
                setDepartments(data);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/departments?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Department deleted successfully!');
                fetchDepartments();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to delete'}`);
            }
        } catch (error) {
            console.error('Error deleting department:', error);
            alert('Failed to delete department');
        }
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
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">
                        Departments
                    </h1>
                    <p className="mt-2 text-body-color">
                        Manage all academic departments
                    </p>
                </div>
                <Link
                    href="/admin/departments/new"
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700"
                >
                    Add New Department
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {departments.map((dept) => (
                    <div
                        key={dept.id}
                        className="rounded-sm bg-white px-6 py-6 shadow-three dark:bg-gray-dark hover:shadow-one transition-shadow"
                    >
                        <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                            {dept.name}
                        </h3>
                        <p className="mb-4 text-sm text-body-color line-clamp-2">
                            {dept.description || 'No description'}
                        </p>

                        <div className="mb-4 flex gap-4 text-sm text-body-color">
                            <span>{dept._count.staffMembers} Staff</span>
                            <span>{dept._count.academicSections} Programs</span>
                        </div>

                        <div className="flex gap-2">
                            <Link
                                href={`/admin/departments/${dept.id}`}
                                className="flex-1 inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(dept.id, dept.name)}
                                className="flex-1 inline-flex items-center justify-center rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {departments.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-body-color">No departments found.</p>
                </div>
            )}
        </div>
    );
}
