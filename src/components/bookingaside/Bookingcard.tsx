"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    AlertCircle,
    CalendarDays,
    Check,
    Clock3,
    MapPin,
    X,
} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STUDIO_API_URL } from "@/lib/studio-api";
import { toast } from "@/components/ui/toast";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface BookingRecord {
    id?: string;
    studio?: {
        id?: string;
        title?: string;
        category?: string;
        location?: string;
        imageUrl?: string;
        hourlyRate?: string;
    };
    studioTitle?: string;
    title?: string;
    category?: string;
    location?: string;
    imageUrl?: string;
    status?: BookingStatus;
    bookingDate?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    time?: string;
    hourlyRate?: string;
    price?: string;
    totalPrice?: string;
}

interface BookingCardProps {
    booking: BookingRecord;
    onBookingCancelled: (id: string) => void;
}

interface BookingDetails {
    studioTitle: string;
    category?: string;
    location?: string;
    imageUrl?: string;
    studioUrl: string;
    status: BookingStatus;
    date: string;
    time: string;
    price?: string;
    isHourlyRate: boolean;
}

const statusStyles: Record<BookingStatus, string> = {
    Pending: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    Confirmed: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    Completed: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    Cancelled: "border-muted bg-muted text-muted-foreground",
};

function formatDate(value?: string) {
    if (!value) return "Date not provided";

    const date = new Date(`${value.slice(0, 10)}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("en", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

function formatPrice(value?: string) {
    if (!value) return undefined;

    const amount = Number(value.replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(amount)) return value;

    return `$${amount.toLocaleString("en-US", {
        minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
    })}`;
}

function getBookingDetails(booking: BookingRecord): BookingDetails {
    const studioId = booking.studio?.id;
    const amount = booking.totalPrice ?? booking.price;
    const hourlyRate = booking.studio?.hourlyRate ?? booking.hourlyRate;
    const time =
        booking.startTime && booking.endTime
            ? `${booking.startTime} – ${booking.endTime}`
            : booking.startTime ?? booking.time ?? "Time not provided";

    return {
        studioTitle:
            booking.studioTitle ??
            booking.studio?.title ??
            booking.title ??
            "Studio reservation",
        category: booking.category ?? booking.studio?.category,
        location: booking.location ?? booking.studio?.location,
        imageUrl: booking.imageUrl ?? booking.studio?.imageUrl,
        studioUrl: studioId ? `/studios/${encodeURIComponent(studioId)}` : "/studios",
        status: booking.status ?? "Pending",
        date: formatDate(booking.bookingDate ?? booking.date),
        time,
        price: formatPrice(amount ?? hourlyRate),
        isHourlyRate: !amount && Boolean(hourlyRate),
    };
}

function StatusBadge({ status }: { status: BookingStatus }) {
    return (
        <Badge
            variant="outline"
            className={`absolute right-3 top-2.5 h-6 gap-1 rounded-full bg-background/95 px-2.5 text-[11px] font-semibold shadow-sm backdrop-blur ${statusStyles[status]}`}
        >
            {status === "Confirmed" && <Check aria-hidden="true" />}
            {status === "Cancelled" && <X aria-hidden="true" />}
            {status}
        </Badge>
    );
}

function BookingSchedule({ date, time }: { date: string; time: string }) {
    return (
        <div className="grid gap-2 rounded-lg bg-muted/50 p-3 text-xs sm:grid-cols-2">
            <div className="flex min-w-0 items-center gap-2">
                <CalendarDays className="size-3.5 shrink-0 text-primary" />
                <span className="truncate font-medium">{date}</span>
            </div>
            <div className="flex min-w-0 items-center gap-2">
                <Clock3 className="size-3.5 shrink-0 text-primary" />
                <span className="truncate font-medium">{time}</span>
            </div>
        </div>
    );
}

function CancelBookingAction({
    bookingId,
    studioTitle,
    onBookingCancelled,
}: {
    bookingId: string;
    studioTitle: string;
    onBookingCancelled: (id: string) => void;
}) {
    const [cancelling, setCancelling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function cancelBooking() {
        setCancelling(true);
        setError(null);

        try {
            const response = await fetch(
                `${STUDIO_API_URL}/bookings/${encodeURIComponent(bookingId)}`,
                { method: "PATCH", credentials: "include" },
            );
            if (!response.ok) {
                const result: unknown = await response.json().catch(() => null);
                const message =
                    typeof result === "object" &&
                    result !== null &&
                    "error" in result &&
                    typeof result.error === "string"
                        ? result.error
                        : "We couldn’t cancel this booking. Please try again.";
                throw new Error(message);
            }

            onBookingCancelled(bookingId);
            toast.add({ title: "Booking cancelled", description: studioTitle, type: "success" });
        } catch (requestError) {
            const message = requestError instanceof Error
                ? requestError.message
                : "We couldn’t cancel this booking. Please try again.";
            setError(message);
            toast.add({ title: "Cancellation failed", description: message, type: "error" });
        } finally {
            setCancelling(false);
        }
    }

    return (
        <div className="flex flex-col items-end gap-1">
            <AlertDialog>
                <AlertDialogTrigger
                    render={
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        />
                    }
                >
                    Cancel booking
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your reservation for {studioTitle} will be marked as cancelled. This can’t be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={cancelling}>Keep booking</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            disabled={cancelling}
                            onClick={cancelBooking}
                        >
                            {cancelling ? "Cancelling…" : "Yes, cancel booking"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {error && (
                <span role="alert" className="flex items-start gap-1 text-right text-xs text-destructive">
                    <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                    {error}
                </span>
            )}
        </div>
    );
}

export default function BookingCard({ booking, onBookingCancelled }: BookingCardProps) {
    const details = getBookingDetails(booking);

    return (
        <Card className="gap-0 rounded-xl border-border/70 py-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative h-24 overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/20 via-muted to-primary/5">
                {details.imageUrl && (
                    <Image
                        src={details.imageUrl}
                        alt={details.studioTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
                {details.category && (
                    <Badge className="absolute bottom-2.5 left-3 border-white/30 bg-black/35 px-2.5 text-white backdrop-blur-md hover:bg-black/35">
                        {details.category}
                    </Badge>
                )}
                <StatusBadge status={details.status} />
            </div>

            <CardHeader className="gap-1.5 px-4 pt-4">
                <div className="flex items-start justify-between gap-2.5">
                    <div className="min-w-0">
                        <CardTitle className="truncate text-base font-semibold tracking-tight">
                            {details.studioTitle}
                        </CardTitle>
                        {details.location && (
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <MapPin className="size-3.5 shrink-0" />
                                <span className="truncate">{details.location}</span>
                            </p>
                        )}
                    </div>
                    {details.price && (
                        <div className="shrink-0 text-right">
                            <p className="text-base font-bold leading-tight">{details.price}</p>
                            {details.isHourlyRate && (
                                <p className="mt-0.5 text-[11px] text-muted-foreground">per hour</p>
                            )}
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="px-4 pt-3">
                <BookingSchedule date={details.date} time={details.time} />
            </CardContent>

            <CardFooter className="mt-3 flex flex-wrap justify-between gap-2 rounded-b-xl border-t bg-transparent px-4 py-3">
                <Button
                    size="sm"
                    variant="outline"
                    render={<Link href={details.studioUrl} />}
                    nativeButton={false}
                >
                    View studio
                </Button>

                {details.status === "Pending" && booking.id && (
                    <CancelBookingAction
                        bookingId={booking.id}
                        studioTitle={details.studioTitle}
                        onBookingCancelled={onBookingCancelled}
                    />
                )}
            </CardFooter>
        </Card>
    );
}
