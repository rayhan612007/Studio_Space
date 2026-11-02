
"use client";

import Link from "next/link";
import { LogOut, LayoutDashboard, PlusCircle } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
interface Iuser {
    "email": string,
    "image": string
    "name": string
}
export default function Avatarmenu({ user }: { user: Iuser }) {
    const router = useRouter();
    const avatarName = user.name.trim().charAt(0).toUpperCase() || "U";
    const avatarImage = user.image.trim();
    const handlelogout = async () => {
        await authClient.signOut({
        });
        router.push("/");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Avatar className="h-10 w-10 cursor-pointer border-2 border-primary">
                    {avatarImage && <AvatarImage src={avatarImage} alt={user.name} />}

                    <AvatarFallback className="text-sm font-semibold text-primary">
                        {avatarName}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">

                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold">
                                {user?.name}
                            </span>

                            <span className="text-xs font-normal text-muted-foreground">
                                {user?.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Link
                            href="/dashboard"
                            className="flex w-full items-center gap-2"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link
                            href="/add-studio"
                            className="flex w-full items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            Add New Studio
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            href="/my-listings"
                            className="flex w-full items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            My Studio Listings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            href="/my-bookings"
                            className="flex w-full items-center gap-2"
                        >
                            <PlusCircle className="h-4 w-4" />
                            My Bookings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handlelogout}
                    className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}
