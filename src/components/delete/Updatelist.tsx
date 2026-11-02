"use client"

import { useState } from "react"
import {
    Building2,
    Users,
    DollarSign,
    MapPin,
    Image as ImageIcon,
    Star,
    CheckSquare,
    Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/app/lib/auth-client"
import { Idata } from "../type/Idata"
import { toast } from "../ui/toast"

// Mock options (Replace or pass via props as needed)
const availableAmenities = ["WiFi", "Air Conditioning", "Lighting Equipment", "Sound System", "Parking", "Green Screen"]
const categories = ["Music Studio", "Photo Studio", "Film Location", "Podcast Room"]

export function UpdateList({ id, initialdata }: { id: string, initialdata?: Idata }) {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // Robustly parse initial amenities whether they are an array or a comma-separated/JSON string
    const parseAmenities = (amenities: string[] | string | undefined) => {
        if (!amenities) return []
        if (Array.isArray(amenities)) return amenities
        if (typeof amenities === "string") {
            try {
                return JSON.parse(amenities)
            } catch {
                return amenities.split(",").map((s: string) => s.trim())
            }
        }
        return []
    }

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(() => parseAmenities(initialdata?.amenities))

    const handleAmenityToggle = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const updatedata = {
            ...Object.fromEntries(formData.entries()),
            amenities: selectedAmenities
        }



        try {
            const res = await fetch(`http://localhost:7000/my-listings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedata)
            })
            if (!res.ok) {
                const result: unknown = await res.json().catch(() => null)
                const message =
                    typeof result === "object" &&
                    result !== null &&
                    "error" in result &&
                    typeof result.error === "string"
                        ? result.error
                        : "Unable to update this listing. Please try again."
                throw new Error(message)
            }
            toast.add({ title: "Listing updated", type: "success" })
            setOpen(false)
        } catch (error) {
            toast.add({
                title: "Could not update listing",
                description: error instanceof Error ? error.message : "Please try again.",
                type: "error",
            })
        } finally {
            setLoading(false)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger >
                <Button variant="outline">Edit Studio</Button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl lg:min-w-4xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>Edit Studio Listing</DialogTitle>
                        <DialogDescription>
                            Make changes to your studio listing below. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Read-Only User Info Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div>
                            <Label className="text-xs text-gray-500 dark:text-gray-400">Host Name (Read-only)</Label>
                            <Input
                                type="text"
                                value={session?.user?.name || initialdata?.hostName || ""}
                                readOnly
                                className="mt-1 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed font-medium text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 dark:text-gray-400">Host Email (Read-only)</Label>
                            <Input
                                type="email"
                                name="email"
                                value={session?.user?.email || initialdata?.email || ""}
                                readOnly
                                className="mt-1 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed font-medium text-gray-700 dark:text-gray-300"
                            />
                        </div>
                    </div>

                    {/* Studio Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Studio Title <span className="text-primary">*</span>
                        </Label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                            <Input
                                id="title"
                                name="title"
                                required
                                defaultValue={initialdata?.title || ""}
                                placeholder="e.g. Apex Cinematic Sound Stage"
                                className="pl-10 h-11 rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Category & Max Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Category <span className="text-primary">*</span>
                            </Label>
                            <select
                                id="category"
                                name="category"
                                required
                                defaultValue={initialdata?.category || ""}
                                className="w-full h-11 px-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-gray-100"
                            >
                                <option value="">Select category...</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxCapacity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Max Capacity (Persons) <span className="text-primary">*</span>
                            </Label>
                            <div className="relative">
                                <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <Input
                                    id="maxCapacity"
                                    name="maxCapacity"
                                    type="number"
                                    min="1"
                                    required
                                    defaultValue={initialdata?.maxCapacity || ""}
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
                                Hourly Rate ($) <span className="text-primary">*</span>
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
                                    defaultValue={initialdata?.hourlyRate || ""}
                                    placeholder="e.g. 75"
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="securityDeposit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Security Deposit ($) <span className="text-primary">*</span>
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
                                    defaultValue={initialdata?.securityDeposit || ""}
                                    placeholder="e.g. 150"
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location / Address */}
                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Location / Address <span className="text-primary">*</span>
                        </Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                            <Input
                                id="location"
                                name="location"
                                required
                                defaultValue={initialdata?.location || ""}
                                placeholder="e.g. 420 Creative Ave, Downtown, New York"
                                className="pl-10 h-11 rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Image URL & Rating */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Image URL <span className="text-primary">*</span>
                            </Label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    required
                                    defaultValue={initialdata?.imageUrl || ""}
                                    placeholder="paste your imageUrl"
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rating" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Rating <span className="text-primary">*</span>
                            </Label>
                            <div className="relative">
                                <Star className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <Input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.01"
                                    required
                                    defaultValue={initialdata?.rating || ""}
                                    placeholder="e.g. 10"
                                    className="pl-10 h-11 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Amenities Checkboxes */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <CheckSquare className="w-4 h-4 text-primary" /> Amenities List
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                            {availableAmenities.map((amenity) => {
                                const isChecked = selectedAmenities.includes(amenity)
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
                                )
                            })}
                        </div>
                    </div>

                    {/* Detailed Overview */}
                    <div className="space-y-2">
                        <Label htmlFor="overview" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Detailed Overview <span className="text-primary">*</span>
                        </Label>
                        <Textarea
                            id="overview"
                            name="overview"
                            required
                            rows={4}
                            defaultValue={initialdata?.overview || ""}
                            placeholder="Describe your studio space, equipment included, rules, and ideal use cases..."
                            className="rounded-xl pt-3 resize-none"
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose>
                            <Button type="button" variant="outline" className="rounded-xl">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...
                                </>
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}