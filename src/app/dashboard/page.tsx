import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Image as ImageIcon, FileText, CheckCircle2 } from "lucide-react";
import { ConnectGbpCard } from "@/components/connect-gbp-card";

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Parallel fetch for data
    const [gbpRes, subRes] = await Promise.all([
        supabase.from('gbp_accounts').select('*').eq('user_id', user.id),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).maybeSingle()
    ]);

    const gbpAccounts = gbpRes.data || [];
    const subscription = subRes.data;
    const isActive = subscription?.status === 'active';



    // 1. Connect GBP State (Check first)
    if (gbpAccounts.length === 0) {
        return <ConnectGbpCard />;
    }

    // 2. Paywall Redirect
    if (!isActive) {
        redirect('/pricing');
    }

    // 3. Active Dashboard
    // Use plan-based limits if available, else fallback
    const plan = subscription?.plan || 'basic';
    const limits: any = {
        basic: { replies: 30, photos: 0, blogs: 0 },
        growth: { replies: 100, photos: 4, blogs: 0 },
        pro: { replies: 999999, photos: 10, blogs: 4 }
    };
    const currentLimit = limits[plan];

    const stats = {
        replies: { used: subscription?.replies_used || 0, limit: currentLimit.replies },
        photos: { used: subscription?.photos_used || 0, limit: currentLimit.photos },
        blogs: { used: subscription?.blogs_used || 0, limit: currentLimit.blogs }
    };

    // Handle success message from redirect
    const params = await searchParams;
    const successMsg = params.success;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your automation & content.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-purple-200">
                        {plan} Plan
                    </span>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Active
                    </div>
                </div>
            </header>

            {successMsg && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Success! </strong>
                    <span className="block sm:inline">Action completed successfully: {successMsg}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Replies Card */}
                <Card className="flex flex-col border-t-4 border-t-blue-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                            Smart Replies
                        </CardTitle>
                        <CardDescription>
                            Used: {stats.replies.used} / {stats.replies.limit > 1000 ? '∞' : stats.replies.limit}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.min((stats.replies.used / (stats.replies.limit > 1000 ? 100 : stats.replies.limit)) * 100, 100)}%` }}></div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <form action="/api/generate/reply" method="POST" className="w-full">
                            <Button type="submit" className="w-full" disabled={stats.replies.used >= stats.replies.limit}>
                                {stats.replies.used >= stats.replies.limit ? 'Limit Reached' : 'Generate Reply'}
                            </Button>
                        </form>
                    </CardFooter>
                </Card>

                {/* Photos Card */}
                <Card className="flex flex-col border-t-4 border-t-purple-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="h-5 w-5 text-purple-500" />
                            Nano Banana Photos
                        </CardTitle>
                        <CardDescription>
                            Used: {stats.photos.used} / {stats.photos.limit}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        {stats.photos.limit > 0 ? (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${Math.min((stats.photos.used / stats.photos.limit) * 100, 100)}%` }}></div>
                            </div>
                        ) : <div className="text-sm text-gray-500 mb-4">Not included in your plan</div>}
                    </CardContent>
                    <CardFooter>
                        <form action="/api/generate/photo" method="POST" className="w-full">
                            <Button type="submit" variant="secondary" className="w-full" disabled={stats.photos.used >= stats.photos.limit || stats.photos.limit === 0}>
                                {stats.photos.limit === 0 ? 'Upgrade to Use' : (stats.photos.used >= stats.photos.limit ? 'Limit Reached' : 'Create Photo')}
                            </Button>
                        </form>
                    </CardFooter>
                </Card>

                {/* Blogs Card */}
                <Card className="flex flex-col border-t-4 border-t-orange-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-orange-500" />
                            Blog Posts
                        </CardTitle>
                        <CardDescription>
                            Used: {stats.blogs.used} / {stats.blogs.limit}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        {stats.blogs.limit > 0 ? (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${Math.min((stats.blogs.used / stats.blogs.limit) * 100, 100)}%` }}></div>
                            </div>
                        ) : <div className="text-sm text-gray-500 mb-4">Not included in your plan</div>}
                    </CardContent>
                    <CardFooter>
                        <form action="/api/generate/blog" method="POST" className="w-full">
                            <Button type="submit" variant="outline" className="w-full" disabled={stats.blogs.used >= stats.blogs.limit || stats.blogs.limit === 0}>
                                {stats.blogs.limit === 0 ? 'Upgrade to Use' : (stats.blogs.used >= stats.blogs.limit ? 'Limit Reached' : 'Write Blog')}
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
