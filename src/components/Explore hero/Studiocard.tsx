
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  ArrowUpRight,
  Users,
  ShieldCheck,
  ImageOff,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Idata } from "../type/Idata";

export default function Studiocard({ info }: { info: Idata }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">

      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {info.imageUrl ? (
          <Image
            src={info.imageUrl}
            alt={info.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-accent">
            <ImageOff className="size-10 text-muted-foreground/60" />
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />

        {/* Category */}
        <Badge className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-white shadow-sm backdrop-blur-md hover:bg-black/50">
          {info.category}
        </Badge>

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold shadow-sm backdrop-blur">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {info.rating || "New"}
        </div>

        {/* Location on Image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{info.location}</span>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col gap-5 p-5">

        {/* Title & Overview */}
        <div className="min-h-[5.25rem] space-y-2">
          <h3 className="line-clamp-1 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {info.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {info.overview || "A thoughtfully equipped space for your next creative project."}
          </p>
        </div>

        {/* Studio Features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-muted/60 p-3">
            <Users className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Capacity</p>
              <p className="truncate text-sm font-semibold">
                {info.maxCapacity} People
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-muted/60 p-3">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Security</p>
              <p className="truncate text-sm font-semibold">
                ${info.securityDeposit}
              </p>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Starting from
            </p>

            <p className="text-2xl font-bold tracking-tight">
              {info.hourlyRate ? `$${info.hourlyRate}` : "Price unavailable"}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                {info.hourlyRate ? "/ hr" : ""}
              </span>
            </p>
          </div>

          <Button
            render={<Link href={`/studios/${info._id}`} />}
            nativeButton={false}
            className="h-10 rounded-xl px-4 shadow-sm"
          >
            View Details
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
