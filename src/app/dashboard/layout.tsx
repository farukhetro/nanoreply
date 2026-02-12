"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Settings,
    LogOut,
    Menu,
    X,
    Building2
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { User } from '@supabase/supabase-js';

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [businessStatus, setBusinessStatus] = useState({ name: "", isConnected: false });

    useEffect(() => {
        const fetchUser = async () => {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();

        const checkSettings = () => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('settings');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed.isConnected) {
                        setBusinessStatus({ name: parsed.businessName || "My Business", isConnected: true });
                    } else {
                        setBusinessStatus({ name: "", isConnected: false });
                    }
                }
            }
        };
        checkSettings();
        const interval = setInterval(checkSettings, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSignOut = async () => {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="h-screen bg-muted/20 flex overflow-hidden">
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
                    "fixed top-0 left-0 z-50 h-full w-64 bg-background border-r border-border transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Fixed Header */}
                <div className="h-16 flex items-center px-6 border-b border-border shrink-0 bg-background">
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

                {/* Scrollable Navigation Area */}
                <div className="flex-1 overflow-y-auto p-4 content-start">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link key={item.name} href={item.href}>
                                    <Button
                                        variant={isActive ? "default" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-3",
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
                </div>

                {/* Fixed Footer with Padding Bottom */}
                <div className="p-4 bg-background border-t border-border shrink-0 z-20 pb-8 rounded-t-sm">
                    {/* Upgrade Banner in Footer */}
                    <Link href="/dashboard/upgrade" className="block transform transition-transform hover:scale-[1.02] mb-4">
                        <div className="p-4 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="font-bold text-sm mb-0.5">Upgrade to Pro</p>
                                <p className="text-[10px] text-white/80 mb-2">Unlock unlimited AI generations.</p>
                                <Button size="sm" variant="secondary" className="w-full text-xs h-7 shadow-none bg-white/20 hover:bg-white/30 text-white border-0 font-semibold">
                                    Upgrade Now
                                </Button>
                            </div>
                            <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-white/10 rounded-full blur-xl"></div>
                        </div>
                    </Link>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden relative shrink-0">
                            {user?.user_metadata?.avatar_url ? (
                                <Image
                                    src={user.user_metadata.avatar_url}
                                    alt="User"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                    {user?.email?.[0].toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-foreground">{user?.user_metadata?.name || 'User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-600"
                            onClick={handleSignOut}
                            title="Sign Out"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center justify-between shrink-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className={`hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full border transition-colors ${businessStatus.isConnected ? 'bg-green-50 border-green-200' : 'bg-muted/30 border-border'}`}>
                            <div className={`flex items-center gap-2 border-r pr-3 ${businessStatus.isConnected ? 'border-green-200' : 'border-border'}`}>
                                <Building2 className={`h-4 w-4 ${businessStatus.isConnected ? 'text-green-600' : 'text-muted-foreground'}`} />
                                <span className={`text-sm font-medium ${businessStatus.isConnected ? 'text-green-900' : ''}`}>
                                    {businessStatus.isConnected ? businessStatus.name : "Select Business"}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 pl-1">
                                <div className={`h-2 w-2 rounded-full ${businessStatus.isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                                <span className={`text-xs font-medium ${businessStatus.isConnected ? 'text-green-700' : 'text-muted-foreground'}`}>
                                    {businessStatus.isConnected ? "Active" : "Not Connected"}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
                    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
