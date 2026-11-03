import "server-only";

import { NextResponse } from "next/server";

import { auth } from "@/app/lib/auth";
import { STUDIO_API_URL } from "@/app/lib/api";

export async function forwardBookingRequest(
    request: Request,
    path: string,
    method: "GET" | "POST" | "PATCH",
) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
        return NextResponse.json({ error: "Please sign in to access bookings." }, { status: 401 });
    }

    const username = process.env.user;
    const password = process.env.pass;
    if (!username || !password) {
        throw new Error("The studio API credentials are not configured.");
    }

    const headers = new Headers({
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    });
    const cookie = request.headers.get("cookie");
    const contentType = request.headers.get("content-type");
    if (cookie) headers.set("Cookie", cookie);
    if (contentType) headers.set("Content-Type", contentType);

    let body: string | undefined;
    if (method !== "GET") body = await request.text();

    let response: Response;
    try {
        response = await fetch(`${STUDIO_API_URL}${path}`, {
            method,
            headers,
            body,
            cache: "no-store",
        });
    } catch (error) {
        console.error("Studio booking API request failed.", error);
        return NextResponse.json(
            { error: "The booking service is unavailable. Please try again." },
            { status: 502 },
        );
    }

    const responseHeaders = new Headers();
    const responseContentType = response.headers.get("content-type");
    if (responseContentType) responseHeaders.set("Content-Type", responseContentType);
    responseHeaders.set("Cache-Control", "no-store");

    return new Response(response.body, {
        status: response.status,
        headers: responseHeaders,
    });
}
