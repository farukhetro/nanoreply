"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto dismiss
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-0 right-0 z-[100] p-4 space-y-4 max-w-sm w-full pointer-events-none">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            layout
                            className={cn(
                                "pointer-events-auto flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-md",
                                t.type === "success" && "bg-background/95 border-green-500/20 text-foreground",
                                t.type === "error" && "bg-background/95 border-red-500/20 text-foreground",
                                t.type === "info" && "bg-background/95 border-border text-foreground"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-2 rounded-full shrink-0",
                                    t.type === "success" && "bg-green-500/10 text-green-500",
                                    t.type === "error" && "bg-red-500/10 text-red-500",
                                    t.type === "info" && "bg-blue-500/10 text-blue-500"
                                )}
                            >
                                {t.type === "success" && <CheckCircle2 className="h-4 w-4" />}
                                {t.type === "error" && <AlertCircle className="h-4 w-4" />}
                                {t.type === "info" && <Info className="h-4 w-4" />}
                            </div>
                            <p className="text-sm font-medium flex-1">{t.message}</p>
                            <button
                                onClick={() => removeToast(t.id)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
