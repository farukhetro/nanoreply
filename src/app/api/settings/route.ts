
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
        .from('ai_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
        console.error('Error fetching settings:', error);
    }

    // Return default if not found
    return NextResponse.json(data || {
        reply_tone: 'Professional',
        seo_keywords: '',
        auto_publish: false,
        photo_prompt: '',
        blog_prompt: ''
    });
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reply_tone, seo_keywords, auto_publish, photo_prompt, blog_prompt } = body;

    const { error } = await supabase
        .from('ai_settings')
        .upsert({
            user_id: user.id,
            reply_tone,
            seo_keywords,
            auto_publish,
            photo_prompt,
            blog_prompt,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

    if (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
