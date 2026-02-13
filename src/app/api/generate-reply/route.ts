import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getAccessToken, replyToReview } from '@/lib/gbp'

export async function POST(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { reviewText, reviewName, locationId } = body

        // 1. Check Subscription
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle()

        if (subscription?.status !== 'active') {
            return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
        }

        // 2. Generate Reply using Gemini (Fetch)
        const geminiApiKey = process.env.GEMINI_API_KEY
        if (!geminiApiKey) {
            throw new Error("Missing Gemini API Key")
        }

        const prompt = `You are a helpful business owner. Reply to this customer review professionally and concisely:\n\nReview: "${reviewText}"\n\nReply:`

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        })

        if (!geminiRes.ok) {
            throw new Error("Failed to generate reply")
        }

        const geminiData = await geminiRes.json()
        const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Thank you for your feedback!"

        // 3. Post to Google Business Profile
        // Get tokens
        const { data: gbpAccount } = await supabase
            .from('gbp_accounts')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (!gbpAccount) {
            return NextResponse.json({ error: 'GBP Account not linked' }, { status: 400 })
        }

        // Refresh Access Token
        const clientId = process.env.GOOGLE_CLIENT_ID!
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET!

        let accessToken = gbpAccount.access_token
        // Ideally checking expiry, but for now we can just refresh to be safe or try/catch.
        // Assuming we always refresh if we have a refresh token to be robust
        if (gbpAccount.refresh_token) {
            accessToken = await getAccessToken(gbpAccount.refresh_token, clientId, clientSecret)
            // Update DB with new access token
            await supabase.from('gbp_accounts').update({ access_token: accessToken }).eq('id', gbpAccount.id)
        }

        await replyToReview(accessToken, reviewName, replyText)

        // 4. Increment Counter
        await supabase.rpc('increment_usage', { user_id_input: user.id })
        // Or if RPC doesn't exist, manual update
        // We'll do manual update for now
        const { data: usage } = await supabase.from('usage').select('*').eq('user_id', user.id).maybeSingle()
        if (usage) {
            await supabase.from('usage').update({ replies_count: usage.replies_count + 1 }).eq('id', usage.id)
        } else {
            await supabase.from('usage').insert({ user_id: user.id, replies_count: 1 })
        }

        return NextResponse.json({ success: true, reply: replyText })

    } catch (e: any) {
        console.error("Generate Reply Error:", e)
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
