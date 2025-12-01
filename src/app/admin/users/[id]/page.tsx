"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import AdminBreadcrumb from "@/components/Admin/Breadcrumb";

interface Role {
  id: string;
  name: string;
  description: string | null;
  permissions: string[];
  userCount: number;
}

interface Department {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  staffCount: number;
  userCount: number;
}

interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  department: Department | null;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const { isLoaded, userId: currentUserId } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !currentUserId) {
      router.push("/sign-in");
    }
  }, [isLoaded, currentUserId, router]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user, roles, and departments in parallel
      const [userResponse, rolesResponse, departmentsResponse] =
        await Promise.all([
          fetch(`/api/cms/users?search=${userId}`),
          fetch("/api/cms/roles"),
          fetch("/api/cms/departments"),
        ]);

      if (!userResponse.ok || !rolesResponse.ok || !departmentsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const userData = await userResponse.json();
      const rolesData = await rolesResponse.json();
      const departmentsData = await departmentsResponse.json();

      // Find the specific user
      const foundUser = userData.users.find((u: User) => u.id === userId);
      if (!foundUser) {
        throw new Error("User not found");
      }

      setUser(foundUser);
      setAllRoles(rolesData.roles);
      setAllDepartments(departmentsData.departments);
      setSelectedRoleIds(foundUser.roles.map((r: Role) => r.id));
      setSelectedDepartmentId(foundUser.department?.id || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isLoaded && currentUserId) {
      fetchData();
    }
  }, [isLoaded, currentUserId, fetchData]);

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoleIds((prev) => {
      if (prev.includes(roleId)) {
        return prev.filter((id) => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartmentId(e.target.value);
  };

  const handleSave = async () => {
    if (selectedRoleIds.length === 0) {
      setError("Please select at least one role");
      return;
    }

    // Check if Department_Lead role is selected
    const departmentLeadRole = allRoles.find(
      (r) => r.name === "Department_Lead"
    );
    const isDepartmentLead =
      departmentLeadRole && selectedRoleIds.includes(departmentLeadRole.id);

    if (isDepartmentLead && !selectedDepartmentId) {
      setError("Department Lead role requires a department assignment");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`/api/cms/users/${userId}/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roleIds: selectedRoleIds,
          departmentId: selectedDepartmentId || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user roles");
      }

      await response.json();
      setSuccess("User roles updated successfully");

      // Refresh user data
      await fetchData();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error updating user roles:", err);
    } finally {
      setSaving(false);
    }
  };

  const getUserDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) return user.firstName;
    if (user.lastName) return user.lastName;
    return user.email;
  };

  const isDepartmentLeadSelected = () => {
    const departmentLeadRole = allRoles.find(
      (r) => r.name === "Department_Lead"
    );
    return (
      departmentLeadRole && selectedRoleIds.includes(departmentLeadRole.id)
    );
  };

  if (!isLoaded || !currentUserId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AdminBreadcrumb
        items={[
          { label: "Users & Roles", href: "/admin/users" },
          { label: "Manage User" }
        ]}
        className="mb-4"
      />

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push("/admin/users")}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mb-4 inline-flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Users
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Manage User Roles
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Assign roles and department to {getUserDisplayName(user)}
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <p className="text-green-800 dark:text-green-200">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* User Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          User Information
        </h2>
        <div className="flex items-center space-x-4">
          {user.profileImage ? (
            // TODO: Verify and update the aspect ratio for this image
            <Image
              src={user.profileImage}
              alt={getUserDisplayName(user)}
              width={96}
              height={96}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-2xl font-medium">
                {getUserDisplayName(user).charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {getUserDisplayName(user)}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Role Assignment */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Assign Roles
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Select one or more roles for this user. Each role grants specific
          permissions.
        </p>
        <div className="space-y-3">
          {allRoles.map((role) => (
            <label
              key={role.id}
              className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedRoleIds.includes(role.id)}
                onChange={() => handleRoleToggle(role.id)}
                className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {role.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {role.userCount} {role.userCount === 1 ? "user" : "users"}
                  </span>
                </div>
                {role.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {role.description}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {role.permissions.slice(0, 5).map((permission, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {permission}
                    </span>
                  ))}
                  {role.permissions.length > 5 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      +{role.permissions.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Department Assignment */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Department Assignment
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {isDepartmentLeadSelected()
            ? "Department Lead role requires a department assignment."
            : "Optionally assign this user to a department."}
        </p>
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Department {isDepartmentLeadSelected() && <span className="text-red-500">*</span>}
          </label>
          <select
            id="department"
            value={selectedDepartmentId}
            onChange={handleDepartmentChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">No Department</option>
            {allDepartments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} ({dept.userCount}{" "}
                {dept.userCount === 1 ? "user" : "users"})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => router.push("/admin/users")}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving || selectedRoleIds.length === 0}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
