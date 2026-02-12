"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    FileText,
    Image as ImageIcon,
    MessageSquare,
    CheckCircle2,
    TrendingUp,
    Clock,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({ blogPosts: 0, aiPhotos: 0, repliesToday: 0, repliesMonth: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                return;
            }
            setUser({
                name: user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0],
                email: user.email,
                image: user.user_metadata?.avatar_url || user.user_metadata?.picture
            });

            // Simulate data fetch for stats (can be connected to DB later)
            setLoading(false);
        };

        fetchUser();
    }, [router]);



    // Optional: Show loading state or skeleton
    if (loading && !user) return <div className="p-8">Loading dashboard...</div>;

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Hello, {user?.name || user?.email?.split('@')[0] || 'User'}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Here's what's happening with your business today.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/dashboard/settings">
                        <Button size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Connect Business
                        </Button>
                    </Link>
                </div>
            </div>

            {/* MainStatus Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Blog Post Status */}
                <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-2xl font-bold">{stats.blogPosts}</span>
                            {stats.blogPosts > 0 && <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">+2 this week</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.blogPosts > 0 ? "Scheduled and published." : "Connect business to schedule posts."}
                        </p>
                    </CardContent>
                </Card>

                {/* AI Photo Status */}
                <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Photos</CardTitle>
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-2xl font-bold">{stats.aiPhotos}</span>
                            {stats.aiPhotos > 0 && <span className="text-xs text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">Active</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.aiPhotos > 0 ? "Generated for social media." : "No photos generated yet."}
                        </p>
                    </CardContent>
                </Card>

                {/* Reply Status */}
                <Card className="hover:shadow-md transition-shadow h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Review Replies</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-2xl font-bold">{stats.repliesToday}</span>
                            <span className="text-xs text-muted-foreground">/ {stats.repliesMonth} total</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Replied today.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Activity & Upsell Section */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Activity Feed */}
                <div className="md:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Real-time updates from your AI agent.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col space-y-4">
                                {loading ? (
                                    <div className="text-center py-8">Loading activity...</div>
                                ) : stats.repliesToday > 0 ? (
                                    <>
                                        <div className="flex items-start gap-4 p-3 bg-muted/20 rounded-lg">
                                            <div className="p-2 bg-green-100 text-green-600 rounded-full mt-1">
                                                <MessageSquare className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Replied to a review from Sarah J.</p>
                                                <p className="text-xs text-muted-foreground">2 hours ago • 5 stars</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-3 bg-muted/20 rounded-lg">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full mt-1">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Published weekly blog post</p>
                                                <p className="text-xs text-muted-foreground">5 hours ago • "Top 5 Dental Tips"</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                        <div className="p-4 rounded-full bg-muted/50">
                                            <Clock className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">No activity yet</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Connect your business to start automating.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Upgrade Card */}
                <div>
                    <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 h-full flex flex-col">
                        <CardHeader>
                            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle>Unlock More Power</CardTitle>
                            <CardDescription>
                                Start growing your business with our premium plans.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1 flex flex-col">
                            <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Automated Google Posts</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Instant Review Replies</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Advanced Analytics</span>
                                </li>
                            </ul>
                            <div className="pt-4 mt-auto">
                                <Link href="/dashboard/upgrade">
                                    <Button className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                                        View Plans
                                    </Button>
                                </Link>
                                <p className="text-xs text-center text-muted-foreground mt-2">
                                    Starting at just ₹299/mo
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
