

import Studiocard from "@/components/Explore hero/Studiocard";
import StudiosHero from "@/components/Explore hero/Studiohero";
import Studionav from "@/components/Explore hero/Studionav";
import { Idata } from "@/components/type/Idata";

interface StudiosProps {
    searchParams: Promise<{
        category?: string;
        sort?: string;
    }>;
}

const Studios = async ({ searchParams }: StudiosProps) => {
    let data: Idata[] = [];

    const { category = "all", sort = "default" } = await searchParams;

    try {
        const res = await fetch("http://localhost:7000/studios", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch studios");
        }

        data = await res.json();
    } catch (error) {
        console.error("Studio fetching error:", error);
    }

    // Filter data by category
    const filteredData = data.filter((studio) => {
        if (category === "all") return true;

        return studio.category
            ?.toLowerCase()
            .includes(category.toLowerCase());
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
                    <p className="py-10 text-center text-muted-foreground">
                        No studios available in this category.
                    </p>
                )}
            </section>
        </div>
    );
};

export default Studios;
