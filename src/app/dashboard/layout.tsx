"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    LayoutDashboard,
    Settings,
    CreditCard,
    LogOut,
    Sparkles,
    Menu,
    X,
    User,
    Building2
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                            NanoReply
                        </span>
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
                        <p className="text-xs font-medium text-muted-foreground mb-2">My Plan: Basic</p>
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span>Posts</span>
                            <span>12/15</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[80%]" />
                        </div>
                        <Link href="/dashboard/upgrade" className="block mt-3">
                            <Button size="sm" variant="outline" className="w-full text-xs h-7">
                                Upgrade
                            </Button>
                        </Link>
                    </div>

                    <Link href="/login">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </Link>
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
                                <span className="text-sm font-medium">Business: X</span>
                            </div>
                            <div className="flex items-center gap-1.5 pl-1">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-medium text-muted-foreground">Connected</span>
                            </div>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-muted-foreground">Business Owner</p>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                <User className="h-5 w-5 text-primary" />
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
