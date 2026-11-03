"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";

import PrivateRoute, { usePrivateSession } from "@/components/PrivateRoute";
import { getMyListings } from "@/app/lib/my-listing-actions";
import ListingCard from "@/components/listing component/ListingCard";
import type { Idata } from "@/components/type/Idata";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

function ListingsContent() {
    const { user } = usePrivateSession();
    const userEmail = user.email.trim().toLowerCase();
    const [listings, setListings] = useState<Idata[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userEmail) return;
        const controller = new AbortController();

        async function fetchListings() {
            setLoading(true);
            setError(null);
            try {
                const data = await getMyListings();
                const records = Array.isArray(data)
                    ? data
                    : typeof data === "object" &&
                        data !== null &&
                        "listings" in data &&
                        Array.isArray(data.listings)
                      ? data.listings
                      : null;
                if (!records) {
                    throw new Error("The listings response was not in the expected format.");
                }
                if (!controller.signal.aborted) {
                    setListings(records as Idata[]);
                }
            } catch (requestError) {
                if (controller.signal.aborted) return;
                console.error("Error fetching listings:", requestError);
                toast.add({
                    title: "Listings couldn’t be loaded",
                    description: requestError instanceof Error
                        ? requestError.message
                        : "Please try again.",
                    type: "error",
                });
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "Unable to load your listings. Please try again.",
                );
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        startTransition(() => {
            void fetchListings();
        });
        return () => controller.abort();
    }, [userEmail]);

    return (
        <main className="min-h-[65vh] flex-1 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-border pb-5 md:flex-row md:items-center">
                    <div>
                        <h1 className="page-heading">
                            My Listings
                        </h1>
                        <p className="page-description">
                            Manage your spaces, update details, or remove listings from here.
                        </p>
                    </div>

                    <Link
                        href="/add-studio"
                        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
                    >
                        + Add New Listing
                    </Link>
                </div>

                {loading ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading your listings">
                        {[0, 1, 2].map((item) => (
                            <div key={item} className="overflow-hidden rounded-2xl border bg-card">
                                <div className="aspect-[4/3] animate-pulse bg-muted" />
                                <div className="space-y-3 p-5">
                                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                        <span className="sr-only">Loading your listings</span>
                    </div>
                ) : error ? (
                    <p role="alert" className="rounded-2xl border border-destructive/30 bg-card py-20 text-center text-destructive">
                        {error}
                    </p>
                ) : listings.length === 0 ? (
                    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
                        <p className="text-lg font-medium text-muted-foreground">
                            No listings found.
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            You haven&apos;t added any spaces yet.
                        </p>
                        <Button render={<Link href="/add-studio" />} nativeButton={false} className="mt-5">
                            Add your first studio
                        </Button>
                    </div>
                ) : (
                    <div className="studio-grid">
                        {listings.map((item) => (
                            <ListingCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default function Listingpage() {
    return (
        <PrivateRoute>
            <ListingsContent />
        </PrivateRoute>
    );
}