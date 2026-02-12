"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in";
import { useToast } from "@/components/providers/toast-provider";
import {
    Building2,
    MapPin,
    Settings as SettingsIcon,
    BrainCircuit,
    Link as LinkIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Default state
    const [settings, setSettings] = useState({
        businessName: "The Dental Studio",
        category: "dental",
        keywords: "dentist, teeth cleaning, dental implants, emergency dentist, local dentist",
        tone: "professional",
        autoPublish: true
    });

    useEffect(() => {
        // Auth Check
        if (!localStorage.getItem('user')) {
            router.push('/login');
            return;
        }

        // Load settings
        const saved = localStorage.getItem('settings');
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, [router]);


    const handleSave = () => {
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            localStorage.setItem('settings', JSON.stringify(settings));
            setLoading(false);
            toast("Settings saved successfully!", "success");
        }, 1000);
    };

    const handleConnect = () => {
        toast("Redirecting to Google Business Profile...", "info");
    };

    const handleChange = (field: string, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-8">
            <FadeIn>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your business profile and AI preferences.
                    </p>
                </div>
            </FadeIn>

            <StaggerContainer className="grid gap-6">
                {/* Google Connection */}
                <FadeIn delay={0.1}>
                    <Card className="border-primary/20 bg-primary/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle>Google Business Profile</CardTitle>
                                <CardDescription>Connect your business to enable AI automation.</CardDescription>
                            </div>
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <LinkIcon className="h-5 w-5 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <span className="text-blue-600 font-bold">G</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">My Business</p>
                                        <p className="text-xs text-muted-foreground">Connected</p>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                                    Active
                                </Badge>
                            </div>
                            <Button variant="outline" className="w-full" onClick={handleConnect}>
                                Manage Connection
                            </Button>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* Business Info */}
                <FadeIn delay={0.2}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <CardTitle>Business Information</CardTitle>
                                    <CardDescription>Update your business details for local SEO.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Business Name</label>
                                    <Input
                                        value={settings.businessName}
                                        onChange={(e) => handleChange('businessName', e.target.value)}
                                        placeholder="Enter business name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <Input
                                        value={settings.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        placeholder="e.g. Dental Clinic, Marketing Agency, Restaurant"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-9" defaultValue="123 Main St, New York, NY" placeholder="Business address" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input defaultValue="+1 (555) 000-0000" placeholder="Business phone" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* AI Preferences */}
                <FadeIn delay={0.3}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <BrainCircuit className="h-5 w-5 text-muted-foreground" />
                                <div className="space-y-1">
                                    <CardTitle>AI Configuration</CardTitle>
                                    <CardDescription>Customize how the AI interacts with your customers.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Reply Tone</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {["Professional", "Friendly", "Premium"].map((t) => (
                                        <div
                                            key={t}
                                            className={`
                        cursor-pointer rounded-lg border p-4 text-center transition-all hover:bg-muted/50
                        ${settings.tone === t.toLowerCase() ? "border-primary ring-1 ring-primary bg-primary/5" : "border-input"}
                      `}
                                            onClick={() => handleChange('tone', t.toLowerCase())}
                                        >
                                            <span className="text-sm font-medium">{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">SEO Keywords</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={settings.keywords}
                                    onChange={(e) => handleChange('keywords', e.target.value)}
                                    placeholder="Enter keywords separated by commas"
                                />
                                <p className="text-xs text-muted-foreground">
                                    AI will prioritize these keywords in blog posts.
                                </p>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg border border-input bg-muted/20">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium">Auto-Publish Content</label>
                                    <p className="text-xs text-muted-foreground">Automatically post AI-generated content daily.</p>
                                </div>
                                <div
                                    className={`h-6 w-11 rounded-full relative cursor-pointer transition-colors ${settings.autoPublish ? 'bg-primary' : 'bg-gray-200'}`}
                                    onClick={() => handleChange('autoPublish', !settings.autoPublish)}
                                >
                                    <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${settings.autoPublish ? 'right-1' : 'left-1'}`} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="ml-auto" onClick={handleSave} disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>
                </FadeIn>
            </StaggerContainer>
        </div>
    );
}
