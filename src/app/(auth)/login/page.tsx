"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Signingoogle from "@/components/Signingoogle";
import { toast } from "@/components/ui/toast";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                const message = error.message || "Invalid email or password.";
                setError(message);
                toast.add({ title: "Login failed", description: message, type: "error" });
                setLoading(false);
                return;
            }

            toast.add({ title: "Welcome back", description: "You’re signed in.", type: "success" });
            router.push("/");
            router.refresh();
        } catch {
            const message = "An unexpected error occurred.";
            setError(message);
            toast.add({ title: "Login failed", description: message, type: "error" });
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
                        Login to StudioSpace
                    </h2>
                    <p className="page-description mx-auto">
                        Please sign in to your account
                    </p>
                </div>

                {/* Error Message Alert Box */}
                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Social Login Button (Continue with Google) */}
                <Signingoogle callbackURL="/" />

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="mx-4 flex-shrink text-xs uppercase tracking-wider text-muted-foreground">
                        Or with email
                    </span>
                    <div className="flex-grow border-t border-border"></div>
                </div>

                {/* Login Form */}
                <form className="space-y-4" onSubmit={handleLogin}>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email
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

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                Password
                            </Label>
                            <span className="cursor-pointer text-xs font-semibold text-muted-foreground transition-colors hover:text-primary">
                                Forgot password?
                            </span>
                        </div>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                <Lock className="w-4 h-4" />
                            </span>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="••••••••"
                                className="h-11 rounded-xl border-input bg-background pl-10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-2 h-11 w-full gap-2 shadow-sm"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Login
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </form>

                {/* Link for Register */}
                <div className="border-t border-border pt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                            Register
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}