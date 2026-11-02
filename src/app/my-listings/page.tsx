"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { STUDIO_API_URL } from "@/lib/studio-api";
import ListingCard from "@/components/listing component/ListingCard";
import type { Idata } from "@/components/type/Idata";

const Listingpage = () => {
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const userEmail = session?.user?.email?.trim().toLowerCase();
    const [listings, setListings] = useState<Idata[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionLoading) return;
        if (!userEmail) return;
        const email = userEmail;

        const controller = new AbortController();

        async function fetchListings() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${STUDIO_API_URL}/my-listings`, {
                    headers: { email },
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error("Unable to load your listings. Please try again.");
                }

                const data: unknown = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error("The listings response was not in the expected format.");
                }
                if (!controller.signal.aborted) {
                    setListings(data as Idata[]);
                }
            } catch (requestError) {
                if (controller.signal.aborted) return;
                console.error("Error fetching listings:", requestError);
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "Unable to load your listings. Please try again.",
                );
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        void fetchListings();
        return () => controller.abort();
    }, [sessionLoading, userEmail]);

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

                {sessionLoading || (Boolean(userEmail) && loading) ? (
                    <p className="rounded-2xl border border-dashed border-border bg-card py-20 text-center text-muted-foreground">
                        Loading your listings...
                    </p>
                ) : error ? (
                    <p role="alert" className="rounded-2xl border border-destructive/30 bg-card py-20 text-center text-destructive">
                        {error}
                    </p>
                ) : !userEmail ? (
                    <p className="rounded-2xl border border-dashed border-border bg-card py-20 text-center text-muted-foreground">
                        Sign in to view your listings.
                    </p>
                ) : listings.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-card py-20 text-center">
                        <p className="text-lg font-medium text-muted-foreground">
                            No listings found.
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            You haven&apos;t added any spaces yet.
                        </p>
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

export default Listingpage;