"use client"

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
import { toast } from "../ui/toast"

export function DeleteList({ id }: { id: string }) {
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:7000/my-listings/${id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                toast.add({ title: "Successfully deleted listing!", type: "success" })
                // Page complete reload korar jonno
                window.location.reload()
            }
        } catch (error) {
            console.error("Error ", error)
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
                        <Button className="bg-red-700 hover:bg-red-800 text-white" type="submit">
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}