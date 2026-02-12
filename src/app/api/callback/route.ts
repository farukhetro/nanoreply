import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    try {
        // We will implement the API route `/api/callback` which expects a POST with `{ code }` and `Authorization` header from the client.
        // The UI page at `/auth/callback` will call this API.

        return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });

    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
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

    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
