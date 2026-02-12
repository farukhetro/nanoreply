import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { amount, currency = 'INR' } = await request.json();

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise for INR)
            currency,
            receipt: `receipt_${Date.now()}_${user.id.substring(0, 5)}`,
            notes: {
                userId: user.id,
            },
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error('Razorpay Order Error:', error);
        return NextResponse.json(
            { error: 'Error creating Razorpay order' },
            { status: 500 }
        );
    }
}
