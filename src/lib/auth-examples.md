# Authentication & Authorization Usage Examples

This document provides examples of how to use the authentication and authorization utilities in the CMS.

## Table of Contents

1. [Basic Authentication](#basic-authentication)
2. [Permission Checking](#permission-checking)
3. [Role-Based Access](#role-based-access)
4. [API Route Protection](#api-route-protection)
5. [Department Access Control](#department-access-control)
6. [Content Type Access Control](#content-type-access-control)

## Basic Authentication

### Get Current User

```typescript
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return NextResponse.json({ user });
}
```

### Require Authentication

```typescript
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const user = await requireAuth();
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
```

## Permission Checking

### Check Single Permission

```typescript
import { checkPermission } from '@/lib/auth';
import { PERMISSIONS } from '@/lib/permissions';

export async function POST(request: Request) {
  const hasAccess = await checkPermission(PERMISSIONS.BLOG_CREATE);
  
  if (!hasAccess) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Create blog post
}
```

### Check Multiple Permissions (Any)

```typescript
import { checkAnyPermission } from '@/lib/auth';
import { PERMISSIONS } from '@/lib/permissions';

export async function GET() {
  const hasAccess = await checkAnyPermission([
    PERMISSIONS.BLOG_READ,
    PERMISSIONS.BLOG_ALL,
  ]);
  
  if (!hasAccess) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Return blog posts
}
```

### Require Permission

```typescript
import { requirePermission } from '@/lib/auth';
import { PERMISSIONS } from '@/lib/permissions';

export async function DELETE(request: Request) {
  try {
    const user = await requirePermission(PERMISSIONS.BLOG_DELETE);
    // Delete blog post
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
```

## Role-Based Access

### Check User Role

```typescript
import { hasRole } from '@/lib/auth';
import { ROLES } from '@/lib/permissions';

export async function GET() {
  const isEditor = await hasRole(ROLES.EDITOR);
  
  if (!isEditor) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Editor-specific logic
}
```

### Check Admin Access

```typescript
import { isAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  const adminAccess = await isAdmin();
  
  if (!adminAccess) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }
  
  // Admin-only operation
}
```

### Require Admin Role

```typescript
import { requireAdmin } from '@/lib/auth';

export async function DELETE(request: Request) {
  try {
    const user = await requireAdmin();
    // Admin-only delete operation
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
```

## API Route Protection

### Using withAuth Wrapper

```typescript
import { withAuth } from '@/lib/api-auth';

export const GET = withAuth(async (request, user) => {
  // User is automatically authenticated
  return NextResponse.json({ 
    message: 'Protected data',
    userId: user.id 
  });
});
```

### Using withPermission Wrapper

```typescript
import { withPermission } from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';

export const POST = withPermission(
  PERMISSIONS.BLOG_CREATE,
  async (request, user) => {
    const body = await request.json();
    
    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        ...body,
        authorId: user.id,
      },
    });
    
    return NextResponse.json(post);
  }
);
```

### Using withRole Wrapper

```typescript
import { withRole } from '@/lib/api-auth';
import { ROLES } from '@/lib/permissions';

export const GET = withRole(
  ROLES.EDITOR,
  async (request, user) => {
    // Only editors can access this
    return NextResponse.json({ message: 'Editor dashboard data' });
  }
);
```

### Using withAdmin Wrapper

```typescript
import { withAdmin } from '@/lib/api-auth';

export const DELETE = withAdmin(async (request, user) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // Admin-only delete operation
  await prisma.user.delete({ where: { id } });
  
  return NextResponse.json({ success: true });
});
```

## Department Access Control

### Check Department Access

```typescript
import { checkDepartmentAccess } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get('departmentId');
  
  const hasAccess = await checkDepartmentAccess(departmentId);
  
  if (!hasAccess) {
    return NextResponse.json(
      { error: 'Access denied to this department' },
      { status: 403 }
    );
  }
  
  // Return department data
}
```

### Using API Helper

```typescript
import { checkUserDepartmentAccess } from '@/lib/api-auth';

export async function PUT(request: Request) {
  const body = await request.json();
  const { departmentId } = body;
  
  const { user, error } = await checkUserDepartmentAccess(departmentId);
  
  if (error) {
    return error;
  }
  
  // Update department data
}
```

## Content Type Access Control

### Check Content Type Access

```typescript
import { checkContentTypeAccess } from '@/lib/auth';

export async function POST(request: Request) {
  const hasAccess = await checkContentTypeAccess('resource');
  
  if (!hasAccess) {
    return NextResponse.json(
      { error: 'Access denied to resource management' },
      { status: 403 }
    );
  }
  
  // Create resource
}
```

### Using API Helper

```typescript
import { checkUserContentTypeAccess } from '@/lib/api-auth';

export async function GET(request: Request) {
  const { user, error } = await checkUserContentTypeAccess('blog');
  
  if (error) {
    return error;
  }
  
  // Return blog posts for this user
  const posts = await prisma.blogPost.findMany({
    where: { authorId: user.id },
  });
  
  return NextResponse.json(posts);
}
```

## Complete API Route Example

Here's a complete example of a blog API route with proper authentication and authorization:

```typescript
// app/api/cms/blog/route.ts
import { NextResponse } from 'next/server';
import { withPermission, apiSuccess, validationError } from '@/lib/api-auth';
import { PERMISSIONS } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';

// GET /api/cms/blog - List blog posts
export const GET = withPermission(
  PERMISSIONS.BLOG_READ,
  async (request, user) => {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const posts = await prisma.blogPost.findMany({
      where: status ? { status } : undefined,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return apiSuccess(posts);
  }
);

// POST /api/cms/blog - Create blog post
export const POST = withPermission(
  PERMISSIONS.BLOG_CREATE,
  async (request, user) => {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content) {
      return validationError('Title and content are required');
    }
    
    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug,
        content: body.content,
        excerpt: body.excerpt,
        featuredImage: body.featuredImage,
        status: 'draft',
        authorId: user.id,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        seoKeywords: body.seoKeywords,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    
    return apiSuccess(post, 201);
  }
);
```

## Error Handling

The API helpers provide consistent error responses:

```typescript
import {
  unauthorizedError,
  forbiddenError,
  notFoundError,
  validationError,
  serverError,
} from '@/lib/api-auth';

// 401 Unauthorized
return unauthorizedError('Please sign in');

// 403 Forbidden
return forbiddenError('You do not have permission');

// 404 Not Found
return notFoundError('Blog post not found');

// 400 Bad Request
return validationError('Invalid email format');

// 500 Internal Server Error
return serverError('Database connection failed');
```
