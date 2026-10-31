"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Aperture, ArrowRight, Loader2, Lock, Mail, User, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Signingoogle from "@/components/Signingoogle";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Password strength check criteria: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const validatePassword = (password: string) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number.";
        }
        return null;
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        // Collecting form data using FormData and Object.fromEntries
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as { name: string, password: string, email: string, image: string, confirmpassword: string };
        const { data, error } = await authClient.signUp.email({
            ...user
        });
        if (data) {
            console.log(data);
            redirect('/')
        }
        if (error) {
            console.log(error);
        }

        // 1. Password & Confirm Password Match Check
        if (user.password !== user.confirmpassword) {
            setError("Passwords do not match.");
            return;
        }

        // 2. Password Strength Validation
        const passwordError = validatePassword(user.password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        setLoading(true);

        // Simulated registration delay
        setTimeout(() => {
            setLoading(false);
            router.push("/");
        }, 1500);
    };

    const handleGoogleSignIn = () => {
        setGoogleLoading(true);
        setError("");

        setTimeout(() => {
            setGoogleLoading(false);
            router.push("/");
        }, 1500);
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
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Join StudioSpace to book or host creative spaces
                    </p>
                </div>

                {/* Error Message Alert Box */}
                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Social Register Button (Continue with Google) */}
                <Signingoogle />

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="mx-4 flex-shrink text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Or register with email
                    </span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                </div>

                {/* Registration Form */}
                <form className="space-y-4" onSubmit={handleRegister}>

                    {/* Name Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Full Name
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                                <User className="w-4 h-4" />
                            </span>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="John Doe"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 text-gray-900 placeholder:text-gray-400 focus:bg-white focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-800"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Email Address
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

                    {/* Profile Image URL Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Profile Image URL <span className="font-normal text-gray-400 dark:text-gray-500">(Optional)</span>
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                                <ImageIcon className="w-4 h-4" />
                            </span>
                            <Input
                                id="image"
                                name="image"
                                type="url"
                                placeholder="https://example.com/avatar.jpg"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 text-gray-900 placeholder:text-gray-400 focus:bg-white focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-800"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Password
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                                <Lock className="w-4 h-4" />
                            </span>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="••••••••"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 text-gray-900 placeholder:text-gray-400 focus:bg-white focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-800"
                            />
                        </div>
                        <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                            Must be 8+ characters with uppercase, lowercase, number, and special character.
                        </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                                <Lock className="w-4 h-4" />
                            </span>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="••••••••"
                                className="h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 text-gray-900 placeholder:text-gray-400 focus:bg-white focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-gray-800"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading || googleLoading}
                        className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 mt-2"
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
                <div className="border-t border-gray-100 pt-2 text-center dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                        >
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}