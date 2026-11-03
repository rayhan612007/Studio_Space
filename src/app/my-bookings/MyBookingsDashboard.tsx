"use client";

import { useEffect, useState } from "react";

import BookingCard, {
    type BookingRecord,
    type BookingStatus,
} from "@/components/bookingaside/Bookingcard";
import { STUDIO_API_URL } from "@/app/lib/api";
import { toast } from "@/components/ui/toast";
import {
    BookingEmptyState,
    BookingErrorState,
    BookingFilters,
    BookingHeader,
    BookingLoadingState,
    BookingSummary,
} from "./BookingDashboardSections";

type JsonObject = Record<string, unknown>;
type BookingFilter = "All" | BookingStatus;

const statuses: BookingStatus[] = [
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
];

function isObject(value: unknown): value is JsonObject {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(value: unknown): string | undefined {
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    return undefined;
}

function readStatus(value: unknown): BookingStatus {
    if (typeof value === "string") {
        return statuses.find(
            (status) => status.toLowerCase() === value.toLowerCase(),
        ) ?? "Pending";
    }
    return "Pending";
}

function parseBooking(value: unknown, index: number): BookingRecord {
    if (!isObject(value)) {
        throw new Error(`Reservation ${index + 1} could not be read.`);
    }

    const rawStudio = isObject(value.studio) ? value.studio : undefined;

    return {
        id: readText(value.id) ?? readText(value._id),
        studio: rawStudio
            ? {
                  id: readText(rawStudio.id) ?? readText(rawStudio._id),
                  title: readText(rawStudio.title),
                  category: readText(rawStudio.category),
                  location: readText(rawStudio.location),
                  imageUrl: readText(rawStudio.imageUrl),
                  hourlyRate: readText(rawStudio.hourlyRate),
              }
            : undefined,
        studioTitle: readText(value.studioTitle),
        title: readText(value.title),
        category: readText(value.category),
        location: readText(value.location),
        imageUrl: readText(value.imageUrl),
        status: readStatus(value.status),
        bookingDate: readText(value.bookingDate),
        date: readText(value.date),
        startTime: readText(value.startTime),
        endTime: readText(value.endTime),
        time: readText(value.time),
        hourlyRate: readText(value.hourlyRate),
        price: readText(value.price),
        totalPrice: readText(value.totalPrice),
    };
}

function parseBookings(value: unknown): BookingRecord[] {
    const records = Array.isArray(value)
        ? value
        : isObject(value) && Array.isArray(value.bookings)
          ? value.bookings
          : null;

    if (!records) {
        throw new Error("The bookings response was not in the expected format.");
    }

    return records.map(parseBooking);
}

function countBookings(bookings: BookingRecord[]): Record<BookingFilter, number> {
    return bookings.reduce(
        (counts, booking) => {
            counts.All += 1;
            counts[booking.status ?? "Pending"] += 1;
            return counts;
        },
        { All: 0, Pending: 0, Confirmed: 0, Completed: 0, Cancelled: 0 },
    );
}

async function getErrorMessage(response: Response) {
    const result: unknown = await response.json().catch(() => null);
    if (isObject(result) && typeof result.error === "string") {
        return result.error;
    }
    return "We couldn’t load your bookings. Please try again.";
}

export default function MyBookingsDashboard() {
    const [bookings, setBookings] = useState<BookingRecord[]>([]);
    const [filter, setFilter] = useState<BookingFilter>("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function loadBookings() {
            try {
                const response = await fetch(`${STUDIO_API_URL}/bookings`, {
                    signal: controller.signal,
                    cache: "no-store",
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error(await getErrorMessage(response));
                }

                const result: unknown = await response.json();
                const nextBookings = parseBookings(result);
                if (controller.signal.aborted) return;

                setBookings(nextBookings);
                setError(null);
            } catch (requestError) {
                if (controller.signal.aborted) return;

                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : "We couldn’t load your bookings. Please try again.",
                );
                toast.add({
                    title: "Bookings couldn’t be loaded",
                    description: requestError instanceof Error
                        ? requestError.message
                        : "Please try again.",
                    type: "error",
                });
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        void loadBookings();
        return () => controller.abort();
    }, [reloadKey]);

    const counts = countBookings(bookings);
    const visibleBookings =
        filter === "All"
            ? bookings
            : bookings.filter((booking) => (booking.status ?? "Pending") === filter);

    function handleBookingCancelled(id: string) {
        setBookings((current) =>
            current.map((booking) =>
                booking.id === id ? { ...booking, status: "Cancelled" } : booking,
            ),
        );
    }

    function retryLoading() {
        setLoading(true);
        setError(null);
        setReloadKey((key) => key + 1);
    }

    return (
        <main className="min-h-[65vh] flex-1 bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <BookingHeader />

                {!loading && !error && bookings.length > 0 && (
                    <BookingSummary counts={counts} />
                )}

                {loading ? (
                    <BookingLoadingState />
                ) : error ? (
                    <BookingErrorState message={error} onRetry={retryLoading} />
                ) : bookings.length === 0 ? (
                    <BookingEmptyState />
                ) : (
                    <section aria-label="Your reservations">
                        <BookingFilters
                            filter={filter}
                            counts={counts}
                            onChange={setFilter}
                        />

                        {visibleBookings.length === 0 ? (
                            <div className="rounded-2xl border border-dashed bg-card px-6 py-14 text-center">
                                <p className="font-medium">No {filter.toLowerCase()} bookings found.</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try another status to see your other reservations.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setFilter("All")}
                                    className="mt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                                >
                                    Show all bookings
                                </button>
                            </div>
                        ) : (
                            <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {visibleBookings.map((booking, index) => (
                                    <BookingCard
                                        key={
                                            booking.id ??
                                            `${booking.bookingDate ?? booking.date ?? "booking"}-${index}`
                                        }
                                        booking={booking}
                                        onBookingCancelled={handleBookingCancelled}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </div>
        </main>
    );
}
