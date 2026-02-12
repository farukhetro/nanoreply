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
    if (sub.replies_used >= 30) {
        return NextResponse.redirect(new URL('/dashboard?error=limit_reached', request.url), 303);
    }

    // 3. Generate Content (TODO: Implementation)
    /*
      // Implementation logic:
      // 1. Fetch latest review from GBP (using access_token from gbp_accounts)
      // 2. Call Gemini API to generate reply
      // 3. Post reply to GBP API
    */

    // 4. Increment usage
    const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ replies_used: sub.replies_used + 1 })
        .eq('user_id', user.id);

    if (updateError) {
        console.error('Error updating usage:', updateError);
        return NextResponse.redirect(new URL('/dashboard?error=update_failed', request.url), 303);
    }

    return NextResponse.redirect(new URL('/dashboard?success=reply', request.url), 303);
}
