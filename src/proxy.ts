import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    if (getSessionCookie(request)) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
        "callbackURL",
        `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        "/studios/:path*",
        "/add-studio/:path*",
        "/dashboard/:path*",
        "/my-bookings/:path*",
        "/my-listings/:path*",
    ],
};