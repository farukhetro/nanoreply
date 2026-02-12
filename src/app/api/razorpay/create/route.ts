
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const plan = searchParams.get('plan') || 'basic';

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const amounts: Record<string, number> = {
        basic: 29900,
        growth: 49900,
        pro: 99900
    };

    const options = {
        amount: amounts[plan],
        currency: 'INR',
        receipt: `receipt_order_${Date.now()}_${Math.random()}`,
        payment_capture: 1 // Auto capture
    };

    try {
        const order = await razorpay.orders.create(options);
        return NextResponse.json({
            key: process.env.RAZORPAY_KEY_ID,
            order_id: order.id,
            amount: amounts[plan],
            name: 'ReplyBuzz',
        });
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
    }
}
