"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (plan: 'basic' | 'growth' | 'pro') => {
        setLoading(true);
        const res = await loadRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            const data = await fetch(`/api/razorpay/create?plan=${plan}`, { method: 'POST' }).then((t) => t.json());

            if (data.error) {
                alert('Order creation failed: ' + data.error);
                setLoading(false);
                return;
            }

            const options = {
                key: data.key,
                amount: data.amount,
                currency: "INR",
                name: "ReplyBuzz",
                description: `Subscribe to ${plan.toUpperCase()} Plan`,
                order_id: data.order_id,

                // Success Handler
                handler: async function (response: any) {
                    // Verify payment on the backend
                    try {
                        const verifyRes = await fetch('/api/razorpay/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ...response, plan }),
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyData.status === 'success') {
                            router.push('/dashboard?success=payment'); // Redirect with param
                        } else {
                            alert('Payment verification failed: ' + verifyData.message);
                        }
                    } catch (err) {
                        console.error(err);
                        alert('Verification error. Please contact support.');
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#7C3AED" // Purple
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Payment Error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Scalable Plans for Every Business
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                    Choose the plan that fits your growth needs.
                </p>
            </div>

            <div className="grid max-w-7xl mx-auto gap-8 lg:grid-cols-3">
                {/* Basic Plan */}
                <Card className="flex flex-col justify-between border-2 hover:border-purple-500 transition-colors">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-900">Basic</CardTitle>
                        <CardDescription>Essential automation for starters.</CardDescription>
                        <div className="mt-4 text-4xl font-extrabold text-gray-900">₹299<span className="text-base font-medium text-gray-500">/mo</span></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" /> 30 AI Replies / mo</li>
                            <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" /> Basic Analytics</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" disabled={loading} onClick={() => handlePayment('basic')}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Get Started'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Growth Plan */}
                <Card className="flex flex-col justify-between border-2 border-purple-500 shadow-xl scale-105 relative bg-white">
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">MOST POPULAR</div>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-purple-600">Growth</CardTitle>
                        <CardDescription>Perfect for growing businesses.</CardDescription>
                        <div className="mt-4 text-4xl font-extrabold text-gray-900">₹499<span className="text-base font-medium text-gray-500">/mo</span></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-start"><Check className="h-5 w-5 text-purple-600 mr-2" /> 100 AI Replies / mo</li>
                            <li className="flex items-start"><Check className="h-5 w-5 text-purple-600 mr-2" /> 4 Nano Banana Photos</li>
                            <li className="flex items-start"><Check className="h-5 w-5 text-purple-600 mr-2" /> Priority Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 font-bold" disabled={loading} onClick={() => handlePayment('growth')}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Get Started'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="flex flex-col justify-between border-2 hover:border-purple-500 transition-colors">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-900">Pro</CardTitle>
                        <CardDescription>Maximum power & automation.</CardDescription>
                        <div className="mt-4 text-4xl font-extrabold text-gray-900">₹999<span className="text-base font-medium text-gray-500">/mo</span></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" /> Unlimited Replies</li>
                            <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" /> 10 Nano Banana Photos</li>
                            <li className="flex items-start"><Check className="h-5 w-5 text-green-500 mr-2" /> 4 Blog Posts / mo</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" disabled={loading} onClick={() => handlePayment('pro')}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Get Started'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
