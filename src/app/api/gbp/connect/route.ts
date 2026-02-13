import { NextResponse } from 'next/server';

export async function POST() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
        return NextResponse.json({ error: "Missing GOOGLE_CLIENT_ID env var" }, { status: 500 });
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://replybuzz.online";
    const finalRedirectUri = `${baseUrl}/api/gbp/callback`;

    const scope = "openid email profile https://www.googleapis.com/auth/business.manage";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${finalRedirectUri}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline&prompt=consent`;

    // 303 Redirect for POST -> GET navigation
    return NextResponse.redirect(authUrl, 303);
}
