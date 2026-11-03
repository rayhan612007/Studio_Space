"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    CalendarDays,
    LayoutDashboard,
    List,
    LogOut,
    PlusCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { authClient } from "@/app/lib/auth-client";


interface User {
    email: string;
    image?: string | null;
    name: string;
}

const menuLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/add-studio", label: "Add New Studio", icon: PlusCircle },
    { href: "/my-listings", label: "My Studio Listings", icon: List },
    { href: "/my-bookings", label: "My Bookings", icon: CalendarDays },
];

export default function Avatarmenu({ user }: { user: User }) {
    const [open, setOpen] = useState(false);
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const name = user.name.trim() || "User";
    const avatarName = name.charAt(0).toUpperCase();
    const avatarImage = user.image?.trim();

    const clearCloseTimeout = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
    };

    const scheduleClose = () => {
        clearCloseTimeout();
        closeTimeout.current = setTimeout(() => setOpen(false), 120);
    };

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`);

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            setOpen(false);
            router.replace("/");
            router.refresh();
        } catch {
            toast.error("Unable to log out. Please try again.");
        }
    };

    return (
        <DropdownMenu
            open={open}
            onOpenChange={(nextOpen) => {
                clearCloseTimeout();
                setOpen(nextOpen);
            }}
        >
            <DropdownMenuTrigger
                aria-label={`Open ${name}'s account menu`}
                onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse") return;
                    clearCloseTimeout();
                    setOpen(true);
                }}
                onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") scheduleClose();
                }}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
                <Avatar className="h-10 w-10 cursor-pointer border-2 border-primary">
                    {avatarImage ? (
                        <AvatarImage src={avatarImage} alt={`${name}'s profile`} />
                    ) : null}
                    <AvatarFallback className="text-sm font-semibold text-primary">
                        {avatarName}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64 max-w-[calc(100vw-1rem)]"
                onPointerEnter={clearCloseTimeout}
                onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") scheduleClose();
                }}
            >
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex flex-col gap-1 px-1 py-1">
                            <span className="truncate text-sm font-semibold text-foreground">
                                {name}
                            </span>
                            <span className="truncate text-xs font-normal text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {menuLinks.map(({ href, label, icon: Icon }) => {
                        const active = isActive(href);

                        return (
                            <DropdownMenuItem
                                key={href}
                                render={
                                    <Link
                                        href={href}
                                        aria-current={active ? "page" : undefined}
                                    />
                                }
                                className={`min-h-11 cursor-pointer ${active
                                    ? "bg-primary/10 font-semibold text-primary focus:bg-primary/15 focus:text-primary"
                                    : ""
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                                {active ? (
                                    <span
                                        aria-hidden="true"
                                        className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                                    />
                                ) : null}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="min-h-11 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
