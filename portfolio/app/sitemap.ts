import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/sheets';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://parth-nuwal-dev.vercel.app';

    // Base pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/#projects`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/#skills`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Dynamic project pages
    let projectPages: MetadataRoute.Sitemap = [];
    try {
        const projects = await getProjects();
        projectPages = projects.map((project) => ({
            url: `${baseUrl}/projects/${project.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));
    } catch (error) {
        console.error('Error fetching projects for sitemap:', error);
    }

    return [...staticPages, ...projectPages];
}
