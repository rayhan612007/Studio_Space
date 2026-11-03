import Link from "next/link";
import { ArrowLeft, Lightbulb, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-[65vh] flex-1 items-center justify-center px-4 py-16">
            <div className="mx-auto max-w-xl text-center">
                <div
                    className="relative mx-auto mb-8 flex size-52 items-center justify-center rounded-full bg-primary/10 sm:size-60"
                    aria-hidden="true"
                >
                    <div className="absolute inset-5 rounded-full border border-dashed border-primary/30" />
                    <div className="flex size-28 items-center justify-center rounded-3xl bg-card text-4xl font-black tracking-tight text-primary shadow-lg">
                        404
                    </div>
                    <span className="absolute right-7 top-5 flex size-10 items-center justify-center rounded-full bg-card text-amber-500 shadow">
                        <Lightbulb className="size-5" />
                    </span>
                    <span className="absolute bottom-5 right-5 flex size-9 items-center justify-center rounded-full bg-card text-primary shadow">
                        <Sparkles className="size-4" />
                    </span>
                </div>
                <p className="section-kicker">404 · Out of frame</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    This page is out of frame
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                    We couldn’t find the page you’re looking for. Head back to StudioSpace and discover a space that fits your next idea.
                </p>
                <Button
                    render={<Link href="/" />}
                    nativeButton={false}
                    className="mt-7 gap-2"
                >
                    <ArrowLeft className="size-4" />
                    Return to Home
                </Button>
            </div>
        </main>
    );
}
