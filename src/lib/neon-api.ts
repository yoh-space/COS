import {
  getCachedDepartments,
  getCachedDepartmentBySlug,
  getCachedVisionMission,
  getCachedDeanMessage,
  getCachedBlogPosts,
  getCachedBlogPost,
  getCachedSuccessStories,
  getCachedAcademicPrograms,
  getCachedAdministrators,
  getCachedBackgroundContent,
  getCachedServices
} from './db-cache';
import { prisma } from './prisma';

export const neonApi = {
  async getDepartments() {
    return await getCachedDepartments();
  },

  async getDepartmentBySlug(slug: string) {
    return await getCachedDepartmentBySlug(slug);
  },

  async getVisionMission() {
    const data = await getCachedVisionMission();
    // Transform array to object expected by consumers if necessary, 
    // but the original query returned array. 
    // Original: SELECT * FROM "VisionMission" -> returns array of rows.
    return data;
  },

  async getDeanMessage() {
    return await getCachedDeanMessage();
  },

  async getBlogPosts(limit = 10) {
    const { blogPosts } = await getCachedBlogPosts(1, limit, '');
    return blogPosts;
  },

  async getBlogPostBySlug(slug: string) {
    return await getCachedBlogPost(slug);
  },

  async getSuccessStories() {
    return await getCachedSuccessStories('published');
  },

  async getAcademicPrograms() {
    return await getCachedAcademicPrograms('active');
  },

  async getAdministrators() {
    return await getCachedAdministrators('active');
  },

  async getBackgroundContent() {
    const content = await getCachedBackgroundContent();
    return [content]; // Original sql returns array
  },

  async getStaffByDepartment(departmentId: string) {
    // We don't have a cached function for this yet in db-cache.ts
    // Let's use prisma directly for now, or add it to db-cache.ts
    return await prisma.staffMember.findMany({
      where: {
        departmentId,
        status: 'active',
      },
    });
  },
};
