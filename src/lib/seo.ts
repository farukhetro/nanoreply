import { Metadata } from 'next';

// Base URL for the application
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://replybuzz.com';
export const SITE_NAME = 'ReplyBuzz';
export const SITE_DESCRIPTION = 'AI-powered Google Business Profile automation platform. Automate review replies, daily SEO blog posts, and professional image generation. Boost local SEO rankings and save time with 24/7 automated responses.';

// Default SEO configuration
export const DEFAULT_SEO = {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    twitterHandle: '@replybuzz',
    twitterCard: 'summary_large_image' as const,
};

// Keywords for different pages
export const KEYWORDS = {
    home: [
        'google business profile automation',
        'automated review replies',
        'AI review responses',
        'google business SEO',
        'local SEO automation',
        'google my business automation',
        'automated blog posts',
        'AI content generation',
        'business profile management',
        'review management software',
        'local business marketing',
        'google business profile optimization',
        'automated social media posts',
        'AI marketing automation',
        'small business automation tools',
    ],
    dashboard: [
        'business dashboard',
        'analytics dashboard',
        'google business analytics',
        'review management dashboard',
        'automated reporting',
    ],
    pricing: [
        'google business automation pricing',
        'review management pricing',
        'affordable SEO automation',
        'business automation plans',
        'local SEO pricing',
    ],
};

// Generate metadata for pages
export function generateMetadata({
    title,
    description,
    keywords,
    path = '',
    image,
    noIndex = false,
}: {
    title: string;
    description: string;
    keywords?: string[];
    path?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const url = `${BASE_URL}${path}`;
    const ogImage = image || `${BASE_URL}/og-image.png`;

    return {
        title: {
            default: title,
            template: `%s | ${SITE_NAME}`,
        },
        description,
        keywords: keywords?.join(', '),
        authors: [{ name: SITE_NAME }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: DEFAULT_SEO.locale,
            type: 'website',
        },
        twitter: {
            card: DEFAULT_SEO.twitterCard,
            title,
            description,
            images: [ogImage],
            creator: DEFAULT_SEO.twitterHandle,
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
    };
}

// Generate JSON-LD structured data for Organization
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        description: SITE_DESCRIPTION,
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@replybuzz.com',
            contactType: 'Customer Support',
            availableLanguage: ['English'],
        },
        sameAs: [
            'https://twitter.com/replybuzz',
            'https://linkedin.com/company/replybuzz',
            'https://facebook.com/replybuzz',
        ],
    };
}

// Generate JSON-LD structured data for SoftwareApplication
export function generateSoftwareApplicationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'INR',
            lowPrice: '299',
            highPrice: '999',
            offerCount: '3',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '127',
            bestRating: '5',
            worstRating: '1',
        },
        description: SITE_DESCRIPTION,
        url: BASE_URL,
        screenshot: `${BASE_URL}/screenshot.png`,
        featureList: [
            '24/7 Automated Review Replies',
            'Daily SEO-Optimized Blog Posts',
            'AI-Generated Professional Images',
            'Multi-Location Support',
            'Advanced Analytics Dashboard',
            'Custom Brand Voice Training',
        ],
    };
}

// Generate JSON-LD structured data for WebSite
export function generateWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: BASE_URL,
        description: SITE_DESCRIPTION,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

// Generate JSON-LD structured data for Product/Service
export function generateProductSchema({
    name,
    description,
    price,
    currency = 'INR',
}: {
    name: string;
    description: string;
    price: string;
    currency?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        brand: {
            '@type': 'Brand',
            name: SITE_NAME,
        },
        offers: {
            '@type': 'Offer',
            price,
            priceCurrency: currency,
            availability: 'https://schema.org/InStock',
            url: `${BASE_URL}/register`,
            priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                .toISOString()
                .split('T')[0],
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
        },
    };
}

// Generate JSON-LD structured data for FAQ
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

// Generate JSON-LD structured data for BreadcrumbList
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${BASE_URL}${item.url}`,
        })),
    };
}

// Generate JSON-LD structured data for HowTo
export function generateHowToSchema({
    name,
    description,
    steps,
}: {
    name: string;
    description: string;
    steps: { name: string; text: string }[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
        })),
    };
}
