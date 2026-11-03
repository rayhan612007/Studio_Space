"use client";

import { startTransition, useEffect, useState } from "react";

import type { BookingRecord } from "@/components/bookingaside/Bookingcard";
import { usePrivateSession } from "@/components/PrivateRoute";
import { getBookings } from "@/app/lib/studio-booking-actions";
import {
    DashboardHeader,
    DashboardStats,
    QuickLinks,
    RecentBookings,
} from "./components";
import { parseBookings } from "./dashboard-data";

export default function DashboardOverview() {
    const { user } = usePrivateSession();
    const [bookings, setBookings] = useState<BookingRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadBookings() {
            try {
                const data = await getBookings();
                const userBookings = parseBookings(data);

                if (!controller.signal.aborted) {
                    setBookings(userBookings);
                    setError(null);
                }
            } catch (requestError) {
                if (controller.signal.aborted) return;

                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "Your booking summary is temporarily unavailable.",
                );
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        startTransition(() => {
            void loadBookings();
        });
        return () => controller.abort();
    }, []);

    const pendingCount = bookings.filter(
        (booking) => booking.status === "Pending",
    ).length;
    const confirmedCount = bookings.filter(
        (booking) => booking.status === "Confirmed",
    ).length;

    return (
        <main className="min-h-[65vh] flex-1 bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <DashboardHeader userName={user.name} />
                <DashboardStats
                    totalBookings={bookings.length}
                    pendingBookings={pendingCount}
                    confirmedBookings={confirmedCount}
                />

                <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                    <RecentBookings
                        bookings={bookings}
                        loading={loading}
                        error={error}
                    />
                    <QuickLinks />
                </div>
            </div>
        </main>
    );
}
