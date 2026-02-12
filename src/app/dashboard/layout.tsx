"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Settings,
    CreditCard,
    LogOut,
    Menu,
    X,
import { User } from '@supabase/supabase-js';
import Image from "next/image";

// ...

const [user, setUser] = useState<User | null>(null);

// ...

<div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden relative">
    {user?.user_metadata?.avatar_url ? (
        <Image
            src={user.user_metadata.avatar_url}
            alt="User"
            fill
            className="object-cover"
        />
    ) : (
        <UserIcon className="h-5 w-5 text-primary" />
    )}
</div>

{/* Page Content */ }
<main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
        {children}
    </div>
</main>
            </div >
        </div >
    );
}
