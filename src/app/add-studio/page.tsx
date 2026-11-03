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
    ArrowLeft,
    Star,
    Plus,
    X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PrivateRoute, { usePrivateSession } from "@/components/PrivateRoute";
import { STUDIO_API_URL } from "@/lib/studio-api";
import { toast } from "@/components/ui/toast";

const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
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

function StudioImageSlot({
    index,
    file,
    onChange,
    onRemove,
}: {
    index: number;
    file: File | null;
    onChange: (file: File | null) => void;
    onRemove: () => void;
}) {
    return (
        <div className="relative">
            <input
                id={`studio-image-${index}`}
                type="file"
                accept="image/*"
                className="peer sr-only"
                onChange={(event) => {
                    const selected = event.currentTarget.files?.[0] ?? null;
                    if (!selected) return;
                    if (!selected.type.startsWith("image/")) {
                        toast.add({
                            title: "Unsupported file",
                            description: "Choose an image file.",
                            type: "error",
                        });
                        event.currentTarget.value = "";
                        return;
                    }
                    if (selected.size > 10 * 1024 * 1024) {
                        toast.add({
                            title: "Image is too large",
                            description: "Choose an image that is 10 MB or smaller.",
                            type: "error",
                        });
                        event.currentTarget.value = "";
                        return;
                    }
                    onChange(selected);
                    event.currentTarget.value = "";
                }}
            />
            <label
                htmlFor={`studio-image-${index}`}
                className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-border bg-muted/30 p-3 text-center transition-colors hover:border-primary hover:bg-muted/60 peer-focus-visible:ring-2 peer-focus-visible:ring-ring"
            >
                {file ? (
                    <>
                        <ImageIcon className="size-6 text-primary" />
                        <span className="w-full truncate text-xs text-muted-foreground">
                            {file.name}
                        </span>
                        <span className="text-xs font-medium text-primary">Click to replace</span>
                    </>
                ) : (
                    <>
                        <Plus className="size-5 text-primary" />
                        <span className="text-sm font-medium">Add image {index + 1}</span>
                    </>
                )}
            </label>
            {file && (
                <Button
                    type="button"
                    size="icon-xs"
                    variant="destructive"
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute right-2 top-2"
                    onClick={onRemove}
                >
                    <X />
                </Button>
            )}
        </div>
    );
}

export default function AddStudioPage() {
    return (
        <PrivateRoute>
            <AddStudioForm />
        </PrivateRoute>
    );
}

function AddStudioForm() {
    const router = useRouter();
    const session = usePrivateSession();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<(File | null)[]>(
        () => Array.from({ length: 8 }, () => null),
    );
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

        const userEmail = session?.user?.email?.trim().toLowerCase();
        if (!userEmail) {
            const message = "Sign in before creating a studio listing.";
            setErrorMessage(message);
            toast.add({ title: "Sign in required", description: message, type: "error" });
            setLoading(false);
            return;
        }

        const selectedImages = imageFiles.filter((file): file is File => file !== null);
        if (selectedImages.length === 0) {
            const message = "Select at least one studio image.";
            setErrorMessage(message);
            toast.add({ title: "Studio image required", description: message, type: "error" });
            setLoading(false);
            return;
        }

        const formData = new FormData(e.currentTarget);
        formData.set("amenities", JSON.stringify(selectedAmenities));
        selectedImages.forEach((file) => formData.append("images", file));

        try {
            const response = await fetch(`${STUDIO_API_URL}/add-studios`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to create studio listing.");
            }

            setSuccessMessage("Studio created successfully! Redirecting...");
            toast.add({
                title: "Studio created",
                description: "Your listing is ready to manage.",
                type: "success",
            });
            setTimeout(() => {
                router.push("/my-listings");
                router.refresh();
            }, 1200);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setErrorMessage(message);
            toast.add({ title: "Could not create listing", description: message, type: "error" });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/40 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Back Button & Header */}
                <div className="mb-8">
                    <Link
                        href="/my-listings"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to My Listings
                    </Link>
                    <h1 className="page-heading flex items-center gap-3">
                        <Sparkles className="size-7 shrink-0 text-primary" /> Add New Studio Space
                    </h1>
                    <p className="page-description">
                        Fill in the details below to list your creative studio for booking.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-8">

                    {successMessage && (
                        <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm font-medium text-destructive">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Read-Only User Info Section */}
                        <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-muted/50 p-4 sm:grid-cols-2">
                            <div>
                                <Label className="text-xs text-muted-foreground">Host Name (Read-only)</Label>
                                <Input
                                    type="text"
                                    name="hostName"
                                    value={session?.user?.name || ""}
                                    readOnly
                                    className="mt-1 cursor-not-allowed border-border bg-muted font-medium text-muted-foreground"
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Host Email (Read-only)</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={session?.user?.email || ""}
                                    readOnly
                                    className="mt-1 cursor-not-allowed border-border bg-muted font-medium text-muted-foreground"
                                />
                            </div>
                        </div>

                        {/* Studio Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium text-foreground">
                                Studio Title <span className="text-primary">*</span>
                            </Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
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
                                <Label htmlFor="category" className="text-sm font-medium text-foreground">
                                    Category <span className="text-primary">*</span>
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="">Select category...</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="maxCapacity" className="text-sm font-medium text-foreground">
                                    Max Capacity (Persons) <span className="text-primary">*</span>
                                </Label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
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
                                <Label htmlFor="hourlyRate" className="text-sm font-medium text-foreground">
                                    Hourly Rate ($) <span className="text-primary">*</span>
                                </Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
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
                                <Label htmlFor="securityDeposit" className="text-sm font-medium text-foreground">
                                    Security Deposit ($) <span className="text-primary">*</span>
                                </Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
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
                            <Label htmlFor="location" className="text-sm font-medium text-foreground">
                                Location / Address <span className="text-primary">*</span>
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="location"
                                    name="location"
                                    required
                                    placeholder="e.g. 420 Creative Ave, Downtown, New York"
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rating" className="text-sm font-medium text-foreground">
                                Rating (0-10) <span className="text-primary">*</span>
                            </Label>
                            <div className="relative">
                                <Star className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    defaultValue="0"
                                    required
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Studio Images */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Studio Images <span className="text-primary">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {imageFiles.map((file, index) => (
                                    <StudioImageSlot
                                        key={index}
                                        index={index}
                                        file={file}
                                        onChange={(selected) =>
                                            setImageFiles((current) =>
                                                current.map((currentFile, slot) =>
                                                    slot === index ? selected : currentFile,
                                                ),
                                            )
                                        }
                                        onRemove={() =>
                                            setImageFiles((current) =>
                                                current.map((currentFile, slot) =>
                                                    slot === index ? null : currentFile,
                                                ),
                                            )
                                        }
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {imageFiles.filter((selected) => selected !== null).length} of 8 images selected. Choose at least one; each image must be 10 MB or smaller.
                            </p>
                        </div>
                        {/* Amenities Checkboxes */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <CheckSquare className="h-4 w-4 text-primary" /> Amenities List
                            </Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                {availableAmenities.map((amenity) => {
                                    const isChecked = selectedAmenities.includes(amenity);
                                    return (
                                        <Button
                                            key={amenity}
                                            type="button"
                                            size="sm"
                                            variant={isChecked ? "default" : "outline"}
                                            onClick={() => handleAmenityToggle(amenity)}
                                            className="h-auto min-h-9 w-full justify-start whitespace-normal text-left"
                                        >
                                            {amenity}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Detailed Overview */}
                        <div className="space-y-2">
                            <Label htmlFor="overview" className="text-sm font-medium text-foreground">
                                Detailed Overview <span className="text-primary">*</span>
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
                            className="h-12 w-full text-base shadow-sm"
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