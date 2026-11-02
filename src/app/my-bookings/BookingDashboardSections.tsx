"use client";

import Link from "next/link";
import {
    CalendarDays,
    Check,
    Clock3,
    Compass,
    RefreshCw,
    Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { BookingStatus } from "@/components/bookingaside/Bookingcard";

type BookingFilter = "All" | BookingStatus;
type BookingCounts = Record<BookingFilter, number>;

const filters: BookingFilter[] = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
];

export function BookingHeader() {
    return (
        <section className="relative mb-8 overflow-hidden rounded-3xl border bg-card p-6 shadow-sm sm:p-9">
            <div className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div className="max-w-2xl">
                    <Badge
                        variant="secondary"
                        className="mb-4 gap-1.5 rounded-full px-3 py-1.5"
                    >
                        <Sparkles className="size-3.5" />
                        Your creative spaces
                    </Badge>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        My bookings
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                        Every session, in one place. Review reservation details and manage upcoming bookings.
                    </p>
                </div>
                <Button
                    render={<Link href="/studios" />}
                    className="h-11 shrink-0 gap-2 rounded-xl px-5 shadow-sm"
                >
                    <Compass className="size-4" />
                    Explore studios
                </Button>
            </div>
        </section>
    );
}

export function BookingSummary({ counts }: { counts: BookingCounts }) {
    const cards = [
        {
            label: "Total reservations",
            count: counts.All,
            icon: CalendarDays,
            color: "bg-primary/10 text-primary",
        },
        {
            label: "Awaiting confirmation",
            count: counts.Pending,
            icon: Clock3,
            color: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
        },
        {
            label: "Confirmed reservations",
            count: counts.Confirmed,
            icon: Check,
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
        },
    ];

    return (
        <section
            aria-label="Booking summary"
            className="mb-7 grid gap-3 sm:grid-cols-3"
        >
            {cards.map(({ label, count, icon: Icon, color }) => (
                <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-sm"
                >
                    <span className={`rounded-xl p-2.5 ${color}`}>
                        <Icon className="size-5" />
                    </span>
                    <span>
                        <span className="block text-2xl font-semibold">{count}</span>
                        <span className="text-xs text-muted-foreground">{label}</span>
                    </span>
                </div>
            ))}
        </section>
    );
}

export function BookingFilters({
    filter,
    counts,
    onChange,
}: {
    filter: BookingFilter;
    counts: BookingCounts;
    onChange: (filter: BookingFilter) => void;
}) {
    return (
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
                <h2 className="text-lg font-semibold">Reservations</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    {counts.All} {counts.All === 1 ? "booking" : "bookings"} total
                </p>
            </div>
            <div
                aria-label="Filter bookings by status"
                className="flex max-w-full gap-1 overflow-x-auto rounded-xl border bg-card p-1"
            >
                {filters.map((status) => (
                    <button
                        key={status}
                        type="button"
                        aria-pressed={filter === status}
                        onClick={() => onChange(status)}
                        className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm ${
                            filter === status
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                        {status}
                        <span className="ml-1.5 opacity-70">{counts[status]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export function BookingLoadingState() {
    return (
        <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-2xl border bg-card">
            <Spinner className="size-6 text-primary" />
            <p className="text-sm text-muted-foreground">Loading your reservations…</p>
        </div>
    );
}

export function BookingErrorState({
    message,
    onRetry,
}: {
    message: string;
    onRetry: () => void;
}) {
    return (
        <div
            role="alert"
            className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-card px-6 text-center"
        >
            <h2 className="text-lg font-semibold">Bookings couldn’t be loaded</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
            <Button
                variant="outline"
                onClick={onRetry}
                className="mt-5 gap-2 rounded-xl"
            >
                <RefreshCw className="size-4" />
                Try again
            </Button>
        </div>
    );
}

export function BookingEmptyState() {
    return (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 text-center">
            <div className="mb-4 rounded-2xl bg-primary/10 p-4 text-primary">
                <CalendarDays className="size-7" />
            </div>
            <h2 className="text-xl font-semibold">No bookings yet</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Find a space that sparks an idea and your reservations will show up here.
            </p>
            <Button render={<Link href="/studios" />} className="mt-6 gap-2 rounded-xl">
                <Compass className="size-4" />
                Find a studio
            </Button>
        </div>
    );
}
