import PrivateRoute from "@/components/PrivateRoute";
import MyBookingsDashboard from "./MyBookingsDashboard";

export default function MyBookingsPage() {
    return (
        <PrivateRoute>
            <MyBookingsDashboard />
        </PrivateRoute>
    );
}
