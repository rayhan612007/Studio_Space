
"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { Button } from "@/components/ui/button";

import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                speed={700}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
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
                        <div className="relative flex min-h-[560px] items-center sm:min-h-[610px] lg:min-h-[660px]">

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
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />

                            {/* Content */}
                            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 text-white sm:px-8 md:px-12 lg:px-16">

                                <span className="mb-6 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] backdrop-blur-md sm:text-xs">
                                    {slide.tag}
                                </span>

                                <h1 className="hero-heading text-white">
                                    {slide.title}
                                </h1>

                                <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8">
                                    {slide.subtitle}
                                </p>

                                {/* CTA Buttons */}
                                <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">

                                    <Button
                                        render={<Link href="/studios" />}
                                        nativeButton={false}
                                        size="lg"
                                        className="w-full sm:w-auto"
                                    >
                                        Explore Studios
                                        <ArrowUpRight className="ml-2 h-5 w-5" />
                                    </Button>

                                    <Button
                                        render={<Link href="/studios" />}
                                        nativeButton={false}
                                        size="lg"
                                        variant="outline"
                                        className="w-full border-white/50 bg-white/10 px-6 text-white backdrop-blur-sm hover:bg-white hover:text-gray-950 sm:w-auto"
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
            <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 sm:bottom-6 sm:right-8 sm:gap-3 lg:right-12">

                <button
                    aria-label="Previous slide"
                    className="hero-prev flex size-10 items-center justify-center rounded-full border border-white/50 bg-black/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-black sm:size-12"
                >
                    <ArrowLeft size={20} />
                </button>

                <button
                    aria-label="Next slide"
                    className="hero-next flex size-10 items-center justify-center rounded-full border border-white/50 bg-black/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-black sm:size-12"
                >
                    <ArrowRight size={20} />
                </button>

            </div>
        </section>
    );
}
