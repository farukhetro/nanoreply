"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Settings,
    CreditCard,
    LogOut,
    Menu,
    X,
    User,
    Building2
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Upgrade Plan", href: "/dashboard/upgrade", icon: CreditCard },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter(); // Import this
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const handleSignOut = async () => {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-muted/20 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-64 bg-background border-r border-border transition-transform duration-300 lg:translate-x-0 lg:static",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Logo className="h-8 w-8" />
                    </Link>
                    <button
                        className="ml-auto lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={isActive ? "default" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-3 mb-1",
                                        isActive && "bg-primary text-primary-foreground shadow-sm",
                                        !isActive && "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        );
                    })}
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <Link href="/dashboard/upgrade" className="block">
                            <Button size="sm" className="w-full text-xs h-8 shadow-sm">
                                Upgrade Plan
                            </Button>
                        </Link>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={handleSignOut}
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b border-border bg-background/50 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        {/* Business Status Indicator */}
                        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-muted/30 border border-border">
                            <div className="flex items-center gap-2 border-r border-border pr-3">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Select Business</span>
                            </div>
                            <div className="flex items-center gap-1.5 pl-1">
                                <div className="h-2 w-2 rounded-full bg-gray-300" />
                                <span className="text-xs font-medium text-muted-foreground">Not Connected</span>
                            </div>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">{user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}</p>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
                                {user?.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="User" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-5 w-5 text-primary" />
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
