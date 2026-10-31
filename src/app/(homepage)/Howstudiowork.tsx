"use client";

import { Search, Clock, CheckCircle2, Sparkles } from "lucide-react";

// Array data for the 4-step workflow
const workflowSteps = [
    {
        id: 1,
        stepNumber: "01",
        title: "Discover Spaces",
        description: "Browse through our curated collection of photo studios, sound stages, podcast rooms, and art lofts tailored for your creative needs.",
        icon: Search,
    },
    {
        id: 2,
        stepNumber: "02",
        title: "Select Shoot Hours",
        description: "Choose your preferred date, check real-time availability, and select the exact hours required for your production or session.",
        icon: Clock,
    },
    {
        id: 3,
        stepNumber: "03",
        title: "Book Instantly",
        description: "Secure your chosen space securely with instant confirmation, transparent hourly pricing, and zero hidden fees.",
        icon: CheckCircle2,
    },
    {
        id: 4,
        stepNumber: "04",
        title: "Create & Produce",
        description: "Arrive at your professionally equipped studio space and bring your creative vision to life with complete peace of mind.",
        icon: Sparkles,
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-white py-20 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
                        Seamless Process
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        How StudioSpace Works
                    </h2>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        Book your ideal creative environment in four simple, straightforward steps.
                    </p>
                </div>

                {/* Dynamic Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {workflowSteps.map((step) => {
                        const IconComponent = step.icon;
                        return (
                            <div
                                key={step.id}
                                className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-gray-50/50 p-8 transition-all duration-300 hover:bg-white hover:shadow-xl dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
                            >
                                {/* Top Row: Icon & Step Number */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shadow-sm transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white dark:text-amber-400">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <span className="text-2xl font-black text-gray-200 transition-colors group-hover:text-amber-500/20 dark:text-gray-700">
                                        {step.stepNumber}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Bottom decorative amber hover line */}
                                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}