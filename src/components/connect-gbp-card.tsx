"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageSquare, Image as ImageIcon, FileText, ArrowRight, CheckCircle2 } from "lucide-react";


export function ConnectGbpCard() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-lg"
            >
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden relative">
                    {/* Decorative Top Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                    <CardHeader className="text-center pt-8 pb-2">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto bg-white p-3 rounded-full shadow-md mb-4 inline-block"
                        >
                            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </motion.div>
                        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Connect Business Profile
                        </CardTitle>
                        <CardDescription className="text-lg mt-2 text-gray-600">
                            Unlock the power of AI for your Google Business Profile.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-4">
                        {/* Features List */}
                        <div className="space-y-4">
                            <FeatureRow
                                icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
                                title="Auto-Reply to Reviews"
                                desc="Save hours with AI-generated responses."
                                delay={0.4}
                            />
                            <FeatureRow
                                icon={<ImageIcon className="h-5 w-5 text-purple-500" />}
                                title="Generate Viral Photos"
                                desc="Create stunning visuals instantly."
                                delay={0.5}
                            />
                            <FeatureRow
                                icon={<FileText className="h-5 w-5 text-orange-500" />}
                                title="SEO-Optimized Blogs"
                                desc="Rank higher on Google Maps."
                                delay={0.6}
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="pb-8 pt-2">
                        <form action="/api/gbp/connect" method="POST" className="w-full">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button size="lg" className="w-full text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 h-12 group transition-all">
                                    <span className="flex items-center gap-2">
                                        Connect GBP Account
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </motion.div>
                            <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Secure Google Integration
                            </p>
                        </form>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}

function FeatureRow({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay }}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
        >
            <div className="mt-1 bg-white p-2 rounded-full shadow-sm ring-1 ring-gray-100">
                {icon}
            </div>
            <div>
                <h4 className="font-semibold text-gray-900">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
        </motion.div>
    );
}
