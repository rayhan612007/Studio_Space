import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    MapPin,
    Users,
    Star,
    ShieldCheck,
    Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Idata } from "@/components/type/Idata";

const Studiodetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    let studio = null;

    try {
        const res = await fetch(`http://localhost:7000/studios/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch studio details");
        }

        studio = await res.json();
    } catch (error) {
        console.error("Studio fetching error:", error);
    }

    if (!studio) {
        return (
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h2 className="text-2xl font-bold">Workspace not found</h2>
                <p className="mt-2 text-muted-foreground">
                    This workspace may have been removed or is unavailable.
                </p>
                <Button className="mt-5 rounded-xl">
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
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                {studio.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    {studio.location}
                                </span>

                                {studio.rating && (
                                    <span className="flex items-center gap-1.5">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-foreground">
                                            {studio.rating}
                                        </span>
                                    </span>
                                )}
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

                        {/* Workspace Image */}
                        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-muted">
                            {studio.imageUrl ? (
                                <Image
                                    src={studio.imageUrl}
                                    alt={studio.title}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No image available
                                </div>
                            )}
                        </div>

                        {/* Overview */}
                        <section className="space-y-3">
                            <h2 className="text-2xl font-bold">
                                About this workspace
                            </h2>

                            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                                {studio.overview || "No description available for this workspace."}
                            </p>
                        </section>

                        {/* Specifications */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">
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
                        <section>
                            <h2 className="text-2xl font-bold">
                                Amenities
                            </h2>
                            <div className="px-4 py-3 text-xs font-medium rounded-xl border text-left transition-all bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100">
                                <div className=" flex flex-wrap gap-2">

                                    {
                                        studio?.amenities?.map((item: string, ind: number) => (
                                            <p
                                                key={ind}
                                                className="bg-purple-700 text-white dark:text-purple-600 dark:bg-whie w-fit px-3 py-2 rounded-4xl"

                                            >
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>

                        </section>
                    </div>

                    {/* Booking Sidebar */}
                    <aside className="lg:col-span-1">
                        <Card className="rounded-2xl shadow-sm lg:sticky lg:top-24">
                            <CardContent className="space-y-5 p-6">

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Starting from
                                    </p>

                                    <h2 className="mt-1 text-3xl font-bold">
                                        ${studio.hourlyRate}
                                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                                            / hour
                                        </span>
                                    </h2>
                                </div>

                                <div className="space-y-4 rounded-xl bg-muted/50 p-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Category
                                        </span>
                                        <span className="font-medium">
                                            {studio.category}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Capacity
                                        </span>
                                        <span className="font-medium">
                                            {studio.maxCapacity} People
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Security Deposit
                                        </span>
                                        <span className="font-medium">
                                            ${studio.securityDeposit}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between border-t pt-3 text-sm">
                                        <span className="text-muted-foreground">
                                            Booking Type
                                        </span>
                                        <span className="font-medium">
                                            Hourly
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="h-12 w-full rounded-xl text-base font-semibold"

                                >
                                    Book Workspace Now
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>

                                <p className="text-center text-xs text-muted-foreground">
                                    Booking functionality will be available soon.
                                </p>

                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4" />
                                    Workspace information
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div >
        </main >
    );
};

export default Studiodetails;