"use client";

import { useState, useEffect } from "react";

interface Role {
  id: string;
  name: string;
  description: string | null;
}

interface Department {
  id: string;
  name: string;
}

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profileImage?: string;
  hasRoles: boolean;
  currentRoles: string[];
}

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAdminModal({ isOpen, onClose, onSuccess }: AddAdminModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const [usersRes, rolesRes, deptsRes] = await Promise.all([
        fetch('/api/cms/clerk-users'),
        fetch('/api/cms/roles'),
        fetch('/api/cms/departments'),
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users);
      }

      if (rolesRes.ok) {
        const rolesData = await rolesRes.json();
        setRoles(rolesData.roles);
      }

      if (deptsRes.ok) {
        const deptsData = await deptsRes.json();
        setDepartments(deptsData.departments);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoleIds.length === 0) {
      setError('Please select at least one role');
      return;
    }

    if (!selectedUserId) {
      setError('Please select a user');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedUser = users.find(u => u.id === selectedUserId);
      if (!selectedUser) {
        throw new Error('Selected user not found');
      }

      const response = await fetch('/api/cms/users/assign-by-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedUser.email,
          roleIds: selectedRoleIds,
          departmentId: selectedDepartmentId || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to assign roles');
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedUserId('');
    setSelectedRoleIds([]);
    setSelectedDepartmentId('');
    setError(null);
  };

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoleIds(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/5 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-none max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Assign Admin Roles
          </h2>

          <form onSubmit={handleSubmit}>
            {/* User Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Select User ({users.length} total users)
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Choose a user...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName} (${user.email})`
                      : user.email
                    } {user.hasRoles ? `- Current: ${user.currentRoles.join(', ')}` : '- No roles'}
                  </option>
                ))}
              </select>
              {selectedUserId && (
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  {users.find(u => u.id === selectedUserId)?.hasRoles 
                    ? 'This will replace existing roles' 
                    : 'This user currently has no roles'
                  }
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Assign Roles
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {roles.map((role) => (
                  <label
                    key={role.id}
                    className="flex items-start p-3 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoleIds.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {role.name}
                      </span>
                      {role.description && (
                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                          {role.description}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Department Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Department (Optional)
              </label>
              <select
                value={selectedDepartmentId}
                onChange={(e) => setSelectedDepartmentId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">No Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || selectedRoleIds.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Assigning...' : 'Assign Roles'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
