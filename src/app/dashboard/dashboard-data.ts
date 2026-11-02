import type {
    BookingRecord,
    BookingStatus,
} from "@/components/bookingaside/Bookingcard";

type JsonObject = Record<string, unknown>;

const bookingStatuses: BookingStatus[] = [
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
];

function isObject(value: unknown): value is JsonObject {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(value: unknown): string | undefined {
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    return undefined;
}

function readStatus(value: unknown): BookingStatus {
    if (typeof value !== "string") return "Pending";

    return (
        bookingStatuses.find(
            (status) => status.toLowerCase() === value.toLowerCase(),
        ) ?? "Pending"
    );
}

function parseBooking(value: unknown): BookingRecord {
    if (!isObject(value)) {
        throw new Error("A booking in the response could not be read.");
    }

    const studioData = isObject(value.studio) ? value.studio : undefined;

    return {
        id: readText(value.id) ?? readText(value._id),
        studio: studioData
            ? {
                  id: readText(studioData.id) ?? readText(studioData._id),
                  title: readText(studioData.title),
                  location: readText(studioData.location),
              }
            : undefined,
        studioTitle: readText(value.studioTitle),
        title: readText(value.title),
        location: readText(value.location),
        status: readStatus(value.status),
        bookingDate: readText(value.bookingDate),
        date: readText(value.date),
        startTime: readText(value.startTime),
        endTime: readText(value.endTime),
        time: readText(value.time),
    };
}

export function parseBookings(value: unknown): BookingRecord[] {
    if (!Array.isArray(value)) {
        throw new Error("Bookings were returned in an unexpected format.");
    }

    return value.map(parseBooking);
}

export function getStudioTitle(booking: BookingRecord): string {
    return (
        booking.studioTitle ??
        booking.studio?.title ??
        booking.title ??
        "Studio reservation"
    );
}

export function formatBookingDate(value?: string): string {
    if (!value) return "Date not set";

    const date = new Date(`${value.slice(0, 10)}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

export function getBookingTime(booking: BookingRecord): string {
    if (booking.startTime && booking.endTime) {
        return `${booking.startTime} – ${booking.endTime}`;
    }

    return booking.startTime ?? booking.time ?? "Time not set";
}
