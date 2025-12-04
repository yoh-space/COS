import { MetadataRoute } from 'next';
import { neonApi } from '@/lib/neon-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cos.yotech.space';
  const currentDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about/vision-mission`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/staffs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/academic-programs`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    const [departments, blogPosts] = await Promise.all([
      neonApi.getDepartments(),
      neonApi.getBlogPosts(100),
    ]);

    const departmentPages: MetadataRoute.Sitemap = departments.map((dept: any) => ({
      url: `${baseUrl}/academics/${dept.slug}`,
      lastModified: new Date(dept.updatedAt || currentDate),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const staffPages: MetadataRoute.Sitemap = departments.map((dept: any) => ({
      url: `${baseUrl}/staffs/${dept.slug}`,
      lastModified: new Date(dept.updatedAt || currentDate),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || currentDate),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...departmentPages, ...staffPages, ...blogPages];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticPages;
  }
}
