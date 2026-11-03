

import Link from "next/link";
import { AlertTriangle, Compass, Plus } from "lucide-react";

import Studiocard from "@/components/Explore hero/Studiocard";
import StudiosHero from "@/components/Explore hero/Studiohero";
import Studionav from "@/components/Explore hero/Studionav";
import { Idata } from "@/components/type/Idata";
import { Button } from "@/components/ui/button";
import { STUDIO_API_URL } from "@/lib/studio-api";

interface StudiosProps {
    searchParams: Promise<{
        category?: string;
        sort?: string;
    }>;
}

const categoryTerms: Record<string, string[]> = {
    photo: ["photo"],
    sound: ["sound", "film"],
    film: ["sound", "film"],
    podcast: ["podcast"],
    music: ["music"],
    art: ["art", "workshop"],
    workshop: ["art", "workshop"],
};

const Studios = async ({ searchParams }: StudiosProps) => {
    let data: Idata[] = [];
    let fetchError = false;

    const { category = "all", sort = "default" } = await searchParams;

    try {
        const res = await fetch(`${STUDIO_API_URL}/studios`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch studios");
        }

        data = await res.json();
    } catch (error) {
        console.error("Studio fetching error:", error);
        fetchError = true;
    }

    // Filter data by category
    const filteredData = data.filter((studio) => {
        if (category === "all") return true;

        const studioCategory = studio.category?.toLowerCase() ?? "";
        const matchingTerms = categoryTerms[category.toLowerCase()] ?? [
            category.toLowerCase(),
        ];

        return matchingTerms.some((term) => studioCategory.includes(term));
    });
    const sortedData = [...filteredData];

    if (sort === "low" || sort === "high") {
        sortedData.sort((first, second) => {
            const firstRate = Number(first.hourlyRate.replace(/[^\d.-]/g, ""));
            const secondRate = Number(second.hourlyRate.replace(/[^\d.-]/g, ""));
            const firstIsValid = Number.isFinite(firstRate);
            const secondIsValid = Number.isFinite(secondRate);

            if (!firstIsValid || !secondIsValid) {
                if (firstIsValid === secondIsValid) return 0;
                return firstIsValid ? -1 : 1;
            }

            return sort === "low"
                ? firstRate - secondRate
                : secondRate - firstRate;
        });
    }

    return (
        <div>
            <StudiosHero />
            <Studionav />

            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {sortedData.length > 0 ? (
                    <div className="studio-grid">
                        {sortedData.map((info) => (
                            <Studiocard
                                key={info._id}
                                info={info}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 py-12 text-center">
                        <div className="mb-4 rounded-2xl bg-primary/10 p-4 text-primary">
                            {fetchError ? (
                                <AlertTriangle className="size-7" />
                            ) : (
                                <Compass className="size-7" />
                            )}
                        </div>
                        <h2 className="text-xl font-semibold">
                            {fetchError ? "Studios couldn’t be loaded" : "No studios found"}
                        </h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            {fetchError
                                ? "Please try again in a moment, or browse the full collection."
                                : "There aren’t any spaces matching this category yet. Browse all studios or list your own space."}
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {fetchError ? (
                                <form action="/studios" method="get">
                                    <Button type="submit" className="gap-2">
                                        <Compass className="size-4" />
                                        Try again
                                    </Button>
                                </form>
                            ) : (
                                <Button
                                    render={<Link href="/studios" />}
                                    nativeButton={false}
                                    className="gap-2"
                                >
                                    <Compass className="size-4" />
                                    Browse all studios
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                render={<Link href="/add-studio" />}
                                nativeButton={false}
                                className="gap-2"
                            >
                                <Plus className="size-4" />
                                Host your space
                            </Button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Studios;
