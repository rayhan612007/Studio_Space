"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Idata } from "../type/Idata";
import Studiocard from "../Explore hero/Studiocard";



export default function FeaturedStudios({ data }: { data: Idata[] }) {
    return (
        <section className="bg-muted/40 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <span className="section-kicker">Featured spaces</span>
                        <h2 className="section-heading">
                            Explore Top-Rated Studios
                        </h2>
                        <p className="section-description">
                            Discover professional creative environments tailored for your next project.
                        </p>
                    </div>
                    <div className="md:mb-1">
                        <Button
                            render={<Link href="/studios" />}
                            nativeButton={false}
                            variant="outline"
                            className="h-11 gap-2 rounded-xl border-border px-5"
                        >
                            View all studios <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>

                {/* Studios Grid */}
                <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {data.map((studio) => (
                        <Studiocard key={studio._id} info={studio} />
                    ))}
                </div>

            </div>
        </section>
    );
}