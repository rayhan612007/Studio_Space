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
        <section id="how-it-works" className="bg-background py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
                    <span className="section-kicker">Seamless process</span>
                    <h2 className="section-heading">
                        How StudioSpace Works
                    </h2>
                    <p className="section-description mx-auto">
                        Book your ideal creative environment in four simple, straightforward steps.
                    </p>
                </div>

                {/* Dynamic Cards Grid */}
                <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {workflowSteps.map((step) => {
                        const IconComponent = step.icon;
                        return (
                            <div
                                key={step.id}
                                className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
                            >
                                {/* Top Row: Icon & Step Number */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <span className="text-2xl font-black text-muted-foreground/30 transition-colors group-hover:text-primary/30">
                                        {step.stepNumber}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm leading-7 text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>

                                                <div className="absolute bottom-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-primary to-violet-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}