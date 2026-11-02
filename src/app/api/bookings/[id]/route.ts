import { ObjectId } from "mongodb";

import { getDatabase } from "@/app/lib/auth";
import { getCurrentSession } from "@/app/lib/session";

export async function PATCH(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const session = await getCurrentSession();
    if (!session) {
        return Response.json({ error: "Authentication required." }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
        return Response.json({ error: "Booking not found." }, { status: 404 });
    }

    try {
        const db = await getDatabase();
        const result = await db.collection("bookings").updateOne(
            {
                _id: new ObjectId(id),
                $or: [
                    { userId: session.user.id },
                    { email: session.user.email },
                ],
                status: { $regex: /^pending$/i },
            },
            {
                $set: {
                    status: "Cancelled",
                    updatedAt: new Date(),
                },
            },
        );

        if (result.matchedCount === 0) {
            return Response.json(
                { error: "This booking can no longer be cancelled." },
                { status: 409 },
            );
        }

        return Response.json({ id, status: "Cancelled" });
    } catch (error) {
        console.error("Failed to cancel booking:", error);
        return Response.json({ error: "Unable to cancel booking." }, { status: 500 });
    }
}
