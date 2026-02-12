"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in";
import { useToast } from "@/components/providers/toast-provider";
import {
    Building2,
    Settings as SettingsIcon,
    BrainCircuit,
    Link as LinkIcon
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [settings, setSettings] = useState({
        businessName: "",
        category: "",
        keywords: "",
        tone: "professional",
        autoPublish: false,
        isConnected: false
    });

    useEffect(() => {
        // Load settings
        const saved = localStorage.getItem('settings');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Fix: Remove mock data if present
            if (parsed.businessName === "Nano Banana Shop") {
                const resetSettings = {
                    businessName: "",
                    category: "",
                    keywords: "",
                    tone: "professional",
                    autoPublish: false,
                    isConnected: false
                };
                setSettings(resetSettings);
                localStorage.setItem('settings', JSON.stringify(resetSettings));
            } else {
                setSettings(parsed);
            }
        }
    }, []);

    const handleSave = () => {
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            localStorage.setItem('settings', JSON.stringify(settings));
            setLoading(false);
            toast("Settings saved successfully!", "success");
        }, 1000);
    };

    const handleConnect = async () => {
        try {
            toast("Redirecting to Google Business Profile...", "info");
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent('/dashboard/settings')}`,
                    scopes: 'https://www.googleapis.com/auth/business.manage',
                    queryParams: {
                        access_type: 'offline', // vital for refresh tokens
                        prompt: 'consent', // force consent to ensure we get the refresh token
                    },
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error(error);
            toast("Failed to initiate connection", "error");
        }
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
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${settings.isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                                        <Building2 className={`h-5 w-5 ${settings.isConnected ? 'text-green-600' : 'text-gray-400'}`} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{settings.isConnected ? (settings.businessName || "Connected Business") : "No Business Connected"}</p>
                                        <p className="text-xs text-muted-foreground">{settings.isConnected ? "Syncing data automatically" : "Connect to start automating"}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className={settings.isConnected ? "bg-green-50 text-green-600 border-green-200" : "bg-gray-50 text-gray-500"}>
                                    {settings.isConnected ? "Active" : "Offline"}
                                </Badge>
                            </div>
                            <Button
                                variant={settings.isConnected ? "outline" : "default"}
                                className="w-full"
                                onClick={settings.isConnected ? () => {
                                    setSettings(prev => ({ ...prev, isConnected: false, businessName: "" }));
                                    localStorage.setItem('settings', JSON.stringify({ ...settings, isConnected: false, businessName: "" }));
                                } : handleConnect}
                            >
                                {settings.isConnected ? "Disconnect Business" : "Manage Connection"}
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
        </div >
    );
}
