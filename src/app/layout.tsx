import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NanoReply - AI Automation for Google Business",
  description: "Automate Google reviews, posts, and images with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, "antialiased min-h-screen font-sans bg-background text-foreground")}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
