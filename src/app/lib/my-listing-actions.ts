"use server";

import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { STUDIO_API_URL } from "@/app/lib/api";

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

export async function getMyListings(): Promise<unknown> {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    const email = session?.user.email?.trim().toLowerCase();
    if (!session?.user || !email) {
        throw new Error("Please sign in to view your listings.");
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
