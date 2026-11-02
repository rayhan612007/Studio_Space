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
        <section className="bg-muted/40 py-16 sm:py-20" id="about">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
                    <span className="section-kicker">Trust &amp; safety</span>
                    <h2 className="section-heading">
                        Host Guarantee & Creator Support
                    </h2>
                    <p className="section-description mx-auto">
                        We safeguard your space, your equipment, and your creative journey with industry-leading protections.
                    </p>
                </div>

                {/* Dynamic Cards Grid */}
                <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {supportFeatures.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
                            >
                                <div>
                                    {/* Icon Box */}
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <IconComponent className="w-6 h-6" />
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm leading-7 text-muted-foreground">
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