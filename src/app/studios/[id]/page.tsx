import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    MapPin,
    Users,
    Star,
    ShieldCheck,
    Clock,
    UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Bookingaside from "@/components/bookingaside/Bookingaside";
import { STUDIO_API_URL } from "@/lib/studio-api";
import StudioGallery from "@/components/studios/StudioGallery";
import type { Idata } from "@/components/type/Idata";


const Studiodetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    let studio: Idata | null = null;
    let studioNotFound = false;

    try {
        const res = await fetch(`${STUDIO_API_URL}/studios/${id}`, {
            cache: "no-store",
        });

        if (res.status === 404) {
            studioNotFound = true;
        } else if (!res.ok) {
            throw new Error("Failed to fetch studio details");
        } else {
            studio = await res.json() as Idata;
        }
    } catch (error) {
        console.error("Studio fetching error:", error);
    }

    if (studioNotFound) {
        notFound();
    }

    if (!studio) {
        return (
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h2 className="text-2xl font-bold">Workspace details unavailable</h2>
                <p className="mt-2 text-muted-foreground">
                    We couldn’t load this workspace right now. Please try again later.
                </p>
                <Button className="mt-5 rounded-xl" >
                    <Link href="/studios">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Studios
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto max-w-7xl px-4 py-8">

                {/* Back Navigation */}
                <Link
                    href="/studios"
                    className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Studios
                </Link>

                {/* Heading */}
                <div className="mb-7 space-y-3">
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {studio.category}
                    </Badge>

                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div className="space-y-2">
                            <h1 className="page-heading">
                                {studio.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    {studio.location}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-foreground">
                                        {studio.rating || "0"}/10
                                    </span>
                                </span>
                            </div>
                        </div>

                        <Badge className="w-fit gap-1 rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/10">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Workspace Listing
                        </Badge>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Left Section */}
                    <div className="space-y-8 lg:col-span-2">

                        <StudioGallery
                            title={studio.title}
                            imageUrl={studio.imageUrl}
                            gallery={studio.gallery}
                        />

                        {/* Overview */}
                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                About this workspace
                            </h2>

                            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                                {studio.overview || "No description available for this workspace."}
                            </p>
                        </section>

                        {/* Specifications */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                Workspace specifications
                            </h2>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-xl border p-4">
                                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Maximum Capacity
                                        </p>
                                        <p className="font-semibold">
                                            {studio.maxCapacity} People
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border p-4">
                                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Hourly Rate
                                        </p>
                                        <p className="font-semibold">
                                            ${studio.hourlyRate} / hour
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border p-4">
                                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Security Deposit
                                        </p>
                                        <p className="font-semibold">
                                            ${studio.securityDeposit}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border p-4">
                                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">
                                            Location
                                        </p>
                                        <p className="truncate font-semibold">
                                            {studio.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                                Amenities
                            </h2>
                            <div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-left text-xs font-medium text-foreground transition-all">
                                <div className="flex flex-wrap gap-2">
                                    {studio.amenities?.length ? (
                                        studio.amenities.map((item, ind) => (
                                            <span
                                                key={ind}
                                                className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                                            >
                                                {item}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No amenities listed yet.</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                About the host
                            </h2>
                            <div className="flex items-center gap-4 rounded-xl border p-4">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <UserRound className="size-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">{studio.hostName || "Studio host"}</p>
                                    <p className="text-sm text-muted-foreground">Workspace host</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                    Reviews
                                </h2>
                                <Badge variant="secondary">{studio.rating || "0"}/10</Badge>
                            </div>
                            {studio.review?.trim() ? (
                                <div className="rounded-xl border p-4">
                                    <div className="mb-2 flex items-center gap-1 text-sm font-semibold">
                                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                        {studio.rating || "0"}/10
                                    </div>
                                    <p className="text-sm leading-6 text-muted-foreground">{studio.review}</p>
                                </div>
                            ) : (
                                <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                                    No reviews yet.
                                </p>
                            )}
                        </section>
                    </div>

                    {/* Booking Sidebar Component */}
                    <Bookingaside studio={studio} />

                </div>
            </div>
        </main>
    );
};

export default Studiodetails;