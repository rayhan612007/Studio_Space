
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    LayoutGrid,
    Camera,
    AudioLines,
    Mic,
    Music,
    Palette,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const categories = [
    { name: "All", value: "all", icon: LayoutGrid },
    { name: "Photo", value: "photo", icon: Camera },
    { name: "Sound Stages", value: "sound", icon: AudioLines },
    { name: "Podcast Rooms", value: "podcast", icon: Mic },
    { name: "Music Suites", value: "music", icon: Music },
    { name: "Art Workshops", value: "art", icon: Palette },
];

const categoryAliases: Record<string, string> = {
    film: "sound",
    workshop: "art",
};

export default function Studionav() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const requestedCategory = searchParams.get("category") || "all";
    const activeCategory = categoryAliases[requestedCategory] ?? requestedCategory;
    const activeSort = searchParams.get("sort") || "default";

    const getCategoryHref = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === "all") {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        const query = params.toString();
        return query ? `/studios?${query}` : "/studios";
    };

    const handleSortChange = (value: string | null) => {
        if (!value) return;

        const params = new URLSearchParams(searchParams.toString());
        if (value === "default") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    };

    return (
        <section className="w-full border-b border-base-content/10 bg-base-100 py-4">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 lg:grid-cols-[1fr_auto_1fr]">

                {/* Left Spacer */}
                <div className="hidden lg:block" />

                {/* Center Category Navbar */}
                <div className="flex w-full justify-center overflow-x-auto scrollbar-hide">
                    <div className="flex w-fit max-w-full shrink-0 items-center gap-1 rounded-2xl border border-base-content/10 bg-base-200/60 p-1.5">

                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = activeCategory === category.value;

                            return (
                                <Link
                                    key={category.value}
                                    href={getCategoryHref(category.value)}
                                    className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-300 ${isActive
                                        ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                                        : "text-base-content/70 hover:bg-base-content/10 hover:text-base-content"
                                        }`}
                                >
                                    <Icon size={14} strokeWidth={2.2} />
                                    {category.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right Filters */}
                <div className="flex items-center justify-center gap-2 lg:justify-self-end">


                    {/* Price Sorting */}
                    <Select value={activeSort} onValueChange={handleSortChange}>
                        <SelectTrigger className="h-10 w-[145px] rounded-xl border-base-content/10 bg-base-200/60 text-xs shadow-none">
                            <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default order</SelectItem>
                            <SelectItem value="low">Price: Low to High</SelectItem>
                            <SelectItem value="high">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </div>
        </section>
    );
}
