"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/providers/toast-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password && name) {
            setIsLoading(true);
            setTimeout(() => {
                // Mock checking if user exists
                const existingUser = localStorage.getItem('user'); // Basic check simulation

                localStorage.setItem('user', JSON.stringify({ email, name, id: 'fake-user-1' }));
                localStorage.setItem('token', 'fake-jwt');
                document.cookie = "token=fake-jwt; path=/; max-age=86400; SameSite=Lax";
                toast("Account created successfully!", "success");
                setIsLoading(false);
                router.push('/dashboard');
            }, 1000);
        } else {
            toast("Please fill in all fields", "error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center transition-colors">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            NanoReply
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create an Account</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Join thousands of businesses automating their growth
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
                            Enter your details to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pb-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="name">Full Name</label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="password">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-medium flex items-center justify-center gap-2 transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign Up
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                <span className="bg-white px-3">Already have an account?</span>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <p className="text-sm text-muted-foreground">
                                <Link href="/login" className="font-medium text-primary hover:underline">
                                    Sign in instead
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
