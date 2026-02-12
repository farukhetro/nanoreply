import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover' // Matches installed SDK expectation 
});

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url), 303);
    }

    // Create Stripe Session
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID, // Ensure this is set in ENV
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${new URL(request.url).origin}/dashboard?success=subscription`,
            cancel_url: `${new URL(request.url).origin}/dashboard?canceled=true`,
            customer_email: user.email,
            metadata: {
                user_id: user.id
            },
            subscription_data: {
                metadata: {
                    user_id: user.id
                }
            }
        });

        if (session.url) {
            return NextResponse.redirect(session.url, 303);
        } else {
            throw new Error('No session URL created');
        }

    } catch (err) {
        console.error('Stripe Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
