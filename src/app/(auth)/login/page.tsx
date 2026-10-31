"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Aperture, ArrowRight, Loader2, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Signingoogle from "@/components/Signingoogle";

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
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                setError(error.message || "Invalid email or password.");
                setLoading(false);
                return;
            }

            router.push("/");
            router.refresh();
        } catch (err) {
            setError("An unexpected error occurred.");
            setLoading(false);
        }
    };



    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100 sm:p-10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20">

                {/* Header / Title */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-3 group mb-2">
                        <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:bg-amber-600 transition-all">
                            <Aperture className="w-6 h-6" />
                        </div>
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Please sign in to your account
                    </p>
                </div>

                {/* Error Message Alert Box */}
                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Social Login Button (Continue with Google) */}
                <Signingoogle />

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="mx-4 flex-shrink text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Or with email
                    </span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                </div>

                {/* Login Form */}
                <form className="space-y-4" onSubmit={handleLogin}>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Email
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                                <Mail className="w-4 h-4" />
                            </span>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="name@example.com"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 text-gray-900 placeholder:text-gray-400 focus:bg-white focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-800"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Password
                            </Label>
                            <Link
                                href="/forgot-password"
                                className="text-xs font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                                <Lock className="w-4 h-4" />
                            </span>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="••••••••"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 text-gray-900 placeholder:text-gray-400 focus:bg-white focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-800"
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 mt-2"
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
                <div className="border-t border-gray-100 pt-2 text-center dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                        >
                            Register
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}