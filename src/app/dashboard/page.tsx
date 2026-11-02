import PrivateRoute from "@/components/PrivateRoute";
import DashboardOverview from "./DashboardOverview";

export default function DashboardPage() {
    return (
        <PrivateRoute>
            <DashboardOverview />
        </PrivateRoute>
    );
}