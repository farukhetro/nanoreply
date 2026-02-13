import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
                <p className="text-xl text-muted-foreground">
                    We're here to help. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                Email Us
                            </CardTitle>
                            <CardDescription>
                                For general inquiries and support
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <a href="mailto:support@replybuzz.com" className="text-primary hover:underline font-medium">
                                support@replybuzz.com
                            </a>
                            <p className="text-sm text-muted-foreground mt-2">
                                We typically reply within 24 hours.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                Live Chat
                            </CardTitle>
                            <CardDescription>
                                Chat with our support team
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Available Mon-Fri, 9am - 6pm IST
                            </p>
                            <Button variant="outline" className="w-full">Start Chat</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary" />
                                Call Us
                            </CardTitle>
                            <CardDescription>
                                Urgent matters only
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-medium">
                                +91 12345 67890
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Mon-Fri, 10am - 5pm IST
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and our team will get back to you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name</Label>
                                        <Input id="firstName" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input id="lastName" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="john@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="How can we help?" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us more about your inquiry..."
                                        className="min-h-[150px]"
                                    />
                                </div>

                                <Button type="submit" className="w-full md:w-auto md:px-8">
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
