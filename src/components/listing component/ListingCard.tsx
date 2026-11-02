import React from 'react';
import { Idata } from '../type/Idata';
import Image from 'next/image';
import { ImageOff, MapPin } from 'lucide-react';
import { DeleteList } from '../delete/Deletelist';
import { UpdateList } from '../delete/Updatelist';

export default function ListingCard({
    item,
}: {
    item: Idata;
}) {
    const { _id, title, category, hourlyRate, location, imageUrl } = item;



    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-accent">
                        <ImageOff className="size-10 text-muted-foreground/60" />
                    </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {category}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 line-clamp-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {title}
                </h3>

                <p className="mb-4 flex min-h-5 items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" />
                    {location || "Location not provided"}
                </p>

                <div className="mt-auto flex items-baseline justify-between border-t border-border pt-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Price</span>
                    <div className="text-right">
                        <span className="text-xl font-extrabold text-foreground">${hourlyRate}</span>
                        <span className="ml-1 text-xs font-medium text-muted-foreground">/ hour</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 border-t border-border bg-muted/40 px-5 py-3">
                <UpdateList id={_id} initialdata={item} />
                <DeleteList id={_id} />
            </div>
        </div>
    );
}