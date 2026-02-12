import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
    title: 'Login - Access Your Google Business Automation Dashboard',
    description: 'Sign in to ReplyBuzz with your Google account. Manage automated review replies, blog posts, and AI-generated images for your Google Business Profile.',
    keywords: ['login', 'sign in', 'google business login', 'automation dashboard access'],
    path: '/login',
});

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
