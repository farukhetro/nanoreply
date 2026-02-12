"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in";
import { useToast } from "@/components/providers/toast-provider";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function UpgradePage() {
    const { toast } = useToast();

    const handleUpgrade = (planName: string) => {
        toast(`Upgrading to ${planName}... Redirecting to payment.`, "success");
    };

    return (
        <div className="space-y-8">
            <FadeIn>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Plan</h1>
                    <p className="text-muted-foreground mt-1">
                        Unlock more features and grow your business faster.
                    </p>
                </div>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                {plans.map((plan, index) => (
                    <FadeIn key={plan.name} delay={index * 0.1}>
                        <Card
                            className={`
                relative h-full flex flex-col transition-all duration-300
                ${plan.popular ? "border-primary shadow-lg scale-105 z-10" : "hover:border-primary/50 hover:shadow-md"}
                ${plan.current ? "bg-muted/50 border-muted" : ""}
              `}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}
                            {plan.current && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <Badge variant="secondary" className="px-3 py-1 text-xs">
                                        Current Plan
                                    </Badge>
                                </div>
                            )}

                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {plan.name}
                                </CardTitle>
                                <div className="mt-2">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold">{plan.price}</span>
                                        {plan.price !== "Contact Us" && (
                                            <span className="text-muted-foreground text-sm font-normal">/mo</span>
                                        )}
                                    </div>
                                    {plan.price !== "Contact Us" && (
                                        <p className="text-xs text-muted-foreground mt-1">Billed monthly</p>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ul className="space-y-3 text-sm">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant={plan.popular ? "default" : "outline"}
                                    disabled={plan.current}
                                    onClick={() => handleUpgrade(plan.name)}
                                >
                                    {plan.current ? "Current Plan" : plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    </FadeIn>
                ))}
            </StaggerContainer>

            <FadeIn delay={0.4}>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 text-center space-y-4 max-w-3xl mx-auto mt-8">
                    <Sparkles className="h-8 w-8 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">Need a custom solution?</h3>
                    <p className="text-muted-foreground">
                        For agencies managing 50+ locations, we offer custom pricing, white-label options, and API access.
                    </p>
                    <Button variant="ghost" className="text-primary hover:underline">Contact Sales Team &rarr;</Button>
                </div>
            </FadeIn>
        </div>
    );
}

const plans = [
    {
        name: "Basic",
        price: "₹299",
        popular: false,
        current: false,
        cta: "Choose Basic",
        features: [
            "15 blog posts/month",
            "15 AI photos/month",
            "20 replies/day",
            "1 location",
            "Standard support",
        ],
    },
    {
        name: "Growth",
        price: "₹499",
        popular: true,
        current: false,
        cta: "Upgrade to Growth",
        features: [
            "30 blog posts/month",
            "30 AI photos/month",
            "50 replies/day",
            "3 locations",
            "Priority support",
            "Advanced Analytics"
        ],
    },
    {
        name: "Pro",
        price: "₹999",
        popular: false,
        current: false,
        cta: "Upgrade to Pro",
        features: [
            "Unlimited posts",
            "60 AI photos/month",
            "Unlimited replies",
            "10 locations",
            "24/7 Priority support",
            "Custom AI training",
            "Auto-pilot mode"
        ],
    },
    {
        name: "Enterprise",
        price: "Contact Us",
        popular: false,
        current: false,
        cta: "Contact Sales",
        features: [
            "Unlimited everything",
            "Dedicated account manager",
            "Custom integrations",
            "SLA guarantee",
            "API Access",
            "White-label Reports"
        ],
    },
];
