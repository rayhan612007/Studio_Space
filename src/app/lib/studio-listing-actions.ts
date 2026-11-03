"use server";

import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { STUDIO_API_URL } from "@/app/lib/api";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
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

    const images = formData.getAll("images");
    if (
        images.length === 0 ||
        images.length > MAX_IMAGES ||
        images.some(
            (image) =>
                !(image instanceof File) ||
                !image.type.startsWith("image/") ||
                image.size > MAX_IMAGE_SIZE,
        )
    ) {
        throw new Error("Choose 1 to 8 valid images, each 10 MB or smaller.");
    }

    const username = process.env.user;
    const password = process.env.pass;
    if (!username || !password) {
        throw new Error("The studio API credentials are not configured.");
    }

    formData.set("email", email);
    formData.set("hostName", session.user.name);

    const upstreamHeaders = new Headers({
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    });
    const cookie = requestHeaders.get("cookie");
    if (cookie) upstreamHeaders.set("Cookie", cookie);

    let response: Response;
    try {
        response = await fetch(`${STUDIO_API_URL}/add-studios`, {
            method: "POST",
            headers: upstreamHeaders,
            body: formData,
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
