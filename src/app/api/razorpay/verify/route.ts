import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Use SERVICE ROLE KEY to bypass RLS for payment updates
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = body;

        console.log("Verifying payment for:", { razorpay_order_id, razorpay_payment_id, plan });

        const secret = process.env.RAZORPAY_KEY_SECRET!;
        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Payment verified. Now update user.
            // Since this is a server call from the frontend, we need the USER ID.
            // We can get it from the session (cookie) OR the frontend passed it?
            // Safer to get from session to prevent spoofing user_id.

            // Check auth from cookies using standard helper for READ
            const { createClient: createServerClient } = await import('@/lib/supabase/server');
            const supabaseUser = await createServerClient();
            const { data: { user } } = await supabaseUser.auth.getUser();

            if (!user) {
                console.error("No authenticated user found during verify");
                return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
            }

            console.log("Authenticated user:", user.id);

            // Upsert subscription using ADMIN client (bypass RLS)
            const limits: any = {
                basic: { replies: 30, photos: 0, blogs: 0 },
                growth: { replies: 100, photos: 4, blogs: 0 },
                pro: { replies: 999999, photos: 10, blogs: 4 }
            };

            const selectedPlan = plan || 'basic'; // Fallback

            // Log update attempt
            console.log("Updating subscription for:", user.id, "Plan:", selectedPlan);

            const { error } = await supabaseAdmin
                .from('subscriptions')
                .upsert({
                    user_id: user.id,
                    plan: selectedPlan,
                    razorpay_subscription_id: razorpay_payment_id,
                    status: 'active',
                    replies_used: 0,
                    photos_used: 0,
                    blogs_used: 0,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });

            if (error) {
                console.error('Supabase Admin Error:', error);
                return NextResponse.json({ status: 'error', message: 'Database update failed' }, { status: 500 });
            }

            console.log("Subscription updated successfully!");
            return NextResponse.json({ status: 'success' });
        } else {
            console.error("Invalid signature");
            return NextResponse.json({ status: 'error', message: 'Invalid signature' }, { status: 400 });
        }
    } catch (err) {
        console.error("Server Error in Verify:", err);
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}
