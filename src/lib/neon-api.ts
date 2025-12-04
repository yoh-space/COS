import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export const neonApi = {
  async getDepartments() {
    return await sql`SELECT * FROM "Department" ORDER BY "name" ASC`;
  },

  async getDepartmentBySlug(slug: string) {
    const result = await sql`SELECT * FROM "Department" WHERE slug = ${slug}`;
    return result[0];
  },

  async getVisionMission() {
    return await sql`SELECT * FROM "VisionMission"`;
  },

  async getDeanMessage() {
    return await sql`SELECT * FROM "DeanMessage" WHERE status = 'published' ORDER BY "publishedAt" DESC LIMIT 1`;
  },

  async getBlogPosts(limit = 10) {
    return await sql`SELECT * FROM "BlogPost" WHERE status = 'published' ORDER BY "publishedAt" DESC LIMIT ${limit}`;
  },

  async getBlogPostBySlug(slug: string) {
    const result = await sql`SELECT * FROM "BlogPost" WHERE slug = ${slug}`;
    return result[0];
  },

  async getSuccessStories() {
    return await sql`SELECT * FROM "SuccessStory" WHERE status = 'published' ORDER BY "displayOrder" ASC, "createdAt" DESC`;
  },

  async getAcademicPrograms() {
    return await sql`SELECT * FROM "AcademicProgram" WHERE status = 'active' ORDER BY "displayOrder" ASC`;
  },

  async getAdministrators() {
    return await sql`SELECT * FROM "Administrator" WHERE status = 'active' ORDER BY "displayOrder" ASC`;
  },

  async getBackgroundContent() {
    return await sql`SELECT * FROM "BackgroundContent" ORDER BY "createdAt" DESC LIMIT 1`;
  },

  async getStaffByDepartment(departmentId: string) {
    return await sql`SELECT * FROM "StaffMember" WHERE "departmentId" = ${departmentId} AND status = 'active'`;
  },
};
