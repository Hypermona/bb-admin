import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "../ui/use-toast";

interface Props {
  selected: Map<string, resProductFields>;
}

export function CreateWishList({ selected }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Wishlist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Whishlist</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" ref={inputRef} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
