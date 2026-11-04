"use server";

import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { STUDIO_API_URL } from "@/app/lib/api";

type UpdateListingInput = {
    title: string;
    category: string;
    maxCapacity: string;
    hourlyRate: string;
    securityDeposit: string;
    location: string;
    imageUrl?: string;
    rating: string;
    overview: string;
    amenities: string[];
};

function getErrorMessage(result: unknown) {
    if (typeof result === "object" && result !== null) {
        if ("error" in result && typeof result.error === "string") {
            return result.error;
        }
        if ("message" in result && typeof result.message === "string") {
            return result.message;
        }
    }

    return null;
}

async function getAuthenticatedRequestHeaders() {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    const email = session?.user.email?.trim().toLowerCase();
    if (!session?.user || !email) {
        throw new Error("Please sign in to manage your listings.");
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

    return { email, session, upstreamHeaders };
}

async function sendListingRequest(
    path: string,
    method: "PATCH" | "DELETE",
    body?: UpdateListingInput & { email: string; hostName: string },
) {
    const { upstreamHeaders } = await getAuthenticatedRequestHeaders();
    if (body) upstreamHeaders.set("Content-Type", "application/json");

    let response: Response;
    try {
        response = await fetch(`${STUDIO_API_URL}${path}`, {
            method,
            headers: upstreamHeaders,
            body: body ? JSON.stringify(body) : undefined,
            cache: "no-store",
        });
    } catch (error) {
        console.error("My listings API request failed.", error);
        throw new Error("The listings service is unavailable. Please try again.");
    }

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
        throw new Error(
            getErrorMessage(result) ??
                (method === "DELETE"
                    ? "Unable to delete this listing. Please try again."
                    : "Unable to update this listing. Please try again."),
        );
    }
}

export async function getMyListings(): Promise<unknown> {
    const { email, upstreamHeaders } = await getAuthenticatedRequestHeaders();

    let response: Response;
    try {
        response = await fetch(
            `${STUDIO_API_URL}/my-listings/${encodeURIComponent(email)}`,
            {
                headers: upstreamHeaders,
                cache: "no-store",
            },
        );
    } catch (error) {
        console.error("My listings API request failed.", error);
        throw new Error("The listings service is unavailable. Please try again.");
    }

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
        throw new Error(
            getErrorMessage(result) ?? "Unable to load your listings. Please try again.",
        );
    }

    return result;
}

export async function updateMyListing(
    id: string,
    input: UpdateListingInput,
): Promise<void> {
    if (!id.trim()) throw new Error("A listing ID is required.");
    if (
        !input ||
        typeof input !== "object" ||
        !Array.isArray(input.amenities) ||
        input.amenities.some((amenity) => typeof amenity !== "string") ||
        [
            input.title,
            input.category,
            input.maxCapacity,
            input.hourlyRate,
            input.securityDeposit,
            input.location,
            input.rating,
            input.overview,
        ].some((value) => typeof value !== "string") ||
        (input.imageUrl !== undefined && typeof input.imageUrl !== "string")
    ) {
        throw new Error("The listing details are invalid.");
    }

    const { email, session } = await getAuthenticatedRequestHeaders();
    const body = {
        ...input,
        email,
        hostName: session.user.name,
    };
    await sendListingRequest(
        `/studios/${encodeURIComponent(id)}`,
        "PATCH",
        body,
    );
}

export async function deleteMyListing(id: string): Promise<void> {
    if (!id.trim()) throw new Error("A listing ID is required.");
    await sendListingRequest(
        `/studios/${encodeURIComponent(id)}`,
        "DELETE",
    );
}
