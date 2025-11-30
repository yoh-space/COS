# Implementation Plan: College CMS System

**IMPORTANT: Always use `pnpm` as the package manager for this project. Use `pnpm install`, `pnpm add`, `pnpm run`, etc.**

## Phase 1: Foundation & Database Setup

- [x] 1. Set up PostgreSQL database and Prisma configuration
  - Install and configure PostgreSQL locally or use managed service (Vercel Postgres, Railway, etc.)
  - Install Prisma and initialize schema
  - Create `.env.local` with database connection string
  - Run initial Prisma migration
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 2. Create Prisma schema with all core models
  - Define User, Role, and Permission models
  - Create BlogPost, Resource, StaffMember, Department models
  - Add DeanMessage, VisionMission, AdministrativePosition, AcademicSection, Service models
  - Create ContentVersion and AuditLog models
  - Create MediaFile model
  - Run migration to create database tables
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 3. Set up Clerk authentication integration
  - Install Clerk SDK for Next.js
  - Configure Clerk environment variables
  - Add ClerkProvider to root layout
  - Create Clerk webhook endpoint at `/api/webhooks/clerk`
  - Implement webhook handler to sync users to PostgreSQL
  - _Requirements: 1.2, 2.1_

- [x] 4. Create authentication middleware and utilities
  - Create middleware.ts to protect admin routes
  - Implement `getAuth()` helper to get current user from Clerk
  - Create `getCurrentUser()` function to fetch user from database
  - Implement permission checking utilities
  - _Requirements: 1.2, 1.7_

## Phase 2: User & Role Management

- [x] 5. Implement user and role management API routes
  - Create `GET /api/cms/users` to list all users
  - Create `POST /api/cms/users/[id]/roles` to assign roles to users
  - Create `GET /api/cms/roles` to list available roles
  - Implement role validation and permission checking
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 6. Create admin user management interface
  - Create `/admin/users/page.tsx` to display user list
  - Create user detail page with role assignment UI
  - Implement role selection dropdown with multi-select
  - Add department assignment for Department_Lead users
  - _Requirements: 2.2, 2.3, 2.4_

- [ ] 7. Implement audit logging system
  - Create `logAuditEvent()` function to record all changes
  - Add audit logging to all CRUD operations
  - Create `GET /api/cms/audit-logs` endpoint with filtering
  - Create `/admin/audit-logs/page.tsx` to display audit logs
  - _Requirements: 13.1, 13.2, 13.3_

## Phase 3: Blog Post Management

- [x] 8. Create blog post API routes
  - Create `GET /api/cms/blog` to list blog posts with filtering
  - Create `POST /api/cms/blog` to create new blog post
  - Create `GET /api/cms/blog/[id]` to fetch single blog post
  - Create `PUT /api/cms/blog/[id]` to update blog post
  - Create `DELETE /api/cms/blog/[id]` to delete blog post
  - Implement status workflow (draft → pending_review → published)
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 12.1, 12.2_

- [ ] 9. Create blog post admin interface
  - Create `/admin/blog/page.tsx` to list blog posts
  - Create `/admin/blog/new/page.tsx` for creating new posts
  - Create `/admin/blog/[id]/page.tsx` for editing posts
  - Implement rich text editor for blog content
  - Add featured image upload
  - Add SEO metadata fields (title, description, keywords)
  - _Requirements: 3.1, 3.2, 3.3, 15.1, 15.2_

- [x] 10. update existing blog pages to work with primsa postgresql
  - update `/blog/page.tsx` to display blog listing to integrate with prisma postgresql
  - update `/blog-details/[slug]/page.tsx` for blog post detail to integrate with prisma postgrusql 
  - Implement pagination for blog listing
  - Add search and filter functionality
  - Display only published blog posts
  - _Requirements: 3.4, 3.5_


## Phase 4: Staff Member Management

- [x] 12. Create staff member API routes
  - Create `GET /api/cms/staff` to list staff members
  - Create `POST /api/cms/staff` to create staff member
  - Create `GET /api/cms/staff/[id]` to fetch staff member
  - Create `PUT /api/cms/staff/[id]` to update staff member
  - Create `DELETE /api/cms/staff/[id]` to delete staff member
  - Implement email validation and duplicate prevention
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 13. Create staff member admin interface
  - Create `/admin/staff/page.tsx` to list staff members
  - Create `/admin/staff/new/page.tsx` for creating staff
  - Create `/admin/staff/[id]/page.tsx` for editing staff
  - Implement staff form with all required fields
  - Add profile image upload
  - Add social media links (Telegram, Twitter, LinkedIn)
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 14. Implement bulk staff import
  - Create `POST /api/cms/staff/import` endpoint for CSV upload
  - Implement CSV parsing and validation
  - Add bulk import UI in admin interface
  - Implement error handling and validation reporting
  - _Requirements: 5.4_

- [x] 15. Update public staff directory with CMS data
  - Modify `/(public)/stuffs/page.tsx` to fetch from database
  - Modify `/(public)/stuffs/[department]/page.tsx` to fetch from database
  - Ensure staff cards display all information from CMS
  - _Requirements: 5.1, 5.2, 5.3_

## Phase 5: Department Management

- [-] 16. Create department API routes
  - Create `GET /api/cms/departments` to list departments
  - Create `POST /api/cms/departments` to create department
  - Create `GET /api/cms/departments/[id]` to fetch department
  - Create `PUT /api/cms/departments/[id]` to update department
  - Create `DELETE /api/cms/departments/[id]` to delete department with validation
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ] 17. Create department admin interface
  - Create `/admin/departments/page.tsx` to list departments
  - Create `/admin/departments/new/page.tsx` for creating departments
  - Create `/admin/departments/[id]/page.tsx` for editing departments
  - Implement department form with name, slug, description
  - Add department head assignment
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 18. Implement department lead role assignment
  - Add department assignment when creating Department_Lead users
  - Restrict Department_Lead users to only their assigned department
  - Implement permission checking in API routes
  - _Requirements: 1.4, 6.3_

## Phase 6: Resources Management

- [ ] 19. Create resource API routes
  - Create `GET /api/cms/resources` to list resources
  - Create `POST /api/cms/resources` to create resource
  - Create `GET /api/cms/resources/[id]` to fetch resource
  - Create `PUT /api/cms/resources/[id]` to update resource
  - Create `DELETE /api/cms/resources/[id]` to delete resource
  - Implement download count tracking
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 20. Create resource admin interface
  - Create `/admin/resources/page.tsx` to list resources
  - Create `/admin/resources/new/page.tsx` for uploading resources
  - Create `/admin/resources/[id]/page.tsx` for editing resources
  - Implement file upload with validation
  - Add category and year selection
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 21. Create public resources page
  - Create `/(public)/resources/page.tsx` to display resources
  - Implement filtering by category and year
  - Add download functionality with tracking
  - _Requirements: 4.5_

- [ ] 22. Implement Research_Lead role restrictions
  - Restrict Research_Lead users to only Resources content type
  - Implement permission checking in API routes
  - _Requirements: 1.5_

## Phase 7: Dean Message & Vision/Mission

- [ ] 23. Create dean message API routes
  - Create `GET /api/cms/dean-message` to fetch current message
  - Create `POST /api/cms/dean-message` to create/update message
  - Implement scheduling for future publication
  - Implement versioning for dean messages
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 24. Create dean message admin interface
  - Create `/admin/dean-message/page.tsx` for managing dean message
  - Implement rich text editor for message content
  - Add image upload
  - Add scheduling UI with date/time picker
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 25. Create vision and mission API routes
  - Create `GET /api/cms/vision-mission` to fetch vision/mission
  - Create `POST /api/cms/vision-mission` to create/update
  - Implement versioning for vision/mission
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 26. Create vision and mission admin interface
  - Create `/admin/vision-mission/page.tsx` for managing content
  - Implement rich text editor
  - Add version history and revert functionality
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 27. Create public vision and mission pages
  - Create `/(public)/about/vision/page.tsx`
  - Create `/(public)/about/mission/page.tsx`
  - Display current vision and mission content
  - _Requirements: 8.3_

## Phase 8: Administration & Academic Sections

- [ ] 28. Create administrative position API routes
  - Create `GET /api/cms/admin-positions` to list positions
  - Create `POST /api/cms/admin-positions` to create position
  - Create `GET /api/cms/admin-positions/[id]` to fetch position
  - Create `PUT /api/cms/admin-positions/[id]` to update position
  - Create `DELETE /api/cms/admin-positions/[id]` to delete position
  - Implement hierarchical position relationships
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 29. Create administrative structure admin interface
  - Create `/admin/admin-structure/page.tsx` to manage positions
  - Implement hierarchical tree view for positions
  - Add form for creating/editing positions
  - Add document upload for duties and responsibilities
  - _Requirements: 9.1, 9.2, 9.3, 9.5_

- [ ] 30. Create academic section API routes
  - Create `GET /api/cms/academic-sections` to list sections
  - Create `POST /api/cms/academic-sections` to create section
  - Create `GET /api/cms/academic-sections/[id]` to fetch section
  - Create `PUT /api/cms/academic-sections/[id]` to update section
  - Create `DELETE /api/cms/academic-sections/[id]` to delete section
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 31. Create academic section admin interface
  - Create `/admin/academic-sections/page.tsx` to manage sections
  - Implement form for creating/editing sections
  - Add department selection
  - Add document upload for syllabi
  - _Requirements: 10.1, 10.2, 10.4_

- [ ] 32. Create public academic sections pages
  - Create `/(public)/academics/page.tsx` to display sections
  - Organize by department
  - Display program details and learning outcomes
  - _Requirements: 10.3_

## Phase 9: Services Management

- [ ] 33. Create service API routes
  - Create `GET /api/cms/services` to list services
  - Create `POST /api/cms/services` to create service
  - Create `GET /api/cms/services/[id]` to fetch service
  - Create `PUT /api/cms/services/[id]` to update service
  - Create `DELETE /api/cms/services/[id]` to delete service
  - _Requirements: 11.1, 11.2, 11.3_

- [ ] 34. Create service admin interface
  - Create `/admin/services/page.tsx` to manage services
  - Implement form for creating/editing services
  - Add category selection
  - Add document upload
  - _Requirements: 11.1, 11.2_

- [ ] 35. Create public services page
  - Create `/(public)/services/page.tsx` to display services
  - Organize by category
  - Display contact information and location
  - _Requirements: 11.3_

## Phase 10: Media Management

- [ ] 36. Create media upload API route
  - Create `POST /api/cms/media/upload` endpoint
  - Implement file type validation (JPG, PNG, WebP, PDF, DOCX)
  - Implement file size validation
  - Generate thumbnails for images
  - Store files in cloud storage (Vercel Blob or AWS S3)
  - _Requirements: 14.1, 14.2, 14.3_

- [ ] 37. Create media library API routes
  - Create `GET /api/cms/media` to list media files
  - Create `DELETE /api/cms/media/[id]` to delete media
  - Implement search and filter functionality
  - Track media usage across content items
  - _Requirements: 14.3, 14.4, 14.5_

- [ ] 38. Create media library admin interface
  - Create `/admin/media/page.tsx` to display media library
  - Implement file upload UI with drag-and-drop
  - Add search and filter functionality
  - Display media usage information
  - _Requirements: 14.1, 14.3, 14.4_

## Phase 11: SEO & Publishing Workflow

- [ ] 39. Implement content publishing workflow
  - Create status transition logic (draft → pending_review → published)
  - Implement approval workflow for editors
  - Create `POST /api/cms/[content-type]/[id]/publish` endpoint
  - Create `POST /api/cms/[content-type]/[id]/unpublish` endpoint
  - _Requirements: 12.1, 12.2, 12.3_

- [ ] 40. Implement scheduled publishing
  - Create scheduled publishing logic
  - Implement cron job or scheduled task to publish scheduled content
  - Add scheduling UI to content forms
  - _Requirements: 12.4_

- [ ] 41. Implement SEO metadata management
  - Add SEO fields to all content types (title, description, keywords, canonical URL)
  - Create SEO preview component
  - Implement automatic slug generation
  - _Requirements: 15.1, 15.2_

- [ ] 42. Generate XML sitemap
  - Create `GET /sitemap.xml` endpoint
  - Include all published content in sitemap
  - Implement dynamic sitemap generation
  - _Requirements: 15.3_

## Phase 12: Dashboard & Analytics

- [ ] 43. Create admin dashboard
  - Create `/admin/page.tsx` dashboard page
  - Display content statistics (total items by type, published vs draft)
  - Show recent user activity
  - Display content publication trends
  - Show user login statistics and role distribution
  - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [ ] 44. Implement dashboard analytics
  - Create analytics API endpoints
  - Implement charts for content trends
  - Add user activity timeline
  - _Requirements: 16.1, 16.2, 16.3, 16.4_

## Phase 13: Admin UI Components & Layout

- [ ] 45. Create admin layout and navigation
  - Create `/admin/layout.tsx` with sidebar navigation
  - Implement responsive admin header
  - Add user profile menu with logout
  - Create navigation menu with all admin sections
  - _Requirements: 1.7_

- [ ] 46. Create reusable admin components
  - Create ProtectedRoute component for route protection
  - Create RoleGuard component for role-based rendering
  - Create form components (TextInput, RichTextEditor, FileUpload)
  - Create data table component for listing content
  - Create modal/dialog components
  - _Requirements: 1.7_

- [ ] 47. Implement role-based UI visibility
  - Hide admin sections based on user role
  - Restrict access to admin pages with middleware
  - Show appropriate error pages for unauthorized access
  - _Requirements: 1.7_

## Phase 14: Testing & Validation

- [ ] 48. Create API route tests
  - Test CRUD operations for each content type
  - Test permission validation for different roles
  - Test error handling and validation
  - _Requirements: 1.7, 2.1, 2.2_

- [ ] 49. Create component tests
  - Test admin form components
  - Test role-based rendering
  - Test permission checking logic
  - _Requirements: 1.7_

- [ ] 50. Test complete workflows
  - Test blog creation → publish → display flow
  - Test staff member creation and directory display
  - Test resource upload and download
  - Test role-based access restrictions
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

## Phase 15: Deployment & Documentation

- [ ] 51. Set up environment variables and secrets
  - Configure database connection string
  - Configure Clerk API keys
  - Configure file storage credentials
  - Document all required environment variables
  - _Requirements: 5.1_

- [ ] 52. Run database migrations and seeding
  - Create seed script with sample data
  - Run Prisma migrations
  - Seed initial roles and admin user
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 53. Deploy to production
  - Deploy to Vercel or hosting platform
  - Configure production database
  - Set up monitoring and error tracking
  - _Requirements: All_

</content>
</invoke>