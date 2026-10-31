"use client";

import { ShieldCheck, UserCheck, Wrench, Headphones } from "lucide-react";

// Array data for Host Guarantee & Creator Support
const supportFeatures = [
    {
        id: 1,
        title: "Liability Protection",
        description: "Comprehensive insurance coverage and liability protection up to $1M for every booked session, giving you total peace of mind.",
        icon: ShieldCheck,
    },
    {
        id: 2,
        title: "Verified Profiles",
        description: "Rigorous identity verification for both hosts and creators, ensuring a safe, transparent, and trustworthy community ecosystem.",
        icon: UserCheck,
    },
    {
        id: 3,
        title: "Equipment Safety",
        description: "Clear guidelines, security deposits, and secure gear handling policies designed to protect your valuable studio hardware and staging assets.",
        icon: Wrench,
    },
    {
        id: 4,
        title: "24/7 Host Support",
        description: "Round-the-clock assistance from our expert support team to help resolve any issues quickly during live bookings or sessions.",
        icon: Headphones,
    },
];

export default function About() {
    return (
        <section className="bg-gray-50/50 py-20 dark:bg-gray-950" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
                        Trust & Safety
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Host Guarantee & Creator Support
                    </h2>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        We safeguard your space, your equipment, and your creative journey with industry-leading protections.
                    </p>
                </div>

                {/* Dynamic Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {supportFeatures.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                            >
                                <div>
                                    {/* Icon Box */}
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shadow-sm transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white dark:text-amber-400">
                                        <IconComponent className="w-6 h-6" />
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}