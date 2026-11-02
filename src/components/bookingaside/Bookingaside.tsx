"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

import { authClient } from "@/lib/auth-client";
import { STUDIO_API_URL } from "@/lib/studio-api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const today = new Date().toISOString().slice(0, 10);
    const signedIn = Boolean(session?.user);
    const loginHref = `/login?callbackURL=${encodeURIComponent(pathname || "/studios")}`;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!signedIn || loading) return;

        const form = event.currentTarget;
        const formData = new FormData(form);
        const bookingDate = String(formData.get("bookingDate") ?? "");
        const startTime = String(formData.get("startTime") ?? "");
        const endTime = String(formData.get("endTime") ?? "");

        if (startTime >= endTime) {
            setError("Choose an end time that is later than the start time.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${STUDIO_API_URL}/bookings`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studio,
                    bookingDate,
                    startTime,
                    endTime,
                    notes: String(formData.get("notes") ?? ""),
                }),
            });

            if (!response.ok) {
                const result: unknown = await response.json().catch(() => null);
                const message =
                    typeof result === "object" &&
                    result !== null &&
                    "error" in result &&
                    typeof result.error === "string"
                        ? result.error
                        : "We couldn’t create your booking. Please try again.";
                throw new Error(message);
            }

            setSubmitted(true);
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : "We couldn’t create your booking. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <Card className="mx-auto h-fit w-full max-w-md text-center shadow-lg">
                <CardContent className="flex flex-col items-center px-6 py-10">
                    <span className="mb-5 rounded-full bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-9" />
                    </span>
                    <Badge variant="outline" className="mb-3 border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">
                        Pending confirmation
                    </Badge>
                    <CardTitle className="text-2xl">Booking request sent</CardTitle>
                    <CardDescription className="mt-2 max-w-sm leading-6">
                        Your request for {studio.title} is saved. You can follow its status from your bookings.
                    </CardDescription>
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
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mx-auto h-fit w-full max-w-md shadow-lg">
            <CardHeader className="border-b bg-muted/30">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle className="text-2xl">Reserve this studio</CardTitle>
                        <CardDescription className="mt-1.5">
                            Choose a date and time to request your session.
                        </CardDescription>
                    </div>
                    <CalendarDays className="mt-1 size-5 shrink-0 text-primary" />
                </div>
                <div className="flex items-end justify-between gap-3 pt-3">
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <span className="text-right text-2xl font-bold tracking-tight">
                        {formatPrice(studio.hourlyRate)}
                        <span className="ml-1 text-sm font-normal text-muted-foreground">/ hour</span>
                    </span>
                </div>
                <div className="grid gap-2 pt-2 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Badge variant="secondary">{studio.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground sm:justify-end">
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

            <CardContent className="pt-6">
                {error && (
                    <Alert variant="destructive" className="mb-5">
                        <AlertCircle />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {sessionPending ? (
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
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="bookingDate">Booking date</Label>
                            <Input
                                required
                                type="date"
                                id="bookingDate"
                                name="bookingDate"
                                min={today}
                                defaultValue={today}
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
                            Your request will be saved as <strong className="font-semibold text-foreground">Pending</strong> until the host responds.
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
            </CardContent>
            <CardFooter className="justify-center border-t text-xs text-muted-foreground">
                No payment information is collected with this request.
            </CardFooter>
        </Card>
    );
}
