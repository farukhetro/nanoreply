import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date();

    return [
        {
            url: BASE_URL,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/login`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/register`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/dashboard`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/dashboard/settings`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/dashboard/upgrade`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/legal/privacy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/legal/terms`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/legal/dpa`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];
}
