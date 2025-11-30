# Admin Routes and Required Permissions

This document lists all admin routes (both API and UI pages) with their corresponding required permissions and roles.

## Role Definitions

### Admin
- **Permissions:** `*` (all permissions)
- **Description:** Full system access with all permissions
- **Access:** Everything

### Editor
- **Permissions:** 
  - `blog:create`, `blog:read`, `blog:update`, `blog:delete`, `blog:publish`
  - `media:upload`, `media:read`
- **Description:** Can create, edit, and publish blog posts
- **Access:** Blog management, media uploads

### Department_Lead
- **Permissions:**
  - `staff:read`, `staff:update`
  - `department:read`
  - `blog:read`
- **Description:** Can manage content for their assigned department
- **Access:** View and update staff in their department, view departments and blogs

### Registrar
- **Permissions:**
  - `staff:*` (all staff permissions)
  - `department:read`, `department:update`
  - `media:upload`, `media:read`
- **Description:** Can manage staff members and departments
- **Access:** Full staff management, department updates, media uploads

### Research_Lead
- **Permissions:**
  - `resource:*` (all resource permissions)
  - `media:upload`, `media:read`
- **Description:** Can manage research resources and publications
- **Access:** Resource management, media uploads

### Faculty_Member
- **Permissions:**
  - `blog:read`, `resource:read`, `staff:read`, `department:read`
- **Description:** Read-only access to content
- **Access:** View-only access to blogs, resources, staff, and departments

---

## API Routes

### Blog Management

#### GET /api/cms/blog
- **Permission Required:** `blog:read`
- **Roles with Access:** Admin, Editor, Department_Lead, Faculty_Member
- **Description:** List blog posts with filtering and pagination
- **Query Parameters:** page, limit, search, status, authorId

#### POST /api/cms/blog
- **Permission Required:** `blog:create`
- **Roles with Access:** Admin, Editor
- **Description:** Create a new blog post
- **Body:** title, slug, content, excerpt, featuredImage, status, etc.

#### GET /api/cms/blog/[id]
- **Permission Required:** `blog:read`
- **Roles with Access:** Admin, Editor, Department_Lead, Faculty_Member
- **Description:** Fetch a single blog post by ID

#### PUT /api/cms/blog/[id]
- **Permission Required:** `blog:update`
- **Roles with Access:** Admin, Editor
- **Description:** Update a blog post
- **Body:** Any blog post fields to update

#### DELETE /api/cms/blog/[id]
- **Permission Required:** `blog:delete`
- **Roles with Access:** Admin, Editor
- **Description:** Delete a blog post

---

### Staff Management

#### GET /api/cms/staff
- **Permission Required:** `staff:read`
- **Roles with Access:** Admin, Department_Lead, Registrar, Faculty_Member
- **Description:** List staff members with filtering and pagination
- **Query Parameters:** page, limit, search, departmentId, status
- **Note:** Department_Lead can only see staff from their department

#### POST /api/cms/staff
- **Permission Required:** `staff:create`
- **Roles with Access:** Admin, Registrar
- **Description:** Create a new staff member
- **Body:** name, title, specialization, email, departmentId, etc.

#### GET /api/cms/staff/[id]
- **Permission Required:** `staff:read`
- **Roles with Access:** Admin, Department_Lead, Registrar, Faculty_Member
- **Description:** Fetch a single staff member by ID
- **Note:** Department_Lead can only access staff from their department

#### PUT /api/cms/staff/[id]
- **Permission Required:** `staff:update`
- **Roles with Access:** Admin, Department_Lead, Registrar
- **Description:** Update a staff member
- **Body:** Any staff member fields to update
- **Note:** Department_Lead can only update staff from their department

#### DELETE /api/cms/staff/[id]
- **Permission Required:** `staff:delete`
- **Roles with Access:** Admin, Registrar
- **Description:** Delete a staff member
- **Note:** Department_Lead can only delete staff from their department

---

### Department Management

#### GET /api/cms/departments
- **Permission Required:** `department:read`
- **Roles with Access:** Admin, Department_Lead, Registrar, Faculty_Member
- **Description:** List departments with filtering and pagination
- **Query Parameters:** page, limit, search, includeStats

#### POST /api/cms/departments
- **Permission Required:** `department:create`
- **Roles with Access:** Admin
- **Description:** Create a new department
- **Body:** name, slug, description, headId

#### GET /api/cms/departments/[id]
- **Permission Required:** `department:read`
- **Roles with Access:** Admin, Department_Lead, Registrar, Faculty_Member
- **Description:** Fetch a single department by ID

#### PUT /api/cms/departments/[id]
- **Permission Required:** `department:update`
- **Roles with Access:** Admin, Registrar
- **Description:** Update a department
- **Body:** name, slug, description, headId

#### DELETE /api/cms/departments/[id]
- **Permission Required:** `department:delete`
- **Roles with Access:** Admin
- **Description:** Delete a department
- **Validation:** Cannot delete if department has staff, academic sections, or users

---

### User Management

#### GET /api/cms/users
- **Permission Required:** `user:read`
- **Roles with Access:** Admin
- **Description:** List users with filtering and pagination
- **Query Parameters:** page, limit, search, roleId, departmentId

#### POST /api/cms/users/[id]/roles
- **Permission Required:** `user:update`
- **Roles with Access:** Admin
- **Description:** Assign roles to a user
- **Body:** roleIds (array), departmentId (optional)

---

### Role Management

#### GET /api/cms/roles
- **Permission Required:** `role:read`
- **Roles with Access:** Admin
- **Description:** List all available roles

---

## Admin UI Pages

### Blog Management Pages

#### /admin/blog
- **Required Permission:** `blog:read`
- **Roles with Access:** Admin, Editor, Department_Lead, Faculty_Member
- **Description:** Blog post list page with search and filters

#### /admin/blog/new
- **Required Permission:** `blog:create`
- **Roles with Access:** Admin, Editor
- **Description:** Create new blog post page

#### /admin/blog/[id]
- **Required Permission:** `blog:update`
- **Roles with Access:** Admin, Editor
- **Description:** Edit existing blog post page

---

### Staff Management Pages

#### /admin/staff
- **Required Permission:** `staff:read`
- **Roles with Access:** Admin, Department_Lead, Registrar, Faculty_Member
- **Description:** Staff member list page with search and filters
- **Note:** Department_Lead sees only their department's staff

#### /admin/staff/new
- **Required Permission:** `staff:create`
- **Roles with Access:** Admin, Registrar
- **Description:** Create new staff member page

#### /admin/staff/[id]
- **Required Permission:** `staff:update`
- **Roles with Access:** Admin, Department_Lead, Registrar
- **Description:** Edit existing staff member page
- **Note:** Department_Lead can only edit staff from their department

---

### User Management Pages

#### /admin/users
- **Required Permission:** `user:read`
- **Roles with Access:** Admin
- **Description:** User list page with search and filters

#### /admin/users/[id]
- **Required Permission:** `user:update`
- **Roles with Access:** Admin
- **Description:** User detail and role assignment page

---

## Permission Hierarchy

### Wildcard Permissions
- `*` - Super admin, grants all permissions
- `blog:*` - All blog permissions (create, read, update, delete, publish)
- `staff:*` - All staff permissions (create, read, update, delete)
- `department:*` - All department permissions (create, read, update, delete)
- `resource:*` - All resource permissions (create, read, update, delete)
- `user:*` - All user permissions (create, read, update, delete)
- `role:*` - All role permissions (create, read, update, delete)
- `media:*` - All media permissions (upload, read, delete)

### Permission Matching
Permissions are matched using the following rules:
1. Exact match: `blog:read` matches `blog:read`
2. Wildcard match: `blog:*` matches `blog:read`, `blog:create`, etc.
3. Super admin: `*` matches any permission

---

## Department Access Control

### Department-Scoped Permissions
Some roles have department-scoped access:

- **Department_Lead**: Can only access content from their assigned department
  - Staff members in their department
  - Department information for their department
  
- **Registrar**: Can access all departments
  - Full staff management across all departments
  - Can update any department

- **Admin**: Can access everything
  - No department restrictions

### Implementation
Department access is enforced using the `canAccessDepartment()` function:
```typescript
function canAccessDepartment(user: User, departmentId: string): boolean {
  // Admins can access all departments
  if (isAdmin(user)) return true;
  
  // Department leads can only access their assigned department
  if (hasRole(user, 'Department_Lead')) {
    return user.departmentId === departmentId;
  }
  
  // Registrars can access all departments
  if (hasRole(user, 'Registrar')) return true;
  
  return false;
}
```

---

## Quick Reference Table

| Route | Method | Permission | Admin | Editor | Dept Lead | Registrar | Research Lead | Faculty |
|-------|--------|------------|-------|--------|-----------|-----------|---------------|---------|
| /api/cms/blog | GET | blog:read | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| /api/cms/blog | POST | blog:create | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| /api/cms/blog/[id] | GET | blog:read | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| /api/cms/blog/[id] | PUT | blog:update | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| /api/cms/blog/[id] | DELETE | blog:delete | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| /api/cms/staff | GET | staff:read | ✅ | ❌ | ✅* | ✅ | ❌ | ✅ |
| /api/cms/staff | POST | staff:create | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| /api/cms/staff/[id] | GET | staff:read | ✅ | ❌ | ✅* | ✅ | ❌ | ✅ |
| /api/cms/staff/[id] | PUT | staff:update | ✅ | ❌ | ✅* | ✅ | ❌ | ❌ |
| /api/cms/staff/[id] | DELETE | staff:delete | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| /api/cms/departments | GET | department:read | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ |
| /api/cms/departments | POST | department:create | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| /api/cms/departments/[id] | GET | department:read | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ |
| /api/cms/departments/[id] | PUT | department:update | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| /api/cms/departments/[id] | DELETE | department:delete | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| /api/cms/users | GET | user:read | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| /api/cms/users/[id]/roles | POST | user:update | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| /api/cms/roles | GET | role:read | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

*Department Lead access is restricted to their assigned department only.

---

## Notes

1. **Admin Role**: Has unrestricted access to all routes and operations
2. **Department Scoping**: Department_Lead role is automatically scoped to their assigned department
3. **Permission Wildcards**: Roles can have wildcard permissions (e.g., `blog:*`) that grant all operations for that resource
4. **Cascade Deletion**: Some delete operations check for dependencies before allowing deletion
5. **Audit Logging**: All CMS operations should be logged in the audit log (implementation pending)
