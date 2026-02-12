import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { generateMetadata as genMeta, KEYWORDS, BASE_URL, SITE_NAME } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

// Enhanced SEO Metadata
export const metadata: Metadata = genMeta({
  title: `${SITE_NAME} - AI-Powered Google Business Profile Automation | Boost Local SEO`,
  description: "Automate your Google Business Profile with AI. Get 24/7 review replies, daily SEO blog posts, and professional images. Boost local rankings, save time, and grow your business on autopilot.",
  keywords: KEYWORDS.home,
  path: '/',
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, "antialiased min-h-screen font-sans bg-background text-foreground")}>
        <ThemeProvider defaultTheme="light">
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
