import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const origin = new URL(request.url).origin;

    if (error) {
        return NextResponse.redirect(`${origin}/dashboard?error=${encodeURIComponent(error)}`);
    }

    if (!code) {
        return NextResponse.redirect(`${origin}/dashboard?error=no_code`);
    }

    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // If not logged in, we can't link account.
        return NextResponse.redirect(`${origin}/login`);
    }

    // Call Supabase Function to exchange code and store tokens
    const redirectUri = `${origin}/api/gbp/callback`;

    const { error: fnError } = await supabase.functions.invoke('gbp-callback', {
        body: {
            code,
            redirect_uri: redirectUri
        }
    });

    if (fnError) {
        console.error("GBP Callback Error:", fnError);
        return NextResponse.redirect(`${origin}/dashboard?error=exchange_failed`);
    }

    return NextResponse.redirect(`${origin}/dashboard?success=connected`);
}
