import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardHeader({ userName }: { userName: string }) {
    const firstName = userName.trim().split(/\s+/)[0] || "there";

    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border bg-card p-6 shadow-sm sm:p-9">
            <div className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div className="max-w-2xl">
                    <Badge
                        variant="secondary"
                        className="mb-4 gap-1.5 rounded-full px-3 py-1.5"
                    >
                        <Sparkles className="size-3.5" />
                        Your StudioSpace
                    </Badge>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Welcome back, {firstName}
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                        Pick up where you left off: manage your reservations or share a
                        space of your own.
                    </p>
                </div>
                <Button
                    render={<Link href="/add-studio" />}
                    className="h-11 shrink-0 gap-2 rounded-xl px-5 shadow-sm"
                >
                    <Plus className="size-4" />
                    List a studio
                </Button>
            </div>
        </section>
    );
}
