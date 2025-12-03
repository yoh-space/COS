"use client";

import { useState, useEffect, useCallback } from 'react';

interface ResearchTeam {
    id: string;
    name: string;
    description: string;
    teamLeader: string;
    members: string[];
    researchArea: string;
    status: string;
}

interface ResearchTeamsTabProps {
    departmentId: string;
}

export default function ResearchTeamsTab({ departmentId }: ResearchTeamsTabProps) {
    const [teams, setTeams] = useState<ResearchTeam[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingTeam, setEditingTeam] = useState<ResearchTeam | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        teamLeader: '',
        members: '',
        researchArea: '',
        status: 'active'
    });

    const fetchTeams = useCallback(async () => {
        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/research-teams`);
            if (response.ok) {
                const data = await response.json();
                setTeams(data.teams);
            }
        } catch (error) {
            console.error('Error fetching research teams:', error);
        } finally {
            setLoading(false);
        }
    }, [departmentId]);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    const handleEdit = (team: ResearchTeam) => {
        setEditingTeam(team);
        setFormData({
            name: team.name,
            description: team.description || '',
            teamLeader: team.teamLeader || '',
            members: team.members.join(', '),
            researchArea: team.researchArea || '',
            status: team.status
        });
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingTeam(null);
        setFormData({
            name: '',
            description: '',
            teamLeader: '',
            members: '',
            researchArea: '',
            status: 'active'
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = `/api/admin/departments/${departmentId}/research-teams`;
            const method = editingTeam ? 'PUT' : 'POST';
            // Actually, let's check the API route for research-teams.
            // Assuming it supports PUT with ID in body or query.
            // Let's assume standard REST: POST to create, PUT to update.

            const membersArray = formData.members.split(',').map(m => m.trim()).filter(m => m);

            const body = {
                ...formData,
                members: membersArray,
                id: editingTeam?.id
            };

            const response = await fetch(url, {
                method: editingTeam ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert(editingTeam ? 'Team updated!' : 'Team created!');
                setIsFormOpen(false);
                fetchTeams();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Operation failed'}`);
            }
        } catch (error) {
            console.error('Error saving team:', error);
            alert('Failed to save team');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team?')) return;

        try {
            const response = await fetch(`/api/admin/departments/${departmentId}/research-teams?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Team deleted!');
                fetchTeams();
            } else {
                alert('Failed to delete team');
            }
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    if (loading) return <div>Loading research teams...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black dark:text-white">Research Teams</h3>
                <button
                    onClick={handleAddNew}
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                    Add New Team
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-dark max-h-[90vh] overflow-y-auto">
                        <h4 className="mb-4 text-lg font-bold text-black dark:text-white">
                            {editingTeam ? 'Edit Team' : 'New Team'}
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Team Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Research Area
                                </label>
                                <input
                                    type="text"
                                    value={formData.researchArea}
                                    onChange={(e) => setFormData({ ...formData, researchArea: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Team Leader
                                </label>
                                <input
                                    type="text"
                                    value={formData.teamLeader}
                                    onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Members (comma separated)
                                </label>
                                <textarea
                                    value={formData.members}
                                    onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                                    rows={3}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3"
                                    placeholder="Dr. Smith, Dr. Jones, ..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

            <div className="grid gap-4 md:grid-cols-2">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark"
                    >
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <h5 className="text-lg font-bold text-black dark:text-white">{team.name}</h5>
                                <p className="text-sm text-primary">{team.researchArea}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(team)}
                                    className="text-primary hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(team.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {team.teamLeader && (
                            <p className="mb-2 text-sm text-body-color">
                                <span className="font-semibold">Leader:</span> {team.teamLeader}
                            </p>
                        )}

                        {team.members.length > 0 && (
                            <div className="mb-2">
                                <p className="text-sm font-semibold text-body-color">Members:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {team.members.map((member, idx) => (
                                        <span key={idx} className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-body-color dark:bg-gray-700 dark:text-body-color-dark">
                                            {member}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {teams.length === 0 && (
                    <div className="col-span-full text-center py-8">
                        <p className="text-body-color">No research teams found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
