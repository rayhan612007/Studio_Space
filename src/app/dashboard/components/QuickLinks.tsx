import Link from "next/link";
import { ArrowRight, CalendarDays, Plus, Store, type LucideIcon } from "lucide-react";

interface QuickLinkItem {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
    action: string;
}

const links: QuickLinkItem[] = [
    {
        href: "/my-bookings",
        icon: CalendarDays,
        title: "My bookings",
        description: "Check reservation details and booking status.",
        action: "Manage bookings",
    },
    {
        href: "/my-listings",
        icon: Store,
        title: "My studio listings",
        description: "Keep your creative spaces up to date.",
        action: "Manage listings",
    },
    {
        href: "/add-studio",
        icon: Plus,
        title: "List a studio",
        description: "Make your space available to creators.",
        action: "Create a listing",
    },
];

function QuickLinkCard({ item }: { item: QuickLinkItem }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className="group flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
            <span className="rounded-xl bg-primary/10 p-3 text-primary">
                <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block font-semibold">{item.title}</span>
                <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                    {item.description}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {item.action}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
            </span>
        </Link>
    );
}

export default function QuickLinks() {
    return (
        <section aria-label="Quick links" className="grid gap-3">
            <div className="px-1">
                <h2 className="font-semibold">Quick access</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your activity on StudioSpace
                </p>
            </div>
            {links.map((item) => (
                <QuickLinkCard key={item.href} item={item} />
            ))}
        </section>
    );
}
