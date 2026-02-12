import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            plan
        } = await request.json();

        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment Verified!
            // Map plan to DB plan_name
            const planMap: Record<string, string> = {
                'basic': 'Basic',
                'growth': 'Growth',
                'pro': 'Pro'
            };

            const dbPlanName = planMap[plan] || 'Basic';

            // Update Tenant Plan
            const { error: updateError } = await supabase
                .from('tenants')
                .update({
                    plan_name: dbPlanName,
                    // Optionally reset usage if instant upgrade is desired
                    // blogs_used: 0, 
                    // photos_used: 0,
                    // replies_used_today: 0
                })
                .eq('id', user.user_metadata?.tenant_id || (await supabase.from('users').select('tenant_id').eq('id', user.id).single()).data?.tenant_id);

            if (updateError) {
                console.error("DB Update Failed:", updateError);
                // Note: Payment succeeded but DB failed. Log this for manual fix.
            }

            return NextResponse.json({
                success: true,
                message: 'Payment verified and plan updated',
            });
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid signature' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Razorpay Verify Error:', error);
        return NextResponse.json(
            { error: 'Error verifying payment' },
            { status: 500 }
        );
    }
}
