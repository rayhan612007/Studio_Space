import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import type {
    BookingRecord,
    BookingStatus,
} from "@/components/bookingaside/Bookingcard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
    formatBookingDate,
    getBookingTime,
    getStudioTitle,
} from "../dashboard-data";

interface RecentBookingsProps {
    bookings: BookingRecord[];
    loading: boolean;
    error: string | null;
}

const statusStyles: Record<BookingStatus, string> = {
    Pending: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    Confirmed: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    Completed: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    Cancelled: "border-muted bg-muted text-muted-foreground",
};

function RecentBookingsHeader() {
    return (
        <div className="flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-6">
            <div>
                <h2 className="font-semibold">Recent bookings</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Your latest studio reservations
                </p>
            </div>
            <Button
                variant="outline"
                size="sm"
                render={<Link href="/my-bookings" />}
                nativeButton={false}
                className="shrink-0 gap-1.5"
            >
                View all
                <ArrowRight className="size-3.5" />
            </Button>
        </div>
    );
}

function RecentBookingsLoading() {
    return (
        <div className="flex min-h-44 items-center justify-center gap-3 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            Loading bookings…
        </div>
    );
}

function RecentBookingsEmpty() {
    return (
        <div className="flex flex-col items-center px-6 py-10 text-center">
            <CalendarDays className="mb-3 size-8 text-muted-foreground/60" />
            <p className="font-medium">No bookings yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
                Book a studio and you’ll find it here.
            </p>
            <Button
                variant="link"
                render={<Link href="/studios" />}
                nativeButton={false}
                className="mt-2"
            >
                Explore studios
            </Button>
        </div>
    );
}

function RecentBookingRow({ booking }: { booking: BookingRecord }) {
    const status = booking.status ?? "Pending";
    const location = booking.location ?? booking.studio?.location;

    return (
        <li className="flex flex-col justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <div className="min-w-0">
                <p className="truncate text-sm font-medium">{getStudioTitle(booking)}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>{formatBookingDate(booking.bookingDate ?? booking.date)}</span>
                    <span>{getBookingTime(booking)}</span>
                    {location && <span>{location}</span>}
                </p>
            </div>
            <Badge
                variant="outline"
                className={`w-fit rounded-full ${statusStyles[status]}`}
            >
                {status}
            </Badge>
        </li>
    );
}

function RecentBookingsContent({
    bookings,
    loading,
    error,
}: RecentBookingsProps) {
    if (loading) return <RecentBookingsLoading />;
    if (error) {
        return (
            <p role="alert" className="px-6 py-10 text-center text-sm text-destructive">
                {error}
            </p>
        );
    }

    const recentBookings = bookings.slice(0, 4);
    if (recentBookings.length === 0) return <RecentBookingsEmpty />;

    return (
        <ul className="divide-y">
            {recentBookings.map((booking, index) => (
                <RecentBookingRow
                    key={booking.id ?? `${booking.bookingDate ?? booking.date}-${index}`}
                    booking={booking}
                />
            ))}
        </ul>
    );
}

export default function RecentBookings(props: RecentBookingsProps) {
    return (
        <section className="rounded-2xl border bg-card shadow-sm">
            <RecentBookingsHeader />
            <RecentBookingsContent {...props} />
        </section>
    );
}
