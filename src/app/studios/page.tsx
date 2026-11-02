

import Studiocard from "@/components/Explore hero/Studiocard";
import StudiosHero from "@/components/Explore hero/Studiohero";
import Studionav from "@/components/Explore hero/Studionav";
import { Idata } from "@/components/type/Idata";

interface StudiosProps {
    searchParams: Promise<{
        category?: string;
    }>;
}

const Studios = async ({ searchParams }: StudiosProps) => {
    let data: Idata[] = [];

    const { category = "all" } = await searchParams;

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

    return (
        <div>
            <StudiosHero />
            <Studionav />

            <section className="container mx-auto px-4 py-10">
                {filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredData.map((info) => (
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
