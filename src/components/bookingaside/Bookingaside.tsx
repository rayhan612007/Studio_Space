"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    Clock3,
    LoaderCircle,
    LogIn,
    MapPin,
    ShieldCheck,
    Users,
} from "lucide-react";

import { authClient } from "@/app/lib/auth-client";
import { createBooking } from "@/app/lib/studio-booking-actions";
import { toast } from "@/components/ui/toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { Idata } from "../type/Idata";

function formatPrice(value: string) {
    const amount = Number(value.replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(amount)) return value;

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(amount);
}

export default function Bookingaside({ studio }: { studio: Idata }) {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const pathname = usePathname();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const signedIn = Boolean(session?.user);
    const loginHref = `/login?callbackURL=${encodeURIComponent(pathname || "/studios")}`;

    useEffect(() => {
        if (!open) return;
        const now = new Date();
        const localToday = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, "0"),
            String(now.getDate()).padStart(2, "0"),
        ].join("-");
        const dateInput = formRef.current?.elements.namedItem("bookingDate");
        if (dateInput instanceof HTMLInputElement) {
            dateInput.min = localToday;
            dateInput.value = localToday;
        }
    }, [open]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!signedIn || loading) return;

        const form = event.currentTarget;
        const formData = new FormData(form);
        const bookingDate = String(formData.get("bookingDate") ?? "");
        const startTime = String(formData.get("startTime") ?? "");
        const endTime = String(formData.get("endTime") ?? "");

        if (startTime >= endTime) {
            const message = "Choose an end time that is later than the start time.";
            setError(message);
            toast.add({ title: "Check your booking time", description: message, type: "error" });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            await createBooking({
                studio,
                bookingDate,
                startTime,
                endTime,
                timeZone,
                startAt: new Date(`${bookingDate}T${startTime}:00`).toISOString(),
                endAt: new Date(`${bookingDate}T${endTime}:00`).toISOString(),
                notes: String(formData.get("notes") ?? ""),
            });

            setSubmitted(true);
            toast.add({
                title: "Booking request submitted",
                description: "Your booking is Pending. Confirm it from My Bookings after checking availability.",
                type: "success",
            });
            setOpen(false);
            router.push("/my-bookings");
        } catch (requestError) {
            const message = requestError instanceof Error
                ? requestError.message
                : "We couldn’t create your booking. Please try again.";
            setError(message);
            toast.add({
                title: message.includes("already booked")
                    ? "Studio already booked"
                    : "Booking failed",
                description: message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Card className="h-fit w-full shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl">Workspace details</CardTitle>
                            <CardDescription className="mt-1.5">
                                Booking information for {studio.title}.
                            </CardDescription>
                        </div>
                        <CalendarDays className="mt-1 size-5 shrink-0 text-primary" />
                    </div>
                    <div className="flex items-end justify-between gap-3 pt-3">
                        <span className="text-sm text-muted-foreground">Hourly rate</span>
                        <span className="text-right text-2xl font-bold tracking-tight">
                            {formatPrice(studio.hourlyRate)}
                            <span className="ml-1 text-sm font-normal text-muted-foreground">/ hour</span>
                        </span>
                    </div>
                    <div className="grid gap-3 pt-2 text-sm sm:grid-cols-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Badge variant="secondary">{studio.category}</Badge>
                        </div>
                        <div className="flex min-w-0 items-center gap-2 text-muted-foreground sm:justify-end">
                            <MapPin className="size-4 shrink-0" />
                            <span className="truncate">{studio.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="size-4 shrink-0" />
                            <span>Up to {studio.maxCapacity} people</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground sm:justify-end">
                            <ShieldCheck className="size-4 shrink-0" />
                            <span>Deposit: {formatPrice(studio.securityDeposit)}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <DialogTrigger>
                        <Button className="w-full gap-2 rounded-xl">
                            <CalendarDays className="size-4" />
                            Book Workspace Now
                        </Button>
                    </DialogTrigger>
                    <p className="text-center text-xs text-muted-foreground">
                        No payment information is collected with this request.
                    </p>
                </CardContent>
            </Card>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                        <DialogTitle>{submitted ? "Booking request submitted" : "Book Workspace Now"}</DialogTitle>
                        <DialogDescription>
                            {submitted
                                ? `Your request for ${studio.title} is Pending until you confirm it from My Bookings.`
                                : `Choose a date and time to request ${studio.title}.`}
                        </DialogDescription>
                </DialogHeader>
                {submitted ? (
                        <div className="flex flex-col items-center px-4 py-6 text-center">
                            <span className="mb-5 rounded-full bg-amber-500/10 p-4 text-amber-600 dark:text-amber-400">
                                <CheckCircle2 className="size-9" />
                            </span>
                            <Badge variant="outline" className="mb-3 border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">
                                Pending
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                                Confirm the booking from My Bookings. If another confirmed booking overlaps, it will remain Pending.
                            </p>
                        <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
                            <Button
                                render={<Link href="/my-bookings" />}
                                nativeButton={false}
                                className="flex-1"
                            >
                                View my bookings
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setSubmitted(false)}
                                className="flex-1"
                            >
                                Book another slot
                            </Button>
                        </div>
                    </div>
                ) : sessionPending ? (
                    <div className="flex min-h-32 items-center justify-center gap-2 text-sm text-muted-foreground">
                        <LoaderCircle className="size-4 animate-spin" />
                        Checking your account…
                    </div>
                ) : !signedIn ? (
                    <div className="rounded-xl border border-dashed px-5 py-6 text-center">
                        <p className="font-medium">Sign in to request this studio</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your booking will be linked to your account.
                        </p>
                        <Button
                            render={<Link href={loginHref} />}
                            nativeButton={false}
                            className="mt-4 gap-2"
                        >
                            <LogIn className="size-4" />
                            Sign in to continue
                        </Button>
                    </div>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="bookingDate">Booking date</Label>
                            <Input
                                required
                                type="date"
                                id="bookingDate"
                                name="bookingDate"
                                className="h-11"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="startTime">Start time</Label>
                                <div className="relative">
                                    <Clock3 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        required
                                        type="time"
                                        id="startTime"
                                        name="startTime"
                                        defaultValue="09:00"
                                        className="h-11 pl-9"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">End time</Label>
                                <div className="relative">
                                    <Clock3 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        required
                                        type="time"
                                        id="endTime"
                                        name="endTime"
                                        defaultValue="10:00"
                                        className="h-11 pl-9"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Special requests</Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                rows={3}
                                maxLength={1000}
                                placeholder="Share any setup preferences or notes for the host."
                                className="resize-y"
                            />
                        </div>

                        <div className="rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                            Your request is saved as <strong className="font-semibold text-foreground">Pending</strong>. Confirm it from My Bookings; overlapping confirmed bookings will prevent confirmation.
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-11 w-full gap-2 rounded-xl text-sm font-semibold"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle className="size-4 animate-spin" />
                                    Sending request…
                                </>
                            ) : (
                                "Request booking"
                            )}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
