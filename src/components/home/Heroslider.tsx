
"use client";

import { useState } from "react";
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
        title: "Find Your Perfect Creative Space",
        subtitle:
            "Discover inspiring studios designed for photographers, creators, and professionals.",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        tag: "DISCOVER YOUR SPACE",
    },
    {
        id: 2,
        title: "Create Something Extraordinary",
        subtitle:
            "From photography studios to modern workspaces, find the perfect place for your next big idea.",
        image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
        tag: "UNLOCK YOUR CREATIVITY",
    },
    {
        id: 3,
        title: "Your Space. Your Opportunity.",
        subtitle:
            "Turn your beautiful space into an opportunity. Host, connect, and grow with StudioSpace.",
        image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c",
        tag: "HOST YOUR SPACE",
    },
];

export default function HeroSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

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
                onSlideChange={(swiper) =>
                    setActiveIndex(swiper.realIndex)
                }
                className="hero-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative flex min-h-[600px] items-center md:min-h-[700px]">

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
                            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 text-white md:px-12">

                                <span className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[3px] backdrop-blur-md">
                                    {slide.tag}
                                </span>

                                <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                                    {slide.title}
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
                                    {slide.subtitle}
                                </p>

                                {/* CTA Buttons */}
                                <div className="mt-9 flex flex-wrap gap-4">

                                    <Button

                                        size="lg"
                                        className="rounded-full bg-amber-500 px-7 text-white hover:text-black hover:bg-gray-300 "
                                    >
                                        <Link href="/studios" className="flex">
                                            Explore Studios
                                            <ArrowUpRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>

                                    <Button

                                        size="lg"
                                        variant="outline"
                                        className="rounded-full border-white bg-transparent px-7 text-white hover:bg-amber-500 hover:text-white"
                                    >
                                        <Link href="/studios">
                                            Host Your Space
                                        </Link>
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
