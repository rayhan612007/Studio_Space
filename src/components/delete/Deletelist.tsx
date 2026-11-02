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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Idata } from "../type/Idata"
import { toast } from "../ui/toast"
import { success } from "better-auth"
import { useRouter } from "next/navigation"


export function DeleteList({ id }: { id: string }) {
    const router = useRouter();
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:7000/my-listings/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                router.refresh();
                toast.add({ title: "Successfully deleted listing!", type: "success" })
            }
        } catch (error) {
            console.error("Error ", error)

        }
    }
    return (
        <Dialog>
            <form>
                <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your listing
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button onClick={handleDelete} className="bg-red-700 dark:text-black" type="submit">Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog >
    )
}
