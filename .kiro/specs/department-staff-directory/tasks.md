# Implementation Plan

- [x] 1. Create TypeScript types and interfaces
  - Create `src/types/staff.ts` with StaffMember, Department, and DepartmentSlug interfaces
  - _Requirements: 5.2_

- [x] 2. Create staff data file with all department members
  - Create `src/data/staffMembers.ts` with 60+ staff members (10+ per department)
  - Organize data by department with helper functions (getStaffByDepartment, getDepartmentBySlug)
  - _Requirements: 5.1, 5.3, 2.3_

- [x] 3. Create StaffCard component
  - Build `src/components/Staff/StaffCard.tsx` component to display individual staff member
  - Display name, title, specialization, email, profile image, and social links
  - Use glass-morphism styling consistent with TeamGlassCard
  - Support dark/light theme modes
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 4. Create StaffGrid component
  - Build `src/components/Staff/StaffGrid.tsx` component for responsive grid layout
  - Implement responsive columns: 1 (mobile), 2 (tablet), 3-4 (desktop)
  - Add fade-in animations on load
  - _Requirements: 4.1, 4.2_

- [x] 5. Create main staff directory page
  - Create `src/app/stuffs/page.tsx` to display all departments
  - List all 6 departments with name, description, and staff count
  - Add navigation links to each department page
  - Include breadcrumb navigation and SEO metadata
  - _Requirements: 1.1, 1.2, 1.3, 4.3_

- [x] 6. Create dynamic department staff page
  - Create `src/app/stuffs/[department]/page.tsx` for dynamic routing
  - Display department header with name and description
  - Show all staff members for the department using StaffGrid
  - Implement 404 handling for invalid department slugs
  - Add breadcrumb navigation and SEO metadata for each department
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.3_

- [ ]* 7. Add unit tests for staff data functions
  - Write tests for getStaffByDepartment helper function
  - Write tests for getDepartmentBySlug helper function
  - _Requirements: 5.1, 5.3_

- [ ]* 8. Test responsive design across breakpoints
  - Verify grid layout on mobile, tablet, and desktop viewports
  - Test dark/light theme switching
  - _Requirements: 4.1, 4.2_
