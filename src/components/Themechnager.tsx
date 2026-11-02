"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme, systemTheme } = useTheme();
    const currentTheme = resolvedTheme ?? systemTheme ?? "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(nextTheme)}
            className="h-10 w-10 rounded-xl border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
        >
            <Sun className="hidden h-5 w-5 text-primary dark:block" aria-hidden="true" />
            <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
        </Button>
    );
}