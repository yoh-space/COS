# User and Role Management API

This document describes the API endpoints for managing users and roles in the College CMS system.

## Prerequisites

- User must be authenticated via Clerk
- User must have appropriate permissions (user:read, user:update, role:read)

## API Endpoints

### 1. List All Users

**Endpoint:** `GET /api/cms/users`

**Required Permission:** `user:read`

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of users per page (default: 50)
- `search` (optional): Search by email, first name, or last name
- `role` (optional): Filter by role name
- `department` (optional): Filter by department ID

**Response:**
```json
{
  "users": [
    {
      "id": "user_123",
      "clerkId": "clerk_abc",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "profileImage": "https://...",
      "department": {
        "id": "dept_123",
        "name": "Computer Science",
        "slug": "computer-science"
      },
      "roles": [
        {
          "id": "role_123",
          "name": "Editor",
          "description": "Can create and edit blog posts"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 2
  }
}
```

**Example Usage:**
```bash
# List all users
curl -X GET "http://localhost:3000/api/cms/users" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search for users
curl -X GET "http://localhost:3000/api/cms/users?search=john&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by role
curl -X GET "http://localhost:3000/api/cms/users?role=Editor" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 2. Assign Roles to User

**Endpoint:** `POST /api/cms/users/[id]/roles`

**Required Permission:** `user:update`

**Request Body:**
```json
{
  "roleIds": ["role_123", "role_456"],
  "departmentId": "dept_123" // Required if assigning Department_Lead role
}
```

**Response:**
```json
{
  "message": "User roles updated successfully",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "roles": [
      {
        "id": "role_123",
        "name": "Editor",
        "description": "Can create and edit blog posts"
      }
    ],
    "department": {
      "id": "dept_123",
      "name": "Computer Science",
      "slug": "computer-science"
    },
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Example Usage:**
```bash
# Assign Editor role to user
curl -X POST "http://localhost:3000/api/cms/users/user_123/roles" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "roleIds": ["role_editor_id"]
  }'

# Assign Department_Lead role with department
curl -X POST "http://localhost:3000/api/cms/users/user_123/roles" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "roleIds": ["role_dept_lead_id"],
    "departmentId": "dept_123"
  }'
```

**Validation Rules:**
- `roleIds` must be a non-empty array
- All role IDs must exist in the database
- If assigning `Department_Lead` role, `departmentId` is required
- Department must exist if `departmentId` is provided

---

### 3. List All Roles

**Endpoint:** `GET /api/cms/roles`

**Required Permission:** `role:read`

**Response:**
```json
{
  "roles": [
    {
      "id": "role_123",
      "name": "Admin",
      "description": "Full system access with all permissions",
      "permissions": ["*"],
      "userCount": 5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "role_456",
      "name": "Editor",
      "description": "Can create, edit, and publish blog posts",
      "permissions": [
        "blog:create",
        "blog:read",
        "blog:update",
        "blog:delete",
        "blog:publish"
      ],
      "userCount": 12,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Example Usage:**
```bash
# List all roles
curl -X GET "http://localhost:3000/api/cms/roles" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Predefined Roles

The system comes with the following predefined roles:

1. **Admin**
   - Full system access
   - Permissions: `*` (all)

2. **Editor**
   - Can manage blog posts
   - Permissions: `blog:*`, `media:upload`, `media:read`

3. **Department_Lead**
   - Can manage content for assigned department
   - Permissions: `staff:read`, `staff:update`, `department:read`, `blog:read`
   - Requires department assignment

4. **Registrar**
   - Can manage staff and departments
   - Permissions: `staff:*`, `department:read`, `department:update`, `media:upload`, `media:read`

5. **Research_Lead**
   - Can manage research resources
   - Permissions: `resource:*`, `media:upload`, `media:read`

6. **Faculty_Member**
   - Read-only access
   - Permissions: `blog:read`, `resource:read`, `staff:read`, `department:read`

---

## Seeding Roles

To populate the database with predefined roles, run:

```bash
pnpm prisma db seed
```

This will create or update all predefined roles with their permissions.

---

## Error Responses

All endpoints return standard error responses:

**401 Unauthorized:**
```json
{
  "error": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "error": "Missing required permission: user:read"
}
```

**404 Not Found:**
```json
{
  "error": "User not found"
}
```

**400 Bad Request:**
```json
{
  "error": "roleIds must be a non-empty array"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to fetch users"
}
```

---

## Audit Logging

All role assignments are automatically logged in the audit log with:
- Action: `update`
- Entity Type: `user`
- Entity ID: User ID
- User ID: ID of user making the change
- Changes: JSON containing previous roles, new roles, and department ID

---

## Next Steps

After setting up user and role management:

1. Create admin user interface for managing users and roles
2. Implement role-based UI visibility
3. Add user invitation system
4. Implement role change notifications
