"use client";

import { useState } from "react";
import { Calendar, Clock, User, Mail, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Idata } from "../type/Idata";

export default function Bookingaside({ studio }: { studio: Idata }) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { data: session } = authClient.useSession();

    const name = session?.user?.name;
    const Email = session?.user?.email;

    // Default to today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Extract values directly using FormData
        const formData = new FormData(e.currentTarget);
        const bookingDetails = { ...Object.fromEntries(formData.entries()), studio };

        const res = await fetch("http://localhost:7000/my-bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingDetails)
        })




        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-lg mx-auto h-fit sticky p-8 bg-white lg:w-md w-lg dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 text-center space-y-4">
                <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Booking Confirmed!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Thank you for your reservation.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                    Book Another Slot
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6  h-fit bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reserve Your Slot</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Fill out the form below to book your appointment.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5">
                <div className="flex items-center justify-between text-sm">

                    <p className="text-sm text-muted-foreground">Starting from</p>

                    <h2 className="mt-1 text-3xl font-bold">

                        hourlyrate

                        <span className="ml-1 text-sm font-normal text-muted-foreground">

                            / hour

                        </span>

                    </h2>

                </div>
                <div className="space-y-4 rounded-xl bg-muted/50 p-4">

                    <div className="flex items-center justify-between text-sm">

                        <span className="text-muted-foreground">Category</span>

                        <span className="font-medium">Category</span>

                    </div>
                    <div className="flex items-center justify-between text-sm">

                        <span className="text-muted-foreground">Capacity</span>

                        <span className="font-medium">Category People</span>

                    </div>
                    <div className="flex items-center justify-between text-sm">

                        <span className="text-muted-foreground">Security Deposit</span>

                        <span className="font-medium">securitydeposite</span>

                    </div>
                    <div className="flex items-center justify-between border-t pt-3 text-sm">

                        <span className="text-muted-foreground">Booking Type</span>

                        <span className="font-medium">Hourly</span>

                    </div>

                </div>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5 mt-5">
                    <label htmlFor="fullName" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            readOnly
                            disabled
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={name}
                            className="w-full pl-9 pr-3 py-2.5 text-gray-600 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                        />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                readOnly
                                type="email"
                                disabled
                                id="email"
                                name="email"
                                value={Email}
                                className="w-full pl-9 pr-3 py-2.5 text-gray-500 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-200"
                            />
                        </div>
                    </div>

                </div>


                {/* Date Selection */}
                <div className="space-y-1.5">
                    <label htmlFor="bookingDate" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Date
                    </label>
                    <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            required
                            type="date"
                            id="bookingDate"
                            name="bookingDate"
                            min={today}
                            defaultValue={today}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                        />
                    </div>
                </div>

                {/* Start Hour & End Hour */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label htmlFor="startTime" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Start Time
                        </label>
                        <div className="relative">
                            <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                required
                                type="time"
                                id="startTime"
                                name="startTime"
                                defaultValue="09:00"
                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="endTime" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            End Time
                        </label>
                        <div className="relative">
                            <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                required
                                type="time"
                                id="endTime"
                                name="endTime"
                                defaultValue="10:00"
                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Notes/Comments */}
                <div className="space-y-1.5">
                    <label htmlFor="notes" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Special Requests / Notes
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        placeholder="Any specific setup or notes..."
                        className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200 dark:shadow-none"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        "Confirm Booking"
                    )}
                </button>
            </form>
        </div >
    );
}