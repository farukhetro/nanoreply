"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Store, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Location {
    name: string; // resource name
    title: string;
    storeCode?: string;
    metadata?: {
        placeId?: string;
        mapsUri?: string;
    };
}

export default function GbpConnect() {
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const pollInterval = useRef<NodeJS.Timeout | null>(null);

    // Cleanup polling on unmount
    useEffect(() => {
        return () => {
            if (pollInterval.current) clearInterval(pollInterval.current);
        }
    }, []);

    const checkConnection = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) return;

            const response = await fetch("/api/locations", {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.locations) {
                    setLocations(data.locations);
                    setIsConnected(true);
                    // Stop polling if we found locations/connection
                    if (pollInterval.current) {
                        clearInterval(pollInterval.current);
                        pollInterval.current = null;
                    }
                    setLoading(false); // Ensure loading is off
                }
            } else {
                const data = await response.json();
                if (data.error && data.error.includes("No tokens found")) {
                    setIsConnected(false);
                }
            }

        } catch (error) {
            console.error("Error checking connection:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line
        checkConnection();

        // Listen for message from popup
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            if (event.data === "gbp-connected") {
                checkConnection();
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);


    const handleConnect = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("/api/gbp-connect");
            const data = await response.json();

            if (data.url) {
                const width = 500;
                const height = 600;
                const left = window.screen.width / 2 - width / 2;
                const top = window.screen.height / 2 - height / 2;

                window.open(
                    data.url,
                    "Google Connect",
                    `width=${width},height=${height},top=${top},left=${left}`
                );

                // Start polling for results
                if (pollInterval.current) clearInterval(pollInterval.current);
                pollInterval.current = setInterval(checkConnection, 3000);

            } else {
                setError("Failed to get authorization URL");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error initiating connection:", error);
            setError("Failed to initiate connection");
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-primary" />
                    Google Business Profile
                </CardTitle>
                <CardDescription>
                    Connect your Google Business Profile to automate posts and replies.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                {!isConnected ? (
                    <Button onClick={handleConnect} disabled={loading} className="w-full sm:w-auto">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width={16} height={16} className="h-4 w-4 mr-2" />}
                        {loading ? "Connecting..." : "Connect Google Account"}
                    </Button>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded-md">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-medium">Connected</span>
                        </div>

                        {locations.length > 0 ? (
                            <div className="grid gap-2">
                                {locations.map((loc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-sm">{loc.title}</p>
                                                <p className="text-xs text-muted-foreground">{loc.storeCode || "No store code"}</p>
                                                {loc.metadata?.mapsUri && (
                                                    <a href={loc.metadata.mapsUri} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                                        View on Maps
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Manage</Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 border rounded-md text-center bg-muted/20">
                                <p className="text-sm text-muted-foreground">No locations found for this account.</p>
                            </div>
                        )}

                        <div className="pt-2">
                            <Button variant="ghost" size="sm" onClick={handleConnect} className="text-muted-foreground hover:text-foreground">
                                Reconnect Account
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
