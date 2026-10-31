"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme, systemTheme } = useTheme();
    const currentTheme = resolvedTheme ?? systemTheme ?? "light";

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="h-10 w-10 rounded-xl border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
        >
            <Sun className="hidden h-5 w-5 text-amber-400 dark:block" aria-hidden="true" />
            <Moon className="h-5 w-5 text-gray-700 dark:hidden" aria-hidden="true" />
        </Button>
    );
}