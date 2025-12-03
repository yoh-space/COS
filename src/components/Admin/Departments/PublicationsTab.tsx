"use client";

import { useState, useEffect, useCallback } from 'react';

interface Publication {
    id: string;
    title: string;
    authors: string[];
    year: number;
    publicationType: string;
    venue: string;
    doi: string;
    url: string;
    abstract: string;
    status: string;
}

interface PublicationsTabProps {
    departmentId: string;
}

const PUB_TYPES = [
    { value: 'journal', label: 'Journal Article' },
    { value: 'conference', label: 'Conference Paper' },
    { value: 'book', label: 'Book' },
    { value: 'book_chapter', label: 'Book Chapter' },
    { value: 'thesis', label: 'Thesis' },
    { value: 'other', label: 'Other' },
];

export default function PublicationsTab({ departmentId }: PublicationsTabProps) {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPub, setEditingPub] = useState<Publication | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        authors: '',
        year: new Date().getFullYear(),
        publicationType: 'journal',
        venue: '',
        doi: '',
        url: '',
        abstract: '',
        status: 'published'
    });

    const fetchPublications = useCallback(async () => {
        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/publications`);
            if (response.ok) {
                const data = await response.json();
                setPublications(data.publications);
            }
        } catch (error) {
            console.error('Error fetching publications:', error);
        } finally {
            setLoading(false);
        }
    }, [departmentId]);

    useEffect(() => {
        fetchPublications();
    }, [fetchPublications]);

    const handleEdit = (pub: Publication) => {
        setEditingPub(pub);
        setFormData({
            title: pub.title,
            authors: pub.authors.join(', '),
            year: pub.year,
            publicationType: pub.publicationType,
            venue: pub.venue || '',
            doi: pub.doi || '',
            url: pub.url || '',
            abstract: pub.abstract || '',
            status: pub.status
        });
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingPub(null);
        setFormData({
            title: '',
            authors: '',
            year: new Date().getFullYear(),
            publicationType: 'journal',
            venue: '',
            doi: '',
            url: '',
            abstract: '',
            status: 'published'
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = `/api/admin/departments/${departmentId}/publications`;

            const authorsArray = formData.authors.split(',').map(a => a.trim()).filter(a => a);

            const body = {
                ...formData,
                authors: authorsArray,
                year: parseInt(formData.year.toString()),
                id: editingPub?.id
            };

            const response = await fetch(url, {
                method: editingPub ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingPub ? 'Publication updated!' : 'Publication created!');
                setIsFormOpen(false);
                fetchPublications();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Operation failed'}`);
            }
        } catch (error) {
            console.error('Error saving publication:', error);
            alert('Failed to save publication');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this publication?')) return;

        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/publications?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Publication deleted!');
                fetchPublications();
            } else {
                alert('Failed to delete publication');
            }
        } catch (error) {
            console.error('Error deleting publication:', error);
        }
    };

    if (loading) return <div>Loading publications...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black dark:text-white">Publications</h3>
                <button
                    onClick={handleAddNew}
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                    Add New Publication
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-dark max-h-[90vh] overflow-y-auto">
                        <h4 className="mb-4 text-lg font-bold text-black dark:text-white">
                            {editingPub ? 'Edit Publication' : 'New Publication'}
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                        Type
                                    </label>
                                    <select
                                        value={formData.publicationType}
                                        onChange={(e) => setFormData({ ...formData, publicationType: e.target.value })}
                                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    >
                                        {PUB_TYPES.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                        Year
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Authors (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.authors}
                                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    placeholder="Author 1, Author 2..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Venue / Journal
                                </label>
                                <input
                                    type="text"
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                        DOI
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.doi}
                                        onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                        URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Abstract
                                </label>
                                <textarea
                                    value={formData.abstract}
                                    onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                                    rows={4}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="rounded-md border border-stroke px-4 py-2 text-body-color hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {publications.map((pub) => (
                    <div
                        key={pub.id}
                        className="rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark"
                    >
                        <div className="mb-2 flex items-start justify-between">
                            <div>
                                <h5 className="text-lg font-bold text-black dark:text-white">{pub.title}</h5>
                                <div className="flex items-center gap-2 text-sm text-body-color">
                                    <span className="capitalize">{pub.publicationType}</span>
                                    <span>•</span>
                                    <span>{pub.year}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(pub)}
                                    className="text-primary hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(pub.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <p className="mb-2 text-sm text-body-color">
                            <span className="font-semibold">Authors:</span> {pub.authors.join(', ')}
                        </p>

                        {pub.venue && (
                            <p className="text-sm text-body-color italic">
                                {pub.venue}
                            </p>
                        )}
                    </div>
                ))}
                {publications.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-body-color">No publications found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
