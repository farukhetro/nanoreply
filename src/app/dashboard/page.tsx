"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in";
import {
    FileText,
    Image as ImageIcon,
    MessageSquare,
    CheckCircle2,
    XCircle,
    AlertCircle,
    TrendingUp,
    Clock,
    ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <FadeIn>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back, John! Here's what's happening today.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 px-3 py-1">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Connected to Google Business
                        </Badge>
                        <Button size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Profile
                        </Button>
                    </div>
                </div>
            </FadeIn>

            {/* Main Status Cards */}
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
                {/* Blog Post Status */}
                <FadeIn delay={0.1}>
                    <Card className="hover:shadow-md transition-shadow h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-2xl font-bold">Posted</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Today's SEO post is live on Google.
                            </p>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Monthly Goal</span>
                                    <span className="font-medium">12/15</span>
                                </div>
                                <Progress value={80} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* AI Photo Status */}
                <FadeIn delay={0.2}>
                    <Card className="hover:shadow-md transition-shadow h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">AI Photos</CardTitle>
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-2xl font-bold">Posted</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Daily image generated & published.
                            </p>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Monthly Goal</span>
                                    <span className="font-medium">11/15</span>
                                </div>
                                <Progress value={73} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* Reply Status */}
                <FadeIn delay={0.3}>
                    <Card className="hover:shadow-md transition-shadow h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Review Replies</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-2xl font-bold">14</span>
                                <span className="text-sm text-muted-foreground">replied today</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                6 replies remaining in daily quota.
                            </p>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Daily Limit</span>
                                    <span className="font-medium">14/20</span>
                                </div>
                                <Progress value={70} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>
            </StaggerContainer>

            {/* Activity & Upsell Section */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Activity Feed */}
                <FadeIn delay={0.4} className="md:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Real-time updates from your AI agent.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {activities.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-4 group">
                                        <div className={`p-2 rounded-full border ${activity.bg} ${activity.border} ${activity.text} mt-0.5 group-hover:scale-110 transition-transform`}>
                                            {activity.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{activity.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.desc}
                                            </p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {activity.time}
                                            </p>
                                        </div>
                                        {activity.action && (
                                            <Button variant="ghost" size="sm" className="ml-auto h-8 text-xs">
                                                View
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* Upgrade Card */}
                <FadeIn delay={0.5}>
                    <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 h-full flex flex-col">
                        <CardHeader>
                            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle>Unlock More Power</CardTitle>
                            <CardDescription>
                                You are on the <span className="font-semibold text-foreground">Basic Plan</span>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1 flex flex-col">
                            <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                                <li className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-muted-foreground/50" />
                                    <span>Limited to 1 location</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-muted-foreground/50" />
                                    <span>Only 15 posts/mo</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-muted-foreground/50" />
                                    <span>Basic analytics</span>
                                </li>
                            </ul>
                            <div className="pt-4 mt-auto">
                                <Link href="/dashboard/upgrade">
                                    <Button className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                                        Upgrade to Growth
                                    </Button>
                                </Link>
                                <p className="text-xs text-center text-muted-foreground mt-2">
                                    Get 30 posts + 3 locations
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </div>
    );
}

const activities = [
    {
        icon: <MessageSquare className="h-4 w-4" />,
        title: "Replied to a review",
        desc: "AI responded to a 5-star review from 'Sarah J.'",
        time: "2 hours ago",
        bg: "bg-blue-500/10",
        text: "text-blue-600",
        border: "border-blue-200",
        action: true,
    },
    {
        icon: <FileText className="h-4 w-4" />,
        title: "Published blog post",
        desc: "Topic: 'Top 5 Dental Hygiene Tips for Summer'",
        time: "5 hours ago",
        bg: "bg-green-500/10",
        text: "text-green-600",
        border: "border-green-200",
        action: true,
    },
    {
        icon: <ImageIcon className="h-4 w-4" />,
        title: "Uploaded new photo",
        desc: "Generated image showing clinic reception area.",
        time: "5 hours ago",
        bg: "bg-purple-500/10",
        text: "text-purple-600",
        border: "border-purple-200",
        action: true,
    },
    {
        icon: <AlertCircle className="h-4 w-4" />,
        title: "Daily quota warning",
        desc: "You have used 70% of your daily reply limit.",
        time: "6 hours ago",
        bg: "bg-yellow-500/10",
        text: "text-yellow-600",
        border: "border-yellow-200",
        action: false,
    },
];
