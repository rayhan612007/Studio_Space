import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    type LucideIcon,
} from "lucide-react";

interface DashboardStatsProps {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
}

const statStyles = {
    total: "bg-primary/10 text-primary",
    pending: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    confirmed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
};

function StatCard({
    label,
    value,
    detail,
    icon: Icon,
    tone,
}: {
    label: string;
    value: number;
    detail: string;
    icon: LucideIcon;
    tone: string;
}) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm">
            <span className={`rounded-xl p-3 ${tone}`}>
                <Icon className="size-5" />
            </span>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
            </div>
        </div>
    );
}

export default function DashboardStats({
    totalBookings,
    pendingBookings,
    confirmedBookings,
}: DashboardStatsProps) {
    return (
        <section
            aria-label="Account overview"
            className="mb-8 grid gap-4 sm:grid-cols-3"
        >
            <StatCard
                label="Bookings"
                value={totalBookings}
                detail="All your reservations"
                icon={CalendarDays}
                tone={statStyles.total}
            />
            <StatCard
                label="Pending"
                value={pendingBookings}
                detail="Waiting for host confirmation"
                icon={Clock3}
                tone={statStyles.pending}
            />
            <StatCard
                label="Confirmed"
                value={confirmedBookings}
                detail="Ready for your next session"
                icon={CheckCircle2}
                tone={statStyles.confirmed}
            />
        </section>
    );
}
