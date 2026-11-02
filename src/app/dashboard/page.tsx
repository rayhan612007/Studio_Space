import { redirect } from "next/navigation";

import { getCurrentSession } from "@/app/lib/session";
import DashboardOverview from "./DashboardOverview";

export default async function DashboardPage() {
    const session = await getCurrentSession();

    if (!session) {
        redirect("/login?callbackURL=%2Fdashboard");
    }

    return <DashboardOverview userName={session.user.name} />;
}