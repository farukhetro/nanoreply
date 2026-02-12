import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    try {
        // Get the user's session from the request cookies (server-side)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        // Create a Supabase client with the user's access token if available
        // For simplicity in this proxy, we'll extract the token from the client or expect the client to pass it via headers if this was a POST. 
        // BUT, this is a callback from Google. The browser has the Supabase session in cookies probably.
        // However, the standard flow in the prompt says: "Frontend API routes proxy to Edge Functions".
        // AND "gbp-callback: POST {code} -> fetch(...) -> upsert gbp_tokens for supabase.auth.getUser().data.user.id"

        // The user will be redirected here in the browser.
        // We need to pass the `code` to the backend. 

        // We cannot easily get the user's session here if it's HttpOnly cookie without helper, 
        // but usually we want to call the Edge Function FROM THE CLIENT SIDE to ensure we have the user's JWT.
        // IF we do it server side here, we need to get the session. A standard Next.js Supabase setup (SSR) handles this.
        // Since I don't know if they have SSR setup, I will assume we should do the exchange HERE properly using the Edge Function.

        // WAIT. The prompt says: "Redirect: https://advadapp.shop/auth/callback"
        // And "Frontend API routes proxy to Edge Functions... /api/callback".
        // Usually `/auth/callback` handles the Supabase Auth callback. 
        // BUT here we are doing GOOGLE OAUTH for GBP, which is separate.

        // Responsive to "Connect button -> window.open(authUrl)". 
        // If it's a popup, the popup will land on `https://advadapp.shop/auth/callback?code=...`
        // The Frontend page at `/auth/callback` should pluck the code and send it to the API.

        // I will implement the API route `/api/callback` which expects a POST with `{ code }` and `Authorization` header from the client.
        // The UI page at `/auth/callback` will call this API.

        // Re-reading implementation plan: 
        // `src/app/api/callback/route.ts`: Proxies the code to the `gbp-callback` Edge Function.
        // So this IS a proxy.

        return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();
        const authHeader = req.headers.get('Authorization');

        if (!code) {
            return NextResponse.json({ error: 'No code provided' }, { status: 400 });
        }

        if (!authHeader) {
            return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const functionUrl = `${supabaseUrl}/functions/v1/gbp-callback`;

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader, // Pass user's JWT
            },
            body: JSON.stringify({
                code,
                redirect_uri: 'https://advadapp.shop/auth/callback'
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to exchange token');
        }

        return NextResponse.json(data);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
