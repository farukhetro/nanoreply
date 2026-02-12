"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { useState, Suspense } from "react";
import { FadeIn } from "@/components/ui/fade-in";

function PaymentContent() {
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

    return (
        <FadeIn>
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
                        <CardDescription>
                            You&apos;re upgrading to the <span className="font-semibold text-foreground">{plan}</span> plan
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {success ? (
                            <div className="text-center py-8">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                                <p className="text-muted-foreground">
                                    Redirecting you to the dashboard...
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Plan</span>
                                        <span className="font-semibold">{plan}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Billing Cycle</span>
                                        <span className="font-semibold">Monthly</span>
                                    </div>
                                    <div className="border-t pt-4 flex justify-between items-center">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span className="text-2xl font-bold text-primary">{price}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Card Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                disabled={loading}
                                            />
                                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                disabled={loading}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                    {!success && (
                        <CardFooter>
                            <Button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full"
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>Pay {price}</>
                                )}
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </FadeIn>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
