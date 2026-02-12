import { Metadata } from 'next';
import { generateMetadata, KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
    title: 'Dashboard - Manage Your Google Business Automation',
    description: 'Access your Google Business Profile automation dashboard. Monitor review replies, blog posts, AI-generated images, and analytics in real-time.',
    keywords: KEYWORDS.dashboard,
    path: '/dashboard',
    noIndex: true, // Dashboard pages should not be indexed
});

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
