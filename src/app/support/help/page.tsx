import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HelpPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">Help Center</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Find answers to frequently asked questions and learn how to get the most out of ReplyBuzz.
                </p>

                <div className="relative max-w-lg mx-auto">
                    <Input
                        type="search"
                        placeholder="Search for answers..."
                        className="pl-10 h-12 text-lg shadow-sm"
                    />
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="grid gap-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Getting Started</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>How do I connect my Google Business Profile?</AccordionTrigger>
                                    <AccordionContent>
                                        Go to your Dashboard and click the "Connect Google Business" button. You will be redirected to Google to authorize access. Once approved, your profile will be automatically linked.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>How long does it take to see results?</AccordionTrigger>
                                    <AccordionContent>
                                        Our AI starts replying to new reviews immediately after you connect. Generated content like blogs and photos will start appearing according to your plan schedule (usually within 24 hours).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Can I edit the AI-generated replies?</AccordionTrigger>
                                    <AccordionContent>
                                        Currently, our AI replies instantly to ensure speed. However, you can manage your brand voice settings in the dashboard to influence the tone and style of future replies.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Billing & Subscription</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>Can I upgrade or downgrade my plan at any time?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes, you can change your plan at any time from your account settings. Changes will be reflected in your next billing cycle.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                                    <AccordionContent>
                                        We accept all major credit cards, debit cards, and UPI via our secure payment partner, Razorpay.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-6">
                                    <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                                    <AccordionContent>
                                        We offer a 7-day money-back guarantee if you are not satisfied with our service. Contact support for assistance.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Account Management</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-7">
                                    <AccordionTrigger>How do I change my password?</AccordionTrigger>
                                    <AccordionContent>
                                        You can change your password in the Settings page of your dashboard. If you forgot your password, use the "Forgot Password" link on the login page.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-8">
                                    <AccordionTrigger>Can I add team members?</AccordionTrigger>
                                    <AccordionContent>
                                        Team management is available on our Pro and Enterprise plans. Basic and Growth plans are for single users only.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </section>
            </div>

            <div className="text-center mt-12 bg-gray-50 rounded-lg p-8 border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">Can't find the answer you're looking for?</p>
                <a href="/support/contact">
                    <Button>Contact Support</Button>
                </a>
            </div>
        </div>
    );
}
