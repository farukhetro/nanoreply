"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/providers/toast-provider";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            toast("Reset link sent! Check your email.", "success");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Link href="/">
                            <Sparkles className="h-8 w-8 text-primary mx-auto" />
                        </Link>
                        <span className="text-2xl font-bold gradient-text">NanoReply</span>
                    </div>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>
                        {submitted
                            ? "Check your email for reset instructions"
                            : "Enter your email to receive reset instructions"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-4">
                            <p className="text-sm text-muted-foreground">
                                We've sent password reset instructions to <strong>{email}</strong>
                            </p>
                            <Link href="/login">
                                <Button className="w-full">Back to Login</Button>
                            </Link>
                        </div>
                    )}
                    {!submitted && (
                        <div className="mt-6 text-center text-sm">
                            <Link href="/login" className="text-primary font-medium hover:underline">
                                Back to login
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
