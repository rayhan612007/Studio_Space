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
        <section id="how-it-works" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                        Seamless Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mt-3">
                        How StudioSpace Works
                    </h2>
                    <p className="text-base text-gray-500 mt-2">
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
                                className="relative bg-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 group flex flex-col justify-between"
                            >
                                {/* Top Row: Icon & Step Number */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <span className="text-2xl font-black text-gray-200 group-hover:text-amber-500/20 transition-colors">
                                        {step.stepNumber}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
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