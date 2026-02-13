import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            const session = data?.session
            const user = session?.user
            const providerToken = session?.provider_token
            const providerRefreshToken = session?.provider_refresh_token

            if (user && providerToken) {
                try {
                    // Fetch GBP Account Name
                    const accRes = await fetch('https://mybusinessbusinessinformation.googleapis.com/v1/accounts', {
                        headers: { Authorization: `Bearer ${providerToken}` }
                    })

                    if (accRes.ok) {
                        const accData = await accRes.json()
                        const accountName = accData.accounts?.[0]?.name // e.g. "accounts/12345"

                        if (accountName) {
                            const payload: any = {
                                user_id: user.id,
                                access_token: providerToken,
                                account_name: accountName,
                                updated_at: new Date().toISOString(),
                            }

                            if (providerRefreshToken) {
                                payload.refresh_token = providerRefreshToken
                            }

                            // Check existing
                            const { data: existing } = await supabase
                                .from('gbp_accounts')
                                .select('id')
                                .eq('user_id', user.id)
                                .maybeSingle()

                            if (existing) {
                                await supabase
                                    .from('gbp_accounts')
                                    .update(payload)
                                    .eq('id', existing.id)
                            } else if (providerRefreshToken) {
                                // Only insert if we have refresh token (initial connection)
                                await supabase
                                    .from('gbp_accounts')
                                    .insert(payload)
                            } else {
                                console.warn('Missing refresh token on initial GBP connect')
                            }
                        }
                    }
                } catch (e) {
                    console.error('Failed to store GBP tokens:', e)
                }
            }

            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        } else {
            console.error("Auth Callback Error:", error)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
