import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url), 303);
    }

    // 1. Check subscription
    const { data: sub, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error || !sub || sub.status !== 'active') {
        return NextResponse.redirect(new URL('/dashboard?error=payment_required', request.url), 303);
    }

    // 2. Check limits
    if (sub.blogs_used >= 1) {
        return NextResponse.redirect(new URL('/dashboard?error=limit_reached', request.url), 303);
    }

    // 3. Generate Content (TODO: Implementation)
    /*
      // Implementation logic:
      // 1. Call Gemini to write blog post based on business keywords
      // 2. Post as update to GBP
    */

    // 4. Increment usage
    const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ blogs_used: sub.blogs_used + 1 })
        .eq('user_id', user.id);

    if (updateError) {
        console.error('Error updating usage:', updateError);
        return NextResponse.redirect(new URL('/dashboard?error=update_failed', request.url), 303);
    }

    return NextResponse.redirect(new URL('/dashboard?success=blog', request.url), 303);
}
