export type DepartmentSlug = 
  | 'chemistry'
  | 'industrial-chemistry'
  | 'biology'
  | 'physics'
  | 'mathematics'
  | 'statistics';

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  specialization: string;
  email: string;
  image?: string;
  department: DepartmentSlug;
  social?: {
    telegram?: string;
    twitter?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

export interface Department {
  name: string;
  slug: DepartmentSlug;
  description: string;
}
