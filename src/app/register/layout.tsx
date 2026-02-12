import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
    title: 'Sign Up - Start Automating Your Google Business Profile Today',
    description: 'Create your free ReplyBuzz account and start automating Google Business Profile management. Get 24/7 review replies, daily SEO posts, and AI-generated images.',
    keywords: ['sign up', 'register', 'create account', 'google business automation', 'free trial', 'get started'],
    path: '/register',
});

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
