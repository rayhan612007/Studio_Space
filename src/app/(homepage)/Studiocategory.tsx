
"use client";

import Link from "next/link";
import {
    Camera,
    AudioLines,
    Mic,
    Music,
    Palette,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
    {
        name: "Photo Studios",
        slug: "photo",
        icon: Camera,
        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=85",
        color: "from-purple-600/40",
    },
    {
        name: "Sound Stages",
        slug: "sound",
        icon: AudioLines,
        image:
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=700&q=85",
        color: "from-orange-600/40",
    },
    {
        name: "Podcast Rooms",
        slug: "podcast",
        icon: Mic,
        image:
            "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=700&q=85",
        color: "from-cyan-600/40",
    },
    {
        name: "Music Suites",
        slug: "music",
        icon: Music,
        image:
            "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=700&q=85",
        color: "from-pink-600/40",
    },
    {
        name: "Art Workshops",
        slug: "art",
        icon: Palette,
        image:
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=85",
        color: "from-amber-600/40",
    },
];

export default function Studiocategory() {
    return (
        <section className="w-full overflow-hidden bg-base-100 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 lg:grid-cols-[230px_1fr] lg:gap-10">
                    {/* Left Content */}
                    <div className="relative z-10 space-y-5">
                        <span className="section-kicker">Studio categories</span>
                        <h2 className="section-heading">
                            Find your kind of space
                        </h2>
                        <p className="section-description">
                            Discover and book the perfect space for your creative projects.
                        </p>

                        <Button
                            render={<Link href="/studios" />}
                            nativeButton={false}
                            size="default"
                        >
                            Browse All Studios
                            <ArrowRight size={16} />
                        </Button>
                    </div>

                    {/* Category Cards */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

                        {categories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <Link
                                    key={category.slug}
                                    href={`/studios?category=${category.slug}`}
                                    aria-label={`Explore ${category.name}`}
                                    className="group relative h-56 overflow-hidden rounded-2xl border border-base-content/10 bg-base-300 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-64"
                                >
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url("${category.image}")`,
                                        }}
                                    />

                                    {/* Gradient Overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t ${category.color} via-black/10 to-black/5`}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                    {/* Card Content */}
                                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">

                                        <div className="min-w-0">
                                            <Icon
                                                size={22}
                                                strokeWidth={2.5}
                                                className="mb-3 text-white"
                                            />

                                            <h3 className="text-sm font-bold leading-5 text-white sm:text-base">
                                                {category.name.split(" ").map((word, i) => (
                                                    <span key={i} className="block">
                                                        {word}
                                                    </span>
                                                ))}
                                            </h3>
                                        </div>

                                        <span className="mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:translate-x-1">
                                            <ArrowRight size={16} />
                                        </span>

                                    </div>
                                </Link>
                            );
                        })}

                    </div>
                </div>
            </div>
        </section>
    );
}
