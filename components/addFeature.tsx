import { useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function AddFeature({
  filename = "processors",
  apiPath = "features",
}: {
  filename?: string;
  apiPath?: string;
}) {
  // make this common
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async () => {
    console.log(inputRef.current?.value);
    try {
      let res = await fetch("/api/" + apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { filename, value: inputRef.current?.value } }),
      });
      if (res.status === 200) {
        console.log("successs");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Feature</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Feature</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input ref={inputRef} id="feature" className="col-span-3" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
