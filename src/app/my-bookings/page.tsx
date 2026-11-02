import { redirect } from "next/navigation";

import { getCurrentSession } from "@/app/lib/session";
import MyBookingsDashboard from "./MyBookingsDashboard";

export default async function MyBookingsPage() {
    const session = await getCurrentSession();

    if (!session) {
        redirect("/login?callbackURL=%2Fmy-bookings");
    }

    return <MyBookingsDashboard />;
}
