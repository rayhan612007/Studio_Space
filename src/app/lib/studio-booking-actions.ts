"use server";

import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { STUDIO_API_URL } from "@/app/lib/api";
import type { Idata } from "@/components/type/Idata";

type BookingInput = {
    studio: Idata;
    bookingDate: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    startAt: string;
    endAt: string;
    notes: string;
};

async function requestStudioApi(
    path: string,
    method: "GET" | "POST" | "PATCH",
    body?: unknown,
) {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (!session?.user) {
        throw new Error("Please sign in to access bookings.");
    }

    const username = process.env.user;
    const password = process.env.pass;
    if (!username || !password) {
        throw new Error("The studio API credentials are not configured.");
    }

    const upstreamHeaders = new Headers({
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    });
    const cookie = requestHeaders.get("cookie");
    if (cookie) upstreamHeaders.set("Cookie", cookie);

    const hasBody = body !== undefined;
    if (hasBody) upstreamHeaders.set("Content-Type", "application/json");

    const response = await fetch(`${STUDIO_API_URL}${path}`, {
        method,
        headers: upstreamHeaders,
        body: hasBody ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });

    const responseText = await response.text();
    let result: unknown;
    if (responseText) {
        try {
            result = JSON.parse(responseText);
        } catch {
            result = responseText;
        }
    }

    if (!response.ok) {
        if (typeof result === "object" && result !== null) {
            if ("error" in result && typeof result.error === "string") {
                throw new Error(result.error);
            }
            if ("message" in result && typeof result.message === "string") {
                throw new Error(result.message);
            }
        }
        throw new Error("The booking service could not complete your request.");
    }

    return result;
}

export async function getBookings(): Promise<unknown> {
    return requestStudioApi("/bookings", "GET");
}

export async function createBooking(
    booking: BookingInput,
): Promise<void> {
    await requestStudioApi("/bookings", "POST", booking);
}

export async function confirmBooking(bookingId: string): Promise<void> {
    await requestStudioApi(
        `/bookings/${encodeURIComponent(bookingId)}/confirm`,
        "POST",
    );
}

export async function cancelBooking(bookingId: string): Promise<void> {
    await requestStudioApi(
        `/bookings/${encodeURIComponent(bookingId)}`,
        "PATCH",
    );
}
