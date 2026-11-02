import { getDatabase } from "@/app/lib/auth";
import { getCurrentSession } from "@/app/lib/session";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
    return typeof value === "string" ? value.trim() : undefined;
}

function readOptionalString(value: unknown): string | undefined {
    const text = readString(value);
    return text || undefined;
}

export async function GET() {
    const session = await getCurrentSession();
    if (!session) {
        return Response.json({ error: "Authentication required." }, { status: 401 });
    }

    try {
        const db = await getDatabase();
        const bookings = await db
            .collection("bookings")
            .find({
                $or: [
                    { userId: session.user.id },
                    { email: session.user.email },
                ],
            })
            .sort({ createdAt: -1 })
            .toArray();

        return Response.json(
            bookings.map(({ _id, ...booking }) => ({
                ...booking,
                id: _id.toString(),
            })),
        );
    } catch (error) {
        console.error("Failed to load bookings:", error);
        return Response.json({ error: "Unable to load bookings." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getCurrentSession();
    if (!session) {
        return Response.json({ error: "Authentication required." }, { status: 401 });
    }

    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return Response.json({ error: "Invalid booking request." }, { status: 400 });
    }

    if (!isObject(payload) || !isObject(payload.studio)) {
        return Response.json({ error: "Studio details are required." }, { status: 400 });
    }

    const studioPayload = payload.studio;
    const title = readString(studioPayload.title);
    const bookingDate = readString(payload.bookingDate);
    const startTime = readString(payload.startTime);
    const endTime = readString(payload.endTime);

    if (
        !title ||
        !bookingDate ||
        !/^\d{4}-\d{2}-\d{2}$/.test(bookingDate) ||
        !startTime ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(startTime) ||
        !endTime ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(endTime) ||
        startTime >= endTime
    ) {
        return Response.json(
            { error: "A studio, valid date, and valid time range are required." },
            { status: 400 },
        );
    }

    const booking = {
        userId: session.user.id,
        email: session.user.email,
        fullName: session.user.name,
        studio: {
            id: readOptionalString(studioPayload._id) ?? readOptionalString(studioPayload.id),
            title,
            category: readOptionalString(studioPayload.category),
            location: readOptionalString(studioPayload.location),
            imageUrl: readOptionalString(studioPayload.imageUrl),
            hourlyRate: readOptionalString(studioPayload.hourlyRate),
        },
        bookingDate,
        startTime,
        endTime,
        notes: readOptionalString(payload.notes) ?? "",
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    try {
        const db = await getDatabase();
        const result = await db.collection("bookings").insertOne(booking);

        return Response.json(
            { ...booking, id: result.insertedId.toString() },
            { status: 201 },
        );
    } catch (error) {
        console.error("Failed to create booking:", error);
        return Response.json({ error: "Unable to create booking." }, { status: 500 });
    }
}
