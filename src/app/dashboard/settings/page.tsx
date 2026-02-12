"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // Assuming these exist, otherwise fallback
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, Wand2, Lightbulb, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [settings, setSettings] = useState({
        reply_tone: 'Professional',
        seo_keywords: '',
        auto_publish: false, // Default off
        photo_prompt: '',   // "Photo Command"
        blog_prompt: ''     // "Blog Command"
    });

    useEffect(() => {
        // Fetch existing settings
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setSettings({
                        reply_tone: data.reply_tone || 'Professional',
                        seo_keywords: data.seo_keywords || '',
                        auto_publish: data.auto_publish || false,
                        photo_prompt: data.photo_prompt || '',
                        blog_prompt: data.blog_prompt || ''
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                // Success feedback
                alert('Settings saved successfully!');
            } else {
                alert('Failed to save settings.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">AI Configuration</h1>
                <p className="text-muted-foreground">Customize how the AI interacts with your customers and creates content.</p>
            </header>

            <div className="grid gap-6">

                {/* 1. Reply Tone Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-blue-500" /> Reply Preferences</CardTitle>
                        <CardDescription>Select the tone for automated review replies.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Label>Tone</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {['Professional', 'Friendly', 'Premium'].map((tone) => (
                                <button
                                    key={tone}
                                    onClick={() => setSettings({ ...settings, reply_tone: tone })}
                                    className={`
                                        p-4 rounded-xl border-2 text-center transition-all font-medium
                                        ${settings.reply_tone === tone
                                            ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-sm'
                                            : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'}
                                    `}
                                >
                                    {tone}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Photo Command Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-purple-500" /> AI Photo Command</CardTitle>
                        <CardDescription>Tell the AI what kind of photos to generate for your business.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="photo_prompt">Style & Subject Instructions</Label>
                            <Textarea
                                id="photo_prompt"
                                placeholder="e.g. Modern interior style, bright lighting, include plants in background. No people in shots."
                                value={settings.photo_prompt}
                                onChange={(e) => setSettings({ ...settings, photo_prompt: e.target.value })}
                                rows={3}
                            />
                            <p className="text-xs text-muted-foreground">The AI will use these instructions as a base for every photo generation.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Blog Command Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-orange-500" /> Blog Command</CardTitle>
                        <CardDescription>Set the direction for weekly blog posts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="blog_prompt">Topics & Focus Areas</Label>
                            <Textarea
                                id="blog_prompt"
                                placeholder="e.g. Focus on seasonal tips, local community events, and detailed product guides. Keep tone informative but casual."
                                value={settings.blog_prompt}
                                onChange={(e) => setSettings({ ...settings, blog_prompt: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2 pt-2">
                            <Label htmlFor="seo_keywords">SEO Keywords</Label>
                            <div className="relative">
                                <Textarea
                                    id="seo_keywords"
                                    placeholder="Enter keywords separated by commas (e.g. cafe, coffee shop, best latte, downtown)"
                                    value={settings.seo_keywords}
                                    onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
                                    rows={2}
                                />
                                <Wand2 className="absolute bottom-3 right-3 h-4 w-4 text-muted-foreground opacity-50" />
                            </div>
                            <p className="text-xs text-muted-foreground">AI will prioritize these keywords in blog posts and captions.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Automation Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Automation</CardTitle>
                        <CardDescription>Control automatic publishing features.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                            <div className="space-y-0.5">
                                <Label className="text-base font-medium">Auto-Publish Content</Label>
                                <p className="text-sm text-muted-foreground">
                                    Automatically post approved AI-generated content daily.
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-muted-foreground">{settings.auto_publish ? 'On' : 'Off'}</span>
                                {/* Note: Assuming Switch component API, using standard input checkbox if switch fails, but standard shadcn Switch is usually controlled checked={val} onCheckedChange={fn} */}
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={settings.auto_publish}
                                    onChange={(e) => setSettings({ ...settings, auto_publish: e.target.checked })}
                                    id="auto-publish-toggle"
                                />
                                <label
                                    htmlFor="auto-publish-toggle"
                                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 peer-checked:bg-purple-600 cursor-pointer"
                                >
                                    <span className={`${settings.auto_publish ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                </label>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-6">
                        <Button onClick={handleSave} disabled={saving} size="lg" className="w-full sm:w-auto font-bold">
                            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}
