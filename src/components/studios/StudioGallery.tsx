"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function StudioGallery({
    title,
    imageUrl,
    gallery = [],
}: {
    title: string;
    imageUrl?: string;
    gallery?: string[];
}) {
    const images = [...new Set([imageUrl, ...gallery].filter(
        (image): image is string => Boolean(image),
    ))];

    if (images.length === 0) {
        return (
            <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border bg-muted text-muted-foreground">
                <div className="flex items-center gap-2">
                    <ImageOff className="size-5" />
                    No images available
                </div>
            </div>
        );
    }

    return (
        <Carousel
            opts={{ loop: images.length > 1 }}
            className="overflow-hidden rounded-2xl border bg-muted"
            aria-label={`${title} photo gallery`}
        >
            <CarouselContent className="ml-0">
                {images.map((image, index) => (
                    <CarouselItem key={image} className="pl-0">
                        <div className="relative aspect-[16/9]">
                            <Image
                                src={image}
                                alt={`${title} gallery image ${index + 1}`}
                                fill
                                priority={index === 0}
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                className="object-cover"
                            />
                            {images.length > 1 && (
                                <span className="absolute bottom-4 right-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
                                    {index + 1} / {images.length}
                                </span>
                            )}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 && (
                <>
                    <CarouselPrevious className="left-4 z-10 bg-background/90" />
                    <CarouselNext className="right-4 z-10 bg-background/90" />
                </>
            )}
        </Carousel>
    );
}
