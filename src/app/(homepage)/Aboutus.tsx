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
        <section className="py-20 bg-gray-50/50" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                        Trust & Safety
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mt-3">
                        Host Guarantee & Creator Support
                    </h2>
                    <p className="text-base text-gray-500 mt-2">
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
                                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div>
                                    {/* Icon Box */}
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                                        <IconComponent className="w-6 h-6" />
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
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