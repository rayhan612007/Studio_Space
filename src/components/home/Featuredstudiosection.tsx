"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Studiocard from "./Studiocard";

// Dummy Data for Featured Studios (eta pore MongoDB data diye replace kora jabe)
const dummyStudios = [
    {
        _id: "1",
        title: "Aperture Prime Daylight Studio",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
        hourlyRate: 45,
        rating: 4.9,
        location: "Downtown, Dhaka",
    },
    {
        _id: "2",
        title: "SoundWave Pro Podcast Booth",
        category: "Podcast & Audio",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
        hourlyRate: 35,
        rating: 4.8,
        location: "Gulshan, Dhaka",
    },
    {
        _id: "3",
        title: "Canvas & Light Art Loft",
        category: "Art & Craft",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
        hourlyRate: 50,
        rating: 5.0,
        location: "Panthapath, Dhaka",
    },
    {
        _id: "4",
        title: "Rhythm Dance & Performance Stage",
        category: "Dance",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
        hourlyRate: 60,
        rating: 4.7,
        location: "Banani, Dhaka",
    },
    {
        _id: "5",
        title: "Cinematic 4K Film Soundstage",
        category: "Filming",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
        hourlyRate: 120,
        rating: 4.9,
        location: "Tejgaon, Dhaka",
    },
    {
        _id: "6",
        title: "Minimalist Product Photo Studio",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=800&auto=format&fit=crop",
        hourlyRate: 40,
        rating: 4.6,
        location: "Dhanmondi, Dhaka",
    },
];

export default function FeaturedStudios() {
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
                    {dummyStudios.map((studio) => (
                        <Studiocard key={studio._id} studio={studio} />
                    ))}
                </div>

            </div>
        </section>
    );
}