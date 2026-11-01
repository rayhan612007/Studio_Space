
import { Sparkles } from "lucide-react";

export default function StudiosHero() {
    return (
        <section className="relative isolate flex min-h-40 items-center overflow-hidden bg-[#0d0b18] sm:min-h-[180px] lg:min-h-50">

            {/* Background Image */}
            <div className="absolute inset-0 -z-20 bg-cover bg-right
  bg-[url('/lightstudiohero.png')]
  dark:bg-[url('/darkstudiohero.png')]"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0915] via-[#0b0915]/90 to-[#0b0915]/20" />

            {/* Bottom Overlay */}
            <div className="absolute inset-0 -z-10 bg-black/15" />

            {/* Content */}
            <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

                <div className="max-w-xl space-y-3">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/10 px-3 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-md">
                        <Sparkles size={13} className="fill-purple-400" />
                        Discover Our Spaces
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white sm:text-5xl">
                        Our{" "}
                        <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                            Studios
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-sm text-gray-300 sm:text-base">
                        Find and book the perfect workspace for your creative projects.
                    </p>

                </div>
            </div>
        </section>
    );
}
