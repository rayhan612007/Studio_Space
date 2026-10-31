"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Building2,
    DollarSign,
    Users,
    MapPin,
    Image as ImageIcon,
    CheckSquare,
    Loader2,
    Sparkles,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";

const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
    "Art Loft",
    "Dance Studio",
];

const availableAmenities = [
    "High-Speed Wi-Fi",
    "Professional Lighting",
    "Air Conditioning",
    "Soundproofing",
    "Makeup Room",
    "Parking Space",
    "Green Screen",
    "Restroom Facilities",
];

export default function AddStudioPage() {
    const router = useRouter();
    const { data: session, isPending: sessionLoading } = authClient.useSession();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    // Toggle amenities checkbox
    const handleAmenityToggle = (amenity: string) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const studioData = Object.fromEntries(formData.entries());
        console.log(studioData);

        try {
            const response = await fetch("http://localhost:7000/add-studios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studioData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to create studio listing.");
            }

            setSuccessMessage("Studio created successfully! Redirecting...");
            setTimeout(() => {
                router.push("/my-listings");
                router.refresh();
            }, 1200);
        } catch (err) {
            setErrorMessage(err.message || "Something went wrong.");
            setLoading(false);
        }
    };

    if (sessionLoading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Back Button & Header */}
                <div className="mb-8">
                    <Link
                        href="/my-listings"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to My Listings
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-amber-500" /> Add New Studio Space
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Fill in the details below to list your creative studio for booking.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-8">

                    {successMessage && (
                        <div className="mb-6 p-4 text-sm font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-6 p-4 text-sm font-medium text-red-700 bg-red-50 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-xl">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Read-Only User Info Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                            <div>
                                <Label className="text-xs text-gray-500 dark:text-gray-400">Host Name (Read-only)</Label>
                                <Input
                                    type="text"
                                    value={session?.user?.name || ""}
                                    readOnly
                                    className="mt-1 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed font-medium text-gray-700 dark:text-gray-300"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-gray-500 dark:text-gray-400">Host Email (Read-only)</Label>
                                <Input
                                    type="email"
                                    value={session?.user?.email || ""}
                                    readOnly
                                    className="mt-1 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed font-medium text-gray-700 dark:text-gray-300"
                                />
                            </div>
                        </div>

                        {/* Studio Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Studio Title <span className="text-amber-500">*</span>
                            </Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <Input
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="e.g. Apex Cinematic Sound Stage"
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Category & Max Capacity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Category <span className="text-amber-500">*</span>
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    className="w-full h-11 px-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="">Select category...</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maxCapacity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Max Capacity (Persons) <span className="text-amber-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="maxCapacity"
                                        name="maxCapacity"
                                        type="number"
                                        min="1"
                                        required
                                        placeholder="e.g. 15"
                                        className="pl-10 h-11 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hourly Rate & Security Deposit */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Hourly Rate ($) <span className="text-amber-500">*</span>
                                </Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="hourlyRate"
                                        name="hourlyRate"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        required
                                        placeholder="e.g. 75"
                                        className="pl-10 h-11 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="securityDeposit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Security Deposit ($) <span className="text-amber-500">*</span>
                                </Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="securityDeposit"
                                        name="securityDeposit"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        required
                                        placeholder="e.g. 150"
                                        className="pl-10 h-11 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location / Address */}
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Location / Address <span className="text-amber-500">*</span>
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <Input
                                    id="location"
                                    name="location"
                                    required
                                    placeholder="e.g. 420 Creative Ave, Downtown, New York"
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2">
                            <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Image URL <span className="text-amber-500">*</span>
                            </Label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    required
                                    placeholder="https://images.unsplash.com/..."
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Amenities Checkboxes */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <CheckSquare className="w-4 h-4 text-amber-500" /> Amenities List
                            </Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                {availableAmenities.map((amenity) => {
                                    const isChecked = selectedAmenities.includes(amenity);
                                    return (
                                        <button
                                            key={amenity}
                                            type="button"
                                            onClick={() => handleAmenityToggle(amenity)}
                                            className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all ${isChecked
                                                ? "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20"
                                                : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {amenity}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Detailed Overview */}
                        <div className="space-y-2">
                            <Label htmlFor="overview" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Detailed Overview <span className="text-amber-500">*</span>
                            </Label>
                            <div className="relative">
                                <Textarea
                                    id="overview"
                                    name="overview"
                                    required
                                    rows={5}
                                    placeholder="Describe your studio space, equipment included, rules, and ideal use cases..."
                                    className="rounded-xl pt-3 resize-none"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-lg shadow-amber-500/25 transition-all text-base"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" /> Saving Studio...
                                </>
                            ) : (
                                "Publish Studio Listing"
                            )}
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    );
}