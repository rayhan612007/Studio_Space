"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { authClient } from "@/app/lib/auth-client";

type UserSession = NonNullable<
    ReturnType<typeof authClient.useSession>["data"]
>;

const PrivateSessionContext = createContext<UserSession | null>(null);

export function usePrivateSession() {
    const session = useContext(PrivateSessionContext);

    if (!session) {
        throw new Error("usePrivateSession must be used inside PrivateRoute.");
    }

    return session;
}

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { data: session, isPending } = authClient.useSession();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isPending || session) return;

        const callbackURL = `${pathname}${window.location.search}`;
        router.replace(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);
    }, [isPending, pathname, router, session]);

    if (isPending || !session) {
        return (
            <main className="flex min-h-[65vh] flex-1 items-center justify-center">
                <div
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                    role="status"
                >
                    <LoaderCircle className="size-5 animate-spin text-primary" />
                    Checking your account…
                </div>
            </main>
        );
    }

    return (
        <PrivateSessionContext.Provider value={session}>
            {children}
        </PrivateSessionContext.Provider>
    );
}
