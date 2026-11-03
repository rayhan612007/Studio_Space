"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { STUDIO_API_URL } from "@/lib/studio-api"
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
import { toast } from "../ui/toast"

export function DeleteList({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${STUDIO_API_URL}/my-listings/${id}`, {
                method: 'DELETE',
                credentials: "include",
            })
            if (!res.ok) {
                const result: unknown = await res.json().catch(() => null)
                const message =
                    typeof result === "object" &&
                    result !== null &&
                    "error" in result &&
                    typeof result.error === "string"
                        ? result.error
                        : "Unable to delete this listing. Please try again."
                throw new Error(message)
            }

            toast.add({ title: "Listing deleted", type: "success" })
            window.location.reload()
        } catch (error) {
            toast.add({
                title: "Could not delete listing",
                description: error instanceof Error ? error.message : "Please try again.",
                type: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger >
                <Button variant="destructive">Delete Listing</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleDelete}>
                    <DialogHeader>
                        <DialogTitle>Delete</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your listing
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <DialogClose >
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" type="submit" disabled={loading}>
                            {loading ? "Deleting…" : "Delete"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}