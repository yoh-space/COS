# Bug Fix: "Cannot read properties of undefined (reading 'blogPosts')"

## Issue Description
After creating a blog post from `/admin/blog/new`, users encountered the error:
```
Cannot read properties of undefined (reading 'blogPosts')
```

## Root Cause
The client-side components were trying to access API response data using an incorrect nested structure:
```typescript
// Incorrect - trying to access data.data.blogPosts
const data = await response.json();
setBlogPosts(data.data.blogPosts);  // ❌ Error: data.data is undefined
```

The API actually returns data directly without the extra `data` wrapper:
```typescript
// API returns this structure:
{
  "blogPosts": [...],
  "pagination": {...}
}

// Not this:
{
  "data": {
    "blogPosts": [...],
    "pagination": {...}
  }
}
```

## Files Fixed

### 1. `src/app/admin/blog/BlogListClient.tsx`
**Before:**
```typescript
const data = await response.json();
setBlogPosts(data.data.blogPosts);
setTotalPages(data.data.pagination.totalPages);
```

**After:**
```typescript
const data = await response.json();
setBlogPosts(data.blogPosts || []);
setTotalPages(data.pagination?.totalPages || 1);
```

### 2. `src/app/admin/staff/StaffListClient.tsx`
**Before:**
```typescript
// In fetchDepartments()
setDepartments(data.data.departments || []);

// In fetchStaffMembers()
setStaffMembers(data.data.staffMembers || []);
setTotalPages(data.data.pagination?.totalPages || 1);
```

**After:**
```typescript
// In fetchDepartments()
setDepartments(data.departments || []);

// In fetchStaffMembers()
setStaffMembers(data.staffMembers || []);
setTotalPages(data.pagination?.totalPages || 1);
```

### 3. `src/app/admin/staff/StaffForm.tsx`
**Before:**
```typescript
setDepartments(data.data.departments || []);
```

**After:**
```typescript
setDepartments(data.departments || []);
```

## API Response Structure

All CMS API endpoints use the `apiSuccess()` helper which returns data directly:

```typescript
// src/lib/api-auth.ts
export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}
```

### Example API Responses:

#### GET /api/cms/blog
```json
{
  "blogPosts": [
    {
      "id": "...",
      "title": "...",
      "author": {...}
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

#### GET /api/cms/staff
```json
{
  "staffMembers": [...],
  "pagination": {...}
}
```

#### GET /api/cms/departments
```json
{
  "departments": [...],
  "pagination": {...}
}
```

## Prevention
To prevent similar issues in the future:

1. **Consistent API Response Structure**: All API endpoints should use the `apiSuccess()` helper
2. **Type Safety**: Define TypeScript interfaces for API responses
3. **Error Handling**: Add fallback values (`|| []`, `?.`) to handle undefined data gracefully
4. **Testing**: Test API integration after creating new endpoints

## Testing
After the fix:
1. ✅ Creating a blog post redirects to `/admin/blog` successfully
2. ✅ Blog list page loads without errors
3. ✅ Staff list page loads without errors
4. ✅ Department dropdowns populate correctly in forms

## Related Files
- `src/lib/api-auth.ts` - API response helpers
- `src/app/api/cms/blog/route.ts` - Blog API endpoints
- `src/app/api/cms/staff/route.ts` - Staff API endpoints
- `src/app/api/cms/departments/route.ts` - Department API endpoints
