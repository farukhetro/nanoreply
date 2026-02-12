import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = "528485297873-dkkp0md77547vd796ghjoftmlu2pih42.apps.googleusercontent.com";
    const redirectUri = "https://advadapp.shop/auth/callback"; // or http://localhost:3000/auth/callback for local dev, user specified prod url in prompt
    const scope = "openid email profile https://www.googleapis.com/auth/business.manage";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline&prompt=consent`;

    return NextResponse.json({ url: authUrl });
}
