"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get("code");
            const error = searchParams.get("error");

            if (error) {
                setStatus("error");
                setErrorMessage(error);
                return;
            }

            if (!code) {
                setStatus("error");
                setErrorMessage("No authorization code found.");
                return;
            }

            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    setStatus("error");
                    setErrorMessage("You must be logged in to connect your account.");
                    return;
                }

                const response = await fetch("/api/callback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({ code }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to connect account.");
                }

                setStatus("success");

                // Handle popup flow
                if (window.opener) {
                    window.opener.postMessage("gbp-connected", window.location.origin);
                    setTimeout(() => {
                        window.close();
                    }, 1500);
                } else {
                    // Fallback to redirect
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 2000);
                }

            } catch (err: any) {
                console.error("Callback error:", err);
                setStatus("error");
                setErrorMessage(err.message || "An error occurred during connection.");
            }
        };

        handleCallback();
    }, [searchParams, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    {status === "loading" && (
                        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        </div>
                    )}
                    {status === "success" && (
                        <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                    )}
                    {status === "error" && (
                        <div className="mx-auto bg-red-100 p-3 rounded-full w-fit mb-4">
                            <XCircle className="h-8 w-8 text-red-600" />
                        </div>
                    )}

                    <CardTitle>
                        {status === "loading" && "Connecting Google Business Profile..."}
                        {status === "success" && "Successfully Connected!"}
                        {status === "error" && "Connection Failed"}
                    </CardTitle>
                    <CardDescription>
                        {status === "loading" && "Please wait while we finalize the setup."}
                        {status === "success" && "You can now close this window."}
                        {status === "error" && errorMessage}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    {status === "error" && (
                        <Button onClick={() => window.close()}>
                            Close Window
                        </Button>
                    )}
                    {!window.opener && status === "success" && (
                        <Button onClick={() => router.push("/dashboard")}>
                            Continue to Dashboard
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function CallbackPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <CallbackContent />
        </Suspense>
    );
}
