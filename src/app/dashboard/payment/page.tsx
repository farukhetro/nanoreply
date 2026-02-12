"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { FadeIn } from "@/components/ui/fade-in";

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const plan = searchParams.get("plan") || "Plan";
    const price = searchParams.get("price") || "";

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePayment = () => {
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        }, 2000);
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold">Payment Successful!</h1>
                <p className="text-muted-foreground">You are now subscribed to the {plan}.</p>
                <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto py-10">
            <FadeIn>
                <Card>
                    <CardHeader>
                        <CardTitle>Complete Your Upgrade</CardTitle>
                        <CardDescription>Secure payment for {plan}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div>
                                <p className="font-medium">{plan}</p>
                                <p className="text-sm text-muted-foreground">Monthly subscription</p>
                            </div>
                            <p className="text-xl font-bold">{price}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Expiry</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        disabled
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">CVC</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-md">
                            This is a demo payment page. No real money will be charged.
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Processing..." : `Pay ${price}`}
                        </Button>
                    </CardFooter>
                </Card>
            </FadeIn>
        </div>
    );
}
