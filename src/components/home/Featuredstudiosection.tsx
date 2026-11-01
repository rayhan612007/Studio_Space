"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Idata } from "../type/Idata";
import Studiocard from "../Explore hero/Studiocard";


export default function FeaturedStudios({ data }: { data: Idata[] }) {
    return (
        <section className="bg-gray-50/50 py-16 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                    <div>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
                            Featured Spaces
                        </span>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Explore Top-Rated Studios
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Discover professional creative environments tailored for your next project.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button
                            variant="outline"
                            className="gap-2 rounded-full border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"

                        >
                            <Link href="/studios">
                                View All Studios <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Studios Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((studio) => (
                        <Studiocard key={studio._id} info={studio} />
                    ))}
                </div>

            </div>
        </section>
    );
}