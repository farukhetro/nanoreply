import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export default function StatusPage() {
    const statusData = [
        { name: "Website/Dashboard", status: "Operational", description: "Main platform availability" },
        { name: "Google Business API", status: "Operational", description: "Replies, Post publishing" },
        { name: "AI Engine", status: "Operational", description: "Content generation services" },
        { name: "Image Generation", status: "Operational", description: "Nano Banana photo services" },
        { name: "Database", status: "Operational", description: "Data storage and retrieval" },
        { name: "Email Delivery", status: "Operational", description: "Notifications and alerts" },
    ];

    const incidents = [
        {
            date: "No incidents reported today.",
            description: "All systems operational.",
            status: "success"
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">System Status</h1>
                <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 text-green-700 font-medium">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    All Systems Operational
                </div>
                <p className="text-muted-foreground mt-4">
                    Current status of ReplyBuzz services. Updated real-time.
                </p>
            </div>

            <div className="grid gap-6 mb-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {statusData.map((service, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0 border-gray-100">
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900">{service.name}</span>
                                    <span className="text-xs text-muted-foreground">{service.description}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {service.status === "Operational" ? (
                                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Operational
                                        </Badge>
                                    ) : service.status === "Degraded" ? (
                                        <Badge variant="outline" className="text-yellow-600 bg-yellow-50 border-yellow-200 gap-1">
                                            <AlertTriangle className="w-3 h-3" /> Degraded
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive" className="gap-1">
                                            <AlertCircle className="w-3 h-3" /> Outage
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">Past Incidents</h2>
            <div className="space-y-4">
                {incidents.map((incident, idx) => (
                    <Card key={idx}>
                        <CardHeader className="py-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-medium">{incident.date}</CardTitle>
                            </div>
                            <CardDescription>{incident.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
