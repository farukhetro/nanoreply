"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/providers/toast-provider";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";

export default function RegisterPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleRegister = async () => {
        setIsLoading(true);
        try {
            // Dynamic import to avoid SSR issues if any, though standard import is fine too but client.ts is safe.
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });

            if (error) {
                console.error(error);
                toast("Failed to register with Google", "error");
                setIsLoading(false);
            }
        } catch (err) {
            console.error(err);
            toast("An error occurred", "error");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                        <Logo className="h-10 w-10" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create an Account</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Continue with Google to access your account
                    </p>
                </div>

                <Card className="border shadow-xl bg-white overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-violet-500 via-primary to-blue-500" />
                    <CardHeader className="space-y-4 pb-6 pt-8 text-center">
                        <div className="mx-auto bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100 flex items-center gap-1.5 mb-2">
                            <ShieldCheck className="h-3 w-3 text-green-600" />
                            <span className="text-xs font-medium text-green-700">No Credit Card Required</span>
                        </div>
                        <CardDescription className="text-base">
                            Secure authentication powered by Google
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pb-8">
                        <Button
                            variant="outline"
                            className="w-full h-14 text-base font-medium border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 flex items-center justify-center gap-3 relative transition-all duration-300 group shadow-sm hover:shadow-md"
                            onClick={handleGoogleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                            ) : (
                                <>
                                    <svg className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    <span>Continue with Google</span>
                                    <ArrowRight className="h-4 w-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gray-400" />
                                </>
                            )}
                        </Button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                <span className="bg-white px-3">Start Automating Today</span>
                            </div>
                        </div>

                        <p className="text-center text-xs text-muted-foreground/80 leading-relaxed max-w-[280px] mx-auto">
                            By clicking continue, you agree to our{" "}
                            <Link href="/terms" className="underline underline-offset-2 hover:text-primary transition-colors">Terms of Service</Link>
                            {" "}and{" "}
                            <Link href="/privacy" className="underline underline-offset-2 hover:text-primary transition-colors">Privacy Policy</Link>.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
