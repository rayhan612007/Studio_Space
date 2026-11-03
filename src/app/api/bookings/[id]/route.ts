import { forwardBookingRequest } from "@/app/lib/studio-bookings-api";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return forwardBookingRequest(
        request,
        `/bookings/${encodeURIComponent(id)}`,
        "PATCH",
    );
}
