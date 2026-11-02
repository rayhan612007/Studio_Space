import Image from "next/image";

export default function Loading() {
    return (
        <main
            className="flex min-h-[65vh] flex-1 items-center justify-center px-4 py-12"
            role="status"
            aria-label="Loading StudioSpace"
        >
            <div className="w-full max-w-5xl space-y-8">
                <div className="flex flex-col items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="StudioSpace"
                        width={48}
                        height={48}
                        className="size-12 animate-pulse object-contain"
                    />
                    <p className="text-sm font-medium text-muted-foreground">
                        Preparing your creative space…
                    </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2].map((item) => (
                        <div
                            key={item}
                            className="overflow-hidden rounded-2xl border border-border bg-card"
                        >
                            <div className="aspect-[4/3] animate-pulse bg-muted" />
                            <div className="space-y-3 p-5">
                                <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
