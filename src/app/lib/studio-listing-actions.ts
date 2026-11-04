"use server";

import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { STUDIO_API_URL } from "@/app/lib/api";

const MAX_IMAGES = 8;

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

export async function createStudioListing(formData: FormData): Promise<void> {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    const email = session?.user.email?.trim().toLowerCase();
    if (!session?.user || !email) {
        throw new Error("Sign in before creating a studio listing.");
    }

    let imageUrls: unknown;
    try {
        imageUrls = JSON.parse(String(formData.get("imageUrls") ?? "[]"));
    } catch {
        throw new Error("Image URLs must be a valid list.");
    }
    if (
        !Array.isArray(imageUrls) ||
        imageUrls.length === 0 ||
        imageUrls.length > MAX_IMAGES ||
        imageUrls.some((imageUrl) => {
            if (typeof imageUrl !== "string") return true;
            try {
                const url = new URL(imageUrl);
                return url.protocol !== "https:";
            } catch {
                return true;
            }
        })
    ) {
        throw new Error("Enter 1 to 8 valid HTTPS image URLs.");
    }

    const username = process.env.user;
    const password = process.env.pass;
    if (!username || !password) {
        throw new Error("The studio API credentials are not configured.");
    }

    const body: Record<string, unknown> = Object.fromEntries(formData.entries());
    body.email = email;
    body.hostName = session.user.name;
    body.imageUrls = imageUrls;

    const upstreamHeaders = new Headers({
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
        "Content-Type": "application/json",
    });
    const cookie = requestHeaders.get("cookie");
    if (cookie) upstreamHeaders.set("Cookie", cookie);

    let response: Response;
    try {
        response = await fetch(`${STUDIO_API_URL}/add-studios`, {
            method: "POST",
            headers: upstreamHeaders,
            body: JSON.stringify(body),
            cache: "no-store",
        });
    } catch (error) {
        console.error("Studio listing API request failed.", error);
        throw new Error("The studio service is unavailable. Please try again.");
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
            getErrorMessage(result) ?? "Failed to create studio listing.",
        );
    }
}
