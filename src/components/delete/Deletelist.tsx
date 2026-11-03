"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteMyListing } from "@/app/lib/my-listing-actions"
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
            await deleteMyListing(id)
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