"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Studiocard from "./Studiocard";
import { Idata } from "../type/Idata";


export default function FeaturedStudios({ data }: { data: Idata[] }) {
    return (
        <section className="py-16 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                            Featured Spaces
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mt-2">
                            Explore Top-Rated Studios
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Discover professional creative environments tailored for your next project.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button
                            variant="outline"
                            className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black gap-2"

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
                        <Studiocard key={studio._id} studio={studio} />
                    ))}
                </div>

            </div>
        </section>
    );
}