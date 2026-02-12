import { NextResponse } from 'next/server';

export async function POST() {
    const clientId = "528485297873-dkkp0md77547vd796ghjoftmlu2pih42.apps.googleusercontent.com";
    const redirectUri = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback/google` : "https://advadapp.shop/auth/callback";
    // Fallback to prod URL or local if set. User's previous code had hardcoded prod URL. 
    // I will stick to the hardcoded one if env is missing to be safe, or use the one from the deleted file which was "https://advadapp.shop/auth/callback"
    // Wait, the user said "GBP OAuth (already works)". I should probably respect the existing callback if I can find it. 
    // The previous file had "https://advadapp.shop/auth/callback". I'll use that as default but allow env override.

    const finalRedirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || "https://advadapp.shop/auth/callback";

    const scope = "openid email profile https://www.googleapis.com/auth/business.manage";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${finalRedirectUri}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline&prompt=consent`;

    // 303 Redirect for POST -> GET navigation
    return NextResponse.redirect(authUrl, 303);
}
