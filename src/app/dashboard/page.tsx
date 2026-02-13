import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ConnectGbpCard } from "@/components/connect-gbp-card"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // 1. Check GBP Connection
    const { data: gbpAccount } = await supabase
        .from('gbp_accounts')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

    if (!gbpAccount) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Welcome to ReplyBuzz</h1>
                <ConnectGbpCard />
            </div>
        )
    }

    // 2. Check Subscription
    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

    // Assuming trial or active if not found purely for testing flow, but real flow should block.
    // User requested: "paywall → Razorpay"
    const isActive = subscription?.status === 'active'

    if (!isActive) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center space-y-6">
                <h1 className="text-3xl font-bold">Subscription Required</h1>
                <p className="text-muted-foreground text-lg">Your trial has ended. Please upgrade to continue automating replies.</p>
                <div className="p-6 border rounded-lg bg-white shadow-sm max-w-md mx-auto">
                    <h2 className="text-xl font-semibold">Pro Plan</h2>
                    <p className="text-3xl font-bold my-4">₹499<span className="text-sm font-normal text-gray-500">/mo</span></p>
                    <ul className="text-left space-y-2 mb-6 ml-8 list-disc">
                        <li>Unlimited Replies</li>
                        <li>Auto-Check Reviews</li>
                        <li>Sentiment Analysis</li>
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <a href="https://razorpay.com/payment-link/pl_link_id" target="_blank" rel="noopener noreferrer">
                            Subscribe Now
                        </a>
                    </Button>
                </div>
            </div>
        )
    }

    // 3. Main Dashboard
    const { data: locations } = await supabase.from('locations').select('*').eq('user_id', user.id)
    const { data: usage } = await supabase.from('usage').select('*').eq('user_id', user.id).maybeSingle()

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">Manage your reviews and replies.</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Active Plan
                    </span>
                    <form action="/auth/signout" method="post">
                        <Button variant="outline" size="sm">Sign Out</Button>
                    </form>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Replies Generated</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usage?.replies_count || 0}</div>
                        <p className="text-xs text-gray-500">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Locations</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{locations?.length || 0}</div>
                        <p className="text-xs text-gray-500">Connected</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Account</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium truncate">{gbpAccount.account_name}</div>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                            ● Connected
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Content Area */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Your Locations</h2>
                    {/* Add Sync Button logic ideally */}
                </div>

                {locations && locations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {locations.map((loc: any) => (
                            <Card key={loc.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg">{loc.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">{loc.address}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Managed</span>
                                        {/* "Generate Reply" placeholder - in reality needs a review to reply TO */}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center p-8 border-dashed">
                        <p className="text-gray-500 mb-4">No locations found. Syncing might take a moment.</p>
                        <Button variant="secondary">Sync Locations</Button>
                    </Card>
                )}
            </section>
        </div>
    )
}
