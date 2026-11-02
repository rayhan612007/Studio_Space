
"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import { Button } from "@/components/ui/button";

import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
    {
        id: 1,
        title: "Find the Space Behind Your Next Great Shot",
        subtitle:
            "Book photo studios, film stages, and creative spaces built for the way you work.",
        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2400&q=85",
        tag: "MADE FOR CREATORS",
    },
    {
        id: 2,
        title: "Your Sound. Your Stage. Your Studio.",
        subtitle:
            "Find recording suites and podcast rooms with the setup your next production needs.",
        image:
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2400&q=85",
        tag: "MAKE SOMETHING GREAT",
    },
    {
        id: 3,
        title: "Turn Your Creative Space Into Someone’s Next Big Idea",
        subtitle:
            "List your studio on StudioSpace and connect with creators looking for a place to make.",
        image:
            "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=2400&q=85",
        tag: "HOST ON STUDIOSPACE",
    },
];

export default function HeroSlider() {
    return (
        <section className="relative w-full overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    prevEl: ".hero-prev",
                    nextEl: ".hero-next",
                }}
                className="hero-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative flex min-h-[520px] items-center sm:min-h-[600px] lg:min-h-[660px]">

                            {/* Background Image */}
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority={slide.id === 1}
                                sizes="100vw"
                                className="object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/55" />

                            {/* Content */}
                            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 text-white sm:px-8 md:px-12">

                                <span className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[3px] backdrop-blur-md">
                                    {slide.tag}
                                </span>

                                <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                    {slide.title}
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
                                    {slide.subtitle}
                                </p>

                                {/* CTA Buttons */}
                                <div className="mt-9 flex flex-wrap gap-4">

                                    <Button
                                        render={<Link href="/studios" />}
                                        nativeButton={false}
                                        size="lg"
                                    >
                                        Explore Studios
                                        <ArrowUpRight className="ml-2 h-5 w-5" />
                                    </Button>

                                    <Button
                                        render={<Link href="/add-studio" />}
                                        nativeButton={false}
                                        size="lg"
                                        variant="outline"
                                        className="h-11 rounded-xl border-white/50 bg-white/10 px-6 text-white backdrop-blur-sm hover:bg-white hover:text-gray-950"
                                    >
                                        Host Your Space
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="absolute bottom-8 right-6 z-20 flex items-center gap-3 md:right-12">

                <button
                    aria-label="Previous slide"
                    className="hero-prev flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-black"
                >
                    <ArrowLeft size={20} />
                </button>

                <button
                    aria-label="Next slide"
                    className="hero-next flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-black"
                >
                    <ArrowRight size={20} />
                </button>

            </div>
        </section>
    );
}
