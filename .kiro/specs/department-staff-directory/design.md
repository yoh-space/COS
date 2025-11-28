# Design Document: Department Staff Directory

## Overview

This design document outlines the architecture and implementation approach for the Department Staff Directory feature. The feature will create a browsable staff directory organized by academic departments, following the existing patterns and UI components in the College of Science website.

## Architecture

The feature follows Next.js App Router conventions with a file-based routing structure:

```
src/
├── app/
│   └── stuffs/
│       ├── page.tsx                    # Main staff directory listing
│       ├── [department]/
│       │   └── page.tsx                # Dynamic department staff page
├── components/
│   └── Staff/
│       ├── StaffCard.tsx               # Individual staff member card
│       ├── StaffGrid.tsx               # Grid layout for staff cards
│       └── index.tsx                   # Staff section component
├── data/
│   └── staffMembers.ts                 # Staff data organized by department
└── types/
    └── staff.ts                        # TypeScript interfaces
```

## Components and Interfaces

### TypeScript Interfaces

```typescript
// src/types/staff.ts
export interface StaffMember {
  id: string;
  name: string;
  title: string;                    // e.g., "Professor", "Lecturer", "Assistant Professor"
  specialization: string;           // Area of expertise
  email: string;
  image?: string;                   // Optional profile image path
  department: DepartmentSlug;
  social?: {
    telegram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export type DepartmentSlug = 
  | 'chemistry'
  | 'industrial-chemistry'
  | 'biology'
  | 'physics'
  | 'mathematics'
  | 'statistics';

export interface Department {
  name: string;
  slug: DepartmentSlug;
  description: string;
}
```

### Component Design

#### StaffCard Component
- Reuses styling patterns from existing `TeamGlassCard` component
- Displays: profile image, name, title, specialization, email, social links
- Supports dark/light theme
- Responsive sizing

#### StaffGrid Component
- CSS Grid layout: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
- Consistent spacing and alignment
- Fade-in animation on load

#### Main Stuffs Page (`/stuffs`)
- Lists all 6 departments as clickable cards
- Each card shows department name, description, and staff count
- Links to respective department pages
- Uses existing Breadcrumb component

#### Department Page (`/stuffs/[department]`)
- Dynamic route using Next.js catch-all segments
- Displays department name and description in header
- Shows all staff members in StaffGrid
- Includes breadcrumb navigation
- SEO metadata for each department

## Data Models

### Staff Data Structure

```typescript
// src/data/staffMembers.ts
export const departments: Department[] = [
  { name: "Chemistry", slug: "chemistry", description: "..." },
  { name: "Industrial Chemistry", slug: "industrial-chemistry", description: "..." },
  { name: "Biology", slug: "biology", description: "..." },
  { name: "Physics", slug: "physics", description: "..." },
  { name: "Mathematics", slug: "mathematics", description: "..." },
  { name: "Statistics", slug: "statistics", description: "..." },
];

export const staffMembers: StaffMember[] = [
  // 10+ members per department (60+ total)
];

// Helper functions
export const getStaffByDepartment = (slug: DepartmentSlug): StaffMember[] => {...};
export const getDepartmentBySlug = (slug: string): Department | undefined => {...};
```

## Error Handling

1. **Invalid Department Route**: Return 404 page using Next.js `notFound()` function when department slug doesn't match any valid department
2. **Missing Images**: Display placeholder avatar when staff member image is not available
3. **Empty Department**: Display informative message if department has no staff (edge case)

## Testing Strategy

1. **Component Testing**: Verify StaffCard renders correctly with various data combinations
2. **Route Testing**: Ensure all 6 department routes resolve correctly
3. **Responsive Testing**: Verify grid layout adapts to different screen sizes
4. **Theme Testing**: Confirm dark/light mode styling works correctly

## UI/UX Considerations

### Visual Design
- Consistent with existing website aesthetic
- Glass-morphism card style matching TeamGlassCard
- Smooth hover animations
- Clear visual hierarchy

### Navigation Flow
```mermaid
graph LR
    A[Home] --> B[/stuffs]
    B --> C[/stuffs/chemistry]
    B --> D[/stuffs/biology]
    B --> E[/stuffs/physics]
    B --> F[/stuffs/mathematics]
    B --> G[/stuffs/statistics]
    B --> H[/stuffs/industrial-chemistry]
```

### Responsive Breakpoints
- Mobile (< 640px): 1 column grid
- Tablet (640px - 1024px): 2 column grid
- Desktop (> 1024px): 3-4 column grid

## SEO Implementation

Each page will include:
- Dynamic page title: `{Department} Staff | College of Science`
- Meta description with department context
- Breadcrumb JSON-LD structured data
- Open Graph tags for social sharing
