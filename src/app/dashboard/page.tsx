"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Image as ImageIcon,
    MessageSquare,
    TrendingUp,
    Clock,
    ExternalLink,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [stats] = useState({ blogPosts: 0, aiPhotos: 0, repliesToday: 0, repliesMonth: 0 }); // Removed setStats
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { createClient } = await import('@/lib/supabase/client');
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <div className="flex gap-2">
                        <Link href="/dashboard/settings">
                            <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Settings
                            </Button></Link>
                        <Link href="/dashboard/upgrade">
                            <Button size="sm">Upgrade Plan</Button>
                        </Link>
                    </div>
                </div>
                <p className="text-muted-foreground mt-1">
                    Here&apos;s what&apos;s happening with your business today.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.blogPosts}</div>
                        <p className="text-xs text-muted-foreground">
                            Total published posts
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Photos</CardTitle>
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.aiPhotos}</div>
                        <p className="text-xs text-muted-foreground">
                            Generated images
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Replies Today</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.repliesToday}</div>
                        <p className="text-xs text-muted-foreground">
                            Automated responses
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                            <CardDescription>Your activity this month</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Total Replies</span>
                                </div>
                                <span className="font-semibold">{stats.repliesMonth}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Blog Posts</span>
                                </div>
                                <span className="font-semibold">{stats.blogPosts}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Time Saved</span>
                                </div>
                                <span className="font-semibold">~{stats.repliesMonth * 5} min</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                <div>
                                    <CardTitle>Get Started</CardTitle>
                                    <CardDescription>
                                        Complete these steps to maximize your results
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                <span className="text-sm">Connect Google Business Profile</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                <span className="text-sm">Configure automation settings</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                <span className="text-sm">Review your first AI-generated content</span>
                            </div>
                            <div className="mt-4">
                                <Link href="/dashboard/settings">
                                    <Button variant="outline" className="w-full">
                                        Go to Settings
                                    </Button></Link>
                                <Link href="/dashboard/upgrade">
                                    <Button className="w-full mt-2">
                                        Upgrade to Premium
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
