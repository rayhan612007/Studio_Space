import { forwardBookingRequest } from "@/app/lib/studio-bookings-api";

export function GET(request: Request) {
    return forwardBookingRequest(request, "/bookings", "GET");
}

export function POST(request: Request) {
    return forwardBookingRequest(request, "/bookings", "POST");
}
