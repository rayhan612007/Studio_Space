"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock, Mail, User, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/app/lib/auth-client";
import Signingoogle from "@/components/Signingoogle";
import { toast } from "@/components/ui/toast";

function getCallbackURL() {
    const requestedCallback = new URLSearchParams(window.location.search).get("callbackURL");
    return requestedCallback?.startsWith("/") && !requestedCallback.startsWith("//")
        ? requestedCallback
        : "/";
}

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        return null;
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            image: string;
            password: string;
        };
        const passwordError = validatePassword(user.password);
        if (passwordError) {
            setError(passwordError);
            toast.add({ title: "Registration failed", description: passwordError, type: "error" });
            return;
        }

        setLoading(true);
        try {
            const { error: registrationError } = await authClient.signUp.email({
                name: user.name.trim(),
                email: user.email.trim(),
                password: user.password,
                image: user.image.trim() || undefined,
                callbackURL: "/",
            });

            if (registrationError) {
                const message = registrationError.message || "Unable to create your account.";
                setError(message);
                toast.add({ title: "Registration failed", description: message, type: "error" });
                return;
            }

            toast.add({
                title: "Account created",
                description: "Welcome to StudioSpace.",
                type: "success",
            });
            router.push("/");
            router.refresh();
        } catch {
            const message = "An unexpected error occurred. Please try again.";
            setError(message);
            toast.add({ title: "Registration failed", description: message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-muted/40 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/70 bg-card p-6 shadow-xl shadow-foreground/5 sm:p-9">

                {/* Header / Title */}
                <div className="text-center">
                    <Link href="/" className="group mb-2 inline-flex items-center gap-3">
                        <Image src="/logo.png" alt="StudioSpace" width={48} height={48} />
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            Studio<span className="text-primary">Space</span>
                        </span>
                    </Link>
                    <h2 className="page-heading text-2xl sm:text-3xl">
                        Create an Account
                    </h2>
                    <p className="page-description mx-auto">
                        Join StudioSpace to book or host creative spaces
                    </p>
                </div>

                {/* Error Message Alert Box */}
                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Social Register Button (Continue with Google) */}
                <Signingoogle callbackURL="/" />

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="mx-4 flex-shrink text-xs uppercase tracking-wider text-muted-foreground">
                        Or register with email
                    </span>
                    <div className="flex-grow border-t border-border"></div>
                </div>

                {/* Registration Form */}
                <form className="space-y-4" onSubmit={handleRegister}>

                    {/* Name Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium text-foreground">
                            Full Name
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                <User className="w-4 h-4" />
                            </span>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="John Doe"
                                className="h-11 rounded-xl border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email Address
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                            </span>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="name@example.com"
                                className="h-11 rounded-xl border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Profile Image URL Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="image" className="text-sm font-medium text-foreground">
                            Profile Image URL <span className="font-normal text-muted-foreground">(Optional)</span>
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                <ImageIcon className="w-4 h-4" />
                            </span>
                            <Input
                                id="image"
                                name="image"
                                type="url"
                                placeholder="https://example.com/avatar.jpg"
                                className="h-11 rounded-xl border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                            Password
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                <Lock className="w-4 h-4" />
                            </span>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="••••••••"
                                className="h-11 rounded-xl border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                            />
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                            Must be at least 6 characters and include an uppercase and a lowercase letter.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-2 h-11 w-full gap-2 shadow-sm"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Register Account
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </form>

                {/* Link for Login */}
                <div className="border-t border-border pt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            onClick={(event) => {
                                const callbackURL = getCallbackURL();
                                if (callbackURL !== "/") {
                                    event.preventDefault();
                                    router.push(
                                        `/login?${new URLSearchParams({ callbackURL })}`,
                                    );
                                }
                            }}
                            className="font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}