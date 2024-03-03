import { RefObject, useRef } from "react";
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
import { toast } from "./ui/use-toast";
import useSWRMutation from "swr/mutation";
import LoadingButton from "./LoadingButton";

export default function AddFeature({
  filename = "processors",
  apiPath = "features",
  value,
  onAddSuccess,
}: {
  filename?: string;
  apiPath?: string;
  value: string;
  onAddSuccess: () => void;
}) {
  // make this common

  const handleSubmit = async () => {
    console.log(value);
    try {
      let res = await fetch("/api/" + apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { filename, value: value } }),
      });
      console.log("sr", res);
      if (res.status === 200) {
        onAddSuccess();
        toast({
          description: <p className="text-green-700">Successfully Added</p>,
        });
        console.log("successs Add");
      } else {
        toast({
          description: <p className="text-red-700">Failed to Add</p>,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { trigger, isMutating } = useSWRMutation("/api/" + apiPath, handleSubmit);
  return (
    // <Dialog>
    //   <DialogTrigger asChild>
    <LoadingButton disabled={isMutating} variant="outline" onClick={() => trigger()}>
      Add this
    </LoadingButton>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>Add Feature</DialogTitle>
    //     </DialogHeader>
    //     <div className="grid gap-4 py-4">
    //       <Input ref={inputRef} id="feature" className="col-span-3" />
    //     </div>
    //     <DialogFooter>
    //       <DialogClose asChild>
    //         <Button type="submit" onClick={handleSubmit}>
    //           Save changes
    //         </Button>
    //       </DialogClose>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
}
