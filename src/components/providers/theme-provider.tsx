"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "nanoreply-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const savedTheme = localStorage.getItem(storageKey) as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [storageKey]);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <div className="flex items-center gap-1 border rounded-full p-1 bg-background/50 backdrop-blur-sm">
            <Button
                variant={theme === "light" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setTheme("light")}
                title="Light Mode"
            >
                <Sun className="h-4 w-4" />
            </Button>
            <Button
                variant={theme === "system" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setTheme("system")}
                title="System"
            >
                <Laptop className="h-4 w-4" />
            </Button>
            <Button
                variant={theme === "dark" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setTheme("dark")}
                title="Dark Mode"
            >
                <Moon className="h-4 w-4" />
            </Button>
        </div>
    );
}
