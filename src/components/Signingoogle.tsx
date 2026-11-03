'use client'
import { authClient } from '@/app/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from "@/components/ui/toast";

const Signingoogle = ({ callbackURL: callbackOverride }: { callbackURL?: string }) => {
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setError("");
        const requestedCallback = new URLSearchParams(window.location.search).get("callbackURL");
        const callbackURL =
            callbackOverride ??
            (requestedCallback?.startsWith("/") && !requestedCallback.startsWith("//")
                ? requestedCallback
                : "/");

        try {
            const { error: signInError } = await authClient.signIn.social({
                provider: "google",
                callbackURL,
            });
            if (signInError) {
                const message = signInError.message || "Could not connect to Google sign-in.";
                setError(message);
                toast.add({ title: "Google sign-in failed", description: message, type: "error" });
                setGoogleLoading(false);
            }
        } catch {
            const message = "Could not connect to Google sign-in.";
            setError(message);
            toast.add({ title: "Google sign-in failed", description: message, type: "error" });
            setGoogleLoading(false);
        }
    };
    return (
        <div>
            <div>
                <Button
                    variant="outline"
                    type="button"
                    disabled={googleLoading}
                    onClick={handleGoogleSignIn}
                    className="h-11 w-full gap-3 border-border bg-background text-foreground shadow-sm hover:bg-muted"
                >
                    {googleLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M23.745 12.27c-.07-.7-.63-1.27-1.34-1.27H12v4.56h6.6c-.29 1.51-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.18 3.66-8.92 0-.35-.03-.7-.1-1.02z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.15-4.05 1.15-3.12 0-5.77-2.11-6.72-4.95H1.19v3.15C3.2 21.32 7.23 24 12 24z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.28 14.24c-.25-.72-.39-1.49-.39-2.24s.14-1.52.39-2.24V6.61H1.19C.43 8.14 0 9.99 0 12s.43 3.86 1.19 5.39l4.09-3.15z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.2 2.68 1.19 6.61l4.09 3.15c.95-2.84 3.6-4.95 6.72-4.95z"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </>
                    )}
                </Button>
            </div>
            {error && (
                <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Signingoogle;